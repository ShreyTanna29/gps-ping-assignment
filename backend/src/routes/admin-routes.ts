import express, { Request, Response } from "express";
import { ping } from "../mongoDB/model";
import redisClient from "../redis/redis";

const router = express.Router();

router.get(
  "/get-all-pings",
  async (req: Request, res: Response): Promise<any> => {
    // // getting cached data from redis
    // const cacheKeys = await redisClient.keys("ping:*");
    // const groupedPings = new Map();

    // // Take only the latest 100 keys
    // const limitedKeys = cacheKeys.slice(-100);

    // // Group Redis data by email
    // for (const key of limitedKeys) {
    //   const email = key.split(":")[1];
    //   const data = await redisClient.get(key);
    //   const coordinates = typeof data === "string" ? JSON.parse(data) : data;

    //   if (!groupedPings.has(email)) {
    //     groupedPings.set(email, {
    //       email,
    //       cordinates: [],
    //       createdAt: new Date().toISOString(),
    //       updatedAt: new Date().toISOString(),
    //     });
    //   }

    //   groupedPings.get(email).cordinates.push({
    //     lat: coordinates.latitude,
    //     long: coordinates.longitude,
    //     _id: key,
    //   });
    // }

    // if (groupedPings.size) {
    //   return res.json(Array.from(groupedPings.values()));
    // }

    // fallback to mongoDB if no cache
    const pings = await ping.find({}).limit(100).sort({ createdAt: -1 });

    console.log(String(pings));
    return res.status(200).json(pings);
  }
);

export default router;
