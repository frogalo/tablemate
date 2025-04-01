"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import RestaurantForm from "@/components/forms/RestaurantForm";
import AccessoryForm from "@/components/forms/AccessoryForm";
import { PulseLoader } from "react-spinners"; // Import PulseLoader

// Returns a background/text color class based on status
function getStatusBg(status) {
    const s = status.toLowerCase();
    if (s === "delivered") return "bg-green-100 text-green-800";
    if (s === "processing") return "bg-yellow-100 text-yellow-800";
    if (s === "shipped") return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
}

export default function AdminOrders() {
    // Mockup data for IT Orders
    const initialItOrders = [
        {
            id: "1001",
            user: "john.doe@example.com",
            item: "Laptop ",
            status: "Processing",
        },
        {
            id: "1002",
            user: "jane.smith@example.com",
            item: "Monitor ",
            status: "Shipped",
        },
        {
            id: "1003",
            user: "david.lee@example.com",
            item: "Keyboard ",
            status: "Delivered",
        },
    ];

    // Local states (using as placeholders until replaced by actual API data)
    const [itOrders, setItOrders] = useState(initialItOrders);
    const [accessories, setAccessories] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [loadingAccessories, setLoadingAccessories] = useState(true);
    const [loadingRestaurants, setLoadingRestaurants] = useState(true);

    // Modal state
    const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
    const [isAccessoryModalOpen, setIsAccessoryModalOpen] = useState(false);

    // For restaurant edit/delete actions.
    const [restaurantToEdit, setRestaurantToEdit] = useState(null);
    const [restaurantToDelete, setRestaurantToDelete] = useState(null);

    // For accessory edit/delete actions.
    const [accessoryToEdit, setAccessoryToEdit] = useState(null);
    const [accessoryToDelete, setAccessoryToDelete] = useState(null);

    // Fetch data from API GET endpoints on component mount.
    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch all data concurrently.
                const [ordersRes, accessoriesRes, restaurantsRes] = await Promise.all([
                    fetch("/api/orders"),
                    fetch("/api/accessories"),
                    fetch("/api/restaurants"),
                ]);

                if (ordersRes.ok) {
                    const ordersData = await ordersRes.json();
                    setItOrders(ordersData);
                }
                if (accessoriesRes.ok) {
                    const accessoriesData = await accessoriesRes.json();
                    setAccessories(accessoriesData);
                }
                if (restaurantsRes.ok) {
                    const restaurantsData = await restaurantsRes.json();
                    setRestaurants(restaurantsData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoadingOrders(false);
                setLoadingAccessories(false);
                setLoadingRestaurants(false);
            }
        }
        fetchData();
    }, []);

    const handleAddCompany = (newRestaurant) => {
        // For creating a new restaurant.
        setRestaurants([...restaurants, { ...newRestaurant, orderCount: 0 }]);
        setIsCompanyModalOpen(false);
    };

    const handleAddAccessory = (newAccessory) => {
        // For creating a new accessory.
        // If editing, update the accessory list accordingly.
        if (accessoryToEdit) {
            setAccessories(
                accessories.map((acc) => (acc.id === newAccessory.id ? newAccessory : acc))
            );
            setAccessoryToEdit(null);
        } else {
            setAccessories([...accessories, newAccessory]);
        }
        setIsAccessoryModalOpen(false);
    };

    // Edit and Remove handlers for restaurants and accessories.
    const handleEditItem = (item, type) => {
        if (type === "restaurant") {
            setRestaurantToEdit(item);
            setIsCompanyModalOpen(true);
        } else if (type === "accessory") {
            setAccessoryToEdit(item);
            setIsAccessoryModalOpen(true);
        } else {
            console.log("Edit", type, item);
        }
    };

    // Remove handler that calls the API.
    const handleRemoveItem = async (item, type) => {
        try {
            // Generate the API URL based on item type.
            let apiUrl = "";
            if (type === "restaurant") {
                apiUrl = `/api/restaurants/${item.id}`;
            } else if (type === "accessory") {
                apiUrl = `/api/accessories/${item.id}`;
            } else if (type === "order") {
                apiUrl = `/api/orders/${item.id}`;
            } else {
                console.log("Unknown type:", type);
                return;
            }

            const res = await fetch(apiUrl, {
                method: "DELETE",
            });

            if (!res.ok) {
                console.error(`Failed to remove ${type}`);
                return;
            }

            // Update local state if deletion was successful.
            if (type === "restaurant") {
                setRestaurants(restaurants.filter((restaurant) => restaurant.id !== item.id));
            } else if (type === "accessory") {
                setAccessories(
                    accessories.filter((accessory) => accessory.id !== item.id)
                );
            } else if (type === "order") {
                setItOrders(itOrders.filter((order) => order.id !== item.id));
            }
        } catch (error) {
            console.error("Error removing", type, error);
        }
    };

    return (
        <ProtectedRoute>
            <div className="p-8 space-y-12">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">
                        Admin Orders &amp; Inventory
                    </h1>
                    <p className="text-neutral">
                        Manage IT accessories orders, monitor IT accessories inventory (with
                        allocation details), and add new food delivery companies. Use this panel
                        to keep track of orders, storage items, and their allocation to users.
                    </p>
                </div>

                {/* IT Accessories Orders Section */}
                <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                        IT Accessories Orders
                    </h2>
                    {loadingOrders ? (
                        <div className="flex items-center justify-center">
                            <PulseLoader color="rgb(var(--color-primary-500))" size={16} />
                        </div>
                    ) : itOrders.length > 0 ? (
                        <div className="card overflow-x-auto">
                            <table className="table-fixed w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral hidden md:table-cell">
                                        ID
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        User
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        Item
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        Status
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral hidden sm:table-cell">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {itOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="border-b border-accent last:border-0"
                                    >
                                        <td className="w-1/5 px-4 py-2 text-neutral hidden md:table-cell whitespace-normal">
                                            {order.id}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                                            {order.user}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                                            {order.item}
                                        </td>
                                        <td
                                            className={`w-1/5 px-4 py-2 text-center ${getStatusBg(
                                                order.status
                                            )} whitespace-normal`}
                                        >
                                            {order.status}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral hidden sm:table-cell whitespace-normal">
                                            <button
                                                type="button"
                                                onClick={() => handleEditItem(order, "order")}
                                                className="mx-1 text-blue-500 hover:text-blue-700"
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveItem(order, "order")}
                                                className="mx-1 text-red-500 hover:text-red-700"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-neutral">No orders yet.</p>
                    )}
                </section>

                {/* IT Accessories Inventory Section */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-primary">
                            IT Accessories Inventory
                        </h2>
                        <button
                            onClick={() => {
                                setAccessoryToEdit(null);
                                setIsAccessoryModalOpen(true);
                            }}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Add New IT Accessory
                        </button>
                    </div>
                    {loadingAccessories ? (
                        <div className="flex items-center justify-center">
                            <PulseLoader color="rgb(var(--color-primary-500))" size={16} />
                        </div>
                    ) : accessories.length > 0 ? (
                        <div className="card overflow-x-auto">
                            <table className="table-fixed w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral hidden md:table-cell">
                                        ID
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        Accessory Name
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        In Storage
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        With Users
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral hidden sm:table-cell">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {accessories.map((accessory) => (
                                    <tr
                                        key={accessory.id}
                                        className="border-b border-accent last:border-0"
                                    >
                                        <td className="w-1/5 px-4 py-2 text-neutral hidden md:table-cell whitespace-normal">
                                            {accessory.id}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                                            {accessory.name}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                                            {accessory.quantity}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                                            {accessory.allocated || 0}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral hidden sm:table-cell whitespace-normal">
                                            <button
                                                type="button"
                                                onClick={() => handleEditItem(accessory, "accessory")}
                                                className="cursor-pointer mx-1 text-blue-500 hover:text-blue-700"
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setAccessoryToDelete(accessory)}
                                                className="cursor-pointer mx-1 text-red-500 hover:text-red-700"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-neutral">
                            No IT accessories in inventory yet.
                        </p>
                    )}
                </section>

                {/* Confirmation modal for deleting an accessory */}
                {accessoryToDelete && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
                        <div
                            className="absolute inset-0 bg-black opacity-50"
                            onClick={() => setAccessoryToDelete(null)}
                        ></div>
                        <div className="relative bg-light rounded p-6 mx-4 max-w-sm w-full card">
                            <h3 className="text-xl font-bold text-primary mb-4">
                                Confirm Delete
                            </h3>
                            <p className="mb-6 text-neutral">
                                Are you sure you want to delete accessory &quot;
                                {accessoryToDelete.name}&quot;?
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setAccessoryToDelete(null)}
                                    className="px-4 py-2 rounded bg-gray-300 text-neutral hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleRemoveItem(accessoryToDelete, "accessory");
                                        setAccessoryToDelete(null);
                                    }}
                                    className="cursor-pointer  px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Restaurants Section */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-primary">
                            Restaurants
                        </h2>
                        <button
                            onClick={() => {
                                setRestaurantToEdit(null);
                                setIsCompanyModalOpen(true);
                            }}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Add New Restaurant
                        </button>
                    </div>
                    {loadingRestaurants ? (
                        <div className="flex items-center justify-center">
                            <PulseLoader color="rgb(var(--color-primary-500))" size={16} />
                        </div>
                    ) : restaurants.length > 0 ? (
                        <div className="card overflow-x-auto">
                            <table className="table-fixed w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral hidden md:table-cell">
                                        ID
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        Name
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        Email
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        Orders
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral hidden sm:table-cell">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {restaurants.map((restaurant) => (
                                    <tr
                                        key={restaurant.id}
                                        className="border-b border-accent last:border-0"
                                    >
                                        <td className="w-1/5 px-4 py-2 text-neutral hidden md:table-cell whitespace-normal">
                                            {restaurant.id}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                                            {restaurant.name}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                                            {restaurant.email}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                                            {restaurant.orderCount}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral hidden sm:table-cell whitespace-normal">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setRestaurantToEdit(restaurant);
                                                    setIsCompanyModalOpen(true);
                                                }}
                                                className="cursor-pointer mx-1 text-blue-500 hover:text-blue-700"
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setRestaurantToDelete(restaurant)}
                                                className="cursor-pointer mx-1 text-red-500 hover:text-red-700"
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-neutral">No restaurants added yet.</p>
                    )}
                </section>

                {/* Confirmation modal for deleting a restaurant */}
                {restaurantToDelete && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
                        <div
                            className="absolute inset-0 bg-black opacity-50"
                            onClick={() => setRestaurantToDelete(null)}
                        ></div>
                        <div className="relative bg-light rounded p-6 mx-4 max-w-sm w-full card">
                            <h3 className="text-xl font-bold text-primary mb-4">
                                Confirm Delete
                            </h3>
                            <p className="mb-6 text-neutral">
                                Are you sure you want to delete restaurant &quot;
                                {restaurantToDelete.name}&quot;?
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setRestaurantToDelete(null)}
                                    className="px-4 py-2 rounded bg-gray-300 text-neutral hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleRemoveItem(restaurantToDelete, "restaurant");
                                        setRestaurantToDelete(null);
                                    }}
                                    className="cursor-pointer  px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modals */}
                <AccessoryForm
                    isOpen={isAccessoryModalOpen}
                    onClose={() => {
                        setIsAccessoryModalOpen(false);
                        setAccessoryToEdit(null);
                    }}
                    onSave={handleAddAccessory}
                    // Pass accessoryToEdit so that AccessoryForm can prefill data if editing.
                    initialAccessory={accessoryToEdit}
                />
                <RestaurantForm
                    isOpen={isCompanyModalOpen}
                    onClose={() => {
                        setIsCompanyModalOpen(false);
                        setRestaurantToEdit(null);
                    }}
                    onSave={handleAddCompany}
                    // Pass restaurantToEdit so that RestaurantForm can prefill data if editing.
                    initialRestaurant={restaurantToEdit}
                />
            </div>
        </ProtectedRoute>
    );
}
