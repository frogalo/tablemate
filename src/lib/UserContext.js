"use client";

import {createContext, useEffect, useState} from "react";

// Create the UserContext
export const UserContext = createContext();

// UserContext Provider
export function UserProvider({ children }) {
    // Initialize user state directly from localStorage
    const [user, setUser] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("user") || "SignedOut";
        }
        return "SignedOut"; // Default state for SSR
    });

    // Save user state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("user", user);
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
