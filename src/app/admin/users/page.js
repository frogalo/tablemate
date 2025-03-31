"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminUsers() {
    return (
        <ProtectedRoute>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-primary mb-4">
                    Admin Users
                </h1>
                <p className="mb-6">
                    Manage user accounts, roles, and permissions from this page.
                </p>
                {/* This can be replaced with a table or list of users */}
                <div>
                    <p>This is where you can manage your users.</p>
                </div>
            </div>
        </ProtectedRoute>
    );
}
