"use client";

import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function UserProfile() {
    // Simulate a loading state before data is available.
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <ProtectedRoute>
                <div className="fade-in flex justify-center items-center h-screen">
                    <PulseLoader color="#3b82f6" size={24} />
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="fade-in p-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary">Profile</h1>
                    <p className="text-neutral mt-2">
                        Manage your personal information
                    </p>
                </div>

                {/* Profile Details */}
                <div className="card p-6">
                    <h2 className="text-xl font-semibold text-primary mb-4">
                        Personal Information
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-neutral">Name:</span>
                            <span className="text-dark">{profile.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral">Email:</span>
                            <span className="text-dark">{profile.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral">Phone:</span>
                            <span className="text-dark">{profile.phone}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral">Role:</span>
                            <span className="text-dark">{profile.role}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

// Sample data
const profile = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    role: "User",
};
