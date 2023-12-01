import { ReactNode, createContext, useCallback, useState } from "react";
import type { ToastProps } from "../../types";
import ToastContainer from "./ToastContainer";

interface ContextType {
    addToast: (options: ToastProps) => void;
    removeToast: (id: number) => void;
}

export const ToastContext = createContext<ContextType>({} as ContextType);

let id = 1;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const addToast = useCallback(
        (options: ToastProps) => {
            setToasts((toasts) => [...toasts, { ...options, id: id++ }]);
        },
        [setToasts]
    );

    const removeToast = useCallback(
        (id: number) => {
            setToasts((toasts) => toasts.filter((t) => t.id !== id));
        },
        [setToasts]
    );

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            <ToastContainer toasts={toasts} />
            {children}
        </ToastContext.Provider>
    );
};
