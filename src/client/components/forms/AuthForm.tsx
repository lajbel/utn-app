import { loginSchema, registerSchema } from "@/schemas/authSchema";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useEffect } from "react";
import { Button, Card, Form, Input, Loading } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { cn } from "../../lib/util";
import FormErrors from "./FormErrors";

type Props = {
    type: "login" | "register";
};

function AuthForm({ type = "login" }: Props) {
    const { signUp, signIn, isAuthenticated, errors } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const formik = useFormik<z.infer<typeof registerSchema>>({
        initialValues: {
            username: "",
            password: "",
            email: "",
        },
        validate: withZodSchema(
            type === "login" ? loginSchema : registerSchema,
        ),
        onSubmit: async (values) => {
            if (type === "login") {
                await signIn(values);
            }
            else {
                await signUp(values);
            }
        },
    });

    const formikErrors = () => {
        return [
            ...Object.values(formik.errors),
        ];
    };

    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated]);

    useEffect(() => {
        errors.forEach(addToast);
    }, [errors]);

    return (
        <Card className="flex-shrink-0 w-96 max-w-sm shadow-2xl bg-base-100">
            <Card.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <FormErrors errors={formikErrors} />

                    {type === "register" && (
                        <>
                            <Form.Label title="Username" htmlFor="username" />
                            <Input
                                id="username"
                                type="text"
                                placeholder="markbeans"
                                className="input-bordered"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                required
                            />
                        </>
                    )}

                    <Form.Label title="Email" htmlFor="email" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="example@gmail.com"
                        className={"input-bordered"}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        required
                    />

                    <Form.Label title="Password" htmlFor="password" />
                    <Input
                        id="password"
                        type="password"
                        placeholder="secret-password-22"
                        className={"input-bordered"}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        required
                    />

                    <Button
                        type="submit"
                        className={cn("mt-4 btn-primary")}
                        disabled={formik.isSubmitting || !formik.isValid}
                    >
                        {type === "login" ? "Login" : "Register"}
                        {formik.isSubmitting && <Loading />}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default AuthForm;
