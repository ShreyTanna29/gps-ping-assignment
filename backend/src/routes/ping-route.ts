import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ping } from "../mongoDB/model";
import redisClient from "../redis/redis";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/ping", async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, longitude, latitude } = req.body;

    if (!email || !longitude || !latitude) {
      return res
        .status(400)
        .json({ message: "Request has missing parameters." });
    }

    // const userExists = await prisma.user.findUnique({
    //   where: { email },
    // });

    // if (!userExists) {
    //   return res.status(401).json("Unauthorized.");
    // }

    // caching data to redis
    const timestamp = new Date().toISOString();
    // const pingKey = `ping:${email}:${timestamp}`;

    // const pingData = {
    //   latitude,
    //   longitude,
    //   timestamp,
    // };
    // await redisClient.set(pingKey, JSON.stringify(pingData));
    // await redisClient.expire(pingKey, 24 * 60 * 60);

    // Storing data in MongoDB

    const bulkOps = {
      updateOne: {
        filter: { email },
        update: {
          $push: {
            locations: {
              $each: [{ longitude, latitude, timestamp }],
              $position: 0,
              $slice: 1000,
            },
          },
        },
        upsert: true,
      },
    };

    await ping.bulkWrite([bulkOps], { ordered: false });
    return res.status(200).json("Ping recevied and stored.");
  } catch (error) {
    console.log("ping-route :: ", error);
    return res.status(500).json("Internal server error");
  }
});

export default router;
