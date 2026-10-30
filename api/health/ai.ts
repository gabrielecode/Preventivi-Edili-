import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAiHealthStatus } from "../../server-lib/ai.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({
        error: { code: "METHOD_NOT_ALLOWED", message: `Method ${req.method} Not Allowed` }
      });
    }

    const authHeader = req.headers.authorization;
    const adminToken = process.env.ADMIN_TOKEN;

    if (!adminToken) {
      return res.status(501).json({
        error: { code: "CONFIG_MISSING", message: "ADMIN_TOKEN non è configurato sul server." }
      });
    }

    if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
      return res.status(401).json({
        error: { code: "UNAUTHORIZED", message: "Non autorizzato. Token Bearer mancante o non valido." }
      });
    }

    const report = await getAiHealthStatus();
    return res.json(report);
  } catch (error: any) {
    console.error("Errore durante il controllo dello stato della catena AI:", error);
    return res.status(500).json({
      error: {
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: "Errore interno durante il controllo dello stato della catena AI."
      }
    });
  }
}
