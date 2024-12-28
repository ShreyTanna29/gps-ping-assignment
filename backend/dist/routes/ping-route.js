"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const model_1 = require("../mongoDB/model");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/ping", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield model_1.ping.bulkWrite([bulkOps], { ordered: false });
        return res.status(200).json("Ping recevied and stored.");
    }
    catch (error) {
        console.log("ping-route :: ", error);
        return res.status(500).json("Internal server error");
    }
}));
exports.default = router;
