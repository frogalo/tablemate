"use client";

import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useToast } from "@/lib/useToast"; // Import useToast

export default function AdminNotifications() {
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

    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false); // State for save button loading
    const { addToast } = useToast(); // Get addToast function

    useEffect(() => {
        const timer = setTimeout(() => {
            // In a real app, fetch initial settings here
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleNotificationChange = (key, field, value) => {
        setNotifications((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                [field]: value,
            },
        }));
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        console.log("Simulating saving notification settings:", notifications);

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        try {
            // Replace with actual API call:
            // const response = await fetch('/api/notification-settings', {
            //   method: 'POST', // or PUT
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(notifications),
            // });
            // if (!response.ok) {
            //   throw new Error('Failed to save settings');
            // }

            addToast("Notification settings saved successfully!", "success");
        } catch (error) {
            console.error("Error saving settings:", error);
            addToast(error.message || "Failed to save settings.", "error");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <ProtectedRoute>
                <div className="flex justify-center items-center min-h-screen">
                    <PulseLoader color="var(--primary)" size={16} />
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="p-6 md:p-8 min-h-screen">
                <h1 className="text-3xl font-bold text-primary mb-6">
                    Notification Settings
                </h1>
                <p className="mb-8 text-neutral">
                    Customize notifications sent for various platform actions. Enable or
                    disable and edit the content below.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(notifications).map(([key, notification]) => (
                        <div key={key} className="card bg-card-bg p-5 rounded-lg shadow">
                            <div className="flex items-center justify-between mb-4">
                                <label
                                    htmlFor={`${key}-enabled`}
                                    className="text-base font-medium text-primary flex-grow mr-4"
                                >
                                    {key
                                        .replace(/([A-Z])/g, " $1")
                                        .replace(/^./, (str) => str.toUpperCase())}
                                </label>
                                <label className="switch flex-shrink-0">
                                    <input
                                        type="checkbox"
                                        id={`${key}-enabled`}
                                        checked={notification.enabled}
                                        onChange={(e) =>
                                            handleNotificationChange(key, "enabled", e.target.checked)
                                        }
                                        disabled={isSaving}
                                    />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                            <div className="mt-2">
                                <label
                                    htmlFor={`${key}-content`}
                                    className="block text-sm font-medium text-neutral mb-1"
                                >
                                    Content:
                                </label>
                                <textarea
                                    id={`${key}-content`}
                                    value={notification.content}
                                    onChange={(e) =>
                                        handleNotificationChange(key, "content", e.target.value)
                                    }
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border border-neutral shadow-sm focus:border-primary focus:ring-primary sm:text-sm bg-inherit p-2"
                                    disabled={isSaving || !notification.enabled} // Disable if toggle is off or saving
                                    style={{
                                        opacity: notification.enabled ? 1 : 0.6,
                                    }} // Dim if disabled
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-right">
                    <button
                        onClick={handleSaveChanges}
                        className="btn-primary px-6 py-2.5 text-base rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </ProtectedRoute>
    );
}
