import { Recipe } from "@/types/recipe";
import { useEffect, useState } from "react";
import { getUserRecipesRequest } from "../api/recipes";
import RecipeCard from "../components/recipes/RecipeCard";
import { useAuth } from "../context/AuthContext";

function RecipesPage() {
    const { user } = useAuth();
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        if (user) {
            getUserRecipesRequest(user._id).then((res) => {
                if (res.data) {
                    setRecipes(res.data.recipes);
                }
            });
        }
    }, [user]);

    return (
        <div className="flex flex-col min-h-full min-w-full p-8">
            <div className="flex gap-4 py-4">
                {recipes?.map((recipe) => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}

export default RecipesPage;
