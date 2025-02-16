// src/ToastContext.js
import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
interface ToastProviderProps {
  children: React.ReactNode;
}
interface ToastContextProps {
  toast: (toast: Toast) => void;
}

const ToastContext = createContext<ToastContextProps>({ toast: () => {} });

interface Toast {
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  id?: string;
}
const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Record<string, Toast>>({});
  const toast = (toast: Toast) => {
    const id = Date.now().toString();
    setToasts((prev) => ({
      ...prev,
      [id]: {
        ...toast,
        id,
      },
    }));
    setTimeout(() => {
      setToasts((prev) => {
        const newToasts = { ...prev };
        delete newToasts[id];
        return newToasts;
      });
    }, 5000);
  };
  return (
    <ToastContext.Provider
      value={{
        toast,
      }}
    >
      {children}
      {toasts &&
        Object.values(toasts).map((toast) => {
          return (
            <Snackbar open={true} autoHideDuration={6000}>
              <Alert severity={toast.type} variant="filled" sx={{ width: "100%" }}>
                {toast.message}
              </Alert>
            </Snackbar>
          );
        })}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  return useContext(ToastContext);
};
export { ToastProvider, useToast };
