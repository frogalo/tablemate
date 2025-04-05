// components/ui/ToastContainer.js
"use client";

import Toast from "./Toast";

export default function ToastContainer({ toasts, removeToast }) {
    return (
        <div className="toast-container fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-3">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onDismiss={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
}
