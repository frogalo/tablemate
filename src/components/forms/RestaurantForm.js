"use client";

import { useState } from "react";

export default function RestaurantForm({ isOpen, onClose, onSave }) {
    const [restaurantName, setRestaurantName] = useState("");
    const [restaurantEmail, setRestaurantEmail] = useState("");
    const [menuItems, setMenuItems] = useState([]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRestaurant = {
            name: restaurantName,
            email: restaurantEmail,
            menu: menuItems.map((item) => ({
                title: item.title,
                price: parseFloat(item.price),
            })),
        };
        onSave(newRestaurant);
        // Reset form fields
        setRestaurantName("");
        setRestaurantEmail("");
        setMenuItems([]);
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
                    Add Restaurant
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
                            <div key={index} className="flex space-x-2 items-center mb-2">
                                <input
                                    type="text"
                                    placeholder="Position"
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
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Add Menu Item
                        </button>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-300 text-neutral hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Add Restaurant
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
