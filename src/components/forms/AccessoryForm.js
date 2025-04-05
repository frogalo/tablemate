"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/lib/useToast";

export default function AccessoryForm({
                                          isOpen,
                                          onClose,
                                          onSave,
                                          initialAccessory, // optional: provided when editing
                                      }) {
    const [accessoryName, setAccessoryName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [error, setError] = useState(null); // State for form-specific errors
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator

    const { addToast } = useToast();

    // Pre-fill the form if editing an accessory or reset when opening
    useEffect(() => {
        if (isOpen) {
            if (initialAccessory) {
                setAccessoryName(initialAccessory.name || "");
                setQuantity(initialAccessory.quantity?.toString() || "1"); // Default to 1 if undefined
            } else {
                // Reset form when opening for 'add new'
                setAccessoryName("");
                setQuantity("1"); // Default quantity to 1 for new items
            }
            setError(null); // Clear errors when modal opens/initialAccessory changes
            setIsLoading(false); // Reset loading state
        }
    }, [initialAccessory, isOpen]); // Rerun when modal opens or data changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        setIsLoading(true);

        // Basic validation (ensure quantity is positive)
        const numQuantity = parseInt(quantity, 10);
        if (isNaN(numQuantity) || numQuantity < 0) {
            setError("Quantity must be a non-negative number.");
            setIsLoading(false);
            return;
        }
        // Ensure name is not empty (though 'required' attribute helps)
        if (!accessoryName.trim()) {
            setError("Accessory name cannot be empty.");
            setIsLoading(false);
            return;
        }

        const accessoryData = {
            name: accessoryName.trim(),
            quantity: numQuantity,
            // Preserve allocated count if editing, otherwise default (API should handle default)
            ...(initialAccessory && { allocated: initialAccessory.allocated }),
        };

        try {
            let res;
            let successMessage = "";
            let responseData;

            // If initialAccessory exists, we're in edit mode.
            if (initialAccessory && initialAccessory.id) {
                res = await fetch(`/api/accessories/${initialAccessory.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(accessoryData),
                });
                successMessage = "Accessory updated successfully!";
            } else {
                // Otherwise, create a new accessory.
                res = await fetch("/api/accessories", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(accessoryData),
                });
                successMessage = "Accessory added successfully!";
            }

            // Try to parse response regardless of status code for potential error messages
            try {
                responseData = await res.json();
            } catch (parseError) {
                // Handle cases where response is not JSON (e.g., server error page)
                responseData = { error: "Received an invalid response from the server." };
            }

            if (!res.ok) {
                // Use error from response body if available, otherwise use a generic message
                setError(
                    responseData.error ||
                    responseData.message ||
                    `Failed to ${initialAccessory ? "update" : "add"} accessory. Status: ${res.status}`,
                );
                setIsLoading(false); // Stop loading
                return; // Prevent further execution
            }

            // Call the parent's onSave handler with the processed accessory.
            onSave(responseData); // Use the response data from the API

            // 3. Show success toast
            addToast(successMessage, "success");

            // 4. Close modal only on success
            onClose();
        } catch (error) {
            // Catch network errors or other unexpected issues
            console.error("Error processing accessory:", error);
            const message =
                error.message || "An unexpected network error occurred.";
            setError(message);
            // Optionally show an error toast for unexpected errors
            addToast(message, "error");
        } finally {
            setIsLoading(false); // Ensure loading is turned off
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
            {/* Modal backdrop */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={!isLoading ? onClose : undefined} // Prevent closing backdrop during load
            ></div>
            {/* Modal container */}
            <div className="relative bg-card-bg rounded p-6 mx-4 max-w-md w-full card">
                {" "}
                {/* Use card-bg */}
                <h2 className="text-2xl font-bold text-primary mb-4">
                    {initialAccessory ? "Edit IT Accessory" : "Add New IT Accessory"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Display Error Message */}
                    {error && <p className="text-red-500 text-sm mb-3">Error: {error}</p>}

                    <div>
                        <label
                            htmlFor="accessoryName"
                            className="block text-sm font-medium text-neutral"
                        >
                            Accessory Name
                        </label>
                        <input
                            id="accessoryName"
                            type="text"
                            value={accessoryName}
                            onChange={(e) => setAccessoryName(e.target.value)}
                            className="mt-1 block w-full border border-neutral rounded-md p-2 bg-inherit" // Added bg-inherit
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="quantity"
                            className="block text-sm font-medium text-neutral"
                        >
                            Quantity in Storage
                        </label>
                        <input
                            id="quantity"
                            type="number"
                            min="0" // Allow 0 quantity
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="mt-1 block w-full border border-neutral rounded-md p-2 bg-inherit" // Added bg-inherit
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex justify-end space-x-4 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-4 py-2 bg-neutral text-white rounded hover:opacity-90 disabled:opacity-50" // Style like UserForm cancel
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed" // Use btn-primary style
                            disabled={isLoading}
                        >
                            {isLoading
                                ? "Saving..."
                                : initialAccessory
                                    ? "Update Accessory"
                                    : "Add Accessory"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
