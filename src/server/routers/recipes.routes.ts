import { recipeCreationSchema } from "@/schemas/recipeSchema.ts";
import { Router } from "express";
import * as recipesController from "../controllers/recipes.controller.ts";
import { bodyFormDataToJSON } from "../middlewares/bodyFormData.ts";
import { validateMongoId } from "../middlewares/validateMongoId.ts";
import { validateSchema } from "../middlewares/validateSchema.ts";
import { verifyAuth } from "../middlewares/verifyAuth.ts";

const router = Router();

router.post(
    "/",
    verifyAuth,
    bodyFormDataToJSON,
    validateSchema(recipeCreationSchema),
    recipesController.createRecipe,
);

router.get(
    "/",
    verifyAuth,
    recipesController.getRecipes,
);

router.get(
    "/user/:id",
    verifyAuth,
    validateMongoId,
    recipesController.getUserRecipes,
);

router.get(
    "/:id",
    verifyAuth,
    validateMongoId,
    recipesController.getRecipe,
);

router.put(
    "/:id",
    verifyAuth,
    validateMongoId,
    recipesController.updateRecipe,
);

router.delete(
    "/:id",
    verifyAuth,
    validateMongoId,
    recipesController.deleteRecipe,
);

export default router;
