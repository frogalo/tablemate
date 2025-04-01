"use client";

import { useContext } from "react";
import { UserContext } from "@/lib/UserContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { setUser } = useContext(UserContext); // Access the global user state
    const router = useRouter(); // For navigation after login

    const handleLogin = (role) => {
        setUser(role); // Update the user state
        if (role === "Admin") {
            router.push("/admin/dashboard"); // Redirect to admin dashboard
        } else if (role === "User") {
            router.push("/user/dashboard"); // Redirect to user dashboard
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-primary to-accent">
            <div className="card max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-primary mb-6">Welcome to TableMate</h1>
                <p className="text-center text-neutral mb-8">
                    Please select your role to log in.
                </p>
                <div className="space-y-4">
                    <button
                        onClick={() => handleLogin("Admin")}
                        className="btn-primary w-full py-3 text-lg rounded-lg hover:transform hover:scale-105 transition-transform cursor-pointer"
                    >
                        Login as Admin
                    </button>
                    <button
                        onClick={() => handleLogin("User")}
                        className="btn-primary w-full py-3 text-lg rounded-lg hover:transform hover:scale-105 transition-transform cursor-pointer"
                    >
                        Login as User
                    </button>
                </div>
            </div>
        </div>
    );
}
