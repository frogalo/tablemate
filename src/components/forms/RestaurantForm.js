"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/lib/useToast";

export default function RestaurantForm({
                                           isOpen,
                                           onClose,
                                           onSave,
                                           initialRestaurant,
                                       }) {
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantEmail, setRestaurantEmail] = useState("");
    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { addToast } = useToast();

    useEffect(() => {
        if (isOpen) {
            if (initialRestaurant) {
                setRestaurantName(initialRestaurant.name || "");
                setRestaurantEmail(initialRestaurant.email || "");
                setMenuItems(
                    Array.isArray(initialRestaurant.menu)
                        ? initialRestaurant.menu.map((item) => ({
                            // Ensure price is treated as string for input initially
                            title: item.title || "",
                            price: item.price?.toString() || "",
                            // Keep original ID if present for potential backend use during update
                            id: item.id,
                        }))
                        : [{ title: "", price: "" }], // Start with one empty if no menu
                );
            } else {
                setRestaurantName("");
                setRestaurantEmail("");
                setMenuItems([{ title: "", price: "" }]); // Start with one empty item
            }
            setError(null);
            setIsLoading(false);
        }
    }, [initialRestaurant, isOpen]);

    const addMenuItem = () => {
        setMenuItems([...menuItems, { title: "", price: "" }]);
    };

    const handleMenuItemChange = (index, field, value) => {
        const newMenuItems = [...menuItems];
        newMenuItems[index][field] = value;
        setMenuItems(newMenuItems);
    };

    const removeMenuItem = (index) => {
        // Prevent removing the last item if desired, or handle validation
        if (menuItems.length > 1) {
            setMenuItems(menuItems.filter((_, idx) => idx !== index));
        } else {
            // Optionally clear the last item instead of removing row
            setMenuItems([{ title: "", price: "" }]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Basic Validation
        if (!restaurantName.trim()) {
            setError("Restaurant name is required.");
            setIsLoading(false);
            return;
        }
        if (!restaurantEmail.trim()) {
            // Add more robust email validation if needed
            setError("Restaurant email is required.");
            setIsLoading(false);
            return;
        }
        const invalidMenuItem = menuItems.find(
            (item) =>
                !item.title.trim() ||
                item.price === "" ||
                isNaN(parseFloat(item.price)) ||
                parseFloat(item.price) < 0,
        );
        if (invalidMenuItem || menuItems.length === 0) {
            setError(
                "All menu items must have a valid title and non-negative price.",
            );
            setIsLoading(false);
            return;
        }

        const restaurantData = {
            name: restaurantName.trim(),
            email: restaurantEmail.trim(),
            // Ensure price is parsed correctly, handle potential existing IDs
            menu: menuItems.map((item) => ({
                ...(item.id && { id: item.id }), // Include ID if it exists (for updates)
                title: item.title.trim(),
                price: parseFloat(item.price),
            })),
        };

        let url = "/api/restaurants";
        let method = "POST";
        let successMessage = "Restaurant added successfully!";

        if (initialRestaurant && initialRestaurant.id) {
            // Assuming PUT for updates to a specific ID
            url = `/api/restaurants/${initialRestaurant.id}`;
            method = "PUT";
            successMessage = "Restaurant updated successfully!";
            // No need to send ID in body if it's in the URL
        }

        try {
            const res = await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(restaurantData),
            });

            let responseData;
            try {
                responseData = await res.json();
            } catch (parseError) {
                responseData = { error: "Received an invalid response from the server." };
            }

            if (!res.ok) {
                setError(
                    responseData.error ||
                    responseData.message ||
                    `Failed to ${initialRestaurant ? "update" : "add"} restaurant. Status: ${res.status}`,
                );
                setIsLoading(false);
                return;
            }

            onSave(responseData);
            addToast(successMessage, "success");
            onClose(); // Close only on success
        } catch (error) {
            console.error("Error processing restaurant:", error);
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
                className="absolute inset-0 bg-black opacity-50"
                onClick={!isLoading ? onClose : undefined}
            ></div>
            <div className="relative bg-card-bg rounded p-6 mx-4 max-w-lg w-full card max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-primary mb-4">
                    {initialRestaurant ? "Edit Restaurant" : "Add Restaurant"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-red-500 text-sm mb-3">Error: {error}</p>}

                    <div>
                        <label
                            htmlFor="restaurantName"
                            className="block text-sm font-medium text-neutral"
                        >
                            Restaurant Name
                        </label>
                        <input
                            id="restaurantName"
                            type="text"
                            value={restaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)}
                            className={`mt-1 block w-full border rounded-md p-2 bg-inherit ${
                                !restaurantName && error ? "border-red-500" : "border-neutral"
                            }`}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="restaurantEmail"
                            className="block text-sm font-medium text-neutral"
                        >
                            Email
                        </label>
                        <input
                            id="restaurantEmail"
                            type="email"
                            value={restaurantEmail}
                            onChange={(e) => setRestaurantEmail(e.target.value)}
                            className={`mt-1 block w-full border rounded-md p-2 bg-inherit ${
                                !restaurantEmail && error ? "border-red-500" : "border-neutral"
                            }`}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="border border-neutral p-3 rounded-md">
                        <label className="block text-sm font-medium text-neutral mb-2">
                            Menu Items
                        </label>
                        {menuItems.map((item, index) => (
                            <div
                                key={index} // Consider using a more stable key if items have IDs
                                className="flex space-x-2 items-start mb-2" // items-start for validation msg alignment
                            >
                                <div className="flex-grow">
                                    <input
                                        type="text"
                                        placeholder="Item Title"
                                        value={item.title}
                                        onChange={(e) =>
                                            handleMenuItemChange(index, "title", e.target.value)
                                        }
                                        className={`w-full border rounded-md p-2 bg-inherit text-sm ${
                                            !item.title && error ? "border-red-500" : "border-neutral"
                                        }`}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="w-28">
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        step="0.01"
                                        min="0" // Prevent negative prices directly
                                        value={item.price}
                                        onChange={(e) =>
                                            handleMenuItemChange(index, "price", e.target.value)
                                        }
                                        className={`w-full border rounded-md p-2 bg-inherit text-sm ${
                                            (item.price === "" ||
                                                isNaN(parseFloat(item.price)) ||
                                                parseFloat(item.price) < 0) &&
                                            error
                                                ? "border-red-500"
                                                : "border-neutral"
                                        }`}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeMenuItem(index)}
                                    disabled={isLoading || menuItems.length <= 1}
                                    className={`text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed p-2 mt-1 ${
                                        menuItems.length <= 1 ? "invisible" : ""
                                    }`}
                                    aria-label="Remove Item"
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addMenuItem}
                            disabled={isLoading}
                            className="mt-2 text-sm btn-primary px-3 py-1 disabled:opacity-50"
                        >
                            <i className="fas fa-plus mr-1"></i> Add Menu Item
                        </button>
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
                            disabled={isLoading}
                            className="btn-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading
                                ? "Saving..."
                                : initialRestaurant
                                    ? "Update Restaurant"
                                    : "Add Restaurant"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
