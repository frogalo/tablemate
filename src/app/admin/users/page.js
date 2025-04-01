"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminDashboard() {
    // Sample metrics for the stats grid
    const totalUsers = 42;
    const totalReservations = 18;
    const totalOrders = 27;
    const totalNotifications = 5;

    // Sample data for sections
    const users = [
        { id: 1, firstName: "John", lastName: "Doe", role: "ADMIN" },
        { id: 2, firstName: "Jane", lastName: "Smith", role: "USER" },
    ];

    const reservations = [
        {
            id: 1,
            user: "John Doe",
            resource: "Conference Room A",
            date: "2023-10-03",
            time: "10:00 - 11:00",
            status: "Confirmed",
        },
        {
            id: 2,
            user: "Jane Smith",
            resource: "Desk 5",
            date: "2023-10-04",
            time: "09:00 - 17:00",
            status: "Pending",
        },
    ];

    const orders = [
        {
            id: 1,
            user: "John Doe",
            itemType: "MEAL",
            itemId: 101,
            status: "Delivered",
        },
        {
            id: 2,
            user: "Jane Smith",
            itemType: "IT_EQUIPMENT",
            itemId: 202,
            status: "Processing",
        },
    ];

    const reports = [
        {
            id: 1,
            title: "User Activity Report",
            description: "Overview of user logins and actions.",
        },
        {
            id: 2,
            title: "Reservation Utilization Report",
            description: "Analysis of resource reservations and usage.",
        },
    ];

    const notifications = [
        { id: 1, title: "System Update", content: "New update available." },
        { id: 2, title: "Maintenance", content: "Scheduled maintenance at midnight." },
    ];

    return (
        <ProtectedRoute>
            <div className="fade-in p-8 bg-gray-100 min-h-screen">
                {/* Dashboard Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
                    <p className="text-neutral mt-2">Welcome back to the Admin Panel</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card p-4">
                        <h3 className="text-neutral mb-2">Total Users</h3>
                        <p className="text-3xl font-bold text-primary">{totalUsers}</p>
                    </div>
                    <div className="card p-4">
                        <h3 className="text-neutral mb-2">Total Reservations</h3>
                        <p className="text-3xl font-bold text-primary">{totalReservations}</p>
                    </div>
                    <div className="card p-4">
                        <h3 className="text-neutral mb-2">Total Orders</h3>
                        <p className="text-3xl font-bold text-primary">{totalOrders}</p>
                    </div>
                    <div className="card p-4">
                        <h3 className="text-neutral mb-2">Total Notifications</h3>
                        <p className="text-3xl font-bold text-primary">{totalNotifications}</p>
                    </div>
                </div>

                {/* Users Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">Users</h2>
                    <div className="card p-4">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-accent">
                                <th className="text-left pb-2 text-neutral">ID</th>
                                <th className="text-left pb-2 text-neutral">Name</th>
                                <th className="text-left pb-2 text-neutral">Role</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="border-b border-accent last:border-0"
                                >
                                    <td className="py-2 text-neutral">{user.id}</td>
                                    <td className="py-2 text-neutral">
                                        {user.firstName} {user.lastName}
                                    </td>
                                    <td className="py-2 text-neutral">{user.role}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Reservations Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">
                        Reservations
                    </h2>
                    <div className="card p-4">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-accent">
                                <th className="text-left pb-2 text-neutral">ID</th>
                                <th className="text-left pb-2 text-neutral">User</th>
                                <th className="text-left pb-2 text-neutral">Resource</th>
                                <th className="text-left pb-2 text-neutral">Date</th>
                                <th className="text-left pb-2 text-neutral">Time</th>
                                <th className="text-left pb-2 text-neutral">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reservations.map((res) => (
                                <tr
                                    key={res.id}
                                    className="border-b border-accent last:border-0"
                                >
                                    <td className="py-2 text-neutral">{res.id}</td>
                                    <td className="py-2 text-neutral">{res.user}</td>
                                    <td className="py-2 text-neutral">{res.resource}</td>
                                    <td className="py-2 text-neutral">{res.date}</td>
                                    <td className="py-2 text-neutral">{res.time}</td>
                                    <td className="py-2 text-neutral">{res.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Orders Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">Orders</h2>
                    <div className="card p-4">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-accent">
                                <th className="text-left pb-2 text-neutral">ID</th>
                                <th className="text-left pb-2 text-neutral">User</th>
                                <th className="text-left pb-2 text-neutral">Item Type</th>
                                <th className="text-left pb-2 text-neutral">Item ID</th>
                                <th className="text-left pb-2 text-neutral">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-accent last:border-0"
                                >
                                    <td className="py-2 text-neutral">{order.id}</td>
                                    <td className="py-2 text-neutral">{order.user}</td>
                                    <td className="py-2 text-neutral">{order.itemType}</td>
                                    <td className="py-2 text-neutral">{order.itemId}</td>
                                    <td className="py-2 text-neutral">{order.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Reports Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">Reports</h2>
                    <div className="card p-4">
                        <ul>
                            {reports.map((report) => (
                                <li key={report.id} className="mb-4">
                                    <h3 className="text-xl font-bold text-primary">
                                        {report.title}
                                    </h3>
                                    <p className="text-neutral">{report.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Notifications Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-primary mb-4">
                        Notifications
                    </h2>
                    <div className="card p-4">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-accent">
                                <th className="text-left pb-2 text-neutral">ID</th>
                                <th className="text-left pb-2 text-neutral">Title</th>
                                <th className="text-left pb-2 text-neutral">Content</th>
                            </tr>
                            </thead>
                            <tbody>
                            {notifications.map((note) => (
                                <tr
                                    key={note.id}
                                    className="border-b border-accent last:border-0"
                                >
                                    <td className="py-2 text-neutral">{note.id}</td>
                                    <td className="py-2 text-neutral">{note.title}</td>
                                    <td className="py-2 text-neutral">{note.content}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
