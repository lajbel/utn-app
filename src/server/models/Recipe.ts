import { Recipe } from "@/types/recipe.ts";
import { Model, SchemaTimestampsConfig, SchemaTypes } from "mongoose";
import mongoose from "../db.ts";

export type RecipeInDB = Recipe & SchemaTimestampsConfig & {
    _id: string;
};

const RecipeSchema = new mongoose.Schema<Recipe, Model<Recipe>>(
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
            type: [SchemaTypes.String],
            required: true,
        },
        user: {
            type: SchemaTypes.ObjectId,
            ref: "User",
        },
        isPublic: {
            type: SchemaTypes.Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const RecipeModel = mongoose.model<Recipe, Model<Recipe>>(
    "Recipe",
    RecipeSchema,
);

export default RecipeModel;
