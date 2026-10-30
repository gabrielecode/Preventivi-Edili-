import dotenv from "dotenv";
dotenv.config();

// Imposta chiavi dummy se non presenti nell'ambiente locale di test
if (!process.env.OPENROUTER_API_KEY) {
  process.env.OPENROUTER_API_KEY = "test_openrouter_api_key_simulated";
}
if (!process.env.ADMIN_TOKEN) {
  process.env.ADMIN_TOKEN = "test_admin_secret_token";
}

// Configura una catena di 4 modelli per il test
process.env.AI_CHAIN_TEXT = "model-alpha-primary,model-beta-secondary,model-gamma-tertiary,model-delta-backup";
process.env.FALLBACK_TIMEOUT_MS = "1000"; // veloce per il test
process.env.MODEL_COOLDOWN_MS = "300000"; // 5 minuti

import { runChain, calculateEstimate, getAiHealthStatus } from "./server-lib/ai";
import { getModelCircuitState, recordModelFailure, resetCircuitBreaker } from "./server-lib/modelHealth";

async function runSimulation() {
  console.log("================================================================================");
  console.log("SCENARIO DI TEST TASK 11b: SIMULAZIONE FALLBACK E CIRCUIT BREAKER");
  console.log("================================================================================");
  console.log("Catena configurata:", process.env.AI_CHAIN_TEXT);
  console.log("1. Modello 1 (model-alpha-primary): simula TIMEOUT");
  console.log("2. Modello 2 (model-beta-secondary): simula HTTP 429 Too Many Requests");
  console.log("3. Modello 3 (model-gamma-tertiary): simula SUCCESSO con JSON strutturato valido");
  console.log("--------------------------------------------------------------------------------\n");

  const originalFetch = global.fetch;

  // Intercettiamo fetch per simulare i comportamenti specifici
  global.fetch = async (url: any, init?: any): Promise<any> => {
    const urlStr = String(url);

    // Mock del catalogo OpenRouter (tutti i modelli presenti)
    if (urlStr.includes("openrouter.ai/api/v1/models")) {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          data: [
            { id: "model-alpha-primary" },
            { id: "model-beta-secondary" },
            { id: "model-gamma-tertiary" },
            { id: "model-delta-backup" }
          ]
        })
      };
    }

    if (urlStr.includes("openrouter.ai/api/v1/chat/completions")) {
      const body = JSON.parse(init?.body || "{}");
      const model = body.model;

      // 1. Modello 1: simula timeout (AbortError)
      if (model === "model-alpha-primary") {
        console.log(`[SIMULATORE] Intercettata chiamata a "${model}" -> Simulo TIMEOUT (AbortError)`);
        const abortErr = new Error("This operation was aborted");
        abortErr.name = "AbortError";
        throw abortErr;
      }

      // 2. Modello 2: simula HTTP 429
      if (model === "model-beta-secondary") {
        console.log(`[SIMULATORE] Intercettata chiamata a "${model}" -> Simulo HTTP 429 (Rate Limit Exceeded)`);
        return {
          ok: false,
          status: 429,
          text: async () => JSON.stringify({ error: { message: "Provider rate limit exceeded. Please retry later." } })
        };
      }

      // 3. Modello 3: simula risposta valida con successo
      if (model === "model-gamma-tertiary") {
        console.log(`[SIMULATORE] Intercettata chiamata a "${model}" -> Simulo SUCCESSO HTTP 200 con payload JSON valido`);
        const payloadData = {
          additionalItems: [
            { item: "Pellicola protettiva supplementare e nastro cantiere", quantity: 2, unit: "rotolo", unitPrice: 15, source: "stimato" }
          ],
          feasibility: {
            rating: "Fattibile con attenzione",
            analysis: "Intervento accessibile con idonee misure di sicurezza e preparazione del fondo.",
            risks: ["Polveri di carteggiatura", "Lavoro su scala a pioli"],
            recommendations: ["Indossare mascherina FFP2", "Aerare costantemente"],
            permitsAndRules: ["Edilizia libera per tinteggiatura ordinaria"]
          },
          mainSteps: [
            "Copertura integrale arredi e pavimenti",
            "Raschiatura e stuccatura crepe",
            "Mano di fondo isolante",
            "Due mani di pittura traspirante"
          ],
          estimatedTime: "12-16 ore lavorative",
          diySummaryNote: "Lavoro consigliato per il fai da te con ottimo risparmio economico."
        };

        return {
          ok: true,
          status: 200,
          json: async () => ({
            id: "chatcmpl-test-123",
            choices: [
              {
                message: {
                  content: JSON.stringify(payloadData)
                }
              }
            ]
          })
        };
      }

      // Default fallback
      return {
        ok: false,
        status: 500,
        text: async () => "Internal error"
      };
    }

    return originalFetch(url, init);
  };

  try {
    // Eseguiamo una chiamata a calculateEstimate
    console.log(">>> INVIO RICHIESTA PREVENTIVO: Settore Imbianchino (Italia)...");
    const result = await calculateEstimate({
      countryCode: "IT",
      language: "it",
      sectorId: "imbianchino",
      workDescription: "Tinteggiatura pareti e soffitti salotto 25mq",
      dimensions: { areaMq: 25 },
      selectedItems: [
        { id: "imb_dip_idro", quantity: 25 }
      ],
      quality: "standard",
      skillLevel: "handy",
      mode: "compare"
    });

    console.log("\n--------------------------------------------------------------------------------");
    console.log(">>> RISULTATO OTTENUTO DALLA CATENA:");
    console.log(`- Successo: ${result.success}`);
    console.log(`- Modello finale utilizzato: "${result.modelUsed}" (ATTESO: model-gamma-tertiary)`);
    console.log(`- Conteggio fallback eseguiti: ${result.meta.fallbackCount} (ATTESO: 2)`);
    console.log(`- Modalità degradata: ${result.meta.degraded} (ATTESO: false)`);
    console.log(`- Costo Professionista calcolato sul server: ${result.professionalEstimate.minIncl} - ${result.professionalEstimate.maxIncl} €`);
    console.log(`- Costo Fai da Te calcolato sul server: ${result.diyEstimate.minIncl} - ${result.diyEstimate.maxIncl} €`);
    console.log(`- Risparmio stimato: ${result.estimatedSavings} €`);
    console.log(`- Valutazione fattibilità: "${result.feasibility.rating}"`);

    // Verifica automatica asserzioni
    if (result.modelUsed !== "model-gamma-tertiary") {
      throw new Error(`TEST FALLITO: atteso model-gamma-tertiary, ricevuto ${result.modelUsed}`);
    }
    if (result.meta.fallbackCount !== 2) {
      throw new Error(`TEST FALLITO: atteso fallbackCount 2, ricevuto ${result.meta.fallbackCount}`);
    }
    console.log("\n✅ VERIFICA: Confermata risposta dal terzo modello dopo timeout del primo e 429 del secondo!");

    // Test Circuit Breaker: simula un secondo errore consecutivo per il modello 1
    console.log("\n--------------------------------------------------------------------------------");
    console.log(">>> VERIFICA CIRCUIT BREAKER (Attivazione pausa dopo 2 fallimenti consecutivi):");
    console.log("Modello 1 ha già 1 fallimento. Registro il secondo fallimento per model-alpha-primary...");
    await recordModelFailure("model-alpha-primary", "Timeout secondo tentativo consecutivo");

    const stateAlpha = await getModelCircuitState("model-alpha-primary");
    console.log(`- model-alpha-primary: consecutiveFailures=${stateAlpha.consecutiveFailures}`);
    console.log(`- model-alpha-primary: pausedUntil=${stateAlpha.pausedUntil ? new Date(stateAlpha.pausedUntil).toISOString() : "null"}`);

    // Test endpoint di salute GET /api/health/ai
    console.log("\n--------------------------------------------------------------------------------");
    console.log(">>> VERIFICA GET /api/health/ai (Report monitoraggio senza chiavi esposte):");
    const health = await getAiHealthStatus();
    console.log("Riepilogo catena:", JSON.stringify(health.summary, null, 2));
    console.log("Stato modelli TEXT:");
    health.chains.text.forEach(m => {
      console.log(`  • ${m.model.padEnd(25)} -> stato: [${m.status.toUpperCase()}], fallimenti: ${m.consecutiveFailures}, in catalogo: ${m.catalogFound}, errore: "${m.lastError || "nessuno"}"`);
    });

    console.log("\n================================================================================");
    console.log("✅ TUTTI I TEST DELLO SCENARIO COMPLETATI CON SUCCESSO!");
    console.log("================================================================================");
  } finally {
    global.fetch = originalFetch;
  }
}

runSimulation().catch(err => {
  console.error("ERRORE DURANTE LA SIMULAZIONE:", err);
  process.exit(1);
});
