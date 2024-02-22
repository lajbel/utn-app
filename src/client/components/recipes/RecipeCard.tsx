import { type Recipe } from "@/types/Models";
import { Card } from "react-daisyui";
import RecipeTag from "./RecipeTag";

const exampleImage =
    "https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const exampleRecipe: Recipe = {
    id: "1",
    title: "Cheesecake with strawberries and chocolate",
    summary:
        "A delicious and easy cheesecake recipe with strawberries and chocolate",
    content: "",
    portraitImage: exampleImage,
    tags: ["cheap", "easy"],
    user: {
        id: "1",
        username: "@daniel",
        email: "",
    },
    isPublic: true,
};

function RecipeCard({ recipe = exampleRecipe }) {
    const {
        id,
        title,
        summary,
        portraitImage,
        tags,
        user: { username },
        isPublic,
    } = recipe;

    return (
        <Card className="bg-base-200 max-w-80 shadow-lg" compact>
            <Card.Image
                src={portraitImage}
                alt="Recipe image"
                className="max-h-70 object-cover w-full shadow-inner"
            />
            <Card.Body>
                <h2 className="text-xl font-bold text-balance">
                    {title}
                </h2>
                <p>
                    {summary}
                </p>
                <div className="flex gap-1">
                    {tags.map((t) => <RecipeTag key={t} name={t} />)}
                </div>

                {isPublic && (
                    <a className="btn btn-ghost w-fit" href="/profile">
                        <img
                            src="https://images.unsplash.com/photo-1589119908995-c6837fa14848?q=80&w=2080&auto=format&fit=crop&ixlib=rb-1.2.1&ixid=MnwyMDA0M3wwfDF8c2VhcmNofDEwfHxwaG90by1wYWdlfHx8fHx8fA%3D%3D"
                            alt="Daniel"
                            className="w-6 h-6 rounded-full"
                        />
                        By {username}
                    </a>
                )}
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;
