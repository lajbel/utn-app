import type { User } from "@/types/Models.ts";
import { SchemaTypes } from "mongoose";
import mongoose from "../db.ts";

export type IUser = User & mongoose.Document;

const UserSchema = new mongoose.Schema<IUser>(
    {
        email: {
            type: SchemaTypes.String,
            required: true,
        },
        password: {
            type: SchemaTypes.String,
            required: true,
        },
        username: {
            type: SchemaTypes.String,
            required: true,
        },
        profilePhoto: {
            type: SchemaTypes.String,
            default: "https://i.imgur.com/W0bDIzJ.png",
        },
        profileDescription: {
            type: SchemaTypes.String,
            default: "Hello, I'm using PancakeSnap! 🥞",
        },
    },
    {
        timestamps: true,
    },
);

const UserModel = mongoose.model<User>("User", UserSchema);
export default UserModel;
