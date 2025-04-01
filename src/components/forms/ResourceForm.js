"use client";

import { useState, useEffect } from "react";

export default function ResourceForm({
                                         isOpen,
                                         onClose,
                                         onSave,
                                         initialResource, // optional: for editing
                                     }) {
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [identifier, setIdentifier] = useState("");

    // Prefill the form in edit mode.
    useEffect(() => {
        if (initialResource) {
            setType(initialResource.type || "");
            setName(initialResource.name || "");
            setIdentifier(initialResource.identifier || "");
        } else {
            setType("");
            setName("");
            setIdentifier("");
        }
    }, [initialResource, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resourceData = {
            type,
            name,
            identifier,
        };

        try {
            let res;
            if (initialResource && initialResource.id) {
                // Update resource.
                res = await fetch(`/api/resources/${initialResource.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(resourceData),
                });
            } else {
                // Create new resource.
                res = await fetch("/api/resources", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(resourceData),
                });
            }
            if (!res.ok) {
                console.error("Failed to process resource");
                return;
            }
            const savedResource = await res.json();
            onSave(savedResource);
        } catch (error) {
            console.error("Error processing resource:", error);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
            {/* Modal backdrop */}
            <div
                className="absolute inset-0 bg-black opacity-50 cursor-pointer"
                onClick={onClose}
            ></div>
            {/* Modal container */}
            <div className="relative bg-light rounded p-6 mx-4 max-w-md w-full card">
                <h2 className="text-2xl font-bold text-primary mb-4">
                    {initialResource ? "Edit Resource" : "Add New Resource"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral">
                            Resource Type
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full border border-neutral rounded p-2"
                            required
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
                        <label className="block text-sm font-medium text-neutral">
                            Resource Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-neutral rounded p-2"
                            required
                            placeholder="e.g., Room 101, Parking A3"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral">
                            Identifier
                        </label>
                        <input
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full border border-neutral rounded p-2"
                            placeholder="Optional unique identifier"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded bg-gray-300 text-neutral hover:bg-gray-400 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                        >
                            {initialResource ? "Update Resource" : "Add Resource"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
