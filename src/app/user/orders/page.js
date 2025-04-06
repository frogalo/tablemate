"use client";

import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import ProtectedRoute from "@/components/ProtectedRoute";
import OrderFoodForm from "@/components/forms/OrderFoodForm";
import ITEquipmentForm from "@/components/forms/ITEquipmentForm";
import SkeletonTable from "@/components/ui/SkeletonTable";
import Filters from "@/components/Filters";
import Table from "@/components/Table";

// Helper: Return a CSS class based on order status.
function getStatusClass(status) {
    const s = status.toLowerCase();
    if (s === "delivered") return "bg-green-100 text-green-800";
    if (s === "processing") return "bg-yellow-100 text-yellow-800";
    if (s === "shipped") return "bg-blue-100 text-blue-800";
    return "bg-red-100 text-red-800"; // default fallback
}

export default function UserOrders() {
    // Order data state (mocked)
    const [foodOrders, setFoodOrders] = useState([]);
    const [itOrders, setItOrders] = useState([]);
    const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
    const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);

    // Simulate data loading delay.
    const [ordersLoading, setOrdersLoading] = useState(true);
    useEffect(() => {
        // Mimic API delay.
        const timer = setTimeout(() => {
            setOrdersLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Load mock data for orders.
    useEffect(() => {
        async function loadMockData() {
            const mockupFoodOrders = [
                {
                    id: 1,
                    itemType: "MEAL",
                    itemId: 101,
                    userId: 1001,
                    restaurant: "Italian Place",
                    menuItem: "Pizza",
                    price: 12.99,
                    orderDate: "2024-05-04",
                    status: "Shipped",
                },
                {
                    id: 2,
                    itemType: "MEAL",
                    itemId: 102,
                    userId: 1002,
                    restaurant: "Mexican Grill",
                    menuItem: "Tacos",
                    price: 8.99,
                    orderDate: "2024-05-03",
                    status: "Processing",
                },
            ];

            const mockupITOrders = [
                {
                    id: 3,
                    itemType: "IT_EQUIPMENT",
                    itemId: 201,
                    userId: 2001,
                    equipmentType: "Laptop",
                    price: 1200.0,
                    orderDate: "2024-05-02",
                    status: "Delivered",
                },
                {
                    id: 4,
                    itemType: "IT_EQUIPMENT",
                    itemId: 202,
                    userId: 2002,
                    equipmentType: "Keyboard",
                    price: 75.0,
                    orderDate: "2024-05-01",
                    status: "Processing",
                },
            ];

            setFoodOrders(mockupFoodOrders);
            setItOrders(mockupITOrders);
        }
        loadMockData();
    }, []);

    // --- Filtering: Food Orders ---
    const [foodFilterText, setFoodFilterText] = useState("");
    const [foodStatusFilter, setFoodStatusFilter] = useState("ALL");
    const [foodSortDirection, setFoodSortDirection] = useState("asc");

    const filteredFoodOrders = foodOrders.filter((order) => {
        const search = foodFilterText.toLowerCase();
        const matchesText =
            order.restaurant.toLowerCase().includes(search) ||
            order.menuItem.toLowerCase().includes(search);
        const statusMatch =
            foodStatusFilter === "ALL" ||
            order.status.toLowerCase() === foodStatusFilter.toLowerCase();
        return matchesText && statusMatch;
    });
    // (Additional sort logic can be added here.)

    const toggleFoodSortDirection = () =>
        setFoodSortDirection(foodSortDirection === "asc" ? "desc" : "asc");

    const clearFoodFilters = () => {
        setFoodFilterText("");
        setFoodStatusFilter("ALL");
        setFoodSortDirection("asc");
    };

    // --- Filtering: IT Equipment Orders ---
    const [itFilterText, setItFilterText] = useState("");
    const [itStatusFilter, setItStatusFilter] = useState("ALL");
    const [itSortDirection, setItSortDirection] = useState("asc");

    const filteredItOrders = itOrders.filter((order) => {
        const search = itFilterText.toLowerCase();
        const matchesText = order.equipmentType.toLowerCase().includes(search);
        const statusMatch =
            itStatusFilter === "ALL" ||
            order.status.toLowerCase() === itStatusFilter.toLowerCase();
        return matchesText && statusMatch;
    });
    // (Additional sort logic can be added here.)

    const toggleItSortDirection = () =>
        setItSortDirection(itSortDirection === "asc" ? "desc" : "asc");

    const clearItFilters = () => {
        setItFilterText("");
        setItStatusFilter("ALL");
        setItSortDirection("asc");
    };

    // Handlers for opening modals.
    const handleAddFoodOrder = () => setIsFoodModalOpen(true);
    const handleAddITEquipmentOrder = () => setIsEquipmentModalOpen(true);

    return (
        <ProtectedRoute>
            <div className="p-8 space-y-12">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">
                        Admin Orders
                    </h1>
                    <p className="text-neutral">
                        Manage food and IT equipment orders. Use this panel to view, track,
                        and create new orders.
                    </p>
                </div>

                {/* Food Orders Section with Filters & Table */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-primary">Food Orders</h2>
                        <button
                            onClick={handleAddFoodOrder}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Create New Food Order
                        </button>
                    </div>
                    <Filters
                        filterText={foodFilterText}
                        setFilterText={setFoodFilterText}
                        filterOptions={[
                            { value: "ALL", label: "All Statuses" },
                            { value: "processing", label: "Processing" },
                            { value: "shipped", label: "Shipped" },
                            { value: "delivered", label: "Delivered" },
                        ]}
                        selectedFilter={foodStatusFilter}
                        setSelectedFilter={setFoodStatusFilter}
                        sortField="Order ID"
                        sortDirection={foodSortDirection}
                        handleSort={toggleFoodSortDirection}
                        clearFilters={clearFoodFilters}
                        totalCount={foodOrders.length}
                        filteredCount={filteredFoodOrders.length}
                    />
                    {ordersLoading ? (
                        <SkeletonTable
                            columns={[
                                "Order ID",
                                "Item",
                                "User ID",
                                "Price",
                                "Order Date",
                                "Status",
                                "Actions",
                            ]}
                        />
                    ) : (
                        <Table
                            columns={[
                                "Order ID",
                                "Item",
                                "User ID",
                                "Price",
                                "Order Date",
                                "Status",
                                "Actions",
                            ]}
                            data={filteredFoodOrders}
                            renderRow={(order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-accent last:border-0 hover:bg-[var(--body-bg)] cursor-pointer"
                                >
                                    <td className="py-3 text-neutral">ORD-{order.id}</td>
                                    <td className="py-3 text-neutral">
                                        {order.restaurant} - {order.menuItem}
                                    </td>
                                    <td className="py-3 text-neutral">{order.userId}</td>
                                    <td className="py-3 text-neutral">
                                        ${order.price.toFixed(2)}
                                    </td>
                                    <td className="py-3 text-neutral">{order.orderDate}</td>
                                    <td className="py-3 text-center">
                    <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusClass(
                            order.status
                        )}`}
                    >
                      {order.status}
                    </span>
                                    </td>
                                    <td className="py-3 text-center">
                                        {order.status === "Processing" && (
                                            <>
                                                <button className="mx-2 text-blue-500 hover:text-blue-700">
                                                    Edit
                                                </button>
                                                <button className="mx-2 text-red-500 hover:text-red-700">
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            )}
                            emptyMessage={"No food orders found."}
                        />
                    )}
                </section>

                {/* IT Equipment Orders Section with Filters & Table */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-primary">
                            IT Equipment Orders
                        </h2>
                        <button
                            onClick={handleAddITEquipmentOrder}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Create New IT Equipment Order
                        </button>
                    </div>
                    <Filters
                        filterText={itFilterText}
                        setFilterText={setItFilterText}
                        filterOptions={[
                            { value: "ALL", label: "All Statuses" },
                            { value: "processing", label: "Processing" },
                            { value: "shipped", label: "Shipped" },
                            { value: "delivered", label: "Delivered" },
                        ]}
                        selectedFilter={itStatusFilter}
                        setSelectedFilter={setItStatusFilter}
                        sortField="Order ID"
                        sortDirection={itSortDirection}
                        handleSort={toggleItSortDirection}
                        clearFilters={clearItFilters}
                        totalCount={itOrders.length}
                        filteredCount={filteredItOrders.length}
                    />
                    {ordersLoading ? (
                        <SkeletonTable
                            columns={[
                                "Order ID",
                                "Item",
                                "User ID",
                                "Price",
                                "Order Date",
                                "Status",
                                "Actions",
                            ]}
                        />
                    ) : (
                        <Table
                            columns={[
                                "Order ID",
                                "Item",
                                "User ID",
                                "Price",
                                "Order Date",
                                "Status",
                                "Actions",
                            ]}
                            data={filteredItOrders}
                            renderRow={(order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-accent last:border-0 hover:bg-[var(--body-bg)] cursor-pointer"
                                >
                                    <td className="py-3 text-neutral">ORD-{order.id}</td>
                                    <td className="py-3 text-neutral">{order.equipmentType}</td>
                                    <td className="py-3 text-neutral">{order.userId}</td>
                                    <td className="py-3 text-neutral">
                                        ${order.price.toFixed(2)}
                                    </td>
                                    <td className="py-3 text-neutral">{order.orderDate}</td>
                                    <td className="py-3 text-center">
                    <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusClass(
                            order.status
                        )}`}
                    >
                      {order.status}
                    </span>
                                    </td>
                                    <td className="py-3 text-center">
                                        {order.status === "Processing" && (
                                            <>
                                                <button className="mx-2 text-blue-500 hover:text-blue-700">
                                                    Edit
                                                </button>
                                                <button className="mx-2 text-red-500 hover:text-red-700">
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            )}
                            emptyMessage={"No IT equipment orders found."}
                        />
                    )}
                </section>

                {/* Load Form Modals */}
                <OrderFoodForm
                    isOpen={isFoodModalOpen}
                    onClose={() => setIsFoodModalOpen(false)}
                    onSubmit={() => console.log("Submitting Food data.")}
                />
                <ITEquipmentForm
                    isOpen={isEquipmentModalOpen}
                    onClose={() => setIsEquipmentModalOpen(false)}
                    onSubmit={() => console.log("Submitting ITEquipment data.")}
                />
            </div>
        </ProtectedRoute>
    );
}
