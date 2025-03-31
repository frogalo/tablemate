import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
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
                    <div className="card">
                        <h3 className="text-neutral mb-2">Active Reservations</h3>
                        <p className="text-3xl font-bold text-primary">12</p>
                        <p className="text-accent text-sm mt-2">↑ 8% from last week</p>
                    </div>
                    <div className="card">
                        <h3 className="text-neutral mb-2">Pending Orders</h3>
                        <p className="text-3xl font-bold text-primary">5</p>
                        <p className="text-accent text-sm mt-2">↓ 2% from last week</p>
                    </div>
                    <div className="card">
                        <h3 className="text-neutral mb-2">Available Resources</h3>
                        <p className="text-3xl font-bold text-primary">24</p>
                        <p className="text-accent text-sm mt-2">of 30 total</p>
                    </div>
                    <div className="card">
                        <h3 className="text-neutral mb-2">IT Equipment</h3>
                        <p className="text-3xl font-bold text-primary">18</p>
                        <p className="text-accent text-sm mt-2">items available</p>
                    </div>
                </div>

                {/* Recent Activity and Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="card">
                        <h2 className="text-xl font-semibold text-primary mb-4">
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-start space-x-3 pb-3 border-b border-accent last:border-0"
                                >
                                    <div
                                        className={`w-2 h-2 mt-2 rounded-full ${activity.color}`}
                                    ></div>
                                    <div>
                                        <p className="text-neutral">{activity.description}</p>
                                        <p className="text-sm text-accent">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card">
                        <h2 className="text-xl font-semibold text-primary mb-8">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {quickActions.map((action, index) => (
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
                    <div className="card">
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
                                    className="border-b border-accent last:border-0"
                                >
                                    <td className="py-3 text-neutral">
                                        {reservation.resource}
                                    </td>
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
                </div>
            </div>
        </ProtectedRoute>
    );
}

// Sample data
const recentActivities = [
    {
        description: "Conference room 'A' reserved",
        time: "2 minutes ago",
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
        href: "/reservations/new?type=room",
        icon: "fa-door-open",
    },
    {
        label: "Parking Spot Reservation",
        href: "/reservations/new?type=parking",
        icon: "fa-parking",
    },
    {
        label: "Desk Reservation",
        href: "/reservations/new?type=desk",
        icon: "fa-chair",
    },
    {
        label: "Conference Room Reservation",
        href: "/reservations/new?type=conference",
        icon: "fa-building",
    },
    {
        label: "Order Food",
        href: "/orders/new?type=food",
        icon: "fa-utensils",
    },
    {
        label: "Order IT Equipment",
        href: "/orders/new?type=it",
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
    {
        resource: "Meeting Room 3",
        date: "24 Mar 2024",
        time: "11:00 - 12:00",
        status: "Confirmed",
        statusClass: "bg-green-100 text-green-800",
    },
];
