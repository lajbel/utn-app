import { Hero } from "react-daisyui";
import AuthForm from "../components/forms/AuthForm";

type Props = {
    type: "login" | "register";
};

function AuthPage({ type }: Props) {
    return (
        <Hero className="flex-1">
            <Hero.Content className="items-center justify-center">
                <AuthForm type={type} />
            </Hero.Content>
        </Hero>
    );
}

export default AuthPage;
