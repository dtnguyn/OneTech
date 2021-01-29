import Redis from "ioredis";

const ONE_DAY = 60 * 60 * 24;

export async function checkRateLimit(
  limit: number,
  redis: Redis.Redis,
  userId: string,
  request: string
) {
  const key = `rate-limit:${userId}:${request}`;
  const current = await redis.incr(key);

  if (current > limit) throw new Error("You have exceeded the rate limit ");
  if (current === 1) await redis.expire(key, ONE_DAY);
}
