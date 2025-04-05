"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "@/lib/useToast";

// Validation Schema
const reservationSchema = yup.object().shape({
    resourceId: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required("Resource selection is required"),
    date: yup
        .date()
        .required("Date is required")
        .typeError("Invalid date format"),
    startTime: yup.string().required("Start Time is required"), // Keep as string, validation happens on type="time"
    duration: yup
        .number()
        .positive("Duration must be positive")
        .integer("Duration must be a whole number")
        .required("Duration (in hours) is required")
        .typeError("Duration must be a number"),
});

const ReservationForm = ({ isOpen, onClose, onSubmit, resourceType }) => {
    const {
        register,
        handleSubmit,
        reset, // Get reset function
        formState: { errors, isSubmitting }, // Use isSubmitting from react-hook-form
    } = useForm({
        resolver: yupResolver(reservationSchema),
        defaultValues: {
            // Set default values
            resourceId: "",
            date: new Date().toISOString().split("T")[0], // Default to today
            startTime: "",
            duration: 1, // Default duration to 1 hour
        },
    });

    const { addToast } = useToast(); // Get addToast function
    const [resources, setResources] = useState([]);
    const [loadingResources, setLoadingResources] = useState(true); // Renamed for clarity
    const [resourceError, setResourceError] = useState(null); // Renamed for clarity
    const [submitError, setSubmitError] = useState(null); // State for submission errors

    // Fetch resources when modal opens or resourceType changes
    useEffect(() => {
        async function fetchResources() {
            if (!isOpen) return; // Only fetch if modal is open

            setLoadingResources(true);
            setResourceError(null);
            setSubmitError(null);
            reset(); // Reset form fields when modal opens or type changes

            try {
                const url = `/api/resources${resourceType ? `?type=${resourceType}` : ""}`;
                const res = await fetch(url);
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(
                        errorData.message || `HTTP error! Status: ${res.status}`,
                    );
                }
                const data = await res.json();
                setResources(data);
            } catch (err) {
                console.error("Error fetching resources:", err);
                setResourceError(
                    err.message || "Failed to load resources. Please try again.",
                );
            } finally {
                setLoadingResources(false);
            }
        }

        fetchResources();
    }, [isOpen, resourceType, reset]);

    // Handle the form submission process
    const handleFormSubmit = async (data) => {
        setSubmitError(null);
        try {
            // Combine date and time before submitting if needed by backend
            // Example: const startDateTime = new Date(`${data.date}T${data.startTime}`);
            // const dataToSubmit = { ...data, startDateTime };
            // await onSubmit(dataToSubmit);

            // Assuming onSubmit handles data as is
            await onSubmit(data);

            addToast("Reservation created successfully!", "success");
            reset();
            onClose();
        } catch (err) {
            console.error("Error creating reservation:", err);
            const message =
                err.message || "Failed to create reservation. Please try again.";
            setSubmitError(message);
            addToast(message, "error");
        }
    };

    const formatTitle = (title) => {
        if (!title) return "Reservation";
        const words = title.toLowerCase().split("_");
        const capitalizedWords = words.map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1),
        );
        return `${capitalizedWords.join(" ")} Reservation`;
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
                    {formatTitle(resourceType)}
                </h2>

                {loadingResources && (
                    <p className="text-neutral">Loading resources...</p>
                )}
                {resourceError && <p className="text-red-500 mb-3">{resourceError}</p>}
                {submitError && (
                    <p className="text-red-500 text-sm mb-3">Error: {submitError}</p>
                )}

                {!loadingResources && !resourceError && (
                    <form
                        onSubmit={handleSubmit(handleFormSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <label
                                htmlFor="resourceId"
                                className="block text-sm font-medium text-neutral"
                            >
                                Resource
                            </label>
                            <select
                                id="resourceId"
                                {...register("resourceId")}
                                className={`mt-1 block w-full border rounded-md p-2 bg-inherit ${
                                    errors.resourceId ? "border-red-500" : "border-neutral"
                                }`}
                                disabled={isSubmitting}
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
                            <label
                                htmlFor="date"
                                className="block text-sm font-medium text-neutral"
                            >
                                Date
                            </label>
                            <input
                                id="date"
                                type="date"
                                {...register("date")}
                                className={`mt-1 block w-full border rounded-md p-2 bg-inherit ${
                                    errors.date ? "border-red-500" : "border-neutral"
                                }`}
                                disabled={isSubmitting}
                            />
                            {errors.date && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.date.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="startTime"
                                className="block text-sm font-medium text-neutral"
                            >
                                Start Time
                            </label>
                            <input
                                id="startTime"
                                type="time"
                                {...register("startTime")}
                                className={`mt-1 block w-full border rounded-md p-2 bg-inherit ${
                                    errors.startTime ? "border-red-500" : "border-neutral"
                                }`}
                                disabled={isSubmitting}
                            />
                            {errors.startTime && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.startTime.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="duration"
                                className="block text-sm font-medium text-neutral"
                            >
                                Duration (hours)
                            </label>
                            <input
                                id="duration"
                                type="number"
                                min="1"
                                {...register("duration", { valueAsNumber: true })}
                                className={`mt-1 block w-full border rounded-md p-2 bg-inherit ${
                                    errors.duration ? "border-red-500" : "border-neutral"
                                }`}
                                disabled={isSubmitting}
                            />
                            {errors.duration && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.duration.message}
                                </p>
                            )}
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
                                {isSubmitting ? "Reserving..." : "Reserve"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ReservationForm;
