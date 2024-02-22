import type { Recipe } from "@/types/recipe.ts";
import { Model, SchemaTypes } from "mongoose";
import mongoose from "../db.ts";

export type RecipeModel = Model<Recipe>;

const RecipeSchema = new mongoose.Schema<Recipe, RecipeModel>(
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

const RecipeModel = mongoose.model<Recipe, RecipeModel>("Recipe", RecipeSchema);
export default RecipeModel;
