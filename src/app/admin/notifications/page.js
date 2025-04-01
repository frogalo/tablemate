"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminNotifications() {
    // Notification settings with default content
    const [notifications, setNotifications] = useState({
        canceledOrder: {
            enabled: true,
            content: "Your order has been canceled.",
        },
        editedOrder: {
            enabled: true,
            content: "Your order has been updated.",
        },
        createdNewEquipmentOrder: {
            enabled: true,
            content: "A new IT equipment order has been created.",
        },
        sentOrderNotification: {
            enabled: true,
            content: "Order notification sent to the user.",
        },
        canceledReservations: {
            enabled: true,
            content: "Your reservation has been canceled.",
        },
        editedReservations: {
            enabled: true,
            content: "Your reservation has been updated.",
        },
        createdNewReservation: {
            enabled: true,
            content: "A new reservation has been created.",
        },
        sentReservationCancellationNotification: {
            enabled: true,
            content: "Reservation cancellation notification sent.",
        },
        sentReservationNotification: {
            enabled: true,
            content: "Reservation notification sent.",
        },
        addedUser: {
            enabled: true,
            content: "A new user account has been added.",
        },
        editedUserData: {
            enabled: true,
            content: "User data has been edited.",
        },
        editedUserReservations: {
            enabled: true,
            content: "User reservations have been edited.",
        },
        editedUserOrder: {
            enabled: true,
            content: "User order has been edited.",
        },
        generatedReservationsReport: {
            enabled: false,
            content: "Reservations report has been generated.",
        },
        generatedOrdersReport: {
            enabled: false,
            content: "Orders report has been generated.",
        },
        deletedUserReservation: {
            enabled: true,
            content: "A user reservation has been deleted.",
        },
        deletedUser: {
            enabled: true,
            content: "A user has been deleted.",
        },
        deletedUserOrder: {
            enabled: true,
            content: "A user order has been deleted.",
        },
        sentOrderCancellationNotification: {
            enabled: true,
            content: "Order cancellation notification sent.",
        },
        placedOrder: {
            enabled: true,
            content: "New order has been placed.",
        },
    });

    // Handler for notification content change
    const handleNotificationChange = (key, field, value) => {
        setNotifications({
            ...notifications,
            [key]: {
                ...notifications[key],
                [field]: value,
            },
        });
    };

    return (
        <ProtectedRoute>
            <div className="p-8 main-container">
                {/* Page Header */}
                <h1 className="text-3xl font-bold text-primary mb-6">
                    Notification Settings
                </h1>
                <p className="mb-6 text-neutral">
                    Customize notifications for various actions.
                </p>

                {/* Notification Cards */}
                <div className="space-y-6">
                    {Object.entries(notifications).map(([key, notification]) => (
                        <div key={key} className="card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <label
                                    htmlFor={`${key}-enabled`}
                                    className="text-lg font-medium text-primary"
                                >
                                    {key
                                        .replace(/([A-Z])/g, " $1")
                                        .replace(/^./, (str) => str.toUpperCase())}
                                </label>

                                {/* Custom switch toggle */}
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        id={`${key}-enabled`}
                                        checked={notification.enabled}
                                        onChange={(e) =>
                                            handleNotificationChange(key, "enabled", e.target.checked)
                                        }
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>

                            {/* Notification Content */}
                            <div className="mt-2">
                                <label
                                    htmlFor={`${key}-content`}
                                    className="block text-sm font-medium text-neutral"
                                >
                                    Notification Content:
                                </label>
                                <textarea
                                    id={`${key}-content`}
                                    value={notification.content}
                                    onChange={(e) =>
                                        handleNotificationChange(key, "content", e.target.value)
                                    }
                                    className="mt-1 block w-full rounded-md border border-neutral shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Save Button (this implementation will not persist data) */}
                <div className="mt-8">
                    <button className="btn-primary px-6 py-3 text-lg">
                        Save Changes
                    </button>
                </div>
            </div>
        </ProtectedRoute>
    );
}
