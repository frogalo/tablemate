"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminReservations() {
    return (
        <ProtectedRoute>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-primary mb-4">
                    Reservation Configuration
                </h1>
                <p className="mb-6">
                    Manage rules and options for reservations across your resources.
                </p>
                {/* Add forms, tables, or configuration options as needed */}
                <div>
                    <p>This page will include reservation configuration settings.</p>
                </div>
            </div>
        </ProtectedRoute>
    );
}
