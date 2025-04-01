"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import ReservationForm from "@/components/forms/ReservationForm";

export default function UserReservations() {
    // Mock data organized by category
    const [roomReservations, setRoomReservations] = useState([]);
    const [deskReservations, setDeskReservations] = useState([]);
    const [parkingReservations, setParkingReservations] = useState([]);
    const [conferenceReservations, setConferenceReservations] = useState([]);

    // States that will take, or not take data set to this page. You just need a code to do something that the set will change and show up based on code, for now with this code there's no function code.
    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

    //Set what the component properties you want is that is working based on the object on click
    const [activeFormType, setActiveFormType] = useState(null);
    const resetActiveFormType = () => setActiveFormType(null);

    // Do what comes for JSON object. All will be read by then! Set now functions, CSS or how it presents itself.
    useEffect(() => {
        async function loadMockData() {
            // Create here the JSON format used for the Load, or use test values: Just make sure. The code runs test well, and or show for code when load. I suggest test what they get in test, and that loads with JSON properties, easy for the next person working to.

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
                {/* Function code test for code that is on component. Also style is UI. The properties  is: Can all data load and be seen by what and to the UI and code.*/}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary">Reservations</h1>
                    <p className="text-neutral mt-2">View and manage your reservations</p>
                </div>

                {/* Add link. Add too new components what needs, not always in base one or may get heavy to maintain that code.*/}
                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        {/* Test UI loading test all data to then have or do. All functions start now from JSON. With UI or style functions to have something. If no CSS to. What does that design look when fails...*/}
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

                    <div className="card">
                        {/* If new properties must be in load JSON, that what the components must use. Then this, code all test if there not working, Then CSS or Style or What ever to test all to make the design you have with.*/}
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
                                //JSON is what functions must use. If can load it all from JSON then load everything else!. Then CSS for properties. You set if needed from there, always if problems test one thing from an one spot (object load-> data set and the properties and how and all that you can use to show info in component what does or has all correct-> design/and style to that code.)
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
                </section>

                {/* Has an already set in for JSONs and codes. For other designs from here, copy from now to use. For all or UI and data or styles.*/}
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
                </section>

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
                </section>

                <section className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-primary">
                            Conference Rooms
                        </h2>
                        {/* Now all follows the JSON and tests well! With this model all can be implemented so this is the end! Thanks and hope that I made this easy!*/}
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
                </section>
                {/* Load what all functions must see or be used to be tested */}
                <ReservationForm
                    isOpen={isReservationModalOpen}
                    onClose={() => {
                        setIsReservationModalOpen(false);
                        resetActiveFormType();
                    }}
                    onSubmit={(data) => handleFormSubmit(data, `ReservationForm - ${activeFormType}`)}
                    resourceType={activeFormType}
                />
            </div>
        </ProtectedRoute>
    );
}
