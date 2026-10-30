import type { VercelRequest, VercelResponse } from "@vercel/node";
import { UpstashRedisLeadStore } from "../server-lib/leadStore.js";
import { LeadRecord } from "../server-lib/types.js";
import { checkRateLimit, getClientIp } from "../server-lib/ratelimit.js";

export const config = {
  maxDuration: 30,
};

const leadStore = new UpstashRedisLeadStore();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({
        error: { code: "METHOD_NOT_ALLOWED", message: `Method ${req.method} Not Allowed` }
      });
    }

    const ip = getClientIp(req);
    const rateLimitResult = await checkRateLimit(ip);
    if (!rateLimitResult.success) {
      return res.status(429).json({
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Troppe richieste effettuate da questo indirizzo IP. Riprova più tardi (limite: 10 richieste all'ora)."
        }
      });
    }

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
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "Il nome è obbligatorio." } });
    }
    if (name.length > 100) {
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "Il nome è troppo lungo (massimo 100 caratteri)." } });
    }

    if (!email || typeof email !== "string" || email.trim() === "") {
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "L'indirizzo email è obbligatorio." } });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 150) {
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "Indirizzo email non valido." } });
    }

    if (phone && (typeof phone !== "string" || phone.length > 30)) {
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "Numero di telefono non valido." } });
    }

    if (!location || typeof location !== "string" || location.trim() === "") {
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "Il CAP o la città sono obbligatori." } });
    }
    if (location.length > 100) {
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "La località è troppo lunga (massimo 100 caratteri)." } });
    }

    if (notes && typeof notes === "string" && notes.length > 1000) {
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "Le note sono troppo lunghe (massimo 1000 caratteri)." } });
    }

    if (privacyConsent !== true) {
      return res.status(400).json({ error: { code: "VALIDATION_ERROR", message: "È necessario accettare il consenso privacy esplicito per inviare la richiesta." } });
    }

    const leadRecord: LeadRecord = {
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

    return res.json({
      success: true,
      message: "Richiesta inviata con successo.",
      leadId: leadRecord.id
    });
  } catch (err: any) {
    console.error("Errore salvataggio lead:", err);
    return res.status(500).json({
      error: {
        code: err.code || "INTERNAL_SERVER_ERROR",
        message: "Errore interno durante il salvataggio della richiesta."
      }
    });
  }
}
