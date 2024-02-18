import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import { connectToDatabase } from "./db.ts";
import authRouter from "./routers/auth.routes.ts";

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);

try {
    connectToDatabase();
    ViteExpress.listen(app, 3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
}
catch (error) {
    console.error(error);
}
