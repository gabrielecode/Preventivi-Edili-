import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateWithFallback } from "../server-lib/ai";
import { sectorPriceLists } from "../src/data/priceLists";
import { checkRateLimit, getClientIp } from "../server-lib/ratelimit";

export const config = {
  maxDuration: 60,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const ip = getClientIp(req);
  const rateLimitResult = await checkRateLimit(ip);
  if (!rateLimitResult.success) {
    return res.status(429).json({
      error: "Troppe richieste effettuate da questo indirizzo IP. Riprova più tardi (limite: 10 richieste all'ora)."
    });
  }

  try {
    const { photos, sectorId, workDescription, language } = req.body;

    if (!photos || !Array.isArray(photos) || photos.length === 0) {
      return res.status(400).json({ error: "Nessuna foto fornita per l'analisi." });
    }
    if (photos.length > 3) {
      return res.status(400).json({ error: "Massimo 3 foto consentite." });
    }

    for (const photo of photos) {
      const url = typeof photo === "string" ? photo : photo.dataUrl;
      if (!url || !url.startsWith("data:image/")) {
        return res.status(400).json({ error: "Formato immagine non valido. Sono accettati solo JPEG, PNG e WebP." });
      }
      const mimeMatch = url.match(/^data:(image\/(jpeg|png|webp));base64,/);
      if (!mimeMatch) {
        return res.status(400).json({ error: "Formato immagine non supportato. Utilizzare JPEG, PNG o WebP." });
      }
    }

    const selectedLang = language || "it";
    let langNameFull = "italiana";
    if (selectedLang === "de") langNameFull = "tedesca (German)";
    else if (selectedLang === "fr") langNameFull = "francese (French)";
    else if (selectedLang === "en") langNameFull = "inglese (English)";

    const sectorInfo = sectorPriceLists.find(s => s.id === sectorId) || sectorPriceLists[0];

    const promptText = `
Analizza le foto fornite per un cantiere nel settore "${sectorInfo.name}".
Descrizione fornita dall'utente: "${workDescription || "Nessuna descrizione"}".

Fornisci un'analisi tecnica in formato JSON rigoroso (nella lingua ${langNameFull}):
1. **visibleState**: Descrizione dello stato visibile di pareti, pavimenti, infissi e superfici.
2. **detectedIssues**: Array di problemi o criticità rilevate (es. presenza di muffa, umidità di risalita, crepe strutturali o d'intonaco, vecchi materiali sospetti come amianto o vecchi impianti).
3. **suggestedDimensions**: Stima approssimativa basata sulle foto per:
   - areaMq: numero stimato di metri quadrati (0 se non stimabile)
   - lengthMl: numero stimato di metri lineari (0 se non stimabile)
   - quantityCad: numero stimato di elementi (0 se non stimabile)
4. **confidence**: Livello di confidenza della stima visiva ('alto', 'medio', 'basso').
5. **recommendations**: Consigli su cosa misurare realmente con il metro e verifiche da compiere.
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

    const aiResponse = await generateWithFallback(messages, {
      systemInstruction: `Sei l'esperto ingegnere edile e perito di Preventivatore Edile. Analizzi le foto dei locali inviate dai clienti per stimare le condizioni, i problemi e le dimensioni approssimative, rispondendo sempre in JSON rigoroso nella lingua ${langNameFull}.`,
      jsonSchema,
      schemaName: "photo_analysis_schema"
    });

    const parsedResult = JSON.parse(aiResponse.text.trim());

    return res.json({
      success: true,
      modelUsed: aiResponse.modelUsed,
      analysis: parsedResult
    });

  } catch (error: any) {
    console.error("Errore durante l'analisi delle foto:", error);
    return res.status(500).json({
      error: "Errore durante l'analisi delle foto: " + (error.message || error)
    });
  }
}
