import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useState,
} from "react";
import { Alert, Toast } from "react-daisyui";

type ToastContextValue = {
    addToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: PropsWithChildren) => {
    const [toasts, setToasts] = useState<string[]>([]);

    const addToast = (message: string) => {
        setToasts((prev) => [...prev, message]);

        setTimeout(() => {
            setToasts((prev) => prev.slice(1));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <Toast vertical="bottom" horizontal="end">
                {toasts.map((message, index) => (
                    <Alert
                        key={index}
                        status="error"
                    >
                        {message}
                    </Alert>
                ))}
            </Toast>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
