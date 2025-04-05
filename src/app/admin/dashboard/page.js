"use client";

import {useEffect, useState} from "react";
import {PulseLoader} from "react-spinners";
import ProtectedRoute from "@/components/ProtectedRoute";
import SkeletonTable from "@/components/ui/SkeletonTable";

// Updated admin recent activities with colored highlights.
const adminRecentActivities = [
    {
        description: (
            <span>
        User{" "}
                <span className="bg-blue-100 text-blue-800 px-2 rounded hover:bg-[var(--body-bg)] cursor-pointer">
          John Doe
        </span>{" "}
                created
      </span>
        ),
        time: "5 minutes ago",
        color: "bg-primary",
    },
    {
        description: (
            <span>
        Reservation for{" "}
                <span className="bg-blue-100 text-blue-800 px-2 rounded hover:bg-[var(--body-bg)] cursor-pointer">
          Conference Room
        </span>{" "}
                updated
      </span>
        ),
        time: "20 minutes ago",
        color: "bg-secondary",
    },
    {
        description: (
            <span>
        Order{" "}
                <span className="bg-blue-100 text-blue-800 px-2 rounded hover:bg-[var(--body-bg)] cursor-pointer">
          #102
        </span>{" "}
                processed
      </span>
        ),
        time: "1 hour ago",
        color: "bg-accent",
    },
    {
        description: (
            <span>
        Notification sent to user{" "}
                <span className="bg-blue-100 text-blue-800 px-2 rounded hover:bg-[var(--body-bg)] cursor-pointer">
          Jane Smith
        </span>
      </span>
        ),
        time: "2 hours ago",
        color: "bg-primary",
    },
];

const adminQuickActions = [
    {
        label: "Manage Users",
        href: "/admin/users",
        icon: "fa-users",
    },
    {
        label: "Manage Reservations",
        href: "/admin/reservations",
        icon: "fa-calendar-check",
    },
    {
        label: "Manage Orders",
        href: "/admin/orders",
        icon: "fa-shopping-cart",
    },
    {
        label: "View Reports",
        href: "/admin/reports",
        icon: "fa-chart-line",
    },
    {
        label: "Manage Notifications",
        href: "/admin/notifications",
        icon: "fa-bell",
    },
    {
        label: "System Settings",
        href: "/admin/settings",
        icon: "fa-cog",
    },
];

const adminUpcomingReservations = [
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
        resource: "Meeting Room 3",
        date: "24 Mar 2024",
        time: "11:00 - 12:00",
        status: "Confirmed",
        statusClass: "bg-green-100 text-green-800",
    },
];

const adminUpcomingOrders = [
    {
        user: "John Doe",
        item: "Dell Monitor",
        type: "IT Equipment",
        deliveryDate: "2024-03-22",
    },
    {
        user: "Jane Smith",
        item: "Lunch Combo",
        type: "Meal",
        deliveryDate: "2024-03-23",
    },
    {
        user: "Mike Johnson",
        item: "Wireless Keyboard",
        type: "IT Equipment",
        deliveryDate: "2024-03-24",
    },
];

export default function AdminDashboard() {
    // Simulated loading state (2 second delay).
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ProtectedRoute>
            <div className="fade-in p-8">
                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card p-4">
                        <h3 className="text-neutral mb-2">Total Users</h3>
                        {loading ? (
                            <div className="flex justify-center items-center h-12">
                                <PulseLoader color="#3b82f6" size={24}/>
                            </div>
                        ) : (
                            <>
                                <p className="text-3xl font-bold text-primary">120</p>
                                <p className="text-accent text-sm mt-2">
                                    ↑ 5% from last week
                                </p>
                            </>
                        )}
                    </div>
                    <div className="card p-4">
                        <h3 className="text-neutral mb-2">Active Reservations</h3>
                        {loading ? (
                            <div className="flex justify-center items-center h-12">
                                <PulseLoader color="#3b82f6" size={24}/>
                            </div>
                        ) : (
                            <>
                                <p className="text-3xl font-bold text-primary">35</p>
                                <p className="text-accent text-sm mt-2">
                                    ↑ 10% from last week
                                </p>
                            </>
                        )}
                    </div>
                    <div className="card p-4">
                        <h3 className="text-neutral mb-2">Pending Orders</h3>
                        {loading ? (
                            <div className="flex justify-center items-center h-12">
                                <PulseLoader color="#3b82f6" size={24}/>
                            </div>
                        ) : (
                            <>
                                <p className="text-3xl font-bold text-primary">12</p>
                                <p className="text-accent text-sm mt-2">
                                    ↓ 3% from last week
                                </p>
                            </>
                        )}
                    </div>
                    <div className="card p-4">
                        <h3 className="text-neutral mb-2">Unread Notifications</h3>
                        {loading ? (
                            <div className="flex justify-center items-center h-12">
                                <PulseLoader color="#3b82f6" size={24}/>
                            </div>
                        ) : (
                            <>
                                <p className="text-3xl font-bold text-primary">8</p>
                                <p className="text-accent text-sm mt-2">New messages</p>
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
                                <PulseLoader color="#3b82f6" size={24}/>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {adminRecentActivities.map((activity, index) => (
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
                                        {/* Info icon to go directly to the activity details */}
                                        <a href="/admin/activity" className="cursor-pointer">
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
                            {adminQuickActions.map((action, index) => (
                                <a
                                    key={index}
                                    href={action.href}
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
                        <SkeletonTable columns={["Resource", "Date", "Time", "Status"]}/>
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
                                {adminUpcomingReservations.map((reservation, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-accent last:border-0 hover:bg-[var(--body-bg)] cursor-pointer"
                                    >
                                        <td className="py-3 text-neutral">{reservation.resource}</td>
                                        <td className="py-3 text-neutral">{reservation.date}</td>
                                        <td className="py-3 text-neutral">{reservation.time}</td>
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

                {/* Upcoming Orders */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-primary mb-4">
                        Upcoming Orders
                    </h2>
                    {loading ? (
                        <SkeletonTable
                            columns={["User", "Item", "Type", "Delivery Date"]}
                        />
                    ) : (
                        <div className="card overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    <th className="text-left pb-3 text-neutral">User</th>
                                    <th className="text-left pb-3 text-neutral">Item</th>
                                    <th className="text-left pb-3 text-neutral">Type</th>
                                    <th className="text-left pb-3 text-neutral">Delivery Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {adminUpcomingOrders.map((order, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-accent last:border-0 hover:bg-[var(--body-bg)] cursor-pointer"
                                    >
                                        <td className="py-3 text-neutral">{order.user}</td>
                                        <td className="py-3 text-neutral">{order.item}</td>
                                        <td className="py-3 text-neutral">{order.type}</td>
                                        <td className="py-3 text-neutral">{order.deliveryDate}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}
