import { CreateRecipe, Recipe } from "@/types/recipe";
import axios from "./axios";

const BASE_URL = "/tasks";

export const getRecipesRequest = async () => {
    return axios.get(BASE_URL);
};

export const createRecipeRequest = async (recipe: CreateRecipe) => {
    return axios.post(BASE_URL, recipe);
};

export const updateRecipeRequest = async (recipe: Partial<Recipe>) => {
    return axios.put(`${BASE_URL}/${recipe._id}`, recipe);
};

export const deleteRecipeRequest = async (id: string) => {
    return axios.delete(`${BASE_URL}/${id}`);
};

export const getRecipeRequest = async (id: string) => {
    return axios.get(`${BASE_URL}/${id}`);
};
