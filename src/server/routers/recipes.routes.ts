import { Router } from "express";

const router = Router();

router.post("/recipes", (req, res) => {
    res.send("Create a recipe");
});

router.get("/recipes", (req, res) => {
    res.send("Get all recipes");
});

router.get("/recipes/:id", (req, res) => {
    res.send("Get a recipe");
});

router.put("/recipes/:id", (req, res) => {
    res.send("Update a recipe");
});

router.delete("/recipes/:id", (req, res) => {
    res.send("Delete a recipe");
});

export default router;
