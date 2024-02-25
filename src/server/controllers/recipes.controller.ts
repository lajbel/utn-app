import {
    CreateRecipeRequest,
    DeleteRecipeRequest,
    GetRecipeRequest,
    GetRecipesRequest,
    GetUserRecipesRequest,
    UpdateRecipeRequest,
} from "@/types/recipe.ts";
import { getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { uploadImage } from "../firebase.ts";
import { resInternalServerError } from "../lib/responses.ts";
import RecipeModel from "../models/Recipe.ts";

export const createRecipe: CreateRecipeRequest = async (req, res) => {
    const { title, content, summary, tags } = req.body;
    const portraitImage = req.files?.portraitImage;

    try {
        let uploadedPortraitImageURL =
            "https://firebasestorage.googleapis.com/v0/b/utn-app-74c14.appspot.com/o/DefaultRecipe.png?alt=media&token=8d822e06-cd3f-4300-ba5c-28590d8b2271";

        if (portraitImage) {
            if (Array.isArray(portraitImage)) {
                return res.status(400).json({
                    message: "Please upload only an image",
                });
            }

            const uploadedImage = await uploadImage(
                portraitImage,
                `recipes/${v4()}`,
            );

            uploadedPortraitImageURL = await getDownloadURL(
                uploadedImage.ref,
            );
        }

        // Save recipe to database
        const newRecipe = await new RecipeModel({
            title,
            content,
            portraitImage: uploadedPortraitImageURL,
            summary,
            tags: tags,
            user: req.user.id,
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
            recipes: recipes.map((recipe) => recipe.toObject()),
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
        const recipe = await RecipeModel.findById(id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found",
            });
        }

        const populatedRecipe = await recipe?.populate(
            "user",
            "username profilePhoto",
        );

        res.status(200).json({
            message: "Recipe fetched successfully",
            recipe: populatedRecipe.toObject(),
        });
    }
    catch (e) {
        console.log(e);
        resInternalServerError(res);
    }
};

export const updateRecipe: UpdateRecipeRequest = async (req, res) => {
    const { title, content, summary, tags } = req.body;
    const { id } = req.params;
    const portraitImage = req.files?.portraitImage;
    const user = req.user;

    try {
        const recipe = await RecipeModel.findById(id);

        if (!recipe) {
            return res.status(404).json({
                message: "Recipe not found",
            });
        }

        if (recipe.user.toString() !== user.id) {
            return res.status(403).json({
                message: "You are not authorized to update this recipe",
            });
        }

        let uploadedPortraitImageURL = recipe.portraitImage;

        if (portraitImage) {
            if (Array.isArray(portraitImage)) {
                return res.status(400).json({
                    message: "Please upload only an image",
                });
            }

            const uploadedImage = await uploadImage(
                portraitImage,
                `recipes/${v4()}`,
            );

            uploadedPortraitImageURL = await getDownloadURL(
                uploadedImage.ref,
            );
        }

        const updatedRecipe = {
            title,
            content,
            portraitImage: uploadedPortraitImageURL,
            summary,
            tags: tags,
        };

        const updatedRecipeInDB = await RecipeModel.findByIdAndUpdate(
            id,
            updatedRecipe,
            { new: true },
        );

        res.status(200).json({
            message: "Recipe updated successfully",
            recipe: updatedRecipeInDB?.toObject(),
        });
    }
    catch (e) {
        console.log(e);
        resInternalServerError(res);
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

        if (recipe.user.toString() !== req.user.id) {
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

export const getUserRecipes: GetUserRecipesRequest = async (req, res) => {
    try {
        const recipes = await RecipeModel.find({
            user: req.user.id,
        }).populate("user", "username profilePhoto");

        res.status(200).json({
            message: "Recipes fetched successfully",
            recipes: recipes.map((recipe) => recipe.toObject()),
        });
    }
    catch (e) {
        console.log(e);
        resInternalServerError(res);
    }
};
