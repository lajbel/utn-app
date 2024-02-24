import { Recipe } from "@/types/recipe";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeRequest } from "../api/recipes";

function RecipePage() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        getRecipeRequest(id!).then((res) => {
            if (res.data) {
                setRecipe(res.data.recipe);
            }
        });
    }, [id]);

    return (
        <div className="max-w-6xl w-full h-full">
            <header className="flex flex-col max-w-6xl w-full relative">
                <img
                    src={recipe?.portraitImage}
                    alt={recipe?.title}
                    className="w-full h-56 object-cover rounded-none filter brightness-50"
                />

                <div className="p-4 rounded-t-lg w-full h-full absolute text-white flex flex-col justify-end gap-2">
                    <h1 className="text-3xl font-bold">{recipe?.title}</h1>
                    <p className="text-lg">{recipe?.summary}</p>
                </div>
            </header>

            <main className="p-4">
                <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: recipe?.content! }}
                >
                </div>
            </main>
        </div>
    );
}

export default RecipePage;
