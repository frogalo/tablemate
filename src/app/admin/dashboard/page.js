"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminDashboard() {
    return (
        <ProtectedRoute>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-primary mb-4">
                    Admin Dashboard
                </h1>
                <p className="mb-6">
                    Welcome, Admin! Use the links below to manage your application.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <Link
                        href="/admin/reports"
                        className="btn-primary text-center py-4 rounded-lg"
                    >
                        Admin Reports
                    </Link>
                    <Link
                        href="/admin/reservations"
                        className="btn-primary text-center py-4 rounded-lg"
                    >
                        Reservation Configuration
                    </Link>
                    <Link
                        href="/admin/users"
                        className="btn-primary text-center py-4 rounded-lg"
                    >
                        Admin Users
                    </Link>
                </div>
            </div>
        </ProtectedRoute>
    );
}
