import { Redis } from "@upstash/redis";
import fs from "fs";
import path from "path";
import { LeadRecord, LeadStore } from "./types";

export class UpstashRedisLeadStore implements LeadStore {
  private redis: Redis | null = null;
  private localFallbackPath: string;

  constructor() {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (url && token) {
      try {
        this.redis = new Redis({ url, token });
      } catch (e) {
        console.warn("Failed to initialize Upstash Redis, falling back to local storage:", e);
      }
    }
    this.localFallbackPath = path.join(process.cwd(), "leads.json");
  }

  async save(lead: LeadRecord): Promise<void> {
    if (this.redis) {
      try {
        // Save with 90 days TTL (7776000 seconds)
        await this.redis.set(`lead:${lead.id}`, JSON.stringify(lead), { ex: 7776000 });
        await this.redis.sadd("leads:index", lead.id);
        return;
      } catch (err) {
        console.error("Upstash save error, falling back to local:", err);
      }
    }

    let leads: LeadRecord[] = [];
    try {
      if (fs.existsSync(this.localFallbackPath)) {
        leads = JSON.parse(fs.readFileSync(this.localFallbackPath, "utf-8"));
      }
    } catch (e) {
      leads = [];
    }
    leads.push(lead);
    fs.writeFileSync(this.localFallbackPath, JSON.stringify(leads, null, 2), "utf-8");
  }

  async getAll(): Promise<LeadRecord[]> {
    if (this.redis) {
      try {
        const leadIds = await this.redis.smembers("leads:index");
        if (!leadIds || leadIds.length === 0) return [];
        const leads: LeadRecord[] = [];
        for (const id of leadIds) {
          const data = await this.redis.get(`lead:${id}`);
          if (data) {
            if (typeof data === "string") {
              leads.push(JSON.parse(data));
            } else {
              leads.push(data as LeadRecord);
            }
          }
        }
        return leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } catch (err) {
        console.error("Upstash getAll error, falling back to local:", err);
      }
    }

    try {
      if (fs.existsSync(this.localFallbackPath)) {
        return JSON.parse(fs.readFileSync(this.localFallbackPath, "utf-8"));
      }
    } catch (e) {}
    return [];
  }
}
