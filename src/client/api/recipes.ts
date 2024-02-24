import { CreateRecipe, Recipe } from "@/types/recipe";
import axios from "./axios";

const BASE_URL = "/recipes";

export const getRecipesRequest = async () => {
    return axios.get(BASE_URL);
};

export const createRecipeRequest = async (recipe: CreateRecipe) => {
    // intead of json, we are sending form data
    const formData = new FormData();

    for (const key in recipe) {
        // @ts-ignore
        formData.append(key, recipe[key]);
    }

    return axios.post(BASE_URL, formData);
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

export const getUserRecipesRequest = async (id: string) => {
    return axios.get(`${BASE_URL}/user/${id}`);
};
