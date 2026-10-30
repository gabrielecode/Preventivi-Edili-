import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAiHealthStatus } from "../../server-lib/ai";

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
    const report = await getAiHealthStatus();
    return res.json(report);
  } catch (error: any) {
    console.error("Errore durante il controllo dello stato della catena AI:", error);
    return res.status(500).json({
      error: error.message || "Errore interno durante il controllo dello stato della catena AI."
    });
  }
}
