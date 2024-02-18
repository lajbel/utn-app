import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const OnlyAuthenticated = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <p>loading</p>;
    }
    else if (!isAuthenticated && !loading) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export const OnlyNotAuthenticated = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <p>loading</p>;
    }
    else if (isAuthenticated && !loading) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
