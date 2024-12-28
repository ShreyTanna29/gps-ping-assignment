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
const model_1 = require("../mongoDB/model");
const router = express_1.default.Router();
router.get("/get-all-pings", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const pings = yield model_1.ping.find({}).limit(100).sort({ createdAt: -1 });
    console.log(String(pings));
    return res.status(200).json(pings);
}));
exports.default = router;
