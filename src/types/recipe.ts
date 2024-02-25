import {
    recipeCreationSchema,
    recipeSchema,
    recipeTags,
} from "@/schemas/recipeSchema.ts";
import { RecipeInDB } from "@/server/models/Recipe.ts";
import { RequestHandler } from "express";
import { z } from "zod";
import { ErrorResponse, Response } from "./responses.ts";

export type RecipeTags = z.infer<typeof recipeTags>;
export type Recipe = z.infer<typeof recipeSchema>;
export type RecipeCreation = z.infer<typeof recipeCreationSchema>;

// Response
export type RecipeResponse = Response<{ recipe: RecipeInDB }>;
export type RecipesResponse = Response<{ recipes: RecipeInDB[] }>;

// Requests
export type CreateRecipeRequest = RequestHandler<
    {},
    RecipeResponse | ErrorResponse,
    RecipeCreation
>;

export type GetRecipesRequest = RequestHandler<
    {},
    RecipesResponse
>;

export type GetRecipeRequest = RequestHandler<
    { id: string },
    RecipeResponse | ErrorResponse
>;

export type UpdateRecipeRequest = RequestHandler<
    { id: string },
    RecipeResponse | ErrorResponse,
    Partial<Recipe>
>;

export type DeleteRecipeRequest = RequestHandler<
    { id: string },
    RecipeResponse | ErrorResponse
>;

export type GetUserRecipesRequest = RequestHandler<
    { id: string },
    RecipesResponse | ErrorResponse
>;
