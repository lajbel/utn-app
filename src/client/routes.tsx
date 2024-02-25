import { Loading } from "react-daisyui";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export const LoadingDots = () => {
    return (
        <span className="loading loading-dots loading-lg text-primary"></span>
    );
};

export const OnlyAuthenticated = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <LoadingDots />;
    }
    else if (!isAuthenticated && !loading) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export const OnlyNotAuthenticated = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <LoadingDots />;
    }
    else if (isAuthenticated && !loading) {
        return <Navigate to="/recipes" replace />;
    }

    return <Outlet />;
};
