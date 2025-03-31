import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserOrders() {
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
                        {orders.map((order, index) => (
                            <tr key={index} className="border-b border-accent last:border-0">
                                <td className="py-3 text-neutral">{order.id}</td>
                                <td className="py-3 text-neutral">{order.item}</td>
                                <td className="py-3 text-neutral">{order.date}</td>
                                <td className="py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${order.statusClass}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ProtectedRoute>
    );
}

// Sample data
const orders = [
    {
        id: "ORD-001",
        item: "Laptop",
        date: "22 Mar 2024",
        status: "Shipped",
        statusClass: "bg-blue-100 text-blue-800"
    },
    {
        id: "ORD-002",
        item: "Monitor",
        date: "20 Mar 2024",
        status: "Pending",
        statusClass: "bg-yellow-100 text-yellow-800"
    },
    {
        id: "ORD-003",
        item: "Keyboard",
        date: "18 Mar 2024",
        status: "Delivered",
        statusClass: "bg-green-100 text-green-800"
    },
    {
        id: "ORD-004",
        item: "Mouse",
        date: "15 Mar 2024",
        status: "Cancelled",
        statusClass: "bg-red-100 text-red-800"
    }
];
