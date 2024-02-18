import { Recipe, User } from "./Models.ts";

export type OE<T> = T | ErrorResponse;

export type BaseResponse = {
    message: string;
};

export type ErrorResponse = {
    errors?: string[];
} & BaseResponse;

export type RegisterResponse =
    & OE<{
        user: Omit<User, "password">;
    }>
    & BaseResponse;

export type LoginReponse = RegisterResponse;

// Recipe Responses
export type RecipeResponse =
    & OE<{
        recipe: Recipe;
    }>
    & BaseResponse;

export type RecipesResponse =
    & OE<{
        recipes: Recipe[];
    }>
    & BaseResponse;
