import type * as express from "express";
import type { Recipe, User } from "./Models.ts";
import {
    LoginReponse,
    RecipeResponse,
    RecipesResponse,
    RegisterResponse,
} from "./Responses.ts";

// Auth Requests
export type RegisterRequest = express.RequestHandler<
    {},
    RegisterResponse,
    User
>;
export type LoginRequest = express.RequestHandler<
    {},
    LoginReponse,
    User
>;
export type VerifyRequest = express.RequestHandler<
    {},
    LoginReponse,
    User
>;

// Recipe Requests
export type CreateRecipeRequest = express.RequestHandler<
    {},
    RecipeResponse,
    Omit<Recipe, "user">
>;

export type GetRecipesRequest = express.RequestHandler<
    {},
    RecipesResponse,
    {}
>;

export type GetRecipeRequest = express.RequestHandler<
    { id: string },
    RecipeResponse,
    {}
>;

export type UpdateRecipeRequest = express.RequestHandler<
    { id: string },
    RecipeResponse,
    Omit<Recipe, "user">
>;

export type DeleteRecipeRequest = express.RequestHandler<
    { id: string },
    RecipeResponse,
    {}
>;
