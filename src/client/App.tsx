import { Route, Routes } from "react-router-dom";
import Navigator from "./components/navigation/Navigator";
import AuthPage from "./pages/AuthPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import LandPage from "./pages/LandPage";
import ProfilePage from "./pages/ProfilePage";
import RecipesPage from "./pages/RecipesPage";
import { OnlyAuthenticated, OnlyNotAuthenticated } from "./routes";

function App() {
    return (
        <Navigator>
            <Routes>
                <Route
                    path="/"
                    element={<LandPage />}
                />
                <Route element={<OnlyNotAuthenticated />}>
                    <Route
                        path="/login"
                        element={<AuthPage type="login" />}
                    />
                    <Route
                        path="/register"
                        element={<AuthPage type="register" />}
                    />
                </Route>
                <Route element={<OnlyAuthenticated />}>
                    <Route
                        path="/profile"
                        element={<ProfilePage />}
                    />
                    <Route
                        path="/recipes"
                        element={<RecipesPage />}
                    />
                    <Route
                        path="/create"
                        element={<CreateRecipePage />}
                    />
                </Route>
            </Routes>
        </Navigator>
    );
}

export default App;
