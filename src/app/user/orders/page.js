"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchOrders() {
            setLoading(true);
            try {
                // Fetching orders from the correct location
                // const res = await fetch("/api/orders");
                // if (!res.ok) {
                //  throw new Error(`HTTP error! Status: ${res.status}`);
                // }
                // const data = await res.json();
                // setOrders(data);

                // Load data:
                // await new Promise((resolve) => setTimeout(resolve, 1000));
                setOrders(mockOrders);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError("Failed to load orders. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    // The function for a proper formatting if its the case
    const getStatusClass = (status) => {
        const s = status.toLowerCase();
        if (s === "delivered") return "bg-green-100 text-green-800";
        if (s === "processing") return "bg-yellow-100 text-yellow-800";
        if (s === "shipped") return "bg-blue-100 text-blue-800";
        return "bg-gray-100 text-gray-800";
    };

    return (
        <ProtectedRoute>
            <div className="fade-in">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary">Orders</h1>
                    <p className="text-neutral mt-2">Track and manage your orders</p>
                </div>

                {/* Orders Table */}
                <div className="card">
                    {loading && <p className="text-neutral">Loading orders...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && !error && (
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-accent">
                                <th className="text-left pb-3 text-neutral">Order ID</th>
                                <th className="text-left pb-3 text-neutral">Item</th>
                                <th className="text-left pb-3 text-neutral">Date</th>
                                <th className="text-left pb-3 text-neutral">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => {
                                let itemDetails = "";
                                switch (order.itemType) {
                                    case "MEAL":
                                        itemDetails = `Meal: ${order.menuItem?.title} from ${order.restaurant?.name}`;
                                        break;
                                    case "IT_EQUIPMENT":
                                        itemDetails = `IT: ${order.device?.name}`;
                                        break;
                                    default:
                                        itemDetails = "Unknown Item";
                                }

                                return (
                                    <tr key={order.id} className="border-b border-accent last:border-0">
                                        <td className="py-3 text-neutral">ORD-{order.id}</td>
                                        <td className="py-3 text-neutral">{itemDetails}</td>
                                        <td className="py-3 text-neutral">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}

// This is sample mock data
const mockOrders = [
    {
        id: 1,
        itemType: "IT_EQUIPMENT",
        item: "Laptop",
        createdAt: new Date(), //  time information.
        status: "Shipped",
        device: {name: "Dell Laptop", }
    },
    {
        id: 2,
        itemType: "MEAL",
        item: "Pizza",
        createdAt: new Date(),
        status: "Pending",
        restaurant: { name: "Pizza Palace"},
        menuItem: {title: "Pepperoni Pizza"},
    },
    {
        id: 3,
        itemType: "IT_EQUIPMENT",
        item: "Keyboard",
        createdAt: new Date(),
        status: "Delivered",
        device: {name: "Wireless Keyboard", }
    },
    {
        id: 4,
        itemType: "MEAL",
        item: "Sushi",
        createdAt: new Date(),
        status: "Cancelled",
        restaurant: { name: "Sushi Time"},
        menuItem: {title: "Salmon Roll"},
    }
];
