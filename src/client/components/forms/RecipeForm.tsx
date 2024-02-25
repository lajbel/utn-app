import { recipeCreationSchema } from "@/schemas/recipeSchema.ts";
import { RecipeInDB } from "@/server/models/Recipe.ts";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { FC, useState } from "react";
import { Badge, Button, FileInput, Form, Input } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { RecipeCreation } from "../../../types/recipe.ts";
import {
    createRecipeRequest,
    deleteRecipeRequest,
    updateRecipeRequest,
} from "../../api/recipes";
import Tiptap from "../../components/inputs/TipTap";
import { useToast } from "../../context/ToastContext.tsx";
import { cn } from "../../lib/util.ts";
import { tags } from "../recipes/RecipeTag.tsx";
import FormErrors from "./FormErrors.tsx";

type Props = {
    type: "create" | "edit";
    recipe?: RecipeInDB;
};

const RecipeForm: FC<Props> = ({ type, recipe: oldRecipe }) => {
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const { addToast } = useToast();

    const formik = useFormik<RecipeCreation>({
        initialValues: {
            title: oldRecipe?.title || "",
            summary: oldRecipe?.summary || "",
            content: oldRecipe?.content || "",
            tags: oldRecipe?.tags || [],
        },
        validate: withZodSchema(recipeCreationSchema),
        onSubmit: async (values) => {
            if (submitting) return;
            setSubmitting(true);

            if (type === "create") {
                const newRecipe = await createRecipeRequest(values);
                navigate(`/recipe/${newRecipe.data?.recipe._id}`);
            }
            else {
                await updateRecipeRequest(oldRecipe?._id!, values);
                navigate(`/recipe/${oldRecipe?._id}`);
            }

            setSubmitting(false);
        },
    });

    const handleDelete = async () => {
        await deleteRecipeRequest(oldRecipe?._id!);
        addToast("Recipe deleted");
        navigate("/recipes");
    };

    const formikErrors = () => {
        return [
            ...Object.values(formik.errors),
        ];
    };

    return (
        <Form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
        >
            <FormErrors errors={formikErrors} />

            <Form.Label title="Title" htmlFor="title" />
            <Input
                id="title"
                type="text"
                placeholder="Cheesecake with strawberries and chocolate"
                className="text-3xl font-bold input-ghost"
                onChange={formik.handleChange}
                value={formik.values.title}
                required
            />

            <Form.Label title="Summary" htmlFor="summary" />
            <Input
                id="summary"
                type="text"
                placeholder="A delicious and easy cheesecake recipe with strawberries and chocolate"
                className="input-ghost"
                onChange={formik.handleChange}
                value={formik.values.summary}
                required
            />

            <Form.Label title="Description" htmlFor="content" />
            <Tiptap
                onChange={(c) => formik.setFieldValue("content", c)}
                content={formik.values.content}
            />

            <Form.Label title="Tags" />
            <Select
                isMulti
                defaultValue={formik.values.tags?.map((t) => ({
                    value: t,
                    label: tags[t as keyof typeof tags],
                }))}
                options={Object.keys(tags).map((t, i) => ({
                    value: t as keyof typeof tags,
                    label: tags[t as keyof typeof tags],
                }))}
                components={{
                    MultiValueContainer: ({ children, innerProps }) => {
                        return (
                            <Badge
                                className="mr-1"
                                color="secondary"
                                size="lg"
                                {...innerProps}
                            >
                                {children}
                            </Badge>
                        );
                    },
                    Control: ({ children, innerProps }) => {
                        return (
                            <div
                                className="input input-bordered flex"
                                {...innerProps}
                            >
                                {children}
                            </div>
                        );
                    },
                }}
                onChange={(tags) =>
                    formik.setFieldValue(
                        "tags",
                        tags?.map((t) => t.value) as any,
                    ) as any}
                required
            />

            <Form.Label
                title="Portrait Image"
                htmlFor="portraitImage"
            />
            <FileInput
                id="portraitImage"
                onChange={(e) => {
                    formik.setFieldValue(
                        "portraitImage",
                        e.target.files?.[0],
                    );
                }}
                accept="image/*"
            />

            <div className="join">
                {type === "create" && (
                    <Button
                        type="submit"
                        className="mt-4 btn-primary flex-1 join-item"
                        disabled={submitting || !formik.isValid
                            || !formik.dirty}
                    >
                        Create Recipe!
                        <span
                            className={cn("ml-2", {
                                "loading text-primary": submitting,
                            })}
                        >
                        </span>
                    </Button>
                )}
                {type === "edit" && (
                    <>
                        <Button
                            type="submit"
                            className="mt-4 btn-primary flex-1 join-item"
                            disabled={submitting || !formik.isValid
                                || !formik.dirty}
                        >
                            <FontAwesomeIcon icon={faSave} />
                            Save Changes
                            <span
                                className={cn("ml-2", {
                                    "loading text-primary": submitting,
                                })}
                            >
                            </span>
                        </Button>
                        <Button
                            type="button"
                            className="mt-4 btn-error flex-1 join-item"
                            onClick={handleDelete}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                            Delete
                        </Button>
                    </>
                )}
            </div>
        </Form>
    );
};

export default RecipeForm;
