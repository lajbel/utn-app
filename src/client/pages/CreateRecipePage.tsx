import { CreateRecipe } from "@/types/recipe";
import { useFormik } from "formik";
import { useState } from "react";
import { Badge, Button, Card, FileInput, Form, Input } from "react-daisyui";
import Select from "react-select";
import { createRecipeRequest } from "../api/recipes";
import Tiptap from "../components/inputs/TipTap";
import { cn } from "../lib/util.ts";

function CreateRecipePage() {
    const [submitting, setSubmitting] = useState(false);

    const formik = useFormik<CreateRecipe>({
        initialValues: {
            title: "",
            summary: "",
            content: "",
            tags: [],
            isPublic: false,
            portraitImage: new File([], "empty"),
        },
        onSubmit: async (values) => {
            if (submitting) return;
            setSubmitting(true);

            await createRecipeRequest(values);
            setSubmitting(false);
        },
    });

    return (
        <Card className="flex-shrink-0 max-w-5xl shadow-2xl bg-base-100 w-full">
            <Card.Body>
                <Form
                    onSubmit={formik.handleSubmit}
                    encType="multipart/form-data"
                >
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
                    />

                    <Form.Label title="Tags" />
                    <Select
                        isMulti
                        options={[
                            { value: "healthy", label: "👍 Healthy" },
                            { value: "vegan", label: "🌱 Vegan" },
                            { value: "gluten-free", label: "🌾 Gluten-Free" },
                            { value: "dairy-free", label: "🥛 Dairy-Free" },
                            { value: "low-carb", label: "🍞 Low-Carb" },
                            { value: "high-protein", label: "🍖 High-Protein" },
                            { value: "low-fat", label: "🥑 Low-Fat" },
                            { value: "low-calorie", label: "🍽 Low-Calorie" },
                        ]}
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
                                tags.map((tag) => tag.value),
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
                        required
                    />

                    <Button
                        type="submit"
                        className={cn("mt-4 btn-primary", {
                            "btn-disabled": submitting,
                        })}
                    >
                        Create Recipe!
                        <span
                            className={cn("ml-2", {
                                "loading text-primary": submitting,
                            })}
                        >
                        </span>
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default CreateRecipePage;
