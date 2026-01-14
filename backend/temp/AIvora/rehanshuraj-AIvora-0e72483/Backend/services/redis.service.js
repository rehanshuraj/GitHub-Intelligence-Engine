import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: "default", // hardcode for safety
  password: process.env.REDIS_PASSWORD,
  lazyConnect: true,
  maxRetriesPerRequest: 1,
  retryStrategy: () => null, // stop infinite retry
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error:", err.message);
});

await redis.connect(); // IMPORTANT

export default redis;
