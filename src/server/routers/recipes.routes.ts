import { Router } from "express";
import * as recipesController from "../controllers/recipes.controller.ts";
import { verifyAuth } from "../middlewares/verifyAuth.ts";

const router = Router();

router.post(
    "/recipes",
    verifyAuth,
    recipesController.createRecipe,
);

router.get(
    "/recipes",
    verifyAuth,
    recipesController.getRecipes,
);

router.get(
    "/recipes/user/:id",
    verifyAuth,
    recipesController.getUserRecipes,
);

router.get(
    "/recipes/:id",
    verifyAuth,
    recipesController.getRecipe,
);

router.put(
    "/recipes/:id",
    verifyAuth,
    recipesController.updateRecipe,
);

router.delete(
    "/recipes/:id",
    verifyAuth,
    recipesController.deleteRecipe,
);

export default router;
