"use client";

import { useState, useEffect } from "react";

export default function RestaurantForm({
                                           isOpen,
                                           onClose,
                                           onSave,
                                           initialRestaurant,
                                       }) {
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantEmail, setRestaurantEmail] = useState("");
    const [menuItems, setMenuItems] = useState([]);

    // When the form modal opens or when initialRestaurant changes, prefill data if needed.
    useEffect(() => {
        if (initialRestaurant) {
            setRestaurantName(initialRestaurant.name || "");
            setRestaurantEmail(initialRestaurant.email || "");
            // If the restaurant already has a menu, we pre-populate it.
            setMenuItems(
                Array.isArray(initialRestaurant.menu)
                    ? initialRestaurant.menu.map((item) => ({
                        title: item.title,
                        price: item.price,
                    }))
                    : []
            );
        } else {
            setRestaurantName("");
            setRestaurantEmail("");
            setMenuItems([]);
        }
    }, [initialRestaurant, isOpen]);

    // Add a new empty menu item entry
    const addMenuItem = () => {
        setMenuItems([...menuItems, { title: "", price: "" }]);
    };

    // Update a given menu item field
    const handleMenuItemChange = (index, field, value) => {
        const newMenuItems = [...menuItems];
        newMenuItems[index][field] = value;
        setMenuItems(newMenuItems);
    };

    // Remove a menu item entry
    const removeMenuItem = (index) => {
        setMenuItems(menuItems.filter((_, idx) => idx !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const restaurantData = {
            name: restaurantName,
            email: restaurantEmail,
            menu: menuItems.map((item) => ({
                title: item.title,
                price: parseFloat(item.price),
            })),
        };

        // If editing, include an identifier so the API knows this is an update.
        if (initialRestaurant && initialRestaurant.id) {
            restaurantData.id = initialRestaurant.id;
        }

        try {
            const res = await fetch("/api/restaurants", {
                method: "POST", // or PUT if you want to differentiate between new and update
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(restaurantData),
            });
            if (!res.ok) {
                console.error("Failed to create/update restaurant");
                return;
            }
            const data = await res.json();
            onSave(data);
            // Reset form fields after successful submission
            setRestaurantName("");
            setRestaurantEmail("");
            setMenuItems([]);
        } catch (error) {
            console.error("Error creating/updating restaurant:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
            {/* Modal backdrop */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            {/* Modal container */}
            <div className="relative bg-light rounded p-6 mx-4 max-w-lg w-full card">
                <h2 className="text-2xl font-bold text-primary mb-4">
                    {initialRestaurant ? "Edit Restaurant" : "Add Restaurant"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral">
                            Restaurant Name
                        </label>
                        <input
                            type="text"
                            value={restaurantName}
                            onChange={(e) => setRestaurantName(e.target.value)}
                            className="w-full border border-neutral rounded p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral">
                            Email
                        </label>
                        <input
                            type="email"
                            value={restaurantEmail}
                            onChange={(e) => setRestaurantEmail(e.target.value)}
                            className="w-full border border-neutral rounded p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral">
                            Menu Items
                        </label>
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                className="flex space-x-2 items-center mb-2"
                            >
                                <input
                                    type="text"
                                    placeholder="Item Title"
                                    value={item.title}
                                    onChange={(e) =>
                                        handleMenuItemChange(index, "title", e.target.value)
                                    }
                                    className="w-1/2 border border-neutral rounded p-2"
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Price"
                                    step="0.01"
                                    value={item.price}
                                    onChange={(e) =>
                                        handleMenuItemChange(index, "price", e.target.value)
                                    }
                                    className="w-1/2 border border-neutral rounded p-2"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => removeMenuItem(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addMenuItem}
                            className="mt-2 px-4 py-2 rounded btn-primary hover:scale-105 transition-transform"
                        >
                            Add Menu Item
                        </button>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer px-4 py-2 rounded bg-gray-300 text-neutral hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded btn-primary hover:scale-105 transition-transform"
                        >
                            {initialRestaurant ? "Update Restaurant" : "Add Restaurant"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
