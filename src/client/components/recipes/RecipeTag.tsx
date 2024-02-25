import { RecipeTags } from "@/types/recipe";
import { Badge, BadgeProps } from "react-daisyui";

export const tags: Record<RecipeTags, string> = {
    "vegetarian": "🥦 Vegetarian",
    "vegan": "🌱 Vegan",
    "gluten-free": "🌾 Gluten-Free",
    "dairy-free": "🥛 Dairy-Free",
    "low-carb": "🍞 Low-Carb",
    "high-protein": "🍖 High-Protein",
    "low-fat": "🥑 Low-Fat",
    "low-calorie": "🍽 Low-Calorie",
    "healthy": "👍 Healthy",
    "quick": "⏱ Quick",
    "easy": "👌 Easy",
    "cheap": "💰 Cheap",
};

type Props = BadgeProps & {
    name: RecipeTags;
};

function RecipeTag(props: Props) {
    return (
        <Badge
            className="mr-1"
            color="secondary"
            {...props}
        >
            {tags[props.name]}
        </Badge>
    );
}

export default RecipeTag;
