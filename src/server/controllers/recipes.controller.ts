import {
    CreateRecipeRequest,
    DeleteRecipeRequest,
    GetRecipeRequest,
    GetRecipesRequest,
    UpdateRecipeRequest,
} from "@/types/recipe.ts";
import { resInternalServerError } from "../lib/responses.ts";
import RecipeModel from "../models/Recipe.ts";

export const createRecipe: CreateRecipeRequest = async (req, res) => {
    const { title, content, portraitImage, summary, tags } = req.body;

    if (!title || !content || !portraitImage || !summary || !tags) {
        return res.status(400).json({
            message: "Please enter all fields",
        });
    }

    try {
        const newRecipe = await new RecipeModel({
            title,
            content,
            portraitImage,
            summary,
            tags,
            user: req.user._id,
        }).save();

        res.status(200).json({
            message: "Recipe created successfully",
            recipe: newRecipe.toObject(),
        });
    }
    catch (e) {
        console.log(e);
        resInternalServerError(res);
    }
};

export const getRecipes: GetRecipesRequest = async (req, res) => {
    try {
        const recipes = await RecipeModel.find().populate(
            "user",
            "username profilePhoto",
        );

        res.status(200).json({
            message: "Recipes fetched successfully",
            recipes: recipes,
        });
    }
    catch (e) {
        console.log(e);
        resInternalServerError(res);
    }
};

export const getRecipe: GetRecipeRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await RecipeModel.findById(id).populate(
            "user",
            "username profilePhoto",
        );

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found",
            });
        }

        res.status(200).json({
            message: "Recipe fetched successfully",
            recipe: recipe.toObject(),
        });
    }
    catch (e) {
        console.log(e);
        resInternalServerError(res);
    }
};

export const updateRecipe: UpdateRecipeRequest = async (req, res) => {
    const { title, content, portraitImage, summary, tags } = req.body;
    const { id } = req.params;
    const user = req.user;

    if (!title || !content || !portraitImage || !summary || !tags) {
        return res.status(400).json({
            message: "Please enter fields",
        });
    }

    try {
        const recipe = await RecipeModel.findOneAndUpdate({
            _id: id,
            user: user._id,
        }, {
            title,
            content,
            portraitImage,
            summary,
            tags,
        });

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found",
            });
        }

        res.status(200).json({
            message: "Recipe updated successfully",
            recipe: recipe.toObject(),
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

export const deleteRecipe: DeleteRecipeRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await RecipeModel.findById(id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found",
            });
        }

        if (recipe.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this recipe",
            });
        }

        await recipe.deleteOne();

        res.status(200).json({
            message: "Recipe deleted successfully",
        });
    }
    catch (e) {
        console.log(e);
        return resInternalServerError(res);
    }
};
