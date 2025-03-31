"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminReports() {
    return (
        <ProtectedRoute>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-primary mb-4">
                    Admin Reports
                </h1>
                <p className="mb-6">
                    Here you can view and analyze reports for your platform.
                </p>
                {/* Replace the content below with your actual reports */}
                <div>
                    <p>This is a sample report section.</p>
                    {/* For example, charts and tables can be integrated here */}
                </div>
            </div>
        </ProtectedRoute>
    );
}
