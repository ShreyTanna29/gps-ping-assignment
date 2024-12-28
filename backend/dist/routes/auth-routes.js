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
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
// on frontend auth is handled by google provider, so we need only login route as of now.
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // as on frontend I am using google provider for auth, so no need of password.
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "All creadentials are required." });
        }
        if (email === "admin@admin" && password === "admin") {
            yield prisma.user.upsert({
                where: {
                    email: "admin@admin",
                },
                update: {},
                create: {
                    email: "admin@admin",
                    password: "admin",
                    name: "admin",
                },
            });
            return res.status(200).json({ message: "success" });
        }
        // checking if email exits
        const userExists = yield prisma.user.findUnique({
            where: { email },
        });
        if (!userExists) {
            return res.status(400).json({
                message: "user with this email does not exists, please sign up",
            });
        }
        if (userExists.password === password) {
            return res.status(200).json({ message: "success" });
        }
    }
    catch (error) {
        console.log("auth-routes :: error :: ", error);
        res.status(500).json("Internal server error");
    }
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res
                .status(400)
                .json({ message: "All creadentials are required." });
        }
        const user = yield prisma.user.create({
            data: {
                email,
                name: username,
                password,
            },
        });
        if (user) {
            return res.status(200).json("Success");
        }
    }
    catch (error) {
        console.log("====================================");
        console.log("authroutes :: ", error);
        console.log("====================================");
        res.status(500).json("Internal server error");
    }
}));
exports.default = router;
