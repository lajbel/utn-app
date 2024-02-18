import { Hero } from "react-daisyui";
import { Link } from "react-router-dom";

function LandPage() {
    return (
        <Hero>
            <Hero.Content className="flex-col items-start">
                <h1 className="text-5xl font-bold">
                    <span className="text-primary">Share</span>, your food as
                    you <span className="text-secondary">feel it</span>.
                </h1>
                <p className="text-lg">
                    An app to share your food with the world. Share your
                    recipes, your creations, and your love for food.
                </p>
                <nav className="flex flex-wrap gap-4">
                    <Link
                        to="/register"
                        className="btn btn-primary btn-wide btn-lg"
                    >
                        Sing up
                    </Link>
                    <Link
                        to="/login"
                        className="btn btn-secondary btn-wide btn-lg"
                    >
                        Log in
                    </Link>
                </nav>
            </Hero.Content>
        </Hero>
    );
}

export default LandPage;
