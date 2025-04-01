"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// IT Equipment Form Validation Schema
const itEquipmentSchema = yup.object().shape({
    deviceId: yup.number().required("Equipment is required"),
    quantity: yup.number().positive().integer().required("Quantity is required"),
    deliveryDate: yup.date().required("Delivery Date is required"),
    notes: yup.string(),
});

const ITEquipmentForm = ({ isOpen, onClose, onSubmit }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(itEquipmentSchema),
    });

    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAccessories() {
            setLoading(true);
            try {
                const res = await fetch("/api/accessories");
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setDevices(data);
            } catch (err) {
                console.error("Error fetching accessories:", err);
                setError("Failed to load equipment. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchAccessories();
    }, []);

    const submitForm = (data) => {
        onSubmit(data);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
            {/* Modal Backdrop */}
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            {/* Modal Container */}
            <div className="relative bg-light rounded p-6 mx-4 max-w-md w-full card">
                <h2 className="text-2xl font-bold text-primary mb-4">
                    Order IT Equipment
                </h2>
                {loading && <p className="text-neutral">Loading equipment...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral">
                                Equipment Type
                            </label>
                            <select
                                {...register("deviceId", { valueAsNumber: true })}
                                className="w-full border border-neutral rounded p-2"
                            >
                                <option value="">Select Equipment</option>
                                {devices.map((device) => (
                                    <option key={device.id} value={device.id}>
                                        {device.name} (In Stock: {device.quantity - device.allocated})
                                    </option>
                                ))}
                            </select>
                            {errors.deviceId && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.deviceId.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral">
                                Quantity
                            </label>
                            <input
                                type="number"
                                {...register("quantity", { valueAsNumber: true })}
                                className="w-full border border-neutral rounded p-2"
                            />
                            {errors.quantity && (
                                <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral">
                                Delivery Date
                            </label>
                            <input
                                type="date"
                                {...register("deliveryDate")}
                                className="w-full border border-neutral rounded p-2"
                            />
                            {errors.deliveryDate && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.deliveryDate.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral">
                                Notes
                            </label>
                            <textarea
                                {...register("notes")}
                                className="w-full border border-neutral rounded p-2"
                            />
                        </div>
                        {/* Form Actions */}
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
                                className="px-4 py-2 rounded btn-primary hover:scale-105 transition-transform"
                            >
                                Order
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ITEquipmentForm;
