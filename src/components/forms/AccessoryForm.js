"use client";

import { useState, useEffect } from "react";

export default function AccessoryForm({
                                          isOpen,
                                          onClose,
                                          onSave,
                                          initialAccessory, // optional: provided when editing
                                      }) {
    const [accessoryName, setAccessoryName] = useState("");
    const [quantity, setQuantity] = useState("");

    // Pre-fill the form if editing an accessory.
    useEffect(() => {
        if (initialAccessory) {
            setAccessoryName(initialAccessory.name || "");
            setQuantity(initialAccessory.quantity.toString() || "");
        } else {
            setAccessoryName("");
            setQuantity("");
        }
    }, [initialAccessory, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const accessoryData = {
            name: accessoryName,
            quantity: parseInt(quantity, 10),
            allocated: initialAccessory ? initialAccessory.allocated : 0,
        };

        try {
            let res;
            // If initialAccessory exists, we're in edit mode.
            if (initialAccessory && initialAccessory.id) {
                res = await fetch(`/api/accessories/${initialAccessory.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(accessoryData),
                });
            } else {
                // Otherwise, create a new accessory.
                res = await fetch("/api/accessories", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(accessoryData),
                });
            }

            if (!res.ok) {
                console.error("Failed to process accessory");
                return;
            }

            const accessoryResponse = await res.json();
            // Call the parent's onSave handler with the processed accessory.
            onSave(accessoryResponse);
        } catch (error) {
            console.error("Error processing accessory:", error);
        }
        onClose();
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
            <div className="relative bg-light rounded p-6 mx-4 max-w-md w-full card">
                <h2 className="text-2xl font-bold text-primary mb-4">
                    {initialAccessory ? "Edit IT Accessory" : "Add New IT Accessory"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral">
                            Accessory Name
                        </label>
                        <input
                            type="text"
                            value={accessoryName}
                            onChange={(e) => setAccessoryName(e.target.value)}
                            className="w-full border border-neutral rounded p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral">
                            Quantity in Storage
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full border border-neutral rounded p-2"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer  px-4 py-2 rounded bg-gray-300 text-neutral hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer  px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            {initialAccessory ? "Update Accessory" : "Add Accessory"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
