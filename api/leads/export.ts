import type { VercelRequest, VercelResponse } from "@vercel/node";
import { UpstashRedisLeadStore } from "../../server-lib/leadStore";

export const config = {
  maxDuration: 30,
};

const leadStore = new UpstashRedisLeadStore();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

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
    return res.json({ success: true, count: leads.length, leads });
  } catch (err: any) {
    console.error("Errore export lead:", err);
    return res.status(500).json({ error: "Errore interno durante l'esportazione dei lead: " + (err.message || err) });
  }
}
