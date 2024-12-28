import { Redis } from "@upstash/redis";
import { createClient } from "redis";
import { createPool } from "generic-pool";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
const factory = {
  create: async () => {
    const client = createClient();
    await client.connect();
    return client;
  },
  destroy: async (client: any) => {
    await client.quit();
  },
};

const redisPool = createPool(factory, {
  min: 5,
  max: 50,
  acquireTimeoutMillis: 5000,
});
export default redis;
