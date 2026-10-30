import type { VercelRequest, VercelResponse } from "@vercel/node";
import { countriesList } from "../src/data/countries";

export const config = {
  maxDuration: 10,
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  return res.json(countriesList);
}
