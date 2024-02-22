import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import fileUploader from "express-fileupload";
import morgan from "morgan";
import ViteExpress from "vite-express";
import { connectToDatabase } from "./db.ts";
import authRouter from "./routers/auth.routes.ts";
import recipeRouter from "./routers/recipes.routes.ts";
import userRouter from "./routers/users.routes.ts";

dotenv.config();
const app = express();

app.use(
    morgan("dev", { skip: (req, res) => !req.originalUrl.startsWith("/api") }),
);
app.use(cookieParser());
app.use(express.json());
app.use(fileUploader());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/", recipeRouter);
app.use("/api/", userRouter);

try {
    connectToDatabase();
    ViteExpress.listen(app, 3000, () => {
        console.log("Server is running on http://localhost:3000");
    });
}
catch (error) {
    console.error(error);
}
