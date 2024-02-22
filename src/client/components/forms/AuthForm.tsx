import type { UserForRegister } from "@/types/user";
import { useFormik } from "formik";
import { useEffect } from "react";
import { Alert, Button, Card, Form, Input } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type Props = {
    type: "login" | "register";
};

function AuthForm({ type = "login" }: Props) {
    const { signUp, signIn, isAuthenticated, errors } = useAuth();
    const navigate = useNavigate();
    const formik = useFormik<UserForRegister>({
        initialValues: {
            username: "",
            password: "",
            email: "",
        },
        onSubmit: async (values) => {
            if (type === "login") {
                await signIn(values);
            }
            else {
                await signUp(values);
            }
        },
    });

    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated]);

    return (
        <Card className="flex-shrink-0 w-96 max-w-sm shadow-2xl bg-base-100">
            <Card.Body>
                <Form onSubmit={formik.handleSubmit}>
                    {errors.length > 0 && (
                        <Alert status="error">
                            <ul className="list-disc list-inside">
                                {errors.map((error, i) => (
                                    <li key={i}>{error}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}

                    <Form.Label title="Email" htmlFor="email" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="example@gmail.com"
                        className={"input-bordered"}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />

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
                            />
                        </>
                    )}

                    <Form.Label title="Password" htmlFor="password" />
                    <Input
                        id="password"
                        type="password"
                        placeholder="secret-password-22"
                        className={"input-bordered"}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />

                    <Button type="submit" className="mt-8">
                        {type === "login" ? "Login" : "Register"}
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default AuthForm;
