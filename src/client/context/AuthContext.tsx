import type { LoginUser, RegisterUser, User } from "@/types/Models";
import Cookies from "js-cookie";
import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";
import { useLocation } from "react-router-dom";
import { loginRequest, registerRequest, verifyToken } from "../api/auth";

interface AuthContextData {
    signUp: (user: RegisterUser) => Promise<void>;
    singIn: (user: LoginUser) => Promise<void>;
    logOut: () => void;
    isAuthenticated: boolean;
    errors: string[];
    user: User | undefined;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const location = useLocation();

    const signUp = async (user: RegisterUser) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data.user);
            setIsAuthenticated(true);
        }
        catch (error: any) {
            setErrors(error.response.data.errors);
        }
    };

    const singIn = async (user: LoginUser) => {
        try {
            const res = await loginRequest(user);

            if (res.data.status === 400) {
                setErrors([res.data.message]);
                return;
            }

            setUser(res.data.user);
            setIsAuthenticated(true);
        }
        catch (error: any) {
            setErrors(error.response.data.errors);
        }
    };

    const logOut = () => {
        Cookies.remove("token");
        setUser(undefined);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyToken();
                if (!res.data) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setUser(res.data.user);
                setLoading(false);
            }
            catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
            }
        };

        checkLogin();
    }, []);

    useEffect(() => {
        setErrors([]);
    }, [location]);

    return (
        <AuthContext.Provider
            value={{
                signUp,
                singIn,
                logOut,
                isAuthenticated,
                errors,
                user,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
