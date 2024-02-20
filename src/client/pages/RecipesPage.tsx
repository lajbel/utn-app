import { Card } from "react-daisyui";
import { useAuth } from "../context/AuthContext";

function RecipeCard() {
    return (
        <Card className="bg-base-200 max-w-80" compact>
            <Card.Image
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="Shoes"
            />
            <Card.Body>
                <h2 className="text-3xl font-bold">Recipe 1</h2>
                <p>Recipe description</p>
            </Card.Body>
        </Card>
    );
}

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
