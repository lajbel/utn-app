import { RecipeInDB } from "@/server/models/Recipe.ts";
import { Recipe } from "@/types/recipe.ts";
import { FC, useEffect, useState } from "react";
import { Card } from "react-daisyui";
import { useParams } from "react-router-dom";
import { getRecipeRequest } from "../api/recipes.ts";
import RecipeForm from "../components/forms/RecipeForm.tsx";
import { LoadingDots } from "../routes.tsx";

type Props = {
    type: "create" | "edit";
};

const RecipeFormPage: FC<Props> = ({ type }) => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [recipe, setRecipe] = useState<RecipeInDB | undefined>(undefined);

    useEffect(() => {
        if (type === "edit" && id) {
            getRecipeRequest(id).then((res) => {
                if (res.data) {
                    setRecipe(res.data.recipe);
                    setLoading(false);
                }
            });
        }
    }, [id]);

    return (
        <Card className="flex-shrink-0 max-w-5xl shadow-2xl bg-base-100 w-full">
            <Card.Body>
                {type === "create" ? <RecipeForm type="create" /> : (
                    loading
                        ? <LoadingDots />
                        : <RecipeForm type="edit" recipe={recipe} />
                )}
            </Card.Body>
        </Card>
    );
};

export default RecipeFormPage;
