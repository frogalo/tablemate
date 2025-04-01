"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import RestaurantForm from "@/components/forms/RestaurantForm";
import AccessoryForm from "@/components/forms/AccessoryForm";

// Returns a background/text color class based on status
function getStatusBg(status) {
    const s = status.toLowerCase();
    if (s === "delivered") return "bg-green-100 text-green-800";
    if (s === "processing") return "bg-yellow-100 text-yellow-800";
    if (s === "shipped") return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
}

export default function AdminOrders() {
    // Local states, initially using sample data (which will be replaced by API getters)
    const [itOrders, setItOrders] = useState([]);
    const [accessories, setAccessories] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    // Modal state
    const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
    const [isAccessoryModalOpen, setIsAccessoryModalOpen] = useState(false);

    // Fetch data from API GET endpoints on component mount
    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch("/api/orders");
                if (res.ok) {
                    const data = await res.json();
                    setItOrders(data);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }

        async function fetchAccessories() {
            try {
                const res = await fetch("/api/accessories");
                if (res.ok) {
                    const data = await res.json();
                    setAccessories(data);
                }
            } catch (error) {
                console.error("Error fetching accessories:", error);
            }
        }

        async function fetchRestaurants() {
            try {
                const res = await fetch("/api/restaurants");
                if (res.ok) {
                    const data = await res.json();
                    setRestaurants(data);
                }
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        }

        fetchOrders();
        fetchAccessories();
        fetchRestaurants();
    }, []);

    const handleAddCompany = (newRestaurant) => {
        // Optionally, you can also post new restaurants to the API endpoint here.
        setRestaurants([...restaurants, { ...newRestaurant, orderCount: 0 }]);
        setIsCompanyModalOpen(false);
    };

    const handleAddAccessory = (newAccessory) => {
        // Optionally, you can also post new accessory to the API endpoint here.
        setAccessories([...accessories, newAccessory]);
        setIsAccessoryModalOpen(false);
    };

    // Sample handlers for edit and remove actions
    const handleEditItem = (item, type) => {
        console.log("Edit", type, item);
    };

    const handleRemoveItem = (item, type) => {
        console.log("Remove", type, item);
    };

    return (
        <ProtectedRoute>
            <div className="p-8 space-y-12">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">
                        Admin Orders & Inventory
                    </h1>
                    <p className="text-neutral">
                        Manage IT accessories orders, monitor IT accessories inventory (with
                        allocation details), and add new food delivery companies.
                        Use this panel to keep track of orders, storage items, and their allocation to users.
                    </p>
                </div>
                {/* IT Accessories Orders Section */}
                <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                        IT Accessories Orders
                    </h2>
                    {itOrders.length > 0 ? (
                        <div className="card overflow-x-auto">
                            <table className="table-fixed w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    {/* Hide ID column on small screens */}
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
                                                onClick={() => handleEditItem(order, "order")}
                                                className="mx-1 text-blue-500 hover:text-blue-700"
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                            <button
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
                            onClick={() => setIsAccessoryModalOpen(true)}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Add New IT Accessory
                        </button>
                    </div>
                    {accessories.length > 0 ? (
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
                                                onClick={() => handleEditItem(accessory, "accessory")}
                                                className="mx-1 text-blue-500 hover:text-blue-700"
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                            <button
                                                onClick={() => handleRemoveItem(accessory, "accessory")}
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
                        <p className="text-neutral">
                            No IT accessories in inventory yet.
                        </p>
                    )}
                </section>

                {/* Food Delivery Companies Section (Restaurants) */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-primary">
                            Restaurants
                        </h2>
                        <button
                            onClick={() => setIsCompanyModalOpen(true)}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Add New Restaurant
                        </button>
                    </div>
                    {restaurants.length > 0 ? (
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
                                                onClick={() => handleEditItem(restaurant, "restaurant")}
                                                className="mx-1 text-blue-500 hover:text-blue-700"
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                            <button
                                                onClick={() => handleRemoveItem(restaurant, "restaurant")}
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
                        <p className="text-neutral">No restaurants added yet.</p>
                    )}
                </section>

                {/* Modals */}
                <AccessoryForm
                    isOpen={isAccessoryModalOpen}
                    onClose={() => setIsAccessoryModalOpen(false)}
                    onSave={handleAddAccessory}
                />
                <RestaurantForm
                    isOpen={isCompanyModalOpen}
                    onClose={() => setIsCompanyModalOpen(false)}
                    onSave={handleAddCompany}
                />
            </div>
        </ProtectedRoute>
    );
}
