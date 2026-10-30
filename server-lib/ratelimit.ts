import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const requestLog = new Map<string, number[]>();

let upstashRatelimit: Ratelimit | null = null;
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;
if (url && token) {
  try {
    const redis = new Redis({ url, token });
    upstashRatelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(10, "1 h"),
      analytics: true,
      prefix: "preventivatore_ratelimit",
    });
  } catch (e) {
    console.warn("Failed to init Upstash Ratelimit, using in-memory fallback:", e);
  }
}

export async function checkRateLimit(ip: string): Promise<{ success: boolean; limit?: number; remaining?: number; reset?: number }> {
  if (upstashRatelimit) {
    try {
      const result = await upstashRatelimit.limit(ip);
      return {
        success: result.success,
        limit: result.limit,
        remaining: result.remaining,
        reset: result.reset
      };
    } catch (err) {
      console.error("Upstash rate limit error, falling back to in-memory:", err);
    }
  }

  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 10;

  let timestamps = requestLog.get(ip) || [];
  timestamps = timestamps.filter(t => now - t < windowMs);

  if (timestamps.length >= maxRequests) {
    return { success: false, limit: maxRequests, remaining: 0 };
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return { success: true, limit: maxRequests, remaining: maxRequests - timestamps.length };
}

export function getClientIp(req: any): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    const ips = typeof forwarded === "string" ? forwarded.split(",") : forwarded;
    return ips[0].trim();
  }
  return req.socket?.remoteAddress || req.connection?.remoteAddress || "127.0.0.1";
}
