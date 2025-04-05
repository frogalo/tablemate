"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useToast } from "@/lib/useToast";

const orderFoodSchema = yup.object().shape({
    restaurantId: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required("Restaurant selection is required"),
    deliveryAddress: yup.string().required("Delivery Address is required"),
    deliveryDateTime: yup
        .date()
        .required("Delivery Date and Time is required")
        .typeError("Invalid date/time format"),
    orderNotes: yup.string().nullable(),
    menuItems: yup
        .array()
        .of(
            yup.object().shape({
                itemId: yup
                    .number()
                    .transform((value) => (isNaN(value) ? undefined : value))
                    .required("Menu Item selection is required"),
                quantity: yup
                    .number()
                    .positive("Quantity must be positive")
                    .integer("Quantity must be a whole number")
                    .required("Quantity is required")
                    .typeError("Quantity must be a number"),
            }),
        )
        .min(1, "Please add at least one menu item"), // Ensure at least one item is added
});

const OrderFoodForm = ({ isOpen, onClose, onSubmit }) => {
    const {
        register,
        control, // Control is needed for useFieldArray
        handleSubmit,
        watch,
        reset, // Get reset function
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(orderFoodSchema),
        defaultValues: {
            restaurantId: "",
            deliveryAddress: "",
            deliveryDateTime: "",
            orderNotes: "",
            menuItems: [{ itemId: "", quantity: 1 }], // Start with one empty item row
        },
    });

    // useFieldArray for dynamic menu items
    const { fields, append, remove } = useFieldArray({
        control,
        name: "menuItems",
    });

    const { addToast } = useToast();
    const [restaurants, setRestaurants] = useState([]);
    const [menuItemsData, setMenuItemsData] = useState([]); // Renamed to avoid conflict
    const [loadingRestaurants, setLoadingRestaurants] = useState(true);
    const [restaurantError, setRestaurantError] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0.0);

    const watchedMenuItems = watch("menuItems");
    const watchedRestaurantId = watch("restaurantId");

    // Calculate total price
    useEffect(() => {
        if (watchedMenuItems && menuItemsData.length > 0) {
            let total = 0;
            watchedMenuItems.forEach((item) => {
                const matchingItem = menuItemsData.find(
                    (i) => i.id === Number(item.itemId),
                );
                if (matchingItem && item.quantity > 0) {
                    total += matchingItem.price * item.quantity;
                }
            });
            setTotalPrice(total);
        } else {
            setTotalPrice(0.0);
        }
    }, [watchedMenuItems, menuItemsData]);

    // Fetch restaurants when modal opens
    useEffect(() => {
        async function fetchRestaurants() {
            if (!isOpen) return;

            setLoadingRestaurants(true);
            setRestaurantError(null);
            setSubmitError(null);
            setMenuItemsData([]); // Clear menu items when modal opens/reopens
            reset(); // Reset form fields

            try {
                const res = await fetch("/api/restaurants");
                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    throw new Error(
                        errorData.message || `HTTP error! Status: ${res.status}`,
                    );
                }
                const data = await res.json();
                setRestaurants(data);
            } catch (err) {
                console.error("Error fetching restaurants:", err);
                setRestaurantError(
                    err.message || "Failed to load restaurants. Please try again.",
                );
            } finally {
                setLoadingRestaurants(false);
            }
        }

        fetchRestaurants();
    }, [isOpen, reset]);

    // Fetch menu items when restaurant changes
    useEffect(() => {
        if (watchedRestaurantId) {
            const selectedRestaurant = restaurants.find(
                (r) => r.id === Number(watchedRestaurantId),
            );
            setMenuItemsData(selectedRestaurant ? selectedRestaurant.menu || [] : []);
            // Optionally reset menuItems array in form state when restaurant changes
            // resetField("menuItems", { defaultValue: [{ itemId: "", quantity: 1 }] });
        } else {
            setMenuItemsData([]);
        }
    }, [watchedRestaurantId, restaurants]);

    const handleFormSubmit = async (data) => {
        setSubmitError(null);
        try {
            // Add total price to the submitted data if needed by the backend
            const dataToSubmit = { ...data, totalPrice: totalPrice.toFixed(2) };
            await onSubmit(dataToSubmit);
            addToast("Food ordered successfully!", "success");
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
            <div className="relative bg-card-bg rounded p-6 mx-4 max-w-lg w-full card max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-primary mb-4">Order Food</h2>

                {loadingRestaurants && (
                    <p className="text-neutral">Loading restaurants...</p>
                )}
                {restaurantError && (
                    <p className="text-red-500 mb-3">{restaurantError}</p>
                )}
                {submitError && (
                    <p className="text-red-500 text-sm mb-3">Error: {submitError}</p>
                )}

                {!loadingRestaurants && !restaurantError && (
                    <form
                        onSubmit={handleSubmit(handleFormSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <label
                                htmlFor="restaurantId"
                                className="block text-sm font-medium text-neutral"
                            >
                                Restaurant
                            </label>
                            <select
                                id="restaurantId"
                                {...register("restaurantId")}
                                className={`mt-1 block w-full border rounded-md p-2 bg-inherit ${
                                    errors.restaurantId ? "border-red-500" : "border-neutral"
                                }`}
                                disabled={isSubmitting}
                            >
                                <option value="">Select a Restaurant</option>
                                {restaurants.map((restaurant) => (
                                    <option key={restaurant.id} value={restaurant.id}>
                                        {restaurant.name}
                                    </option>
                                ))}
                            </select>
                            {errors.restaurantId && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.restaurantId.message}
                                </p>
                            )}
                        </div>

                        {/* Only show menu items section if a restaurant is selected */}
                        {watchedRestaurantId && menuItemsData.length > 0 && (
                            <div className="border border-neutral p-3 rounded-md">
                                <label className="block text-sm font-medium text-neutral mb-2">
                                    Menu Items
                                </label>
                                {fields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="flex items-center space-x-2 mb-2"
                                    >
                                        <div className="flex-grow">
                                            <select
                                                {...register(`menuItems.${index}.itemId`)}
                                                className={`w-full border rounded-md p-2 bg-inherit text-sm ${
                                                    errors.menuItems?.[index]?.itemId
                                                        ? "border-red-500"
                                                        : "border-neutral"
                                                }`}
                                                disabled={isSubmitting}
                                            >
                                                <option value="">Select Item</option>
                                                {menuItemsData.map((menuItem) => (
                                                    <option key={menuItem.id} value={menuItem.id}>
                                                        {menuItem.title} - ${menuItem.price?.toFixed(2)}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.menuItems?.[index]?.itemId && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.menuItems[index].itemId.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="w-20">
                                            <input
                                                type="number"
                                                min="1"
                                                {...register(`menuItems.${index}.quantity`, {
                                                    valueAsNumber: true,
                                                })}
                                                className={`w-full border rounded-md p-2 bg-inherit text-sm ${
                                                    errors.menuItems?.[index]?.quantity
                                                        ? "border-red-500"
                                                        : "border-neutral"
                                                }`}
                                                disabled={isSubmitting}
                                            />
                                            {errors.menuItems?.[index]?.quantity && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.menuItems[index].quantity.message}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            disabled={isSubmitting || fields.length <= 1} // Prevent removing the last item easily
                                            className={`text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed p-2 ${
                                                fields.length <= 1 ? "invisible" : ""
                                            }`} // Hide if only one item
                                            aria-label="Remove Item"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => append({ itemId: "", quantity: 1 })}
                                    disabled={isSubmitting}
                                    className="mt-2 text-sm btn-primary px-3 py-1 disabled:opacity-50"
                                >
                                    <i className="fas fa-plus mr-1"></i> Add Item
                                </button>
                                {errors.menuItems && !errors.menuItems?.[fields.length - 1] && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.menuItems.message ||
                                            errors.menuItems.root?.message}
                                    </p>
                                )}
                            </div>
                        )}
                        {watchedRestaurantId && menuItemsData.length === 0 && (
                            <p className="text-neutral text-sm">
                                No menu items available for this restaurant.
                            </p>
                        )}

                        <div>
                            <label
                                htmlFor="deliveryAddress"
                                className="block text-sm font-medium text-neutral"
                            >
                                Delivery Address
                            </label>
                            <input
                                id="deliveryAddress"
                                type="text"
                                {...register("deliveryAddress")}
                                className={`mt-1 block w-full border rounded-md p-2 bg-inherit ${
                                    errors.deliveryAddress ? "border-red-500" : "border-neutral"
                                }`}
                                disabled={isSubmitting}
                            />
                            {errors.deliveryAddress && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.deliveryAddress.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="deliveryDateTime"
                                className="block text-sm font-medium text-neutral"
                            >
                                Delivery Date and Time
                            </label>
                            <input
                                id="deliveryDateTime"
                                type="datetime-local"
                                {...register("deliveryDateTime")}
                                className={`mt-1 block w-full border rounded-md p-2 bg-inherit ${
                                    errors.deliveryDateTime ? "border-red-500" : "border-neutral"
                                }`}
                                disabled={isSubmitting}
                            />
                            {errors.deliveryDateTime && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.deliveryDateTime.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="orderNotes"
                                className="block text-sm font-medium text-neutral"
                            >
                                Order Notes (Optional)
                            </label>
                            <textarea
                                id="orderNotes"
                                {...register("orderNotes")}
                                rows={3}
                                className="mt-1 block w-full border border-neutral rounded-md p-2 bg-inherit"
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <div className="font-bold text-primary">
                                Total: ${totalPrice.toFixed(2)}
                            </div>
                            <div className="flex space-x-4">
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
                                    disabled={isSubmitting || totalPrice <= 0} // Also disable if total is zero
                                    className="btn-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Ordering..." : "Place Order"}
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default OrderFoodForm;
