"use client";

import { createContext, useState, useEffect } from "react";

// Create the UserContext
export const UserContext = createContext();

// UserContext Provider
export function UserProvider({ children }) {
    const [user, setUser] = useState("SignedOut"); // Default state

    // Load user state from localStorage on the client
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
