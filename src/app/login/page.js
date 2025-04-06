"use client";

import { useState, useContext } from "react";
import { UserContext } from "@/lib/UserContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { setUser } = useContext(UserContext);
    const router = useRouter();

    // Maintain local state for the form
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    // Update field values
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle test user login that does not use the form fields.
    const handleTestLogin = (role) => {
        setUser(role);
        if (role === "Admin") {
            router.push("/admin/dashboard");
        } else if (role === "User") {
            router.push("/user/dashboard");
        }
    };

    // Dummy submission handler to show usage of form fields
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegister) {
            // Validate registration: for instance, check that passwords match.
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            console.log("Registering user:", formData.username);
            // You may add logic to register the user
        } else {
            console.log("Logging in user:", formData.username);
            // You may add logic to authenticate the user.
        }
    };

    return (
        <div className="mt-40 flex items-center justify-center bg-gradient-to-br from-primary to-accent px-4">
            <div className="card max-w-md w-full p-8 shadow-lg rounded-xl fade-in">
                <h1 className="text-4xl font-extrabold text-center text-primary mb-4">
                    TableMate
                </h1>
                <p className="text-center text-neutral mb-8">
                    {isRegister
                        ? "Register a new account."
                        : "Sign in to your account."}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-neutral mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter username"
                            className="w-full p-3 rounded-md border border-neutral focus:outline-none focus:border-primary"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-neutral mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                            className="w-full p-3 rounded-md border border-neutral focus:outline-none focus:border-primary"
                            required
                        />
                    </div>
                    {isRegister && (
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-neutral mb-1"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm password"
                                className="w-full p-3 rounded-md border border-neutral focus:outline-none focus:border-primary"
                                required
                            />
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        {!isRegister && (
                            <button
                                type="button"
                                className="cursor-pointer text-sm text-accent hover:underline"
                                onClick={() => console.log("Forgot password clicked")}
                            >
                                Forgot Password?
                            </button>
                        )}
                        <button
                            type="submit"
                            className="btn-primary py-3 px-6 text-lg rounded-lg transform transition duration-150 ease-in-out hover:-translate-y-1"
                        >
                            {isRegister ? "Register" : "Login"}
                        </button>
                    </div>
                </form>
                <div className="mt-6 border-t pt-4">
                    <div className="text-center">
            <span className="text-neutral text-sm">
              {isRegister
                  ? "Already have an account? "
                  : "Don't have an account? "}
            </span>
                        <button
                            onClick={() => setIsRegister(!isRegister)}
                            className="cursor-pointer text-sm text-accent hover:underline"
                        >
                            {isRegister ? "Sign in" : "Register"}
                        </button>
                    </div>
                </div>
                {/* Test user buttons */}
                {!isRegister && (
                    <div className="mt-8 space-y-4">
                        <div className="flex items-center justify-center text-neutral">
                            OR
                        </div>
                        <div className="flex flex-col space-y-4">
                            <button
                                onClick={() => handleTestLogin("Admin")}
                                className="btn-primary w-full py-3 text-lg rounded-lg transform transition duration-150 ease-in-out hover:-translate-y-1"
                            >
                                Login as Administrator
                            </button>
                            <button
                                onClick={() => handleTestLogin("User")}
                                className="btn-primary w-full py-3 text-lg rounded-lg transform transition duration-150 ease-in-out hover:-translate-y-1"
                            >
                                Login as User
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
