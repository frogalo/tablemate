"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/lib/useToast"; // Import the hook

export default function UserForm({
                                     onUserAdded,
                                     onUserUpdated,
                                     onClose,
                                     initialUser,
                                 }) {
    const [identifier, setIdentifier] = useState(initialUser?.identifier || "");
    const [firstName, setFirstName] = useState(initialUser?.firstName || "");
    const [lastName, setLastName] = useState(initialUser?.lastName || "");
    const [role, setRole] = useState(initialUser?.role || "USER");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Optional: Add loading state

    const { addToast } = useToast();

    // Update local state if initialUser changes (editing mode)
    useEffect(() => {
        if (initialUser) {
            setIdentifier(initialUser.identifier || "");
            setFirstName(initialUser.firstName || "");
            setLastName(initialUser.lastName || "");
            setRole(initialUser.role || "USER");
            setError(null); // Clear errors when switching to edit mode
        } else {
            // Optionally reset form when switching to add mode if needed
            setIdentifier("");
            setFirstName("");
            setLastName("");
            setRole("USER");
            setError(null);
        }
    }, [initialUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        setIsLoading(true); // Set loading state

        const userPayload = { identifier, firstName, lastName, role };

        try {
            let res;
            let successMessage = "";

            if (initialUser) {
                // Update existing user
                res = await fetch(`/api/users/${initialUser.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userPayload),
                });
                successMessage = "User updated successfully!";
            } else {
                // Create new user
                res = await fetch("/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userPayload),
                });
                successMessage = "User added successfully!";
            }

            if (!res.ok) {
                const errData = await res.json();
                setError(errData.error || `Failed to ${initialUser ? "update" : "add"} user`);
                setIsLoading(false); // Turn off loading
                return; // Stop execution here
            }

            const savedUser = await res.json();

            // Call callbacks *before* showing toast and closing
            if (initialUser && onUserUpdated) {
                onUserUpdated(savedUser);
            } else if (!initialUser && onUserAdded) {
                onUserAdded(savedUser);
            }

            // Show success toast!
            addToast(successMessage, "success");

            // Reset form (optional) and close modal only on success
            setIdentifier("");
            setFirstName("");
            setLastName("");
            setRole("USER");
            if (onClose) {
                onClose();
            }
        } catch (err) {
            // Catch unexpected errors (network, JSON parsing, etc.)
            console.error("Error saving user:", err);
            setError(err.message || "An unexpected error occurred.");
            // Optionally show an error toast for unexpected errors
            addToast("An unexpected error occurred.", "error");
        } finally {
            setIsLoading(false); // Ensure loading is turned off
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 fade-in" noValidate>
            {/* Display API errors within the form */}
            {error && <p className="text-red-500 text-sm mb-3">Error: {error}</p>}

            {/* Identifier Input */}
            <div>
                <label
                    htmlFor="identifier"
                    className="block text-sm font-medium text-neutral"
                >
                    Identifier
                </label>
                <input
                    type="text"
                    id="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="mt-1 block w-full border border-neutral rounded-md p-2 bg-inherit" // Added bg-inherit for theme consistency
                    required // Added basic required validation
                    disabled={isLoading}
                />
            </div>

            {/* First Name Input */}
            <div>
                <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-neutral"
                >
                    First Name
                </label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-1 block w-full border border-neutral rounded-md p-2 bg-inherit"
                    required
                    disabled={isLoading}
                />
            </div>

            {/* Last Name Input */}
            <div>
                <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-neutral"
                >
                    Last Name
                </label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-1 block w-full border border-neutral rounded-md p-2 bg-inherit"
                    required
                    disabled={isLoading}
                />
            </div>

            {/* Role Select */}
            <div>
                <label htmlFor="role" className="block text-sm font-medium text-neutral">
                    Role
                </label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-1 block w-full border border-neutral rounded-md p-2 bg-inherit" // Added bg-inherit
                    disabled={isLoading}
                >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="px-4 py-2 bg-neutral text-white rounded hover:opacity-90 disabled:opacity-50" // Adjusted cancel button style
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading} // Disable button while loading
                >
                    {isLoading
                        ? "Saving..."
                        : initialUser
                            ? "Update User"
                            : "Add User"}
                </button>
            </div>
        </form>
    );
}
