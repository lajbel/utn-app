import { RecipeInDB } from "@/server/models/Recipe";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipeRequest } from "../api/recipes";
import RecipeView from "../components/recipes/RecipeView";
import { LoadingDots } from "../routes";

function RecipePage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<RecipeInDB | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getRecipeRequest(id!).then((res) => {
            if (res.data) {
                setLoading(false);
                setRecipe(res.data.recipe);
            }
        }).catch((err) => {
            navigate("/404");
            setLoading(false);
        });
    }, [id]);

    return (
        <>
            {loading ? <LoadingDots /> : <RecipeView recipe={recipe} />}
        </>
    );
}

export default RecipePage;
