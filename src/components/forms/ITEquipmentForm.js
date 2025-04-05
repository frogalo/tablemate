"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "@/lib/useToast";

const itEquipmentSchema = yup.object().shape({
    deviceId: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required("Equipment selection is required"),
    quantity: yup
        .number()
        .positive("Quantity must be positive")
        .integer("Quantity must be a whole number")
        .required("Quantity is required")
        .typeError("Quantity must be a number"),
    deliveryDate: yup
        .date()
        .required("Delivery Date is required")
        .typeError("Invalid date format"),
    notes: yup.string().nullable(),
});

const ITEquipmentForm = ({ isOpen, onClose, onSubmit }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(itEquipmentSchema),
        defaultValues: {
            deviceId: "",
            quantity: 1,
            deliveryDate: new Date().toISOString().split("T")[0],
            notes: "",
        },
    });

    const { addToast } = useToast();
    const [devices, setDevices] = useState([]);
    const [loadingDevices, setLoadingDevices] = useState(true);
    const [deviceError, setDeviceError] = useState(null);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        async function fetchAccessories() {
            if (!isOpen) return;

            setLoadingDevices(true);
            setDeviceError(null);
            setSubmitError(null);
            reset();

            try {
                const res = await fetch("/api/accessories");
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(
                        errorData.message || `HTTP error! Status: ${res.status}`,
                    );
                }
                const data = await res.json();
                setDevices(data);
            } catch (err) {
                console.error("Error fetching accessories:", err);
                setDeviceError(
                    err.message || "Failed to load equipment. Please try again.",
                );
            } finally {
                setLoadingDevices(false);
            }
        }

        fetchAccessories();
    }, [isOpen, reset]);

    const handleFormSubmit = async (data) => {
        setSubmitError(null);
        try {
            await onSubmit(data);
            addToast("Equipment ordered successfully!", "success");
            reset();
            onClose();
        } catch (err) {
            console.error("Error submitting order:", err);
            const message =
                err.message || "Failed to submit order. Please try again.";
            setSubmitError(message);
            addToast(message, "error");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={!isSubmitting ? onClose : undefined}
            ></div>

            <div className="relative bg-card-bg rounded p-6 mx-4 max-w-md w-full card">
                <h2 className="text-2xl font-bold text-primary mb-4">
                    Order IT Equipment
                </h2>

                {loadingDevices && <p className="text-neutral">Loading equipment...</p>}
                {deviceError && <p className="text-red-500 mb-3">{deviceError}</p>}
                {submitError && (
                    <p className="text-red-500 text-sm mb-3">Error: {submitError}</p>
                )}

                {!loadingDevices && !deviceError && (
                    <form
                        onSubmit={handleSubmit(handleFormSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <label
                                htmlFor="deviceId"
                                className="block text-sm font-medium text-neutral"
                            >
                                Equipment Type
                            </label>
                            <select
                                id="deviceId"
                                {...register("deviceId")}
                                className={`mt-1 block w-full border rounded-md p-2 bg-inherit ${
                                    errors.deviceId ? "border-red-500" : "border-neutral"
                                }`}
                                disabled={isSubmitting}
                            >
                                <option value="">Select Equipment</option>
                                {devices.map((device) => {
                                    const available = device.quantity - device.allocated;
                                    return (
                                        <option
                                            key={device.id}
                                            value={device.id}
                                            disabled={available <= 0}
                                        >
                                            {device.name} (Available: {available})
                                        </option>
                                    );
                                })}
                            </select>
                            {errors.deviceId && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.deviceId.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="quantity"
                                className="block text-sm font-medium text-neutral"
                            >
                                Quantity
                            </label>
                            <input
                                id="quantity"
                                type="number"
                                min="1"
                                {...register("quantity", { valueAsNumber: true })}
                                className={`mt-1 block w-full border rounded-md p-2 bg-inherit ${
                                    errors.quantity ? "border-red-500" : "border-neutral"
                                }`}
                                disabled={isSubmitting}
                            />
                            {errors.quantity && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.quantity.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="deliveryDate"
                                className="block text-sm font-medium text-neutral"
                            >
                                Delivery Date
                            </label>
                            <input
                                id="deliveryDate"
                                type="date"
                                {...register("deliveryDate")}
                                className={`mt-1 block w-full border rounded-md p-2 bg-inherit ${
                                    errors.deliveryDate ? "border-red-500" : "border-neutral"
                                }`}
                                disabled={isSubmitting}
                            />
                            {errors.deliveryDate && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.deliveryDate.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="notes"
                                className="block text-sm font-medium text-neutral"
                            >
                                Notes (Optional)
                            </label>
                            <textarea
                                id="notes"
                                {...register("notes")}
                                rows={3}
                                className="mt-1 block w-full border border-neutral rounded-md p-2 bg-inherit"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="flex justify-end space-x-4 pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-neutral text-white rounded hover:opacity-90 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Ordering..." : "Order"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ITEquipmentForm;
