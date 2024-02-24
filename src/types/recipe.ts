import type * as express from "express";
import type { OE } from "./responses.ts";
import type { MongooseSchema } from "./utils.ts";

export type RecipeTags =
    | "vegetarian"
    | "vegan"
    | "gluten-free"
    | "dairy-free"
    | "low-carb"
    | "high-protein"
    | "low-fat"
    | "low-calorie"
    | "healthy"
    | "quick"
    | "easy"
    | "cheap";

export type Recipe = MongooseSchema<{
    title: string;
    summary: string;
    content: string;
    tags: RecipeTags[];
    portraitImage: string;
    user: any;
    isPublic: boolean;
}>;

export type CreateRecipe =
    & Omit<
        Recipe,
        "user" | "_id" | "createdAt" | "updatedAt" | "portraitImage"
    >
    & { portraitImage: File };

// Response
export type RecipeResponse = OE<{ recipe: Recipe }>;
export type RecipesResponse = OE<{ recipes: Recipe[] }>;

// Requests
export type CreateRecipeRequest = express.RequestHandler<
    {},
    RecipeResponse,
    CreateRecipe
>;

export type GetRecipesRequest = express.RequestHandler<{}, RecipesResponse>;

export type GetRecipeRequest = express.RequestHandler<
    { id: string },
    RecipeResponse
>;

export type UpdateRecipeRequest = express.RequestHandler<
    { id: string },
    RecipeResponse,
    Partial<CreateRecipe>
>;

export type DeleteRecipeRequest = express.RequestHandler<
    { id: string },
    RecipeResponse
>;

export type GetUserRecipesRequest = express.RequestHandler<
    { id: string },
    RecipesResponse
>;
