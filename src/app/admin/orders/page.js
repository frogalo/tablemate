"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import CompanyForm from "@/components/forms/CompanyForm";
import AccessoryForm from "@/components/forms/AccessoryForm";

export default function AdminOrders() {
    // Sample IT Accessories Orders data
    const [itOrders, setItOrders] = useState([
        { id: 1, user: "John Doe", item: "Laptop", status: "Delivered" },
        { id: 2, user: "Jane Smith", item: "Monitor", status: "Processing" },
        { id: 3, user: "Alice Jones", item: "Keyboard", status: "Shipped" },
    ]);

    // Sample IT Accessories Inventory items (4 columns: ID, Accessory Name, In Storage, With Users)
    const [accessories, setAccessories] = useState([
        { id: 101, name: "Dell XXX Keyboard", quantity: 13, allocated: 4 },
        { id: 102, name: "HP Pro Mouse", quantity: 7, allocated: 2 },
    ]);

    // Sample Food Delivery Companies data (4 columns: ID, Name, Email, Orders)
    const [companies, setCompanies] = useState([
        { id: 1, name: "Pizza Palace", email: "contact@pizzapalace.com", orderCount: 5 },
        { id: 2, name: "Burger Bonanza", email: "info@burgerbonanza.com", orderCount: 8 },
    ]);

    const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
    const [isAccessoryModalOpen, setIsAccessoryModalOpen] = useState(false);

    const handleAddCompany = (newCompany) => {
        // New company order count starts at 0
        setCompanies([...companies, { ...newCompany, orderCount: 0 }]);
        setIsCompanyModalOpen(false);
    };

    const handleAddAccessory = (newAccessory) => {
        setAccessories([...accessories, newAccessory]);
        setIsAccessoryModalOpen(false);
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
                        allocation details), and add new food delivery companies. Use this
                        panel to keep track of orders, storage items, and their allocation to
                        users.
                    </p>
                </div>

                {/* IT Accessories Orders Section */}
                <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                        IT Accessories Orders
                    </h2>
                    <div className="card">
                        <table className="table-fixed w-full">
                            <thead>
                            <tr className="border-b border-accent">
                                <th className="w-1/4 px-4 py-2 text-left text-neutral">ID</th>
                                <th className="w-1/4 px-4 py-2 text-left text-neutral">User</th>
                                <th className="w-1/4 px-4 py-2 text-left text-neutral">Item</th>
                                <th className="w-1/4 px-4 py-2 text-left text-neutral">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {itOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-accent last:border-0"
                                >
                                    <td className="w-1/4 px-4 py-2 text-neutral">{order.id}</td>
                                    <td className="w-1/4 px-4 py-2 text-neutral">{order.user}</td>
                                    <td className="w-1/4 px-4 py-2 text-neutral">{order.item}</td>
                                    <td className="w-1/4 px-4 py-2 text-neutral">{order.status}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
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
                        <div className="card">
                            <table className="table-fixed w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    <th className="w-1/4 px-4 py-2 text-left text-neutral">ID</th>
                                    <th className="w-1/4 px-4 py-2 text-left text-neutral">
                                        Accessory Name
                                    </th>
                                    <th className="w-1/4 px-4 py-2 text-left text-neutral">
                                        In Storage
                                    </th>
                                    <th className="w-1/4 px-4 py-2 text-left text-neutral">
                                        With Users
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {accessories.map((accessory) => (
                                    <tr
                                        key={accessory.id}
                                        className="border-b border-accent last:border-0"
                                    >
                                        <td className="w-1/4 px-4 py-2 text-neutral">
                                            {accessory.id}
                                        </td>
                                        <td className="w-1/4 px-4 py-2 text-neutral">
                                            {accessory.name}
                                        </td>
                                        <td className="w-1/4 px-4 py-2 text-neutral">
                                            {accessory.quantity}
                                        </td>
                                        <td className="w-1/4 px-4 py-2 text-neutral">
                                            {accessory.allocated || 0}
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

                {/* Food Delivery Companies Section */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-primary">
                            Food Delivery Companies
                        </h2>
                        <button
                            onClick={() => setIsCompanyModalOpen(true)}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Add New Company
                        </button>
                    </div>
                    {companies.length > 0 ? (
                        <div className="card">
                            <table className="table-fixed w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    <th className="w-1/4 px-4 py-2 text-left text-neutral">ID</th>
                                    <th className="w-1/4 px-4 py-2 text-left text-neutral">Name</th>
                                    <th className="w-1/4 px-4 py-2 text-left text-neutral">Email</th>
                                    <th className="w-1/4 px-4 py-2 text-left text-neutral">Orders</th>
                                </tr>
                                </thead>
                                <tbody>
                                {companies.map((company) => (
                                    <tr
                                        key={company.id}
                                        className="border-b border-accent last:border-0"
                                    >
                                        <td className="w-1/4 px-4 py-2 text-neutral">
                                            {company.id}
                                        </td>
                                        <td className="w-1/4 px-4 py-2 text-neutral">
                                            {company.name}
                                        </td>
                                        <td className="w-1/4 px-4 py-2 text-neutral">
                                            {company.email}
                                        </td>
                                        <td className="w-1/4 px-4 py-2 text-neutral">
                                            {company.orderCount}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-neutral">No companies added yet.</p>
                    )}
                </section>

                {/* Modals */}
                <AccessoryForm
                    isOpen={isAccessoryModalOpen}
                    onClose={() => setIsAccessoryModalOpen(false)}
                    onSave={handleAddAccessory}
                />
                <CompanyForm
                    isOpen={isCompanyModalOpen}
                    onClose={() => setIsCompanyModalOpen(false)}
                    onSave={handleAddCompany}
                />
            </div>
        </ProtectedRoute>
    );
}
