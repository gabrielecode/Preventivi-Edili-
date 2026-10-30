import type { VercelRequest, VercelResponse } from "@vercel/node";
import { analyzePhotos } from "../server-lib/ai";
import { checkRateLimit, getClientIp } from "../server-lib/ratelimit";

export const config = {
  maxDuration: 300,
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
    const result = await analyzePhotos(req.body);
    return res.json(result);
  } catch (error: any) {
    console.error("Errore durante l'analisi delle foto:", error);
    const status = error.statusCode || 500;
    return res.status(status).json({
      error: error.message || "Errore durante l'analisi delle foto."
    });
  }
}
