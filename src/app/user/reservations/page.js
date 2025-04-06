"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import ReservationForm from "@/components/forms/ReservationForm";
import SkeletonTable from "@/components/ui/SkeletonTable";
import Filters from "@/components/Filters";

export default function UserReservations() {
    // Mock data organized by category
    const [roomReservations, setRoomReservations] = useState([]);
    const [deskReservations, setDeskReservations] = useState([]);
    const [parkingReservations, setParkingReservations] = useState([]);
    const [conferenceReservations, setConferenceReservations] = useState([]);

    // Filter states for each category
    const [roomFilter, setRoomFilter] = useState("");
    const [deskFilter, setDeskFilter] = useState("");
    const [parkingFilter, setParkingFilter] = useState("");
    const [conferenceFilter, setConferenceFilter] = useState("");

    // For sorting (if needed) – here we simply toggle sort direction per category.
    const [roomSortDirection, setRoomSortDirection] = useState("asc");
    const [deskSortDirection, setDeskSortDirection] = useState("asc");
    const [parkingSortDirection, setParkingSortDirection] = useState("asc");
    const [conferenceSortDirection, setConferenceSortDirection] = useState("asc");

    // Modal state
    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

    // Active form type for reservations: "ROOM", "DESK", "PARKING", "CONFERENCE_ROOM"
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

    // -- Filtering for each category --
    const filteredRoomReservations = roomReservations.filter((res) =>
        res.resource.toLowerCase().includes(roomFilter.toLowerCase())
    );
    const filteredDeskReservations = deskReservations.filter((res) =>
        res.resource.toLowerCase().includes(deskFilter.toLowerCase())
    );
    const filteredParkingReservations = parkingReservations.filter((res) =>
        res.resource.toLowerCase().includes(parkingFilter.toLowerCase())
    );
    const filteredConferenceReservations = conferenceReservations.filter((res) =>
        res.resource.toLowerCase().includes(conferenceFilter.toLowerCase())
    );

    // Toggle sort (dummy functions—adjust sorting logic as needed)
    const toggleRoomSortDirection = () =>
        setRoomSortDirection(roomSortDirection === "asc" ? "desc" : "asc");
    const toggleDeskSortDirection = () =>
        setDeskSortDirection(deskSortDirection === "asc" ? "desc" : "asc");
    const toggleParkingSortDirection = () =>
        setParkingSortDirection(parkingSortDirection === "asc" ? "desc" : "asc");
    const toggleConferenceSortDirection = () =>
        setConferenceSortDirection(conferenceSortDirection === "asc" ? "desc" : "asc");

    // Clear filters functions
    const clearRoomFilters = () => {
        setRoomFilter("");
        setRoomSortDirection("asc");
    };
    const clearDeskFilters = () => {
        setDeskFilter("");
        setDeskSortDirection("asc");
    };
    const clearParkingFilters = () => {
        setParkingFilter("");
        setParkingSortDirection("asc");
    };
    const clearConferenceFilters = () => {
        setConferenceFilter("");
        setConferenceSortDirection("asc");
    };

    return (
        <ProtectedRoute>
            <div className="fade-in p-8 space-y-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary">Reservations</h1>
                    <p className="text-neutral mt-2">
                        View and manage your reservations.
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
                    <Filters
                        filterText={roomFilter}
                        setFilterText={setRoomFilter}
                        // No dropdown provided—pass null if not using
                        filterOptions={null}
                        selectedFilter={null}
                        setSelectedFilter={null}
                        sortField="Resource"
                        sortDirection={roomSortDirection}
                        handleSort={toggleRoomSortDirection}
                        clearFilters={clearRoomFilters}
                        totalCount={roomReservations.length}
                        filteredCount={filteredRoomReservations.length}
                    />
                    {loading ? (
                        <SkeletonTable columns={["Resource", "Date", "Time", "Status"]} />
                    ) : filteredRoomReservations.length > 0 ? (
                        <div className="card overflow-x-auto">
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
                                {filteredRoomReservations.map((reservation) => (
                                    <tr
                                        key={reservation.id}
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
                    <Filters
                        filterText={deskFilter}
                        setFilterText={setDeskFilter}
                        filterOptions={null}
                        selectedFilter={null}
                        setSelectedFilter={null}
                        sortField="Resource"
                        sortDirection={deskSortDirection}
                        handleSort={toggleDeskSortDirection}
                        clearFilters={clearDeskFilters}
                        totalCount={deskReservations.length}
                        filteredCount={filteredDeskReservations.length}
                    />
                    {loading ? (
                        <SkeletonTable columns={["Resource", "Date", "Time", "Status"]} />
                    ) : filteredDeskReservations.length > 0 ? (
                        <div className="card overflow-x-auto">
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
                                {filteredDeskReservations.map((reservation) => (
                                    <tr
                                        key={reservation.id}
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

                {/* Parking Reservations Section */}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-primary">Parking Spots</h2>
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
                    <Filters
                        filterText={parkingFilter}
                        setFilterText={setParkingFilter}
                        filterOptions={null}
                        selectedFilter={null}
                        setSelectedFilter={null}
                        sortField="Resource"
                        sortDirection={parkingSortDirection}
                        handleSort={toggleParkingSortDirection}
                        clearFilters={clearParkingFilters}
                        totalCount={parkingReservations.length}
                        filteredCount={filteredParkingReservations.length}
                    />
                    {loading ? (
                        <SkeletonTable columns={["Resource", "Date", "Time", "Status"]} />
                    ) : filteredParkingReservations.length > 0 ? (
                        <div className="card overflow-x-auto">
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
                                {filteredParkingReservations.map((reservation) => (
                                    <tr
                                        key={reservation.id}
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

                {/* Conference Room Reservations Section */}
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
                    <Filters
                        filterText={conferenceFilter}
                        setFilterText={setConferenceFilter}
                        filterOptions={null}
                        selectedFilter={null}
                        setSelectedFilter={null}
                        sortField="Resource"
                        sortDirection={conferenceSortDirection}
                        handleSort={toggleConferenceSortDirection}
                        clearFilters={clearConferenceFilters}
                        totalCount={conferenceReservations.length}
                        filteredCount={filteredConferenceReservations.length}
                    />
                    {loading ? (
                        <SkeletonTable columns={["Resource", "Date", "Time", "Status"]} />
                    ) : filteredConferenceReservations.length > 0 ? (
                        <div className="card overflow-x-auto">
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
                                {filteredConferenceReservations.map((reservation) => (
                                    <tr
                                        key={reservation.id}
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

                {/* Reservation Form Modal */}
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
