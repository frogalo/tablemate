"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import OrderFoodForm from "@/components/forms/OrderFoodForm";
import ITEquipmentForm from "@/components/forms/ITEquipmentForm";
import SkeletonTable from "@/components/ui/SkeletonTable";

// Implement color from different status
function getStatusClass(status) {
    const s = status.toLowerCase();
    if (s === "delivered") return "bg-green-100 text-green-800";
    if (s === "processing") return "bg-yellow-100 text-yellow-800";
    if (s === "shipped") return "bg-blue-100 text-blue-800";
    return "bg-red-100 text-red-800"; // default
}

export default function UserOrders() {
    // List being set to display.
    const [itOrders, setItOrders] = useState([]);
    const [foodOrders, setFoodOrders] = useState([]);
    const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
    const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);

    // Simulate data loading for orders (2 seconds)
    const [ordersLoading, setOrdersLoading] = useState(true);
    useEffect(() => {
        // Mimic API delay
        const timer = setTimeout(() => {
            setOrdersLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Load mock data for orders
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

    // Handlers for opening modals
    const handleAddFoodOrder = () => {
        setIsFoodModalOpen(true);
    };

    const handleAddITEquipmentOrder = () => {
        setIsEquipmentModalOpen(true);
    };

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

                {/* Food Orders Section */}
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
                    ) : foodOrders.length > 0 ? (
                        <div className="card">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    <th className="text-left pb-3 text-neutral">
                                        Order ID
                                    </th>
                                    <th className="text-left pb-3 text-neutral">Item</th>
                                    <th className="text-left pb-3 text-neutral">User ID</th>
                                    <th className="text-left pb-3 text-neutral">Price</th>
                                    <th className="text-left pb-3 text-neutral">Order Date</th>
                                    <th className="text-center pb-3 text-neutral">Status</th>
                                    <th className="text-center pb-3 text-neutral">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {foodOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="border-b border-accent last:border-0"
                                    >
                                        <td className="py-3 text-neutral">ORD-{order.id}</td>
                                        <td className="py-3 text-neutral">
                                            {order.restaurant} - {order.menuItem}
                                        </td>
                                        <td className="py-3 text-neutral">{order.userId}</td>
                                        <td className="py-3 text-neutral">${order.price}</td>
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
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-neutral">No food orders yet.</p>
                    )}
                </section>

                {/* IT Equipment Orders Section */}
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
                    ) : itOrders.length > 0 ? (
                        <div className="card">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    <th className="text-left pb-3 text-neutral">Order ID</th>
                                    <th className="text-left pb-3 text-neutral">Item</th>
                                    <th className="text-left pb-3 text-neutral">User ID</th>
                                    <th className="text-left pb-3 text-neutral">Price</th>
                                    <th className="text-left pb-3 text-neutral">Order Date</th>
                                    <th className="text-center pb-3 text-neutral">Status</th>
                                    <th className="text-center pb-3 text-neutral">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {itOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="border-b border-accent last:border-0"
                                    >
                                        <td className="py-3 text-neutral">ORD-{order.id}</td>
                                        <td className="py-3 text-neutral">{order.equipmentType}</td>
                                        <td className="py-3 text-neutral">{order.userId}</td>
                                        <td className="py-3 text-neutral">${order.price}</td>
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
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-neutral">No IT equipment orders yet.</p>
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

const recentActivities = [
    {
        description: "Conference room 'A' reserved",
        time: "5 minutes ago",
        color: "bg-primary",
    },
    {
        description: "New IT equipment order submitted",
        time: "1 hour ago",
        color: "bg-secondary",
    },
    {
        description: "Desk reservation cancelled",
        time: "3 hours ago",
        color: "bg-accent",
    },
    {
        description: "Parking spot 'B4' reserved",
        time: "5 hours ago",
        color: "bg-primary",
    },
];

const quickActions = [
    {
        label: "Room Reservation",
        href: "#",
        icon: "fa-door-open",
    },
    {
        label: "Parking Spot Reservation",
        href: "#",
        icon: "fa-parking",
    },
    {
        label: "Desk Reservation",
        href: "#",
        icon: "fa-chair",
    },
    {
        label: "Conference Room Reservation",
        href: "#",
        icon: "fa-building",
    },
    {
        label: "Order Food",
        href: "#",
        icon: "fa-utensils",
    },
    {
        label: "Order IT Equipment",
        href: "#",
        icon: "fa-laptop",
    },
];

const upcomingReservations = [
    {
        resource: "Conference Room A",
        date: "Today",
        time: "14:00 - 15:00",
        status: "Confirmed",
        statusClass: "bg-green-100 text-green-800",
    },
];
