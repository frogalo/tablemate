"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import CompanyForm from "@/components/forms/CompanyForm";
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
    // Sample IT Accessories Orders data
    const [itOrders, setItOrders] = useState([
        { id: 1, user: "John Doe", item: "Laptop", status: "Delivered" },
        { id: 2, user: "Jane Smith", item: "Monitor", status: "Processing" },
        { id: 3, user: "Alice Jones", item: "Keyboard", status: "Shipped" },
    ]);

    // Sample IT Accessories Inventory items (with 'allocated' field)
    const [accessories, setAccessories] = useState([
        { id: 101, name: "Dell XXX Keyboard", quantity: 13, allocated: 4 },
        { id: 102, name: "HP Pro Mouse", quantity: 7, allocated: 2 },
    ]);

    // Sample Food Delivery Companies data (each with an orderCount)
    const [companies, setCompanies] = useState([
        { id: 1, name: "Pizza Palace", email: "contact@pizzapalace.com", orderCount: 5 },
        { id: 2, name: "Burger Bonanza", email: "info@burgerbonanza.com", orderCount: 8 },
    ]);

    const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
    const [isAccessoryModalOpen, setIsAccessoryModalOpen] = useState(false);

    const handleAddCompany = (newCompany) => {
        setCompanies([...companies, { ...newCompany, orderCount: 0 }]);
        setIsCompanyModalOpen(false);
    };

    const handleAddAccessory = (newAccessory) => {
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
                        allocation details), and add new food delivery companies. Use this panel
                        to keep track of orders, storage items, and their allocation to users.
                    </p>
                </div>

                {/* IT Accessories Orders Section */}
                <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                        IT Accessories Orders
                    </h2>
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
                                {companies.map((company) => (
                                    <tr
                                        key={company.id}
                                        className="border-b border-accent last:border-0"
                                    >
                                        <td className="w-1/5 px-4 py-2 text-neutral hidden md:table-cell whitespace-normal">
                                            {company.id}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                                            {company.name}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                                            {company.email}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                                            {company.orderCount}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral hidden sm:table-cell whitespace-normal">
                                            <button
                                                onClick={() => handleEditItem(company, "company")}
                                                className="mx-1 text-blue-500 hover:text-blue-700"
                                            >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                            <button
                                                onClick={() => handleRemoveItem(company, "company")}
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
