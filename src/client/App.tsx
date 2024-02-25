import { Route, Routes } from "react-router-dom";
import Navigator from "./components/navigation/Navigator";
import AuthPage from "./pages/AuthPage";
import LandPage from "./pages/LandPage";
import ProfilePage from "./pages/ProfilePage";
import RecipeFormPage from "./pages/RecipeFormPage";
import RecipePage from "./pages/RecipePage";
import RecipesPage from "./pages/RecipesPage";
import { OnlyAuthenticated, OnlyNotAuthenticated } from "./routes";

function App() {
    return (
        <Navigator>
            <Routes>
                <Route element={<OnlyNotAuthenticated />}>
                    <Route
                        path="/"
                        element={<LandPage />}
                    />
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
                        path="/recipes"
                        element={<RecipesPage />}
                    />
                    <Route
                        path="/create"
                        element={<RecipeFormPage type="create" />}
                    />
                    <Route
                        path="/edit/:id"
                        element={<RecipeFormPage type="edit" />}
                    />
                </Route>
                <Route
                    path="/profile/:id"
                    element={<ProfilePage />}
                />
                <Route
                    path="/recipe/:id"
                    element={<RecipePage />}
                />
            </Routes>
        </Navigator>
    );
}

export default App;
