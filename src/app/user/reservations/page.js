"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import ReservationForm from "@/components/forms/ReservationForm";
import SkeletonTable from "@/components/ui/SkeletonTable";

export default function UserReservations() {
    // Mock data organized by category
    const [roomReservations, setRoomReservations] = useState([]);
    const [deskReservations, setDeskReservations] = useState([]);
    const [parkingReservations, setParkingReservations] = useState([]);
    const [conferenceReservations, setConferenceReservations] = useState([]);

    // Modal state
    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

    // Active form type for reservations
    const [activeFormType, setActiveFormType] = useState(null);
    const resetActiveFormType = () => setActiveFormType(null);

    // Loading state (simulate 1000ms delay)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Load mock data
    useEffect(() => {
        async function loadMockData() {
            const mockupRoomReservations = [
                {
                    id: 1,
                    resource: "Room 101",
                    date: "2024-05-05",
                    time: "10:00 - 12:00",
                    status: "Confirmed",
                    statusClass: "bg-green-100 text-green-800",
                },
                {
                    id: 2,
                    resource: "Room 102",
                    date: "2024-05-06",
                    time: "14:00 - 16:00",
                    status: "Pending",
                    statusClass: "bg-yellow-100 text-yellow-800",
                },
            ];

            const mockupDeskReservations = [
                {
                    id: 3,
                    resource: "Desk 5A",
                    date: "2024-05-07",
                    time: "09:00 - 17:00",
                    status: "Confirmed",
                    statusClass: "bg-green-100 text-green-800",
                },
                {
                    id: 4,
                    resource: "Desk 7B",
                    date: "2024-05-08",
                    time: "09:00 - 12:00",
                    status: "Cancelled",
                    statusClass: "bg-red-100 text-red-800",
                },
            ];

            const mockupParkingReservations = [
                {
                    id: 5,
                    resource: "Parking Spot A3",
                    date: "2024-05-09",
                    time: "All day",
                    status: "Confirmed",
                    statusClass: "bg-green-100 text-green-800",
                },
                {
                    id: 6,
                    resource: "Parking Spot B5",
                    date: "2024-05-10",
                    time: "All day",
                    status: "Pending",
                    statusClass: "bg-yellow-100 text-yellow-800",
                },
            ];

            const mockupConferenceReservations = [
                {
                    id: 7,
                    resource: "Conference Room Alpha",
                    date: "2024-05-11",
                    time: "13:00 - 15:00",
                    status: "Confirmed",
                    statusClass: "bg-green-100 text-green-800",
                },
            ];

            setRoomReservations(mockupRoomReservations);
            setDeskReservations(mockupDeskReservations);
            setParkingReservations(mockupParkingReservations);
            setConferenceReservations(mockupConferenceReservations);
        }

        loadMockData();
    }, []);

    return (
        <ProtectedRoute>
            <div className="fade-in">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary">Reservations</h1>
                    <p className="text-neutral mt-2">
                        View and manage your reservations
                    </p>
                </div>

                {/* Rooms Section */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-primary">Rooms</h2>
                        <button
                            onClick={() => {
                                setActiveFormType("ROOM");
                                setIsReservationModalOpen(true);
                            }}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Create New Room Reservation
                        </button>
                    </div>
                    {loading ? (
                        <SkeletonTable columns={["Resource", "Date", "Time", "Status"]} />
                    ) : roomReservations.length > 0 ? (
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
                                {roomReservations.map((reservation, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-accent last:border-0"
                                    >
                                        <td className="py-3 text-neutral">{reservation.resource}</td>
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
                    ) : (
                        <p className="text-neutral">No room reservations.</p>
                    )}
                </section>

                {/* Desks Section */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-primary">Desks</h2>
                        <button
                            onClick={() => {
                                setActiveFormType("DESK");
                                setIsReservationModalOpen(true);
                            }}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Create New Desk Reservation
                        </button>
                    </div>
                    {loading ? (
                        <SkeletonTable columns={["Resource", "Date", "Time", "Status"]} />
                    ) : deskReservations.length > 0 ? (
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
                                {deskReservations.map((reservation, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-accent last:border-0"
                                    >
                                        <td className="py-3 text-neutral">{reservation.resource}</td>
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
                    ) : (
                        <p className="text-neutral">No desk reservations.</p>
                    )}
                </section>

                {/* Parking Spots Section */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-primary">
                            Parking Spots
                        </h2>
                        <button
                            onClick={() => {
                                setActiveFormType("PARKING");
                                setIsReservationModalOpen(true);
                            }}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Create New Parking Reservation
                        </button>
                    </div>
                    {loading ? (
                        <SkeletonTable columns={["Resource", "Date", "Time", "Status"]} />
                    ) : parkingReservations.length > 0 ? (
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
                                {parkingReservations.map((reservation, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-accent last:border-0"
                                    >
                                        <td className="py-3 text-neutral">{reservation.resource}</td>
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
                    ) : (
                        <p className="text-neutral">No parking reservations.</p>
                    )}
                </section>

                {/* Conference Rooms Section */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-primary">
                            Conference Rooms
                        </h2>
                        <button
                            onClick={() => {
                                setActiveFormType("CONFERENCE_ROOM");
                                setIsReservationModalOpen(true);
                            }}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Create New Conference Room Reservation
                        </button>
                    </div>
                    {loading ? (
                        <SkeletonTable columns={["Resource", "Date", "Time", "Status"]} />
                    ) : conferenceReservations.length > 0 ? (
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
                                {conferenceReservations.map((reservation, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-accent last:border-0"
                                    >
                                        <td className="py-3 text-neutral">{reservation.resource}</td>
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
                    ) : (
                        <p className="text-neutral">No conference room reservations.</p>
                    )}
                </section>

                {/* Load Form Modal */}
                <ReservationForm
                    isOpen={isReservationModalOpen}
                    onClose={() => {
                        setIsReservationModalOpen(false);
                        resetActiveFormType();
                    }}
                    onSubmit={(data) =>
                        console.log(`ReservationForm (${activeFormType}) data:`, data)
                    }
                    resourceType={activeFormType}
                />
            </div>
        </ProtectedRoute>
    );
}
