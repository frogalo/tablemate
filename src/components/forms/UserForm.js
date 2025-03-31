"use client";

import { useState, useEffect } from "react";

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

    // Update local state if initialUser changes (editing mode)
    useEffect(() => {
        if (initialUser) {
            setIdentifier(initialUser.identifier || "");
            setFirstName(initialUser.firstName || "");
            setLastName(initialUser.lastName || "");
            setRole(initialUser.role || "USER");
        }
    }, [initialUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userPayload = { identifier, firstName, lastName, role };

        try {
            let res;
            if (initialUser) {
                // Update existing user with PUT request at /api/users/:id
                res = await fetch(`/api/users/${initialUser.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userPayload),
                });
            } else {
                // Create new user with POST request
                res = await fetch("/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(userPayload),
                });
            }

            if (!res.ok) {
                const errData = await res.json();
                // Instead of throwing, update your error state and exit the function.
                setError(errData.error || "Failed to save user");
                return;
            }

            const savedUser = await res.json();

            if (initialUser && onUserUpdated) {
                onUserUpdated(savedUser);
            } else if (onUserAdded) {
                onUserAdded(savedUser);
            }

            // Reset form (optional) and close modal
            setIdentifier("");
            setFirstName("");
            setLastName("");
            setRole("USER");
            setError(null);
            if (onClose) {
                onClose();
            }
        } catch (err) {
            setError(err.message);
            console.error("Error saving user:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 fade-in" noValidate>
            {error && <p className="text-red-500 text-sm">Error: {error}</p>}
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
                    className="mt-1 block w-full border border-neutral rounded-md p-2"
                />
            </div>
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
                    className="mt-1 block w-full border border-neutral rounded-md p-2"
                />
            </div>
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
                    className="mt-1 block w-full border border-neutral rounded-md p-2"
                />
            </div>
            <div>
                <label
                    htmlFor="role"
                    className="block text-sm font-medium text-neutral"
                >
                    Role
                </label>
                <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-1 block w-full border border-neutral rounded-md p-2"
                >
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
                <button type="submit" className="btn-primary transition-all">
                    {initialUser ? "Update User" : "Add User"}
                </button>
            </div>
        </form>
    );
}
