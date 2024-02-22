import RecipeCard from "../components/recipes/RecipeCard";
import { useAuth } from "../context/AuthContext";

function RecipesPage() {
    return (
        <div className="flex flex-col min-h-full min-w-full p-8">
            <div className="flex gap-4 py-4">
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
            </div>
        </div>
    );
}

export default RecipesPage;
