"use client";

import ProtectedRoute from "@/components/ProtectedRoute"; // Make sure this is implemented
import React from "react";

export default function UserReservations() {
    return (
        <ProtectedRoute>
            <div className="fade-in">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary">Reservations</h1>
                    <p className="text-neutral mt-2">
                        View and manage your reservations
                    </p>
                </div>

                {/* Reservations Table */}
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
                        {reservations.map((reservation, index) => (
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
        </ProtectedRoute>
    );
}

// Sample data for reservations
const reservations = [
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
        status: "Cancelled",
        statusClass: "bg-red-100 text-red-800",
    },
];
