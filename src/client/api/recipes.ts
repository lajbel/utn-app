import { RecipeCreation, RecipeResponse } from "@/types/recipe";
import { toFormData } from "axios";
import axios from "./axios";

const BASE_URL = "/recipes";

export const getRecipesRequest = async () => {
    return axios.get(BASE_URL);
};

export const createRecipeRequest = async (
    recipe: RecipeCreation,
) => {
    return axios.post(BASE_URL, toFormData(recipe));
};

export const updateRecipeRequest = async (
    id: string,
    recipe: Partial<RecipeCreation>,
) => {
    return axios.put(`${BASE_URL}/${id}`, recipe);
};

export const deleteRecipeRequest = async (id: string) => {
    return axios.delete(`${BASE_URL}/${id}`);
};

export const getRecipeRequest = async (id: string) => {
    return axios.get<RecipeResponse>(`${BASE_URL}/${id}`);
};

export const getUserRecipesRequest = async (id: string) => {
    return axios.get(`${BASE_URL}/user/${id}`);
};
