"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation Schema
const orderFoodSchema = yup.object().shape({
    restaurantId: yup.number().required("Restaurant is required"),
    deliveryAddress: yup.string().required("Delivery Address is required"),
    deliveryDateTime: yup.date().required("Delivery Date and Time is required"),
    orderNotes: yup.string(),
    menuItems: yup.array().of(
        yup.object().shape({
            itemId: yup.number().required("Menu Item is required"),
            quantity: yup.number().positive().integer().required("Quantity is required"),
        })
    ),
});

const OrderFoodForm = ({ isOpen, onClose, onSubmit }) => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(orderFoodSchema),
        defaultValues: {
            menuItems: [],
        },
    });

    // Initial Restaurant States
    const [restaurants, setRestaurants] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Set initial to 0.0
    const [totalPrice, setTotalPrice] = useState(0.0);

    // Used to add to all selected options for the submitter
    const addItemToOrder = () => {
        setValue("menuItems", [
            ...(watch("menuItems") || []),
            { itemId: "", quantity: 1 },
        ]);
    };

    // Function runs any time there is a change to values in the component.
    useEffect(() => {
        if (watch("menuItems")) {
            // Fetch items, and run a total with these properties.
            let total = 0;

            watch("menuItems").forEach((item, index) => {
                // Add for each item and price point to check and create a total price.
                const matchingItem = menuItems.find((i) => i.id === Number(item.itemId));

                if (matchingItem) {
                    total += matchingItem.price * item.quantity;
                }
            });

            setTotalPrice(total);
        }
    }, [watch("menuItems")]);

    // Main UseEffect function for setting up the component and the functions available for general use in the app.
    useEffect(() => {
        async function fetchRestaurants() {
            setLoading(true);
            try {
                const res = await fetch("/api/restaurants");
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setRestaurants(data);
            } catch (err) {
                console.error("Error fetching restaurants:", err);
                setError("Failed to load restaurants. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchRestaurants();
    }, []);

    useEffect(() => {
        if (watch("restaurantId")) {
            const selectedRestaurant = restaurants.find(
                (r) => r.id === Number(watch("restaurantId"))
            );
            if (selectedRestaurant) {
                setMenuItems(selectedRestaurant.menu);
            } else {
                setMenuItems([]);
            }
        } else {
            setMenuItems([]);
        }
    }, [watch("restaurantId"), restaurants]);

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
            <div className="relative bg-light rounded p-6 mx-4 max-w-lg w-full card">
                <h2 className="text-2xl font-bold text-primary mb-4">Order Food</h2>
                {loading && <p className="text-neutral">Loading resources...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral">
                                Restaurant
                            </label>
                            <select
                                {...register("restaurantId", { valueAsNumber: true })}
                                className="w-full border border-neutral rounded p-2"
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
                        {menuItems.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-neutral">
                                    Menu Items
                                </label>
                                {watch("menuItems") &&
                                    watch("menuItems").map((item, index) => (
                                        <div key={index} className="flex items-center space-x-4 mb-2">
                                            {/* Menu item to select amount to pick of items */}
                                            <select
                                                {...register(`menuItems.${index}.itemId`, {
                                                    valueAsNumber: true,
                                                })}
                                                className="w-1/2 border border-neutral rounded p-2"
                                            >
                                                <option value="">Select Item</option>
                                                {menuItems.map((menuItem) => (
                                                    <option key={menuItem.id} value={menuItem.id}>
                                                        {menuItem.title} - ${menuItem.price}
                                                    </option>
                                                ))}
                                            </select>

                                            {/* Used to make changes to count items.  You can extend the properties from validation for each component. Here they start with quantity 1 to make for better user feedback. */}
                                            <input
                                                type="number"
                                                {...register(`menuItems.${index}.quantity`, {
                                                    valueAsNumber: true,
                                                })}
                                                defaultValue={1} //  Make changes here in components
                                                className="w-1/4 border border-neutral rounded p-2"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const updatedItems = watch("menuItems").filter((_, i) => i !== index);
                                                    setValue("menuItems", updatedItems);
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    ))}
                                <button
                                    type="button"
                                    onClick={addItemToOrder}
                                    className="mt-2 px-4 py-2 rounded btn-primary hover:scale-105 transition-transform"
                                >
                                    Add Item
                                </button>
                            </div>
                        )}

                        {/* Delivery Details and Properties from all functions */}
                        <div>
                            <label className="block text-sm font-medium text-neutral">
                                Delivery Address
                            </label>
                            <input
                                type="text"
                                {...register("deliveryAddress")}
                                className="w-full border border-neutral rounded p-2"
                            />
                            {errors.deliveryAddress && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.deliveryAddress.message}
                                </p>
                            )}
                        </div>

                        {/* Use date instead of time so user has some room to pick times.  These are then sent via javascript. */}
                        <div>
                            <label className="block text-sm font-medium text-neutral">
                                Delivery Date and Time
                            </label>
                            <input
                                type="datetime-local"
                                {...register("deliveryDateTime")}
                                className="w-full border border-neutral rounded p-2"
                            />
                            {errors.deliveryDateTime && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.deliveryDateTime.message}
                                </p>
                            )}
                        </div>

                        {/* General use properties that help with information sharing between the host server and its users */}
                        <div>
                            <label className="block text-sm font-medium text-neutral">
                                Order Notes
                            </label>
                            <textarea
                                {...register("orderNotes")}
                                className="w-full border border-neutral rounded p-2"
                            />
                        </div>

                        {/* Form Action Implementations  that add feedback about all steps.*/}
                        <div className="flex justify-between items-center">
                            <div className="font-bold text-primary">
                                Total: ${totalPrice.toFixed(2)}
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
                                    className="px-4 py-2 rounded btn-primary hover:scale-105 transition-transform"
                                >
                                    Order
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
