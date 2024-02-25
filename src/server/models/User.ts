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
            default:
                "https://firebasestorage.googleapis.com/v0/b/utn-app-74c14.appspot.com/o/DefaultAvatar.png?alt=media&token=6364b743-a85a-4417-b9e7-f257fef6ce7f",
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
