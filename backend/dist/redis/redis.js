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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("@upstash/redis");
const redis_2 = require("redis");
const generic_pool_1 = require("generic-pool");
const redis = new redis_1.Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
const factory = {
    create: () => __awaiter(void 0, void 0, void 0, function* () {
        const client = (0, redis_2.createClient)();
        yield client.connect();
        return client;
    }),
    destroy: (client) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.quit();
    }),
};
const redisPool = (0, generic_pool_1.createPool)(factory, {
    min: 5,
    max: 50,
    acquireTimeoutMillis: 5000,
});
exports.default = redis;
