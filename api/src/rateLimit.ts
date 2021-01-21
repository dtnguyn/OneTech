import { RedisClient } from "redis";

const ONE_DAY = 60 * 60 * 24;

export async function checkRateLimit(
  limit: number,
  redis: RedisClient,
  userId: string,
  request: string
) {
  await new Promise((resolve, reject) => {
    const key = `rate-limit:${userId}:${request}`;
    redis.incr(key, async (err, currentRate) => {
      console.log(err, currentRate);
      if (err) reject(err);
      if (currentRate > limit)
        reject(new Error("You have exceeded the rate limit "));
      if (currentRate === 1) await redis.expire(key, ONE_DAY);
      resolve(true);
    });
  });
}
