"use client";

import { useState } from "react";

export default function AccessoryForm({ isOpen, onClose, onSave }) {
    const [accessoryName, setAccessoryName] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAccessory = {
            id: Date.now(),
            name: accessoryName,
            quantity: parseInt(quantity, 10),
            allocated: 0, // default allocated is 0
        };
        onSave(newAccessory);
        setAccessoryName("");
        setQuantity("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
            {/* Modal backdrop */}
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            {/* Modal container */}
            <div className="relative bg-light rounded p-6 mx-4 max-w-md w-full card">
                <h2 className="text-2xl font-bold text-primary mb-4">
                    Add New IT Accessory
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
                            className="px-4 py-2 rounded bg-gray-300 text-neutral hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Add Accessory
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
