import mongoose from "mongoose";

export function connectToDatabase() {
    mongoose.connect("mongodb://localhost:27017/utn-mongo").then(() => {
        console.info("Connected to the database");
    });
}

export default mongoose;
