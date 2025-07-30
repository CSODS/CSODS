import { createClient } from "redis";

async function startRedis() {
  const redisClient = createClient({
    url: process.env.REDIS_DATABASE_URL,
  });

  redisClient.on("error", function (err) {
    console.log("Redis Client Error");
    throw err;
  });

  await redisClient.connect();
  return redisClient;
}

export { startRedis };
