import { Redis } from "@upstash/redis";

export interface ModelCircuitState {
  model: string;
  consecutiveFailures: number;
  pausedUntil: number | null; // Timestamp ms
  lastError: string | null;
  lastErrorAt: number | null; // Timestamp ms
}

export interface ModelHealthStatus {
  model: string;
  status: "ok" | "in_pausa" | "non_disponibile";
  consecutiveFailures: number;
  pausedUntil: string | null;
  pauseRemainingSeconds: number;
  catalogFound: boolean;
  lastError: string | null;
  lastErrorAt: string | null;
}

export interface HealthReport {
  success: boolean;
  timestamp: string;
  chains: {
    text: ModelHealthStatus[];
    vision: ModelHealthStatus[];
  };
  summary: {
    totalConfigured: number;
    totalAvailable: number;
    totalPaused: number;
    totalUnavailable: number;
    cooldownDurationMs: number;
    catalogCacheAgeMinutes: number | null;
  };
}

// Inizializzazione Upstash Redis per Serverless Vercel con fallback in memoria
let redisClient: Redis | null = null;
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (redisUrl && redisToken) {
  try {
    redisClient = new Redis({ url: redisUrl, token: redisToken });
  } catch (err) {
    console.warn("[Model Health] Inizializzazione Upstash Redis fallita, uso memoria locale:", err);
  }
}

// Fallback in-memory store
const inMemoryCircuitStore = new Map<string, ModelCircuitState>();

// Cache del catalogo OpenRouter (24 ore = 86400000 ms)
const CATALOG_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
let inMemoryCatalogCache: { models: Set<string>; cachedAt: number } | null = null;

/**
 * Ottiene il tempo di cooldown configurato (default 300000 ms = 5 minuti)
 */
export function getCooldownMs(): number {
  const val = Number(process.env.MODEL_COOLDOWN_MS);
  return !isNaN(val) && val > 0 ? val : 300000;
}

/**
 * Legge lo stato del circuit breaker per un modello da Redis o memoria locale
 */
export async function getModelCircuitState(model: string): Promise<ModelCircuitState> {
  if (redisClient) {
    try {
      const data = await redisClient.get<string | ModelCircuitState>(`circuit_breaker:${model}`);
      if (data) {
        const parsed: ModelCircuitState = typeof data === "string" ? JSON.parse(data) : data;
        // Se la pausa è scaduta, azzera pausedUntil
        if (parsed.pausedUntil && Date.now() >= parsed.pausedUntil) {
          parsed.pausedUntil = null;
          // salviamo lo stato aggiornato
          await redisClient.set(`circuit_breaker:${model}`, JSON.stringify(parsed), { ex: 604800 });
        }
        return parsed;
      }
    } catch (err) {
      console.warn(`[Circuit Breaker] Errore lettura Redis per ${model}, fallback a memoria:`, err);
    }
  }

  const mem = inMemoryCircuitStore.get(model);
  if (mem) {
    if (mem.pausedUntil && Date.now() >= mem.pausedUntil) {
      mem.pausedUntil = null;
    }
    return { ...mem };
  }

  return {
    model,
    consecutiveFailures: 0,
    pausedUntil: null,
    lastError: null,
    lastErrorAt: null
  };
}

/**
 * Salva lo stato del circuit breaker su Redis o memoria locale
 */
async function saveModelCircuitState(state: ModelCircuitState): Promise<void> {
  inMemoryCircuitStore.set(state.model, { ...state });

  if (redisClient) {
    try {
      // TTL 7 giorni (604800s)
      await redisClient.set(`circuit_breaker:${state.model}`, JSON.stringify(state), { ex: 604800 });
    } catch (err) {
      console.warn(`[Circuit Breaker] Errore salvataggio Redis per ${state.model}:`, err);
    }
  }
}

/**
 * Registra il successo di un modello: resetta i fallimenti consecutivi e revoca la pausa
 */
export async function recordModelSuccess(model: string): Promise<void> {
  const current = await getModelCircuitState(model);
  const updated: ModelCircuitState = {
    ...current,
    consecutiveFailures: 0,
    pausedUntil: null
  };
  await saveModelCircuitState(updated);
}

/**
 * Registra il fallimento di un tentativo per un modello.
 * Se fallisce 2 volte consecutive, attiva il cooldown per MODEL_COOLDOWN_MS.
 */
export async function recordModelFailure(model: string, errorReason: string): Promise<ModelCircuitState> {
  const current = await getModelCircuitState(model);
  const newFailures = current.consecutiveFailures + 1;
  const cooldownMs = getCooldownMs();
  const now = Date.now();

  let pausedUntil = current.pausedUntil;

  if (newFailures >= 2) {
    pausedUntil = now + cooldownMs;
    console.warn(
      `[Circuit Breaker] Modello "${model}" ha fallito ${newFailures} volte di fila. Messo in pausa per ${
        cooldownMs / 1000
      }s (fino alle ${new Date(pausedUntil).toISOString()}). Motivo: "${errorReason}"`
    );
  } else {
    console.warn(
      `[Circuit Breaker] Modello "${model}" fallito (${newFailures}/2 tentativi consecutivi prima della pausa). Motivo: "${errorReason}"`
    );
  }

  const updated: ModelCircuitState = {
    model,
    consecutiveFailures: newFailures,
    pausedUntil,
    lastError: errorReason,
    lastErrorAt: now
  };

  await saveModelCircuitState(updated);
  return updated;
}

/**
 * Verifica se un modello è attualmente in pausa (cooldown attivo)
 */
export async function isModelPaused(model: string): Promise<{ paused: boolean; remainingMs: number }> {
  const state = await getModelCircuitState(model);
  if (state.pausedUntil && state.pausedUntil > Date.now()) {
    return {
      paused: true,
      remainingMs: state.pausedUntil - Date.now()
    };
  }
  return { paused: false, remainingMs: 0 };
}

/**
 * Requisito 2: Verifica giornaliera della catena.
 * Scarica il catalogo modelli OpenRouter (GET /api/v1/models) e lo mantiene in cache per 24 ore.
 * Se un ID non esiste più nel catalogo, lo segna come "non disponibile" e lo salta.
 * Non sostituisce mai i modelli in automatico con altri non scelti dall'utente.
 */
export async function getOpenRouterCatalog(): Promise<Set<string>> {
  const now = Date.now();

  // 1. Controllo cache in memoria
  if (inMemoryCatalogCache && now - inMemoryCatalogCache.cachedAt < CATALOG_CACHE_TTL_MS) {
    return inMemoryCatalogCache.models;
  }

  // 2. Controllo cache Redis (se disponibile)
  if (redisClient) {
    try {
      const cached = await redisClient.get<string | string[]>("openrouter:catalog_cache");
      if (cached) {
        const list: string[] = typeof cached === "string" ? JSON.parse(cached) : cached;
        const set = new Set(list);
        inMemoryCatalogCache = { models: set, cachedAt: now };
        return set;
      }
    } catch (err) {
      console.warn("[OpenRouter Catalog] Errore lettura cache Redis:", err);
    }
  }

  // 3. Chiamata a GET https://openrouter.ai/api/v1/models
  console.log("[OpenRouter Catalog] Aggiornamento catalogo giornaliero da https://openrouter.ai/api/v1/models...");
  try {
    const headers: Record<string, string> = {};
    if (process.env.OPENROUTER_API_KEY) {
      headers["Authorization"] = `Bearer ${process.env.OPENROUTER_API_KEY}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    const res = await fetch("https://openrouter.ai/api/v1/models", {
      method: "GET",
      headers,
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[OpenRouter Catalog] HTTP ${res.status} durante il recupero catalogo.`);
      // Se fallisce ma abbiamo una cache precedente in memoria, usiamola
      if (inMemoryCatalogCache) return inMemoryCatalogCache.models;
      return new Set();
    }

    const json = await res.json();
    const modelIds: string[] = Array.isArray(json.data)
      ? json.data.map((m: any) => m.id).filter(Boolean)
      : [];

    const set = new Set(modelIds);
    inMemoryCatalogCache = { models: set, cachedAt: now };

    // Salviamo su Redis con TTL 24h (86400s)
    if (redisClient && modelIds.length > 0) {
      try {
        await redisClient.set("openrouter:catalog_cache", JSON.stringify(modelIds), { ex: 86400 });
      } catch (err) {
        console.warn("[OpenRouter Catalog] Errore salvataggio cache Redis:", err);
      }
    }

    console.log(`[OpenRouter Catalog] Catalogo aggiornato con successo: ${modelIds.length} modelli indicizzati.`);
    return set;
  } catch (err: any) {
    console.warn(`[OpenRouter Catalog] Impossibile contattare OpenRouter per aggiornare il catalogo: ${err.message}`);
    if (inMemoryCatalogCache) return inMemoryCatalogCache.models;
    return new Set();
  }
}

/**
 * Prepara la catena di modelli per l'esecuzione del task, applicando:
 * 1. Verifica disponibilità catalogo OpenRouter (se non trovato, logga e salta senza sostituire).
 * 2. Verifica circuit breaker (se fallito 2 volte, in pausa per 5 minuti).
 * 3. Se TUTTI i modelli disponibili sono in pausa, ignora le pause e li prova in ordine.
 */
export async function prepareChainForExecution(
  chain: string[]
): Promise<{
  usableModels: string[];
  skippedDueToCatalog: string[];
  skippedDueToCooldown: string[];
  modelStatuses: Record<string, ModelHealthStatus>;
}> {
  const catalog = await getOpenRouterCatalog();
  const catalogHasData = catalog.size > 0;

  const modelStatuses: Record<string, ModelHealthStatus> = {};
  const availableInCatalog: string[] = [];
  const skippedDueToCatalog: string[] = [];

  // Passo 1: Verifica catalogo
  for (const model of chain) {
    // Se il catalogo è stato scaricato con successo, verifichiamo la presenza esatta del modello
    const inCatalog = catalogHasData ? catalog.has(model) : true;
    const circuit = await getModelCircuitState(model);
    const now = Date.now();
    const isPaused = !!(circuit.pausedUntil && circuit.pausedUntil > now);
    const remainingSeconds = isPaused ? Math.ceil((circuit.pausedUntil! - now) / 1000) : 0;

    let status: "ok" | "in_pausa" | "non_disponibile" = "ok";

    if (!inCatalog) {
      status = "non_disponibile";
      skippedDueToCatalog.push(model);
      console.warn(
        `[OpenRouter Catalog Check] Modello "${model}" non trovato nel catalogo OpenRouter. Segnato come non disponibile e saltato.`
      );
    } else if (isPaused) {
      status = "in_pausa";
    }

    modelStatuses[model] = {
      model,
      status,
      consecutiveFailures: circuit.consecutiveFailures,
      pausedUntil: circuit.pausedUntil ? new Date(circuit.pausedUntil).toISOString() : null,
      pauseRemainingSeconds: remainingSeconds,
      catalogFound: inCatalog,
      lastError: circuit.lastError,
      lastErrorAt: circuit.lastErrorAt ? new Date(circuit.lastErrorAt).toISOString() : null
    };

    if (inCatalog) {
      availableInCatalog.push(model);
    }
  }

  // Passo 2: Verifica Circuit Breaker tra i modelli disponibili nel catalogo
  const pausedModels: string[] = [];
  const readyModels: string[] = [];

  for (const model of availableInCatalog) {
    const status = modelStatuses[model];
    if (status.status === "in_pausa") {
      pausedModels.push(model);
    } else {
      readyModels.push(model);
    }
  }

  // Requisito 1: "Se TUTTI i modelli sono in pausa, ignora le pause e prova comunque la catena in ordine."
  let usableModels: string[] = [];
  let skippedDueToCooldown: string[] = [];

  if (availableInCatalog.length > 0 && readyModels.length === 0) {
    console.warn(
      `[Circuit Breaker] Tutti i modelli disponibili della catena [${availableInCatalog.join(
        ", "
      )}] sono attualmente in pausa. Ignoro le pause e provo comunque la catena in ordine come da specifica.`
    );
    usableModels = availableInCatalog;
  } else {
    usableModels = readyModels;
    skippedDueToCooldown = pausedModels;
    for (const pm of pausedModels) {
      const remainingSec = modelStatuses[pm]?.pauseRemainingSeconds || 0;
      console.log(
        `[Circuit Breaker] Modello "${pm}" saltato perché in pausa per altri ${remainingSec}s.`
      );
    }
  }

  return {
    usableModels,
    skippedDueToCatalog,
    skippedDueToCooldown,
    modelStatuses
  };
}

/**
 * Genera il report per l'endpoint protetto GET /api/health/ai
 */
export async function getAiHealthReport(
  textChain: string[],
  visionChain: string[]
): Promise<HealthReport> {
  const catalog = await getOpenRouterCatalog();
  const catalogHasData = catalog.size > 0;
  const now = Date.now();

  const getStatus = async (model: string): Promise<ModelHealthStatus> => {
    const inCatalog = catalogHasData ? catalog.has(model) : true;
    const circuit = await getModelCircuitState(model);
    const isPaused = !!(circuit.pausedUntil && circuit.pausedUntil > now);
    const remainingSeconds = isPaused ? Math.ceil((circuit.pausedUntil! - now) / 1000) : 0;

    let status: "ok" | "in_pausa" | "non_disponibile" = "ok";
    if (!inCatalog) {
      status = "non_disponibile";
    } else if (isPaused) {
      status = "in_pausa";
    }

    return {
      model,
      status,
      consecutiveFailures: circuit.consecutiveFailures,
      pausedUntil: circuit.pausedUntil ? new Date(circuit.pausedUntil).toISOString() : null,
      pauseRemainingSeconds: remainingSeconds,
      catalogFound: inCatalog,
      lastError: circuit.lastError,
      lastErrorAt: circuit.lastErrorAt ? new Date(circuit.lastErrorAt).toISOString() : null
    };
  };

  const textStatuses = await Promise.all(textChain.map(getStatus));
  const visionStatuses = await Promise.all(visionChain.map(getStatus));

  const allStatuses = [...textStatuses, ...visionStatuses];
  const totalPaused = allStatuses.filter(s => s.status === "in_pausa").length;
  const totalUnavailable = allStatuses.filter(s => s.status === "non_disponibile").length;
  const totalAvailable = allStatuses.filter(s => s.status !== "non_disponibile").length;

  const cacheAgeMinutes = inMemoryCatalogCache
    ? Math.round((now - inMemoryCatalogCache.cachedAt) / 60000)
    : null;

  return {
    success: true,
    timestamp: new Date().toISOString(),
    chains: {
      text: textStatuses,
      vision: visionStatuses
    },
    summary: {
      totalConfigured: textChain.length + visionChain.length,
      totalAvailable,
      totalPaused,
      totalUnavailable,
      cooldownDurationMs: getCooldownMs(),
      catalogCacheAgeMinutes: cacheAgeMinutes
    }
  };
}

/**
 * Resetta lo stato di uno o tutti i modelli (utile per test o manutenzione)
 */
export async function resetCircuitBreaker(model?: string): Promise<void> {
  if (model) {
    inMemoryCircuitStore.delete(model);
    if (redisClient) {
      try {
        await redisClient.del(`circuit_breaker:${model}`);
      } catch (e) {}
    }
  } else {
    inMemoryCircuitStore.clear();
    // Non cancelliamo l'intero redis, solo i circuit_breaker se necessario
  }
}
