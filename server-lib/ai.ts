import { sectorPriceLists, toolsCatalog, PriceItem } from "../src/data/priceLists.js";
import { countriesList } from "../src/data/countries.js";
import {
  prepareChainForExecution,
  recordModelSuccess,
  recordModelFailure,
  getAiHealthReport,
  HealthReport
} from "./modelHealth.js";
import { getStandardSectorEstimate } from "./degradedData.js";

export type ChainTask = "text" | "vision";

export interface RunChainOptions {
  systemInstruction?: string;
  language?: string;
  temperature?: number;
  max_tokens?: number;
  schemaName?: string;
}

export interface RunChainMeta {
  modelUsed: string;
  fallbackCount: number;
  degraded: boolean;
  durationMs?: number;
}

export interface RunChainResult<T = any> {
  data: T;
  text: string;
  meta: RunChainMeta;
}

// Catalogo OpenRouter verificato (Task 11a / 11b)
// Modelli Text: google/gemini-2.0-flash-001 -> meta-llama/llama-3.3-70b-instruct -> modelli free
const DEFAULT_TEXT_CHAIN =
  "google/gemini-2.0-flash-001,meta-llama/llama-3.3-70b-instruct,google/gemma-2-9b-it:free,google/gemini-2.0-flash-exp:free";

// Modelli Vision: google/gemini-2.0-flash-001 -> modelli free con visione
const DEFAULT_VISION_CHAIN =
  "google/gemini-2.0-flash-001,google/gemini-2.0-flash-exp:free";

/**
 * Ottiene la lista ordinata dei modelli per il tipo di task specificato,
 * leggendo unicamente dalle variabili d'ambiente con fallback ai default certificati.
 */
export function getModelChain(task: ChainTask): string[] {
  const envVal = task === "vision" ? process.env.AI_CHAIN_VISION : process.env.AI_CHAIN_TEXT;
  const raw = envVal && envVal.trim().length > 0
    ? envVal
    : (task === "vision" ? DEFAULT_VISION_CHAIN : DEFAULT_TEXT_CHAIN);

  const list = raw
    .split(",")
    .map(m => m.trim())
    .filter(Boolean);

  if (list.length === 0) {
    return task === "vision"
      ? DEFAULT_VISION_CHAIN.split(",")
      : DEFAULT_TEXT_CHAIN.split(",");
  }
  return list;
}

/**
 * Valida che l'oggetto restituito rispetti i campi e i tipi base richiesti dallo schema JSON.
 */
function validateSchema(data: any, schema: any): string | null {
  if (!data || typeof data !== "object") {
    return "La risposta non è un oggetto JSON valido.";
  }

  if (Array.isArray(schema.required)) {
    for (const key of schema.required) {
      if (!(key in data) || data[key] === undefined || data[key] === null) {
        return `Campo obbligatorio mancante: '${key}'.`;
      }
      const propDef = schema.properties?.[key];
      if (propDef) {
        if (propDef.type === "array" && !Array.isArray(data[key])) {
          return `Il campo '${key}' deve essere un array.`;
        }
        if (propDef.type === "object" && (typeof data[key] !== "object" || Array.isArray(data[key]))) {
          return `Il campo '${key}' deve essere un oggetto.`;
        }
        if (propDef.type === "string" && typeof data[key] !== "string") {
          return `Il campo '${key}' deve essere una stringa.`;
        }
        if (propDef.type === "number" && typeof data[key] !== "number") {
          return `Il campo '${key}' deve essere un numero.`;
        }
      }
    }
  }

  return null;
}

/**
 * Risposta degradata tradotta per l'analisi visiva delle foto quando la catena Vision si esaurisce
 */
function getDegradedVisionData(language?: string) {
  const lang = (language || "it").toLowerCase();
  if (lang === "de") {
    return {
      visibleState: "Automatische Fotoanalyse vorübergehend nicht verfügbar. Bitte geben Sie die Maße manuell ein.",
      detectedIssues: [],
      suggestedDimensions: { areaMq: 0, lengthMl: 0, quantityCad: 0 },
      confidence: "nicht verfügbar",
      recommendations: ["Geben Sie die Maße manuell ein, um die genaue Kostenschätzung zu berechnen."]
    };
  }
  if (lang === "fr") {
    return {
      visibleState: "Analyse photo automatique temporairement indisponible. Veuillez saisir les mesures manuellement.",
      detectedIssues: [],
      suggestedDimensions: { areaMq: 0, lengthMl: 0, quantityCad: 0 },
      confidence: "non disponible",
      recommendations: ["Saisissez vos mesures manuellement pour obtenir votre devis complet."]
    };
  }
  if (lang === "en") {
    return {
      visibleState: "Automatic photo analysis is temporarily unavailable. Please enter your measurements manually to complete your estimate.",
      detectedIssues: [],
      suggestedDimensions: { areaMq: 0, lengthMl: 0, quantityCad: 0 },
      confidence: "not available",
      recommendations: ["Enter dimensions manually in the fields above to obtain your exact estimate."]
    };
  }
  // Default Italian
  return {
    visibleState: "Analisi visiva delle foto temporaneamente non disponibile. È possibile inserire manualmente le misure per completare il preventivo.",
    detectedIssues: [],
    suggestedDimensions: { areaMq: 0, lengthMl: 0, quantityCad: 0 },
    confidence: "non disponibile",
    recommendations: ["Inserisci manualmente la superficie in m² o le misure nei campi sopra per ottenere la stima economica esatta."]
  };
}

/**
 * Risposta generica degradata tradotta per la stima qualitativa testuale se la catena Text si esaurisce
 */
function getDegradedTextData(language?: string) {
  const lang = (language || "it").toLowerCase();
  if (lang === "de") {
    return {
      additionalItems: [],
      feasibility: {
        rating: "Machbar mit Vorbehalt",
        analysis: "Wirtschaftliche Schätzung anhand offizieller Preislisten erfolgreich berechnet. Detaillierte KI-Analyse vorübergehend vereinfacht.",
        risks: ["Vor Beginn auf verdeckte Leitungen prüfen", "Geeignete Schutzkleidung tragen"],
        recommendations: ["Vor Arbeitsbeginn Beratung durch einen Fachbetrieb einholen"],
        permitsAndRules: ["Örtliche Bauvorschriften und Hausordnung prüfen"]
      },
      mainSteps: [
        "Vorbereitung des Arbeitsbereichs und Absicherung",
        "Beschaffung der notwendigen Materialien und Werkzeuge",
        "Fachgerechte Ausführung der Arbeiten",
        "Endreinigung und ordnungsgemäße Entsorgung"
      ],
      estimatedTime: "Variabel je nach gewähltem Umfang",
      diySummaryNote: "Die Material- und Arbeitskosten wurden vollständig nach den eingestellten Parametern berechnet."
    };
  }
  if (lang === "fr") {
    return {
      additionalItems: [],
      feasibility: {
        rating: "Faisable avec réserves",
        analysis: "Estimation économique calculée avec succès sur les barèmes officiels. Analyse qualitative IA temporairement simplifiée.",
        risks: ["Vérifier la présence de canalisations ou câbles encastrés", "Porter les équipements de protection individuelle adaptés"],
        recommendations: ["Solliciter une visite sur place d'un artisan qualifié"],
        permitsAndRules: ["Vérifier les règles de copropriété et déclarations préalables"]
      },
      mainSteps: [
        "Préparation de la zone de travail et mise en sécurité",
        "Approvisionnement des matériaux et outillages requis",
        "Réalisation des travaux selon les règles de l'art",
        "Nettoyage final et évacuation conforme des gravats"
      ],
      estimatedTime: "Variable selon les dimensions sélectionnées",
      diySummaryNote: "Les coûts de matériaux et de main-d'œuvre ont été rigoureusement calculés selon votre configuration."
    };
  }
  if (lang === "en") {
    return {
      additionalItems: [],
      feasibility: {
        rating: "Feasible with caution",
        analysis: "Economic estimate successfully computed from official price lists. AI qualitative deep-dive is temporarily simplified due to high load.",
        risks: ["Always check for concealed electrical wiring and plumbing", "Wear appropriate PPE at all times"],
        recommendations: ["Consider an on-site consultation with a certified contractor"],
        permitsAndRules: ["Verify municipal regulations and building management permissions"]
      },
      mainSteps: [
        "Work area preparation and safety setup",
        "Procurement of specified materials and tools",
        "Execution according to standard technical specifications",
        "Site cleanup and authorized waste disposal"
      ],
      estimatedTime: "Variable depending on dimensions",
      diySummaryNote: "Material and labor estimates have been fully computed based on regional parameters."
    };
  }
  // Default Italian
  return {
    additionalItems: [],
    feasibility: {
      rating: "Fattibile con riserva",
      analysis: "Stima economica calcolata con successo sui prezzi di listino ufficiali. L'approfondimento qualitativo AI è momentaneamente semplificato per elevato traffico.",
      risks: ["Verificare sempre la presenza di impianti sotto traccia", "Indossare idonei DPI durante le lavorazioni"],
      recommendations: ["Richiedere un sopralluogo a un professionista qualificato prima dell'inizio lavori"],
      permitsAndRules: ["Verificare eventuali autorizzazioni comunali o regolamenti condominiali locali"]
    },
    mainSteps: [
      "Preparazione del locale e protezione delle superfici adiacenti",
      "Acquisto e approvvigionamento di materiali e attrezzi necessari",
      "Esecuzione dell'intervento secondo le buone norme tecniche",
      "Pulizia finale e corretto smaltimento dei materiali di scarto"
    ],
    estimatedTime: "Variabile in base alle dimensioni specificate",
    diySummaryNote: "I costi dei materiali e della manodopera sono stati regolarmente calcolati in base ai parametri territoriali selezionati."
  };
}

/**
 * UNICO helper centralizzato per tutte le chiamate AI dell'applicazione (Task 11a / 11b).
 * Chiama OpenRouter con gestione della catena di fallback, budget temporale,
 * circuit breaker per modello, verifica catalogo a 24h, token limit,
 * retry json_schema -> json_object sullo stesso modello, degradazione graziosa e logging anonimo.
 */
export async function runChain(
  task: ChainTask,
  messages: Array<any>,
  schema: any,
  options?: RunChainOptions
): Promise<RunChainResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY non è configurata nelle variabili d'ambiente.");
  }

  const FALLBACK_TIMEOUT_MS = Number(process.env.FALLBACK_TIMEOUT_MS) || 60000;
  const TOTAL_BUDGET_MS = Number(process.env.TOTAL_BUDGET_MS) || 250000;

  // Task 11b - Requisito 4: Limita max_tokens in base al task per evitare consumo inutile di token
  const defaultTaskMaxTokens = task === "vision" ? 800 : 1200;
  const effectiveMaxTokens = options?.max_tokens
    ? Math.min(options.max_tokens, defaultTaskMaxTokens)
    : defaultTaskMaxTokens;

  // Privacy e sanitizzazione: non inviare MAI immagini a un modello della catena TEXT
  let sanitizedMessages = messages;
  if (task === "text") {
    sanitizedMessages = messages.map(m => {
      if (typeof m.content === "string") return m;
      if (Array.isArray(m.content)) {
        const textOnly = m.content.filter((c: any) => c.type !== "image_url");
        return { ...m, content: textOnly };
      }
      return m;
    });
  }

  // Task 11b - Requisiti 1 & 2: Verifica catalogo OpenRouter (24h) e Circuit Breaker
  const rawChain = getModelChain(task);
  const { usableModels, skippedDueToCatalog, skippedDueToCooldown } =
    await prepareChainForExecution(rawChain);

  const chain = usableModels;
  const startTime = Date.now();
  let fallbackCount = 0;
  let lastErrorReason = "";
  let photoPayloadSendCount = 0;

  console.log(
    `[OpenRouter Chain] Avvio richiesta task="${task}", modelli da provare: [${chain.join(
      ", "
    )}], configurati: [${rawChain.join(", ")}], budget=${TOTAL_BUDGET_MS}ms`
  );

  if (chain.length > 0) {
    for (let i = 0; i < chain.length; i++) {
      const currentModel = chain[i];
      const elapsed = Date.now() - startTime;
      const remainingTime = TOTAL_BUDGET_MS - elapsed;

      // Regola 2: Prima di ogni tentativo calcola il tempo residuo.
      // Se è inferiore a 20 secondi interrompi la catena e passa alla degradazione.
      if (remainingTime < 20000) {
        console.warn(
          `[OpenRouter Chain] Tempo residuo (${Math.round(
            remainingTime / 1000
          )}s) inferiore a 20s. Interruzione catena e passaggio a degradazione.`
        );
        break;
      }

      // Il timeout di un tentativo è min(60s, tempo residuo - 5s)
      const attemptTimeoutMs = Math.min(FALLBACK_TIMEOUT_MS, remainingTime - 5000);
      const attemptStart = Date.now();

      let modelSuccess = false;
      let modelResultText = "";
      let modelResultData: any = null;
      let shouldAbortImagePayload = false;

      // Output strutturato: json_schema -> fallback json_object
      for (let formatAttempt = 0; formatAttempt < 2; formatAttempt++) {
        const isJsonObjectFallback = formatAttempt === 1;

        // Requisito 4: prompt di sistema mantenuto breve
        let currentSystemInstruction = options?.systemInstruction || "";
        let responseFormat: any;

        if (!isJsonObjectFallback) {
          responseFormat = {
            type: "json_schema",
            json_schema: {
              name: options?.schemaName || "response_data",
              strict: false,
              schema: schema
            }
          };
        } else {
          responseFormat = { type: "json_object" };
          const schemaString = JSON.stringify(schema, null, 2);
          currentSystemInstruction = `${currentSystemInstruction}\n\nOutput ONLY a valid JSON object matching this schema:\n${schemaString}`.trim();
        }

        let requestMessages = [...sanitizedMessages];
        if (currentSystemInstruction) {
          requestMessages = [
            { role: "system", content: currentSystemInstruction },
            ...sanitizedMessages
          ];
        }

        const requestBody: any = {
          model: currentModel,
          messages: requestMessages,
          response_format: responseFormat,
          max_tokens: effectiveMaxTokens
        };
        if (options?.temperature !== undefined) requestBody.temperature = options.temperature;

        const appUrl = process.env.APP_URL || process.env.VITE_APP_URL || "https://preventivatore-edile.local";
        const headers: Record<string, string> = {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": appUrl,
          "X-Title": "Preventivatore Edile AI"
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), attemptTimeoutMs);

        if (task === "vision") {
          photoPayloadSendCount++;
        }

        try {
          const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers,
            body: JSON.stringify(requestBody),
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          if (!res.ok) {
            const errText = await res.text();

            const isSchemaUnsupported =
              !isJsonObjectFallback &&
              (res.status === 400 || res.status === 422) &&
              (errText.toLowerCase().includes("json_schema") ||
                errText.toLowerCase().includes("response_format") ||
                errText.toLowerCase().includes("schema") ||
                errText.toLowerCase().includes("unsupported") ||
                errText.toLowerCase().includes("provider"));

            if (isSchemaUnsupported) {
              console.warn(
                `[OpenRouter Chain] Modello "${currentModel}" non supporta json_schema (HTTP ${res.status}). Riprovo lo stesso modello con response_format: json_object.`
              );
              continue;
            }

            const isUserInputError =
              res.status === 400 &&
              !isSchemaUnsupported &&
              (errText.toLowerCase().includes("invalid input") ||
                errText.toLowerCase().includes("base64") ||
                errText.toLowerCase().includes("user error") ||
                errText.toLowerCase().includes("bad request"));

            if (isUserInputError) {
              const clientErr: any = new Error(`Richiesta non valida (HTTP 400): ${errText.slice(0, 200)}`);
              clientErr.statusCode = 400;
              throw clientErr;
            }

            lastErrorReason = `HTTP ${res.status}: ${errText.slice(0, 150)}`;
            break;
          }

          const resJson = await res.json();
          const content = resJson.choices?.[0]?.message?.content;

          if (!content || typeof content !== "string" || content.trim().length === 0) {
            lastErrorReason = `Risposta vuota da OpenRouter per il modello ${currentModel}`;
            break;
          }

          let parsed: any = null;
          let cleanText = content.trim();

          try {
            parsed = JSON.parse(cleanText);
          } catch {
            if (cleanText.startsWith("```")) {
              cleanText = cleanText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
            } else {
              const firstBrace = cleanText.indexOf("{");
              const lastBrace = cleanText.lastIndexOf("}");
              if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                cleanText = cleanText.substring(firstBrace, lastBrace + 1);
              }
            }
            try {
              parsed = JSON.parse(cleanText);
            } catch (e2: any) {
              lastErrorReason = `JSON non valido dopo tentativo di riparazione: ${e2.message}`;
              break;
            }
          }

          const schemaErr = validateSchema(parsed, schema);
          if (schemaErr) {
            lastErrorReason = `Non conforme allo schema richiesto: ${schemaErr}`;
            break;
          }

          modelSuccess = true;
          modelResultText = cleanText;
          modelResultData = parsed;
          break;
        } catch (err: any) {
          clearTimeout(timeoutId);
          if (err.statusCode === 400) {
            throw err;
          }
          if (err.name === "AbortError") {
            lastErrorReason = `Timeout di ${Math.round(attemptTimeoutMs / 1000)}s scaduto`;
            // Task 11b - Requisito 4: Non reinviare le foto se è fallito per timeout dopo aver già inviato lo stesso payload più di 2 volte
            if (task === "vision" && photoPayloadSendCount >= 2) {
              console.warn(
                `[OpenRouter Chain] Rilevato timeout dopo aver già inviato il payload di foto ${photoPayloadSendCount} volte. Interruzione invii foto per evitare consumo inutile di token e banda.`
              );
              shouldAbortImagePayload = true;
            }
          } else {
            lastErrorReason = `Errore di rete o connessione: ${err.message || err}`;
          }
          break;
        }
      }

      const attemptDuration = Date.now() - attemptStart;

      if (modelSuccess && modelResultData) {
        const totalDuration = Date.now() - startTime;
        console.log(
          `[OpenRouter Chain] Successo con modello "${currentModel}" in ${attemptDuration}ms (totale: ${totalDuration}ms, fallbackCount: ${fallbackCount})`
        );

        // Task 11b - Requisito 1: Registra successo nel circuit breaker
        await recordModelSuccess(currentModel);

        return {
          data: modelResultData,
          text: modelResultText,
          meta: {
            modelUsed: currentModel,
            fallbackCount,
            degraded: false,
            durationMs: totalDuration
          }
        };
      }

      // Task 11b - Requisito 1: Registra fallimento nel circuit breaker
      await recordModelFailure(currentModel, lastErrorReason);

      console.warn(
        `[OpenRouter Chain] Fallback da "${currentModel}" (tentativo ${fallbackCount + 1}): durata=${attemptDuration}ms, motivo="${lastErrorReason}"`
      );

      fallbackCount++;

      if (shouldAbortImagePayload) {
        break;
      }

      if (i < chain.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }

  // Regola 5 / Requisito 3: Degradazione controllata quando la catena si esaurisce
  const totalDuration = Date.now() - startTime;

  if (task === "vision") {
    console.warn(
      `[OpenRouter Chain] Catena VISION esaurita o interrotta (fallbackCount=${fallbackCount}, durata=${totalDuration}ms). Restituisco analisi degradata (non disponibile) senza fallire il preventivo.`
    );
    const degradedData = getDegradedVisionData(options?.language);
    return {
      data: degradedData,
      text: JSON.stringify(degradedData),
      meta: {
        modelUsed: "none",
        fallbackCount,
        degraded: true,
        durationMs: totalDuration
      }
    };
  }

  if (task === "text") {
    console.warn(
      `[OpenRouter Chain] Catena TEXT esaurita o interrotta (fallbackCount=${fallbackCount}, durata=${totalDuration}ms). Restituisco stima qualitativa degradata.`
    );
    const degradedTextData = getDegradedTextData(options?.language);
    return {
      data: degradedTextData,
      text: JSON.stringify(degradedTextData),
      meta: {
        modelUsed: "none",
        fallbackCount,
        degraded: true,
        durationMs: totalDuration
      }
    };
  }

  throw new Error(`Catena OpenRouter fallita: ${lastErrorReason || "Tutti i modelli hanno fallito."}`);
}

/**
 * Calcola il preventivo economico completo (Regola fondamentale: calcoli deterministici sempre sul server)
 * e arricchisce la risposta con voci e analisi tramite runChain('text', ...)
 *
 * Task 11b - Requisito 3: Se la catena è esaurita o il budget di tempo è finito,
 * restituisce comunque la stima economica calcolata sul server (intervalli fai da te e professionista,
 * lista della spesa e attrezzi derivati dal listino) con i campi di testo dell'AI
 * (fattibilità, rischi, permessi, consigli, passi) sostituiti da un contenuto standard preparato
 * per ogni settore e lingua, e un flag degraded: true. La risposta HTTP resta 200.
 */
export async function calculateEstimate(reqBody: any) {
  const {
    countryCode,
    language,
    sectorId,
    workDescription,
    dimensions,
    selectedItems,
    quality,
    skillLevel,
    mode,
    ivaOption,
    siteDifficulty
  } = reqBody;

  if (workDescription && typeof workDescription === "string" && workDescription.length > 1500) {
    const err: any = new Error("La descrizione del lavoro è troppo lunga (massimo 1500 caratteri).");
    err.statusCode = 400;
    throw err;
  }

  const selectedLang = language || "it";
  let langNameFull = "italiana";
  if (selectedLang === "de") langNameFull = "tedesca (German)";
  else if (selectedLang === "fr") langNameFull = "francese (French)";
  else if (selectedLang === "en") langNameFull = "inglese (English)";

  const targetCountry = countriesList.find(c => c.id === countryCode) || countriesList[0];
  const sectorInfo = sectorPriceLists.find(s => s.id === sectorId) || sectorPriceLists[0];
  const dimsStr = dimensions ? JSON.stringify(dimensions) : "Non specificato";

  const qualityFactor = quality === "base" ? 0.0 : quality === "premium" ? 1.0 : 0.5;
  const skillFactor = skillLevel === "beginner" ? 1.3 : skillLevel === "expert" ? 0.8 : 1.0;
  const diffFactor = siteDifficulty === "high" ? 1.2 : siteDifficulty === "low" ? 0.9 : 1.0;
  const serviceVat = ivaOption !== undefined ? Number(ivaOption) : targetCountry.defaultVat;
  const materialVat = targetCountry.materialVatRate || 22;

  let proTotalExcl = 0;
  let proTotalIncl = 0;
  let diyTotalExcl = 0;
  let diyTotalIncl = 0;
  let totalDiyHours = 0;
  const daAffidareAProfessionista: Array<{ name: string; reason: string }> = [];
  const detailedBreakdown: Array<any> = [];

  if (selectedItems && Array.isArray(selectedItems)) {
    for (const sel of selectedItems) {
      const itemDef = sectorInfo.items.find((it: PriceItem) => it.id === sel.id);
      const qty = Number(sel.quantity) || 1;
      if (!itemDef) continue;

      const proUnitPrice = itemDef.minPrice + (itemDef.maxPrice - itemDef.minPrice) * qualityFactor;
      const proItemExcl = proUnitPrice * qty;
      const proItemVat = proItemExcl * (serviceVat / 100);
      const proItemIncl = proItemExcl + proItemVat;

      proTotalExcl += proItemExcl;
      proTotalIncl += proItemIncl;

      const isDiyAllowed = itemDef.diyAllowed !== "no";
      if (!isDiyAllowed) {
        daAffidareAProfessionista.push({
          name: itemDef.name,
          reason: itemDef.diyNote || "Per legge o normative tecniche, questo intervento richiede obbligatoriamente un professionista abilitato."
        });
      } else {
        const matPct = itemDef.materialPct ?? 0.4;
        const waste = itemDef.wastePct ?? 0.1;
        const materialCost = proItemExcl * matPct * (1 + waste);
        const materialVatAmt = materialCost * (materialVat / 100);

        const hoursPerUnit = itemDef.diyHoursPerUnit ?? 2;
        const itemDiyHours = hoursPerUnit * qty * skillFactor * diffFactor;
        totalDiyHours += itemDiyHours;
        const itemDiyDays = Math.max(1, Math.ceil(itemDiyHours / 6));

        let itemToolsCost = 0;
        const usedToolIds = itemDef.tools || [];
        for (const tId of usedToolIds) {
          const toolObj = toolsCatalog.find(t => t.id === tId);
          if (toolObj) {
            const rentCost = toolObj.rentPricePerDay * itemDiyDays;
            itemToolsCost += Math.min(toolObj.buyPrice, rentCost);
          }
        }

        const disposalCost = Math.max(10, materialCost * 0.05);
        const unforeseenCost = (materialCost + itemToolsCost + disposalCost) * 0.1;

        const diyItemExcl = materialCost + itemToolsCost + disposalCost + unforeseenCost;
        const diyItemVat = materialVatAmt + (itemToolsCost + disposalCost + unforeseenCost) * (serviceVat / 100);
        const diyItemIncl = diyItemExcl + diyItemVat;

        diyTotalExcl += diyItemExcl;
        diyTotalIncl += diyItemIncl;
      }

      detailedBreakdown.push({
        itemId: itemDef.id,
        name: itemDef.name,
        quantity: qty,
        unit: itemDef.unit,
        proUnitPrice: Math.round(proUnitPrice * 100) / 100,
        proTotal: Math.round(proItemIncl * 100) / 100,
        diyAllowed: itemDef.diyAllowed ?? "yes",
        source: "listino"
      });
    }
  }

  const promptText = `
Analizza la richiesta per il settore "${sectorInfo.name}" in ${targetCountry.name} (${targetCountry.flag}).
Descrizione: ${workDescription || "Lavori di manutenzione standard"}
Dimensioni: ${dimsStr}
Difficoltà cantiere: ${siteDifficulty || "media"}

Fornisci in formato JSON (interamente in lingua ${langNameFull}):
1. additionalItems: eventuali voci extra non nel listino (con item, quantity, unit, unitPrice, source: "stimato")
2. feasibility: rating ('Fattibile', 'Fattibile con riserva', 'Sconsigliato fai da te'), analysis, risks, recommendations, permitsAndRules
3. mainSteps: array con passaggi operativi
4. estimatedTime: tempo stimato
5. diySummaryNote: nota conclusiva
`;

  const messages = [{ role: "user", content: promptText }];

  const jsonSchema = {
    type: "object",
    properties: {
      additionalItems: {
        type: "array",
        items: {
          type: "object",
          properties: {
            item: { type: "string" },
            quantity: { type: "number" },
            unit: { type: "string" },
            unitPrice: { type: "number" },
            source: { type: "string" }
          },
          required: ["item", "quantity", "unit", "unitPrice", "source"]
        }
      },
      feasibility: {
        type: "object",
        properties: {
          rating: { type: "string" },
          analysis: { type: "string" },
          risks: { type: "array", items: { type: "string" } },
          recommendations: { type: "array", items: { type: "string" } },
          permitsAndRules: { type: "array", items: { type: "string" } }
        },
        required: ["rating", "analysis", "risks", "recommendations", "permitsAndRules"]
      },
      mainSteps: {
        type: "array",
        items: { type: "string" }
      },
      estimatedTime: { type: "string" },
      diySummaryNote: { type: "string" }
    },
    required: ["additionalItems", "feasibility", "mainSteps", "estimatedTime", "diySummaryNote"]
  };

  // Requisito 4: prompt di sistema breve e conciso
  const shortSystemInstruction = `Esperto stime edili di Preventivatore Edile. Indica fattibilità, rischi, permessi (${targetCountry.name}), passaggi e voci extra in JSON rigoroso nella lingua ${langNameFull}.`;

  let chainResult: RunChainResult;
  try {
    chainResult = await runChain("text", messages, jsonSchema, {
      systemInstruction: shortSystemInstruction,
      schemaName: "estimate_schema",
      language: selectedLang,
      max_tokens: 1200
    });
  } catch (chainErr: any) {
    console.warn(`[calculateEstimate] Errore runChain ("${chainErr.message}"). Attivo modalità degradata senza AI.`);
    chainResult = {
      data: null,
      text: "",
      meta: {
        modelUsed: "none",
        fallbackCount: 0,
        degraded: true,
        durationMs: 0
      }
    };
  }

  const isDegraded = !!chainResult.meta?.degraded;
  const aiInsights = (!isDegraded && chainResult.data) ? chainResult.data : {};

  // Task 11b - Requisito 3: Se degradato, usa contenuti standard preparati per ogni settore e lingua
  let finalFeasibility: any;
  let finalMainSteps: string[];
  let finalEstimatedTime: string;
  let finalDiySummaryNote: string;
  let finalAdditionalItems: any[];

  if (isDegraded) {
    const standardData = getStandardSectorEstimate(sectorInfo.id, selectedLang, targetCountry.name);
    finalFeasibility = standardData.feasibility;
    finalMainSteps = standardData.mainSteps;
    finalEstimatedTime = standardData.estimatedTime;
    finalDiySummaryNote = standardData.diySummaryNote;
    finalAdditionalItems = [];
  } else {
    finalFeasibility = aiInsights.feasibility || {};
    finalMainSteps = aiInsights.mainSteps || [];
    finalEstimatedTime = aiInsights.estimatedTime || "Non specificato";
    finalDiySummaryNote = aiInsights.diySummaryNote || "";

    finalAdditionalItems = (aiInsights.additionalItems || []).map((add: any) => {
      const q = Number(add.quantity) || 1;
      const up = Number(add.unitPrice) || 20;
      const totalExcl = q * up;
      const totalIncl = totalExcl * (1 + serviceVat / 100);
      proTotalExcl += totalExcl;
      proTotalIncl += totalIncl;
      return {
        ...add,
        total: Math.round(totalIncl * 100) / 100
      };
    });
  }

  const finalProMinIncl = proTotalIncl * 0.9;
  const finalProMaxIncl = proTotalIncl * 1.1;
  const finalDiyMinIncl = diyTotalIncl * 0.9;
  const finalDiyMaxIncl = diyTotalIncl * 1.1;
  const finalEstimatedSavings = Math.max(0, proTotalIncl - diyTotalIncl);

  return {
    success: true,
    degraded: isDegraded,
    country: targetCountry,
    sector: sectorInfo.name,
    mode: mode || "compare",
    modelUsed: chainResult.meta.modelUsed,
    meta: {
      ...chainResult.meta,
      degraded: isDegraded
    },
    professionalEstimate: {
      totalExcl: Math.round(proTotalExcl * 100) / 100,
      totalIncl: Math.round(proTotalIncl * 100) / 100,
      minIncl: Math.round(finalProMinIncl * 100) / 100,
      maxIncl: Math.round(finalProMaxIncl * 100) / 100
    },
    diyEstimate: {
      totalExcl: Math.round(diyTotalExcl * 100) / 100,
      totalIncl: Math.round(diyTotalIncl * 100) / 100,
      minIncl: Math.round(finalDiyMinIncl * 100) / 100,
      maxIncl: Math.round(finalDiyMaxIncl * 100) / 100,
      estimatedHours: Math.round(totalDiyHours * 10) / 10,
      estimatedDays: Math.max(1, Math.ceil(totalDiyHours / 6))
    },
    estimatedSavings: Math.round(finalEstimatedSavings * 100) / 100,
    daAffidareAProfessionista,
    listinoBreakdown: detailedBreakdown,
    additionalItems: finalAdditionalItems,
    feasibility: finalFeasibility,
    mainSteps: finalMainSteps,
    estimatedTime: finalEstimatedTime,
    diySummaryNote: finalDiySummaryNote
  };
}

/**
 * Analizza le foto del locale tramite la catena Vision di runChain
 */
export async function analyzePhotos(reqBody: any) {
  const { photos, sectorId, workDescription, language } = reqBody;

  if (!photos || !Array.isArray(photos) || photos.length === 0) {
    const err: any = new Error("Nessuna foto fornita per l'analisi.");
    err.statusCode = 400;
    throw err;
  }
  if (photos.length > 3) {
    const err: any = new Error("Massimo 3 foto consentite.");
    err.statusCode = 400;
    throw err;
  }

  for (const photo of photos) {
    const url = typeof photo === "string" ? photo : photo?.dataUrl;
    if (!url || typeof url !== "string" || !url.startsWith("data:image/")) {
      const err: any = new Error("Formato immagine non valido. Sono accettati solo JPEG, PNG e WebP.");
      err.statusCode = 400;
      throw err;
    }
    const mimeMatch = url.match(/^data:(image\/(jpeg|png|webp));base64,/);
    if (!mimeMatch) {
      const err: any = new Error("Formato immagine non supportato. Utilizzare JPEG, PNG o WebP.");
      err.statusCode = 400;
      throw err;
    }
  }

  const selectedLang = language || "it";
  let langNameFull = "italiana";
  if (selectedLang === "de") langNameFull = "tedesca (German)";
  else if (selectedLang === "fr") langNameFull = "francese (French)";
  else if (selectedLang === "en") langNameFull = "inglese (English)";

  const sectorInfo = sectorPriceLists.find(s => s.id === sectorId) || sectorPriceLists[0];

  const promptText = `
Analizza le foto per il settore "${sectorInfo.name}". Descrizione: "${workDescription || "Nessuna"}".
Fornisci JSON in lingua ${langNameFull}:
1. visibleState: stato visibile
2. detectedIssues: criticità rilevate
3. suggestedDimensions: { areaMq, lengthMl, quantityCad }
4. confidence: ('alto', 'medio', 'basso')
5. recommendations: verifiche consigliate
`;

  const imageContentParts = photos.map((p: any) => ({
    type: "image_url",
    image_url: {
      url: typeof p === "string" ? p : p.dataUrl
    }
  }));

  const messages = [
    {
      role: "user",
      content: [
        { type: "text", text: promptText },
        ...imageContentParts
      ]
    }
  ];

  const jsonSchema = {
    type: "object",
    properties: {
      visibleState: { type: "string" },
      detectedIssues: {
        type: "array",
        items: { type: "string" }
      },
      suggestedDimensions: {
        type: "object",
        properties: {
          areaMq: { type: "number" },
          lengthMl: { type: "number" },
          quantityCad: { type: "number" }
        },
        required: ["areaMq", "lengthMl", "quantityCad"]
      },
      confidence: { type: "string" },
      recommendations: {
        type: "array",
        items: { type: "string" }
      }
    },
    required: ["visibleState", "detectedIssues", "suggestedDimensions", "confidence", "recommendations"]
  };

  // Requisito 4: prompt di sistema breve e max_tokens 800
  const shortVisionSystemInstruction = `Perito edile di Preventivatore Edile. Analizza le foto di cantiere in JSON rigoroso nella lingua ${langNameFull}.`;

  const chainResult = await runChain("vision", messages, jsonSchema, {
    systemInstruction: shortVisionSystemInstruction,
    schemaName: "photo_analysis_schema",
    language: selectedLang,
    max_tokens: 800
  });

  return {
    success: true,
    modelUsed: chainResult.meta.modelUsed,
    meta: chainResult.meta,
    analysis: chainResult.data
  };
}

/**
 * Task 11b - Requisito 5: Helper per l'endpoint di stato e monitoraggio catena AI
 */
export async function getAiHealthStatus(): Promise<HealthReport> {
  const textChain = getModelChain("text");
  const visionChain = getModelChain("vision");
  return await getAiHealthReport(textChain, visionChain);
}

/**
 * Alias di retrocompatibilità
 */
export async function generateWithFallback(messages: Array<any>, options: any) {
  const task: ChainTask = options.isVision ? "vision" : "text";
  const schema = options.jsonSchema || {};
  const res = await runChain(task, messages, schema, options);
  return {
    text: res.text,
    raw: res.data,
    modelUsed: res.meta.modelUsed,
    meta: res.meta
  };
}
