"use client";

import { useEffect, useState, useRef } from "react";

export default function Toast({ message, type = "success", onDismiss }) {
    const [isVisible, setIsVisible] = useState(false); // Start hidden
    const timeoutRef = useRef(null); // Ref to store dismissal timeout ID

    // Trigger entrance animation shortly after mount
    useEffect(() => {
        // Use a minimal timeout to allow the initial (hidden) state to render first
        const entryTimeout = setTimeout(() => {
            setIsVisible(true);
        }, 50); // Small delay

        // Cleanup function
        return () => {
            clearTimeout(entryTimeout);
            // Clear dismissal timeout if component unmounts prematurely
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    // Start exit animation
    const handleDismiss = () => {
        // Prevent multiple dismiss calls
        if (!isVisible || timeoutRef.current) return;

        setIsVisible(false); // Trigger the fade-out/slide-down animation

        // Set timeout to match CSS transition duration before calling parent remove function
        timeoutRef.current = setTimeout(() => {
            onDismiss();
        }, 300); // Match CSS transition duration (0.3s)
    };

    // Determine icon and colors based on type
    let iconClass = "fa-check-circle";
    let bgColorClass = "bg-primary"; // Use Tailwind class directly

    if (type === "error") {
        iconClass = "fa-times-circle";
        bgColorClass = "bg-accent"; // Use accent for error
    } else if (type === "warning") {
        iconClass = "fa-exclamation-triangle";
        bgColorClass = "bg-yellow-500"; // Example
    } else if (type === "info") {
        iconClass = "fa-info-circle";
        bgColorClass = "bg-blue-500"; // Example
    }

    // Construct the className string dynamically
    const toastClasses = `toast ${bgColorClass} ${
        isVisible ? "toast-visible" : ""
    }`;

    return (
        <div
            className={toastClasses}
            role="alert"
            aria-live={type === "error" ? "assertive" : "polite"} // Use assertive for errors
            aria-atomic="true"
        >
            <div className="flex-shrink-0 mr-3">
                <i className={`fas ${iconClass} text-xl`}></i>
            </div>
            <div className="flex-grow text-sm font-medium">{message}</div>
            <button
                onClick={handleDismiss}
                className="ml-4 flex-shrink-0 text-current opacity-70 hover:opacity-100 transition-opacity" // Use text-current for icon color
                aria-label="Close"
            >
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
}