import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

export async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);

        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error(error);
    }
}

export default mongoose;
