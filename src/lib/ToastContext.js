"use client";

import React, { createContext, useState, useCallback } from "react";
import ToastContainer from "../components/ui/ToastContainer"; // We'll create this next

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "success", duration = 4000) => {
        const id = idCounter++;
        setToasts((prevToasts) => [...prevToasts, { id, message, type }]);

        // Automatically remove the toast after the duration
        setTimeout(() => {
            removeToast(id);
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
}

export default ToastContext;
