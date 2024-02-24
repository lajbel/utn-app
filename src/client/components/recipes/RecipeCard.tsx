import { Recipe } from "@/types/recipe";
import { faBook, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-daisyui";
import { Link } from "react-router-dom";
import RecipeTag from "./RecipeTag";

type Props = {
    recipe: Recipe;
};

function RecipeCard({ recipe }: Props) {
    const {
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
                className="max-h-70 object-cover w-full shadow-inner aspect-square"
            />
            <Card.Body>
                <h2 className="text-xl font-bold text-balance">
                    {title}
                </h2>
                <p>
                    {summary}
                </p>
                <div className="flex gap-1">
                    {/** @ts-ignore */}
                    {tags.split(",").map((t: any) => (
                        <RecipeTag key={t} name={t} />
                    ))}
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

                <div className="card-actions">
                    <Link
                        className="btn btn-primary flex-1"
                        to={`/recipe/${recipe._id}`}
                    >
                        <FontAwesomeIcon icon={faBook} />
                        Read
                    </Link>
                    <Link
                        className="btn btn-warning"
                        to={`/edit/${recipe._id}`}
                    >
                        <FontAwesomeIcon icon={faPencil} />
                        Manage
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
}

export default RecipeCard;
