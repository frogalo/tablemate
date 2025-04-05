"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/lib/useToast";

export default function ResourceForm({
                                         isOpen,
                                         onClose,
                                         onSave,
                                         initialResource,
                                     }) {
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { addToast } = useToast();

    useEffect(() => {
        if (isOpen) {
            if (initialResource) {
                setType(initialResource.type || "");
                setName(initialResource.name || "");
                setIdentifier(initialResource.identifier || "");
            } else {
                setType("");
                setName("");
                setIdentifier("");
            }
            setError(null);
            setIsLoading(false);
        }
    }, [initialResource, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (!type) {
            setError("Resource type is required.");
            setIsLoading(false);
            return;
        }
        if (!name.trim()) {
            setError("Resource name cannot be empty.");
            setIsLoading(false);
            return;
        }

        const resourceData = {
            type,
            name: name.trim(),
            identifier: identifier.trim(),
        };

        try {
            let res;
            let successMessage = "";
            let responseData;

            if (initialResource && initialResource.id) {
                res = await fetch(`/api/resources/${initialResource.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(resourceData),
                });
                successMessage = "Resource updated successfully!";
            } else {
                res = await fetch("/api/resources", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(resourceData),
                });
                successMessage = "Resource added successfully!";
            }

            try {
                responseData = await res.json();
            } catch (parseError) {
                responseData = { error: "Received an invalid response from the server." };
            }

            if (!res.ok) {
                setError(
                    responseData.error ||
                    responseData.message ||
                    `Failed to ${initialResource ? "update" : "add"} resource. Status: ${res.status}`,
                );
                setIsLoading(false);
                return;
            }

            onSave(responseData);
            addToast(successMessage, "success");
            onClose();
        } catch (error) {
            console.error("Error processing resource:", error);
            const message =
                error.message || "An unexpected network error occurred.";
            setError(message);
            addToast(message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
            <div
                className="absolute inset-0 bg-black opacity-50 cursor-pointer"
                onClick={!isLoading ? onClose : undefined}
            ></div>
            <div className="relative bg-card-bg rounded p-6 mx-4 max-w-md w-full card">
                <h2 className="text-2xl font-bold text-primary mb-4">
                    {initialResource ? "Edit Resource" : "Add New Resource"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500 text-sm mb-3">Error: {error}</p>}

                    <div>
                        <label
                            htmlFor="resourceType"
                            className="block text-sm font-medium text-neutral"
                        >
                            Resource Type
                        </label>
                        <select
                            id="resourceType"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className={`mt-1 block w-full border rounded-md p-2 bg-inherit ${
                                !type && error ? "border-red-500" : "border-neutral"
                            }`}
                            required
                            disabled={isLoading}
                        >
                            <option value="" disabled>
                                Select resource type
                            </option>
                            <option value="PARKING">Parking Spot</option>
                            <option value="DESK">Desk Spot</option>
                            <option value="ROOM">Room</option>
                            <option value="CONFERENCE_ROOM">Conference Room</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="resourceName"
                            className="block text-sm font-medium text-neutral"
                        >
                            Resource Name
                        </label>
                        <input
                            id="resourceName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`mt-1 block w-full border rounded-md p-2 bg-inherit ${
                                !name && error ? "border-red-500" : "border-neutral"
                            }`}
                            required
                            placeholder="e.g., Room 101, Parking A3"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="resourceIdentifier"
                            className="block text-sm font-medium text-neutral"
                        >
                            Identifier (Optional)
                        </label>
                        <input
                            id="resourceIdentifier"
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="mt-1 block w-full border border-neutral rounded-md p-2 bg-inherit"
                            placeholder="Optional unique identifier"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex justify-end space-x-4 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-4 py-2 bg-neutral text-white rounded hover:opacity-90 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? "Saving..."
                                : initialResource
                                    ? "Update Resource"
                                    : "Add Resource"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
