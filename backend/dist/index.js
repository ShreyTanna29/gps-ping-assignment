"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth-routes"));
const admin_routes_1 = __importDefault(require("./routes/admin-routes"));
const ping_route_1 = __importDefault(require("./routes/ping-route"));
const db_1 = __importDefault(require("./mongoDB/db"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
app.use(body_parser_1.default.json());
app.use(express_1.default.json({ limit: "50mb" }));
app.set("timeout", 120000);
app.use((0, cors_1.default)());
try {
    (0, db_1.default)();
    console.log("Connected to mongo database");
}
catch (error) {
    console.log("Unable to connect to database");
}
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/", ping_route_1.default);
app.use("/api/v1/admin", admin_routes_1.default);
app.listen(port, () => {
    console.log("server is listening on port 5000");
});
