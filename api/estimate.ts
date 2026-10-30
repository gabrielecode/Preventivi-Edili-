import type { VercelRequest, VercelResponse } from "@vercel/node";
import { calculateEstimate } from "../server-lib/ai.js";
import { checkRateLimit, getClientIp } from "../server-lib/ratelimit.js";

export const config = {
  maxDuration: 300,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // 1. Controllo ambiente (Task FIX1)
    const requiredEnv = ["OPENROUTER_API_KEY", "AI_CHAIN_TEXT", "AI_CHAIN_VISION"];
    for (const envVar of requiredEnv) {
      if (!process.env[envVar]) {
        console.error(`Missing environment variable: ${envVar}`);
        return res.status(500).json({ 
          error: { 
            code: "CONFIG_MISSING", 
            message: "Configurazione del server incompleta. Contatta l'amministratore." 
          } 
        });
      }
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({ 
        error: { 
          code: "METHOD_NOT_ALLOWED", 
          message: `Method ${req.method} Not Allowed` 
        } 
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

    const result = await calculateEstimate(req.body);
    return res.json(result);
  } catch (error: any) {
    console.error("Critical error in /api/estimate:", error);
    const status = error.statusCode || 500;
    return res.status(status).json({
      error: {
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message || "Errore imprevisto durante il calcolo della stima."
      }
    });
  }
}
