import { sectorPriceLists, toolsCatalog, PriceItem } from "../src/data/priceLists";
import { countriesList } from "../src/data/countries";

export async function generateWithFallback(messages: Array<any>, options: {
  temperature?: number;
  max_tokens?: number;
  jsonSchema?: any;
  schemaName?: string;
  systemInstruction?: string;
  models?: string[];
  isVision?: boolean;
}): Promise<{ text: string; raw: any; modelUsed: string }> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY non è configurata nelle variabili d'ambiente.");
  }

  const hasImages = messages.some(m => Array.isArray(m.content) && m.content.some((c: any) => c.type === 'image_url'));
  const isVision = options.isVision || hasImages;

  const defaultPrimary = isVision
    ? (process.env.OPENROUTER_MODEL_VISION_PRIMARY || "google/gemini-2.0-flash-001")
    : (process.env.OPENROUTER_MODEL_TEXT_PRIMARY || "deepseek/deepseek-chat");
  const defaultSecondary = isVision
    ? (process.env.OPENROUTER_MODEL_VISION_SECONDARY || "openai/gpt-4o-mini")
    : (process.env.OPENROUTER_MODEL_TEXT_SECONDARY || "openai/gpt-4o-mini");
  const defaultTertiary = isVision
    ? (process.env.OPENROUTER_MODEL_VISION_TERTIARY || "google/gemini-flash-1.5")
    : (process.env.OPENROUTER_MODEL_TEXT_TERTIARY || "google/gemini-2.0-flash-001");

  const primaryModel = options.models?.[0] || defaultPrimary;
  const secondaryModel = options.models?.[1] || defaultSecondary;
  const tertiaryModel = options.models?.[2] || defaultTertiary;

  const modelsToTry = [primaryModel, secondaryModel, tertiaryModel];
  let lastError: any = null;

  let fullMessages = [...messages];
  if (options.systemInstruction) {
    fullMessages = [
      { role: "system", content: options.systemInstruction },
      ...messages
    ];
  }

  for (let i = 0; i < modelsToTry.length; i++) {
    const currentModel = modelsToTry[i];
    console.log(`[OpenRouter] Tentativo con il modello ${currentModel} (Tentativo ${i + 1}/${modelsToTry.length})...`);

    let responseFormat: any = undefined;
    if (options.jsonSchema) {
      responseFormat = {
        type: "json_schema",
        json_schema: {
          name: options.schemaName || "response_schema",
          strict: false,
          schema: options.jsonSchema
        }
      };
    }

    let success = false;
    let data: any = null;

    for (let formatAttempt = 0; formatAttempt < 2; formatAttempt++) {
      if (formatAttempt === 1 && responseFormat?.type === "json_schema") {
        console.log(`[OpenRouter] Fallback a response_format: json_object per ${currentModel}...`);
        responseFormat = { type: "json_object" };
      }

      const requestBody: any = {
        model: currentModel,
        messages: fullMessages,
      };
      if (options.temperature !== undefined) requestBody.temperature = options.temperature;
      if (options.max_tokens !== undefined) requestBody.max_tokens = options.max_tokens;
      if (responseFormat) requestBody.response_format = responseFormat;

      const headers: Record<string, string> = {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      };
      if (process.env.APP_URL) {
        headers["HTTP-Referer"] = process.env.APP_URL;
      }
      headers["X-Title"] = "Preventivatore Edile AI";

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 45000);

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
          if ((res.status === 400 || res.status === 422) && responseFormat?.type === "json_schema" && formatAttempt === 0) {
            console.warn(`[OpenRouter] Modello ${currentModel} non supporta json_schema (status ${res.status}), riprovo con json_object.`);
            continue;
          }
          throw new Error(`OpenRouter API error (status ${res.status}): ${errText}`);
        }

        data = await res.json();
        success = true;
        break;
      } catch (err: any) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          lastError = new Error(`Timeout di 45 secondi scaduto per il modello ${currentModel}`);
        } else {
          lastError = err;
        }
        if (formatAttempt === 0 && responseFormat?.type === "json_schema") {
          continue;
        }
        break;
      }
    }

    if (success && data) {
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        lastError = new Error(`Risposta vuota da OpenRouter per il modello ${currentModel}`);
      } else {
        return {
          text: content,
          raw: data,
          modelUsed: currentModel
        };
      }
    }

    console.warn(`[OpenRouter] Errore riscontrato con il modello ${currentModel}:`, lastError?.message || lastError);

    if (i < modelsToTry.length - 1) {
      console.log(`[OpenRouter] Eseguo fallback al prossimo modello tra 500ms...`);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  throw lastError || new Error("Tutti i modelli OpenRouter hanno fallito la generazione.");
}

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
    throw new Error("La descrizione del lavoro è troppo lunga (massimo 1500 caratteri).");
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

  const proMinIncl = proTotalIncl * 0.9;
  const proMaxIncl = proTotalIncl * 1.1;
  const diyMinIncl = diyTotalIncl * 0.9;
  const diyMaxIncl = diyTotalIncl * 1.1;
  const estimatedSavings = Math.max(0, proTotalIncl - diyTotalIncl);

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

  const messages = [
    { role: "user", content: promptText }
  ];

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

  const textPrimary = process.env.OPENROUTER_MODEL_TEXT_PRIMARY || "deepseek/deepseek-chat";
  const textSecondary = process.env.OPENROUTER_MODEL_TEXT_SECONDARY || "openai/gpt-4o-mini";
  const textTertiary = process.env.OPENROUTER_MODEL_TEXT_TERTIARY || "google/gemini-2.0-flash-001";

  const aiResponse = await generateWithFallback(messages, {
    systemInstruction: `Sei l'esperto di stime edili per privati di Preventivatore Edile.
Il tuo compito è aiutare un utente non esperto a capire se può fare un lavoro da solo (Fai da Te) o se deve chiamare un professionista, evidenziando i rischi, i permessi normativi del paese (${targetCountry.name}), i passaggi del lavoro e le voci extra stimate.
Rispondi SEMPRE in formato JSON rigoroso secondo lo schema richiesto, nella lingua ${langNameFull}.`,
    jsonSchema,
    schemaName: "estimate_schema",
    models: [textPrimary, textSecondary, textTertiary]
  });

  const resultText = aiResponse.text;
  let aiInsights: any = {};
  if (resultText) {
    try {
      let cleanJson = resultText.trim();
      if (cleanJson.startsWith("```")) {
        cleanJson = cleanJson.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
      }
      aiInsights = JSON.parse(cleanJson);
    } catch (e) {
      console.warn("Impossibile parsare la risposta JSON da OpenRouter:", e);
    }
  }

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

  const finalProMinIncl = proTotalIncl * 0.9;
  const finalProMaxIncl = proTotalIncl * 1.1;
  const finalEstimatedSavings = Math.max(0, proTotalIncl - diyTotalIncl);

  return {
    success: true,
    country: targetCountry,
    sector: sectorInfo.name,
    mode: mode || "compare",
    modelUsed: aiResponse.modelUsed,
    professionalEstimate: {
      totalExcl: Math.round(proTotalExcl * 100) / 100,
      totalIncl: Math.round(proTotalIncl * 100) / 100,
      minIncl: Math.round(finalProMinIncl * 100) / 100,
      maxIncl: Math.round(finalProMaxIncl * 100) / 100
    },
    diyEstimate: {
      totalExcl: Math.round(diyTotalExcl * 100) / 100,
      totalIncl: Math.round(diyTotalIncl * 100) / 100,
      minIncl: Math.round(diyMinIncl * 100) / 100,
      maxIncl: Math.round(diyMaxIncl * 100) / 100,
      estimatedHours: Math.round(totalDiyHours * 10) / 10,
      estimatedDays: Math.max(1, Math.ceil(totalDiyHours / 6))
    },
    estimatedSavings: Math.round(finalEstimatedSavings * 100) / 100,
    daAffidareAProfessionista,
    listinoBreakdown: detailedBreakdown,
    additionalItems: processedAdditionalItems,
    feasibility: aiInsights.feasibility || {},
    mainSteps: aiInsights.mainSteps || [],
    estimatedTime: aiInsights.estimatedTime || "Non specificato",
    diySummaryNote: aiInsights.diySummaryNote || ""
  };
}
