"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import ReservationForm from "@/components/forms/ReservationForm";
import OrderFoodForm from "@/components/forms/OrderFoodForm";
import ITEquipmentForm from "@/components/forms/ITEquipmentForm";
import { PulseLoader } from "react-spinners";
import SkeletonTable from "@/components/ui/SkeletonTable";

// Returns a background/text color class based on status
function getStatusBg(status) {
    const s = status.toLowerCase();
    if (s === "delivered") return "bg-green-100 text-green-800";
    if (s === "processing") return "bg-yellow-100 text-yellow-800";
    if (s === "shipped") return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
}

export default function Dashboard() {
    // Core states
    const [itOrders, setItOrders] = useState([]);
    const [accessories, setAccessories] = useState([]);
    const [restaurants, setRestaurants] = useState([]);

    // Modal States
    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
    const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
    const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);

    // For handling active form type (for reservations)
    const [activeFormType, setActiveFormType] = useState(null);
    const resetActiveFormType = () => setActiveFormType(null);

    // Form Submit Handler
    const handleFormSubmit = (formData, formName) => {
        // Simulate sending data to backend, or use actual backend logic
        console.log(`${formName} form data submitted:`, formData);
        alert(`${formName} : Data submitted.`);
    };

    // Fetch functions (replace with actual API calls in production)
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

    // Simulated loading state (1000ms)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ProtectedRoute>
            <div className="fade-in">
                {/* Dashboard Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
                    <p className="text-neutral mt-2">
                        Welcome back to your workspace
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card p-4">
                        <h3 className="text-neutral mb-2">Active Reservations</h3>
                        {loading ? (
                            <div className="flex justify-center items-center h-12">
                                <PulseLoader color="#3b82f6" size={24} />
                            </div>
                        ) : (
                            <>
                                <p className="text-3xl font-bold text-primary">12</p>
                                <p className="text-accent text-sm mt-2">
                                    ↑ 8% from last week
                                </p>
                            </>
                        )}
                    </div>
                    <div className="card p-4">
                        <h3 className="text-neutral mb-2">Pending Orders</h3>
                        {loading ? (
                            <div className="flex justify-center items-center h-12">
                                <PulseLoader color="#3b82f6" size={24} />
                            </div>
                        ) : (
                            <>
                                <p className="text-3xl font-bold text-primary">5</p>
                                <p className="text-accent text-sm mt-2">
                                    ↓ 2% from last week
                                </p>
                            </>
                        )}
                    </div>
                    <div className="card p-4">
                        <h3 className="text-neutral mb-2">Available Resources</h3>
                        {loading ? (
                            <div className="flex justify-center items-center h-12">
                                <PulseLoader color="#3b82f6" size={24} />
                            </div>
                        ) : (
                            <>
                                <p className="text-3xl font-bold text-primary">24</p>
                                <p className="text-accent text-sm mt-2">of 30 total</p>
                            </>
                        )}
                    </div>
                    <div className="card p-4">
                        <h3 className="text-neutral mb-2">IT Equipment</h3>
                        {loading ? (
                            <div className="flex justify-center items-center h-12">
                                <PulseLoader color="#3b82f6" size={24} />
                            </div>
                        ) : (
                            <>
                                <p className="text-3xl font-bold text-primary">18</p>
                                <p className="text-accent text-sm mt-2">items available</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Recent Activity and Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold text-primary mb-4">
                            Recent Activity
                        </h2>
                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <PulseLoader color="#3b82f6" size={24} />
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentActivities.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between pb-3 border-b border-accent last:border-0"
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div
                                                className={`w-2 h-2 mt-2 rounded-full ${activity.color}`}
                                            ></div>
                                            <div>
                                                <p className="text-neutral">{activity.description}</p>
                                                <p className="text-sm text-accent">{activity.time}</p>
                                            </div>
                                        </div>
                                        {/* Info icon to navigate directly */}
                                        <a href="/dashboard/activity" className="cursor-pointer">
                                            <i className="fa fa-info-circle text-xl text-primary"></i>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold text-primary mb-8">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {quickActions.map((action, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        // Set the active form type and open the appropriate modal
                                        switch (action.label) {
                                            case "Room Reservation":
                                                setActiveFormType("ROOM");
                                                setIsReservationModalOpen(true);
                                                break;
                                            case "Parking Spot Reservation":
                                                setActiveFormType("PARKING");
                                                setIsReservationModalOpen(true);
                                                break;
                                            case "Desk Reservation":
                                                setActiveFormType("DESK");
                                                setIsReservationModalOpen(true);
                                                break;
                                            case "Conference Room Reservation":
                                                setActiveFormType("CONFERENCE_ROOM");
                                                setIsReservationModalOpen(true);
                                                break;
                                            case "Order Food":
                                                setIsFoodModalOpen(true);
                                                break;
                                            case "Order IT Equipment":
                                                setIsEquipmentModalOpen(true);
                                                break;
                                            default:
                                                break;
                                        }
                                    }}
                                    className="btn-primary flex flex-col items-center justify-center text-center h-32 rounded-lg text-lg hover:scale-105 transition-transform"
                                >
                                    <i className={`fa ${action.icon} text-2xl mb-2`}></i>
                                    {action.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Upcoming Reservations */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-primary mb-4">
                        Upcoming Reservations
                    </h2>
                    {loading ? (
                        <SkeletonTable columns={["Resource", "Date", "Time", "Status"]} />
                    ) : (
                        <div className="card overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    <th className="text-left pb-3 text-neutral">Resource</th>
                                    <th className="text-left pb-3 text-neutral">Date</th>
                                    <th className="text-left pb-3 text-neutral">Time</th>
                                    <th className="text-left pb-3 text-neutral">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {upcomingReservations.map((reservation, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-accent last:border-0 hover:bg-[var(--body-bg)] cursor-pointer"
                                    >
                                        <td className="py-3 text-neutral">
                                            {reservation.resource}
                                        </td>
                                        <td className="py-3 text-neutral">{reservation.date}</td>
                                        <td className="py-3 text-neutral">
                                            {reservation.time}
                                        </td>
                                        <td className="py-3">
                        <span
                            className={`px-2 py-1 rounded-full text-xs ${reservation.statusClass}`}
                        >
                          {reservation.status}
                        </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Load Form Modals */}
                <ReservationForm
                    isOpen={isReservationModalOpen}
                    onClose={() => {
                        setIsReservationModalOpen(false);
                        resetActiveFormType();
                    }}
                    onSubmit={(data) =>
                        handleFormSubmit(data, `ReservationForm - ${activeFormType}`)
                    }
                    resourceType={activeFormType} // To prefill data based on resource type
                />
                <OrderFoodForm
                    isOpen={isFoodModalOpen}
                    onClose={() => setIsFoodModalOpen(false)}
                    onSubmit={(data) => handleFormSubmit(data, "OrderFoodForm")}
                />
                <ITEquipmentForm
                    isOpen={isEquipmentModalOpen}
                    onClose={() => setIsEquipmentModalOpen(false)}
                    onSubmit={(data) => handleFormSubmit(data, "ITEquipmentForm")}
                />
            </div>
        </ProtectedRoute>
    );
}

const recentActivities = [
    {
        description: (
            <span>
        Conference room{" "}
                <span className="bg-blue-100 text-blue-800 px-2 rounded">A</span>{" "}
                reserved
      </span>
        ),
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
        description: (
            <span>
        Parking spot{" "}
                <span className="bg-green-100 text-green-800 px-2 rounded">B4</span>{" "}
                reserved
      </span>
        ),
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
    {
        resource: "Desk 15B",
        date: "Tomorrow",
        time: "09:00 - 17:00",
        status: "Pending",
        statusClass: "bg-yellow-100 text-yellow-800",
    },
    {
        resource: "Parking B4",
        date: "23 Mar 2024",
        time: "All day",
        status: "Confirmed",
        statusClass: "bg-green-100 text-green-800",
    },
];
