import { RecipeInDB } from "@/server/models/Recipe";
import {
    faBook,
    faPencil,
    faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "react-daisyui";
import { Link } from "react-router-dom";
import RecipeTag from "./RecipeTag";

type Props = {
    recipe: RecipeInDB;
};

export const RecipeCard: React.FC<Props> = ({ recipe }) => {
    const {
        title,
        summary,
        portraitImage,
        tags,
        user,
        isPublic,
    } = recipe;

    return (
        <Card className="bg-base-100 w-full shadow-xl" compact>
            <Card.Image
                src={portraitImage}
                alt="Recipe image"
                className="object-cover min-h-80 w-full bg-base-200"
            />
            <Card.Body>
                <h2 className="text-xl font-bold text-balance">
                    {title}
                </h2>
                <p>
                    {summary}
                </p>
                <div className="flex gap-1">
                    {tags?.map((t, i) => (
                        i < 2 && <RecipeTag key={i} name={t} />
                    ))}
                </div>

                {!isPublic && (
                    <Link
                        className="btn btn-ghost w-fit"
                        to={`/profile/${user?._id}`}
                    >
                        <img
                            src={user?.profilePhoto}
                            alt="Daniel"
                            className="w-6 h-6 rounded-full"
                        />
                        By {user?.username}
                    </Link>
                )}

                <div className="card-actions join gap-0">
                    <Link
                        className="btn btn-primary flex-1 join-item"
                        to={`/recipe/${recipe._id}`}
                    >
                        <FontAwesomeIcon icon={faBook} />
                        Read
                    </Link>
                    <Link
                        className="btn btn-warning join-item"
                        to={`/edit/${recipe._id}`}
                    >
                        <FontAwesomeIcon icon={faPencil} />
                        Manage
                    </Link>
                </div>
            </Card.Body>
        </Card>
    );
};

export const NewRecipeCard: React.FC = () => {
    return (
        <Card className="bg-base-100 w-full shadow-xl" compact>
            <div className="object-cover min-h-80 w-full bg-base-200" />
            <Card.Body className="items-center justify-center">
                <Link
                    className="btn btn-ghost w-full h-full"
                    to="/create"
                >
                    <span className="sr-only">
                        Create a new recipe
                    </span>
                    <FontAwesomeIcon
                        icon={faPlusCircle}
                        className="text-4xl"
                    />
                </Link>
            </Card.Body>
        </Card>
    );
};

export default RecipeCard;
