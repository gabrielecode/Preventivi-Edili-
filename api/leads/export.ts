import type { VercelRequest, VercelResponse } from "@vercel/node";
import { UpstashRedisLeadStore } from "../../server-lib/leadStore.js";

export const config = {
  maxDuration: 30,
};

const leadStore = new UpstashRedisLeadStore();

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

    const leads = await leadStore.getAll();
    return res.json({ success: true, count: leads.length, leads });
  } catch (err: any) {
    console.error("Errore export lead:", err);
    return res.status(500).json({
      error: {
        code: err.code || "INTERNAL_SERVER_ERROR",
        message: "Errore interno durante l'esportazione dei lead."
      }
    });
  }
}
