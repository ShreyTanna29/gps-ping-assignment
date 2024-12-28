import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import AuthRoute from "./routes/auth-routes";
import AdminRoutes from "./routes/admin-routes";
import GPSPingRoute from "./routes/ping-route";
import connectDB from "./mongoDB/db";

dotenv.config();

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));
app.set("timeout", 120000);
app.use(cors());

try {
  connectDB();
  console.log("Connected to mongo database");
} catch (error) {
  console.log("Unable to connect to database");
}

app.use("/api/v1/auth", AuthRoute);
app.use("/api/v1/", GPSPingRoute);
app.use("/api/v1/admin", AdminRoutes);

app.listen(port, () => {
  console.log("server is listening on port 5000");
});
