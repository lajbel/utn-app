import { CreateRecipe, Recipe } from "@/types/recipe";
import {
    createContext,
    PropsWithChildren,
    useContext,
    useState,
} from "react";
import {
    createRecipeRequest,
    deleteRecipeRequest,
    getRecipeRequest,
    getRecipesRequest,
    updateRecipeRequest,
} from "../api/recipes";

const RecipeContext = createContext({});

export const useRecipes = () => {
    const context = useContext(RecipeContext);
    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider");
    }
    return context;
};

export function TaskProvider({ children }: PropsWithChildren) {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const getRecipes = async () => {
        const res = await getRecipesRequest();
        setRecipes(res.data);
    };

    const deleteRecipes = async (id: string) => {
        try {
            const res = await deleteRecipeRequest(id);
            if (res.status === 204) {
                setRecipes(recipes.filter((recipe) => recipe._id !== id));
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const createRecipe = async (task: CreateRecipe) => {
        try {
            const res = await createRecipeRequest(task);
            console.log(res.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    const getRecipe = async (id: string) => {
        try {
            const res = await getRecipeRequest(id);
            return res.data;
        }
        catch (error) {
            console.error(error);
        }
    };

    const updateRecipe = async (task: Partial<CreateRecipe>) => {
        try {
            await updateRecipeRequest(task);
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <RecipeContext.Provider
            value={{
                recipes,
                getRecipes,
                deleteRecipes,
                createRecipe,
                getRecipe,
                updateRecipe,
            }}
        >
            {children}
        </RecipeContext.Provider>
    );
}
