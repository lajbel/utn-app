import mongoose from "mongoose";
import { MONGODB_URI } from "./config.ts";

export async function connectToDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);

        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error(error);
    }
}

export default mongoose;
