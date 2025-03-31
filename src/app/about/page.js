"use client";

import "@fortawesome/fontawesome-free/css/all.css";

export default function About() {
    return (
        <main className="container mx-auto px-6 py-12">
            <header className="mb-12 text-center">
                <h1 className="text-5xl font-bold text-primary mb-4">
                    About TableMate
                </h1>
                <p className="text-xl text-neutral max-w-2xl mx-auto">
                    TableMate is designed to centralize and streamline resource management
                    within companies. Its purpose is to consolidate the reservation of desks,
                    conference rooms, and parking spots, while also facilitating the ordering
                    of food and IT equipment—all within one unified platform.
                </p>
            </header>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold text-primary mb-4">
                    Problem Description
                </h2>
                <p className="text-lg text-neutral leading-relaxed mb-6">
                    The lack of a centralized and effective resource management system in a
                    company leads to a number of problems. Today, reserving desks, conference
                    rooms, and parking spots often relies on different tools—spreadsheets, email
                    systems, and traditional paper-based methods. Inefficient booking of conference
                    rooms makes it challenging to secure available time slots, complicating meeting
                    planning. Employees needing quiet spaces are forced into shared workspaces due
                    to an absence of proper monitoring for room availability. In addition, without
                    the option to reserve parking spots, employees face daily stress and delays during
                    peak hours, which ultimately affects productivity and contributes to a stressful
                    work environment.
                </p>
                <p className="text-lg text-neutral leading-relaxed">
                    Moreover, current processes do not allow employees to order meals directly to
                    their desks, forcing them to leave their workstations during busy periods. Ordering
                    essential IT equipment, such as a mouse or monitor, often involves complicated,
                    time-consuming procedures that result in delays and reduced overall productivity.
                </p>
            </section>

            <section>
                <h2 className="text-3xl font-semibold text-primary mb-4">
                    Core Processes
                </h2>
                <ul className="list-disc list-inside space-y-4 text-lg text-neutral">

                    <i className="fas fa-calendar-check mr-2 text-primary"></i>
                    <span className="font-bold">Reservation Management:</span> Create, edit, and cancel
                    reservations for desks, meeting rooms, and parking spots with one central system.
                    <br/>
                    <span className="italic">Features:</span> Automatic resource assignment based on current
                    availability and predefined priorities.
                    <div>
                        <i className="fas fa-search mr-2 text-primary"></i>
                        <span className="font-bold">Reservation Search:</span> Quickly check resource availability
                        for a selected date and time using filters for desks, rooms, and parking spots.
                        <div>
                        </div>
                        <i className="fas fa-utensils mr-2 text-primary"></i>
                        <span className="font-bold">Food and IT Equipment Ordering:</span> Order meals and necessary
                        IT
                        equipment with direct delivery to your desk, reducing disruptions during busy work hours.
                        <div>
                        </div>
                        <i className="fas fa-bell mr-2 text-primary"></i>
                        <span className="font-bold">Notifications:</span> Receive confirmations for all your
                        bookings
                        and orders to stay informed.
                    </div>
                </ul>
            </section>
        </main>
    );
}
