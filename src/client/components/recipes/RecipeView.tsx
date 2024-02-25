import { RecipeInDB } from "@/server/models/Recipe";
import RecipeTag from "./RecipeTag";

type Props = {
    recipe?: RecipeInDB;
};

const RecipeView: React.FC<Props> = ({ recipe }) => {
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
                    <div className="flex gap-1">
                        {recipe?.tags.map((t, i) => (
                            <RecipeTag key={i} name={t} />
                        ))}
                    </div>
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
};

export default RecipeView;
