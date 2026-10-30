import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { sectorPriceLists, toolsCatalog, PriceItem } from "./src/data/priceLists";
import { countriesList } from "./src/data/countries";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Simple in-memory rate limiter for /api/estimate: max 10 requests per hour per IP
const requestLog = new Map<string, number[]>();
function rateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 10;

  let timestamps = requestLog.get(ip) || [];
  timestamps = timestamps.filter(t => now - t < windowMs);

  if (timestamps.length >= maxRequests) {
    return res.status(429).json({
      error: "Troppe richieste effettuate da questo indirizzo IP. Riprova più tardi (limite: 10 richieste all'ora)."
    });
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  next();
}

// API route to get initial price lists
app.get("/api/price-lists", (req, res) => {
  res.json(sectorPriceLists);
});

// API route to get countries list
app.get("/api/countries", (req, res) => {
  res.json(countriesList);
});

// Helper to perform Gemini API call with backup models on service overloads (503/UNAVAILABLE)
async function generateContentWithFallback(ai: any, contents: any, config: any): Promise<any> {
  const modelsToTry = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
  let lastError: any = null;

  for (let i = 0; i < modelsToTry.length; i++) {
    const currentModel = modelsToTry[i];
    console.log(`Tentativo di generazione con il modello ${currentModel} (Tentativo ${i + 1}/${modelsToTry.length})...`);
    try {
      const response = await ai.models.generateContent({
        model: currentModel,
        contents: contents,
        config: config
      });
      console.log(`Fatto! Generazione completata usando: ${currentModel}`);
      return response;
    } catch (error: any) {
      lastError = error;
      const errorMsg = error.message || String(error);
      console.warn(`Errore riscontrato con il modello ${currentModel}:`, errorMsg);
      
      if (i < modelsToTry.length - 1) {
        console.log(`Eseguo fallback al prossimo modello tra 500ms...`);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }
  throw lastError;
}

// API route to generate cost estimate
app.post("/api/estimate", rateLimiter, async (req, res) => {
  try {
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
    } = req.body;

    // Validation
    if (workDescription && typeof workDescription === "string" && workDescription.length > 1500) {
      return res.status(400).json({
        error: "La descrizione del lavoro è troppo lunga (massimo 1500 caratteri)."
      });
    }

    const selectedLang = language || "it";
    let langNameFull = "italiana";
    if (selectedLang === "de") langNameFull = "tedesca (German)";
    else if (selectedLang === "fr") langNameFull = "francese (French)";
    else if (selectedLang === "en") langNameFull = "inglese (English)";

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Il codice API di Gemini (GEMINI_API_KEY) non è configurato. Configuralo nei Secrets di AI Studio."
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const targetCountry = countriesList.find(c => c.id === countryCode) || countriesList[0];
    const sectorInfo = sectorPriceLists.find(s => s.id === sectorId) || sectorPriceLists[0];
    const dimsStr = dimensions ? JSON.stringify(dimensions) : "Non specificato";

    // 1. Server-side Economic Calculations for Selected Listino Items
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

        // Pro unit price between min and max based on quality
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
          // DIY calculation
          const matPct = itemDef.materialPct ?? 0.4;
          const waste = itemDef.wastePct ?? 0.1;
          const materialCost = proItemExcl * matPct * (1 + waste);
          const materialVatAmt = materialCost * (materialVat / 100);

          const hoursPerUnit = itemDef.diyHoursPerUnit ?? 2;
          const itemDiyHours = hoursPerUnit * qty * skillFactor * diffFactor;
          totalDiyHours += itemDiyHours;
          const itemDiyDays = Math.max(1, Math.ceil(itemDiyHours / 6));

          // Tools quota
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

    // Min-Max ranges
    const proMinIncl = proTotalIncl * 0.9;
    const proMaxIncl = proTotalIncl * 1.1;
    const diyMinIncl = diyTotalIncl * 0.9;
    const diyMaxIncl = diyTotalIncl * 1.1;
    const estimatedSavings = Math.max(0, proTotalIncl - diyTotalIncl);

    // 2. Gemini AI Call for qualitative insights & estimated items
    const promptText = `
Analizza la richiesta di un privato per il settore "${sectorInfo.name}" in ${targetCountry.name} (${targetCountry.flag}).
Descrizione del lavoro: ${workDescription || "Lavori generali di manutenzione"}
Dimensioni: ${dimsStr}
Difficoltà cantiere: ${siteDifficulty || "media"}

Fornisci in formato JSON (interamente in lingua ${langNameFull}):
1. **additionalItems**: Eventuali voci aggiuntive non coperte dal listino ma deducibili dalla descrizione (es. smaltimento macerie, ponteggi extra, trattamenti preliminari), con stima di quantità, unità, prezzo unitario e source: "stimato".
2. **feasibility**:
   - rating: 'Fattibile', 'Fattibile con riserve', 'Sconsigliato fai da te'
   - analysis: spiegazione semplice per non addetti ai lavori
   - risks: array di rischi principali (es. lavori in quota, muffa, impianti)
   - recommendations: consigli pratici di sicurezza
   - permitsAndRules: permessi o pratiche necessarie in ${targetCountry.name} (es. autorizzazioni condominiali, comunicazioni comunali, certificazioni di conformità)
3. **mainSteps**: Principali passaggi operativi in sequenza logica per fare il lavoro.
4. **estimatedTime**: Tempo stimato in giorni/ore sia per il professionista sia per il fai da te.
5. **diySummaryNote**: Breve nota incoraggiante o di avvertimento sulla convenienza e sicurezza del fai da te per questo specifico lavoro.
`;

    const response = await generateContentWithFallback(ai, promptText, {
      systemInstruction: `Sei l'esperto di stime edili per privati di Preventivatore Edile.
Il tuo compito è aiutare un utente non esperto a capire se può fare un lavoro da solo (Fai da Te) o se deve chiamare un professionista, evidenziando i rischi, i permessi normativi del paese (${targetCountry.name}), i passaggi del lavoro e le voci extra stimate.
Rispondi SEMPRE in formato JSON rigoroso secondo lo schema richiesto, nella lingua ${langNameFull}.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          additionalItems: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                item: { type: Type.STRING },
                quantity: { type: Type.NUMBER },
                unit: { type: Type.STRING },
                unitPrice: { type: Type.NUMBER },
                source: { type: Type.STRING }
              },
              required: ["item", "quantity", "unit", "unitPrice", "source"]
            }
          },
          feasibility: {
            type: Type.OBJECT,
            properties: {
              rating: { type: Type.STRING },
              analysis: { type: Type.STRING },
              risks: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
              permitsAndRules: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["rating", "analysis", "risks", "recommendations", "permitsAndRules"]
          },
          mainSteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          estimatedTime: { type: Type.STRING },
          diySummaryNote: { type: Type.STRING }
        },
        required: ["additionalItems", "feasibility", "mainSteps", "estimatedTime", "diySummaryNote"]
      }
    });

    const resultText = response.text;
    let aiInsights: any = {};
    if (resultText) {
      try {
        aiInsights = JSON.parse(resultText.trim());
      } catch (e) {
        console.warn("Impossibile parsare la risposta JSON di Gemini:", e);
      }
    }

    // Recalculate additional items on server
    const processedAdditionalItems = (aiInsights.additionalItems || []).map((add: any) => {
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

    res.json({
      success: true,
      country: targetCountry,
      sector: sectorInfo.name,
      mode: mode || "compare",
      professionalEstimate: {
        totalExcl: Math.round(proTotalExcl * 100) / 100,
        totalIncl: Math.round(proTotalIncl * 100) / 100,
        minIncl: Math.round(proMinIncl * 100) / 100,
        maxIncl: Math.round(proMaxIncl * 100) / 100
      },
      diyEstimate: {
        totalExcl: Math.round(diyTotalExcl * 100) / 100,
        totalIncl: Math.round(diyTotalIncl * 100) / 100,
        minIncl: Math.round(diyMinIncl * 100) / 100,
        maxIncl: Math.round(diyMaxIncl * 100) / 100,
        estimatedHours: Math.round(totalDiyHours * 10) / 10,
        estimatedDays: Math.max(1, Math.ceil(totalDiyHours / 6))
      },
      estimatedSavings: Math.round(estimatedSavings * 100) / 100,
      daAffidareAProfessionista,
      listinoBreakdown: detailedBreakdown,
      additionalItems: processedAdditionalItems,
      feasibility: aiInsights.feasibility || {},
      mainSteps: aiInsights.mainSteps || [],
      estimatedTime: aiInsights.estimatedTime || "Non specificato",
      diySummaryNote: aiInsights.diySummaryNote || ""
    });

  } catch (error: any) {
    console.error("Errore durante la stima del costo:", error);
    res.status(500).json({
      error: "Errore durante il calcolo della stima: " + (error.message || error)
    });
  }
});

// Serve assets in production and let Vite handle dev mode
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
