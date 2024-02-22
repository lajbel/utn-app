import type { User } from "@/types/user.ts";
import { Model, SchemaTypes } from "mongoose";
import mongoose from "../db.ts";

export type UserModel = Model<User>;

const UserSchema = new mongoose.Schema<User, UserModel>(
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

const UserModel = mongoose.model<User, UserModel>("User", UserSchema);
export default UserModel;
