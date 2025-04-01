"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const reservationSchema = yup.object().shape({
    resourceId: yup.number().required("Resource is required"),
    date: yup.date().required("Date is required"),
    startTime: yup.string().required("Start Time is required"),
    duration: yup.number().positive().integer().required("Duration is required"),
});

const ReservationForm = ({ isOpen, onClose, onSubmit, resourceType }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(reservationSchema),
    });

    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchResources() {
            setLoading(true);
            try {
                // Always pass the `type` as a query parameter, even if `type` is null
                const url = `/api/resources${resourceType ? `?type=${resourceType}` : ""}`;
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setResources(data);
            } catch (err) {
                console.error("Error fetching resources:", err);
                setError("Failed to load resources. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchResources();
    }, [resourceType]);

    const submitForm = (data) => {
        onSubmit(data);
        onClose(); // Ensure the onClose function is always called
    };

    if (!isOpen) return null;

    const formatTitle = (title) => {
        // Convert underscores, upper-case letters and fix titles:
        const words = title.toLowerCase().split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return capitalizedWords.join(' ');
    };

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
                    {resourceType
                        ? `${formatTitle(resourceType)} Reservation`
                        : "Reservation"}
                </h2>
                {loading && <p className="text-neutral">Loading resources...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral">
                                Resource
                            </label>
                            <select
                                {...register("resourceId", { valueAsNumber: true })}
                                className="w-full border border-neutral rounded p-2"
                            >
                                <option value="">Select a Resource</option>
                                {resources.map((resource) => (
                                    <option key={resource.id} value={resource.id}>
                                        {resource.name}
                                    </option>
                                ))}
                            </select>
                            {errors.resourceId && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.resourceId.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral">
                                Date
                            </label>
                            <input
                                type="date"
                                {...register("date")}
                                className="w-full border border-neutral rounded p-2"
                            />
                            {errors.date && (
                                <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral">
                                Start Time
                            </label>
                            <input
                                type="time"
                                {...register("startTime")}
                                className="w-full border border-neutral rounded p-2"
                            />
                            {errors.startTime && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.startTime.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-neutral">
                                Duration (hours)
                            </label>
                            <input
                                type="number"
                                {...register("duration", { valueAsNumber: true })}
                                className="w-full border border-neutral rounded p-2"
                            />
                            {errors.duration && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.duration.message}
                                </p>
                            )}
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
                                Reserve
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ReservationForm;
