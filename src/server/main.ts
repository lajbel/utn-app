import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import fileUploader from "express-fileupload";
import ViteExpress from "vite-express";
import { PORT } from "./config.ts";
import { connectToDatabase } from "./db.ts";
import { connectToFirebase } from "./firebase.ts";
import authRouter from "./routers/auth.routes.ts";
import recipeRouter from "./routers/recipes.routes.ts";
import userRouter from "./routers/users.routes.ts";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(fileUploader());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/users", userRouter);

try {
    connectToDatabase();
    connectToFirebase();
    ViteExpress.listen(app, PORT, () => {
        console.log("Server is running on http://localhost:3000");
    });
}
catch (error) {
    console.error(error);
}
