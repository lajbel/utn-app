import { RecipeInDB } from "@/server/models/Recipe";
import { useEffect, useState } from "react";
import { getUserRecipesRequest } from "../api/recipes";
import RecipeCard, { NewRecipeCard } from "../components/recipes/RecipeCard";
import { useAuth } from "../context/AuthContext";

function RecipesPage() {
    const { user } = useAuth();
    const [recipes, setRecipes] = useState<RecipeInDB[]>([]);

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
            <div
                className="grid gap-8"
                style={{
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(300px, 1fr))",
                }}
            >
                {recipes?.map((recipe) => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
                <NewRecipeCard />
            </div>
        </div>
    );
}

export default RecipesPage;
