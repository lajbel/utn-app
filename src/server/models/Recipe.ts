import type { Recipe } from "@/types/Models.ts";
import { SchemaTypes } from "mongoose";
import mongoose from "../db.ts";

export type IRecipe = Recipe & mongoose.Document;

const RecipeSchema = new mongoose.Schema<Recipe>(
    {
        title: {
            type: SchemaTypes.String,
            required: true,
        },
        content: {
            type: SchemaTypes.String,
            required: true,
        },
        portraitImage: {
            type: SchemaTypes.String,
            required: true,
        },
        summary: {
            type: SchemaTypes.String,
            required: true,
        },
        tags: {
            type: SchemaTypes.Mixed,
            required: true,
        },
        user: {
            type: SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const RecipeModel = mongoose.model<Recipe>("Recipe", RecipeSchema);
export default RecipeModel;
