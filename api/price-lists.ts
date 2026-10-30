import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sectorPriceLists } from "../src/data/priceLists.js";

export const config = {
  maxDuration: 10,
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({
        error: { code: "METHOD_NOT_ALLOWED", message: `Method ${req.method} Not Allowed` }
      });
    }
    return res.json(sectorPriceLists);
  } catch (error: any) {
    console.error("Error in /api/price-lists:", error);
    return res.status(500).json({
      error: { code: "INTERNAL_SERVER_ERROR", message: "Errore durante il recupero dei listini prezzi." }
    });
  }
}
