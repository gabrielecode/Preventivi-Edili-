import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { sectorPriceLists } from "./src/data/priceLists";
import { countriesList } from "./src/data/countries";
import { UpstashRedisLeadStore } from "./server-lib/leadStore";
import { calculateEstimate, generateWithFallback } from "./server-lib/ai";
import { checkRateLimit, getClientIp } from "./server-lib/ratelimit";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Rate limiter middleware for local dev
async function rateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = getClientIp(req);
  const result = await checkRateLimit(ip);
  if (!result.success) {
    return res.status(429).json({
      error: "Troppe richieste effettuate da questo indirizzo IP. Riprova più tardi (limite: 10 richieste all'ora)."
    });
  }
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

const leadStore = new UpstashRedisLeadStore();

// API route to submit quote requests from professionals (leads)
app.post("/api/leads", rateLimiter, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      location,
      notes,
      privacyConsent,
      website,
      estimateSummary
    } = req.body;

    if (website && typeof website === "string" && website.trim() !== "") {
      return res.json({ success: true, message: "Richiesta registrata con successo." });
    }

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Il nome è obbligatorio." });
    }
    if (name.length > 100) {
      return res.status(400).json({ error: "Il nome è troppo lungo (massimo 100 caratteri)." });
    }

    if (!email || typeof email !== "string" || email.trim() === "") {
      return res.status(400).json({ error: "L'indirizzo email è obbligatorio." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 150) {
      return res.status(400).json({ error: "Indirizzo email non valido." });
    }

    if (phone && (typeof phone !== "string" || phone.length > 30)) {
      return res.status(400).json({ error: "Numero di telefono non valido." });
    }

    if (!location || typeof location !== "string" || location.trim() === "") {
      return res.status(400).json({ error: "Il CAP o la città sono obbligatori." });
    }
    if (location.length > 100) {
      return res.status(400).json({ error: "La località è troppo lunga (massimo 100 caratteri)." });
    }

    if (notes && typeof notes === "string" && notes.length > 1000) {
      return res.status(400).json({ error: "Le note sono troppo lunghe (massimo 1000 caratteri)." });
    }

    if (privacyConsent !== true) {
      return res.status(400).json({ error: "È necessario accettare il consenso privacy esplicito per inviare la richiesta." });
    }

    const leadRecord = {
      id: "lead_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      location: location.trim(),
      notes: notes ? notes.trim() : undefined,
      privacyConsent: true,
      estimateSummary: estimateSummary || {
        sector: "Generale",
        description: "Non specificata",
        professionalCostMin: 0,
        professionalCostMax: 0,
        diyCostMin: 0,
        diyCostMax: 0,
        country: "Italia",
        language: "it"
      }
    };

    await leadStore.save(leadRecord);

    res.json({
      success: true,
      message: "Richiesta inviata con successo.",
      leadId: leadRecord.id
    });
  } catch (err: any) {
    console.error("Errore salvataggio lead:", err);
    res.status(500).json({ error: "Errore interno durante il salvataggio della richiesta: " + (err.message || err) });
  }
});

// API route to export leads
app.get("/api/leads/export", async (req, res) => {
  const authHeader = req.headers.authorization;
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    return res.status(501).json({ error: "ADMIN_TOKEN non è configurato sul server." });
  }

  if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
    return res.status(401).json({ error: "Non autorizzato. Token Bearer mancante o non valido." });
  }

  try {
    const leads = await leadStore.getAll();
    res.json({ success: true, count: leads.length, leads });
  } catch (err: any) {
    console.error("Errore export lead:", err);
    res.status(500).json({ error: "Errore interno durante l'esportazione dei lead: " + (err.message || err) });
  }
});

// API route to generate cost estimate
app.post("/api/estimate", rateLimiter, async (req, res) => {
  try {
    const result = await calculateEstimate(req.body);
    res.json(result);
  } catch (error: any) {
    console.error("Errore durante la stima del costo:", error);
    res.status(500).json({
      error: "Errore durante il calcolo della stima: " + (error.message || error)
    });
  }
});

// API route to analyze room photos with AI vision
app.post("/api/analyze-photos", rateLimiter, async (req, res) => {
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

    let cleanJson = aiResponse.text.trim();
    if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    }
    const parsedResult = JSON.parse(cleanJson);

    res.json({
      success: true,
      modelUsed: aiResponse.modelUsed,
      analysis: parsedResult
    });

  } catch (error: any) {
    console.error("Errore durante l'analisi delle foto:", error);
    res.status(500).json({
      error: "Errore durante l'analisi delle foto: " + (error.message || error)
    });
  }
});

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
    console.log(`Server running on http://localhost:${PORT} (Local dev using shared server-lib)`);
  });
}

start();
