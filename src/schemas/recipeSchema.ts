import { z } from "zod";
import { userSchema } from "./authSchema.ts";

const errorMsg = {
    title_required: "A valid title is required.",
    sum_required: "A valid summary is required.",
    sum_min: "Summary must be at least 10 characters long.",
    sum_max: "Summary must be at most 30 characters long.",
};

export const recipeTags = z.enum([
    "vegetarian",
    "vegan",
    "gluten-free",
    "dairy-free",
    "low-carb",
    "high-protein",
    "low-fat",
    "low-calorie",
    "healthy",
    "quick",
    "easy",
    "cheap",
]);

export const baseRecipeSchema = z.object({
    title: z.string(),
    summary: z.string(),
    content: z.string(),
    tags: z.array(recipeTags),
    portraitImage: z.string(),
    user: userSchema,
    isPublic: z.boolean(),
});

export const recipeSchema = baseRecipeSchema;

export const recipeCreationSchema = baseRecipeSchema.extend({
    title: z.string({
        required_error: errorMsg.title_required,
    }),
    summary: z.string({
        required_error: errorMsg.sum_required,
    }).min(10, {
        message: errorMsg.sum_min,
    }).max(150, {
        message: errorMsg.sum_max,
    }),
    user: userSchema.optional(),
    portraitImage: z.instanceof(File).optional(),
    tags: z.array(recipeTags).optional(),
    isPublic: z.boolean().optional(),
});
