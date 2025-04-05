"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt,
    faChair,
    faCar,
    faLaptop,
    faBell,
    faSignInAlt,
    faUtensils, // New icon for Food Delivery
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
    return (
        <div className="flex flex-col justify-center bg-light">
            {/* Hero Section */}
            <header className="text-center py-16 px-4">
                <h1 className="text-4xl sm:text-6xl font-bold text-primary mb-6">
                    Welcome to TableMate
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-neutral mb-8">
                    Easily book desks, conference rooms, parking spots, and manage IT
                    equipment in your office—all in one smart, intuitive app.
                </p>
                <div className="flex justify-center items-center gap-6">
                    <Link
                        href="/login"
                        className="btn-primary inline-flex items-center px-6 py-3 text-lg rounded-lg"
                    >
                        <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                        Get Started
                    </Link>
                    <Link
                        href="/about"
                        className="inline-flex items-center text-neutral font-semibold text-base"
                    >
                        Learn more <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </header>

            <div className="max-w-4xl mx-auto text-center mb-12">
                <h2 className="text-base font-semibold text-primary uppercase tracking-wide">
                    Manage Smarter
                </h2>
                <p className="mt-2 mb-7 text-3xl sm:text-4xl font-bold text-neutral">
                    Everything you need to work efficiently
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature 1: Book Desks & Rooms */}
                <div className="relative bg-card-bg rounded-xl border border-card-border shadow-lg overflow-visible transition transform hover:scale-105 duration-300 mb-8">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-24 h-24 rounded-full border-4 border-primary bg-white flex items-center justify-center">
                            <FontAwesomeIcon icon={faChair} className="text-4xl text-primary" />
                        </div>
                    </div>
                    <div className="pt-20 pb-6 px-4 text-center">
                        <h3 className="text-xl font-semibold text-primary mb-2">
                            Book Desks &amp; Rooms
                        </h3>
                        <p className="text-neutral text-sm sm:text-base">
                            Reserve your spot at work, book a desk, or schedule a meeting room
                            effortlessly.
                        </p>
                    </div>
                </div>

                {/* Feature 2: Reserve Parking Spots */}
                <div className="relative bg-card-bg rounded-xl border border-card-border shadow-lg overflow-visible transition transform hover:scale-105 duration-300 mb-8">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-24 h-24 rounded-full border-4 border-primary bg-white flex items-center justify-center">
                            <FontAwesomeIcon icon={faCar} className="text-4xl text-primary" />
                        </div>
                    </div>
                    <div className="pt-20 pb-6 px-4 text-center">
                        <h3 className="text-xl font-semibold text-primary mb-2">
                            Reserve Parking Spots
                        </h3>
                        <p className="text-neutral text-sm sm:text-base">
                            Secure your parking spot for the day and leave the hassle of finding
                            parking behind.
                        </p>
                    </div>
                </div>

                {/* Feature 3: Manage IT Equipment */}
                <div className="relative bg-card-bg rounded-xl border border-card-border shadow-lg overflow-visible transition transform hover:scale-105 duration-300 mb-8">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-24 h-24 rounded-full border-4 border-primary bg-white flex items-center justify-center">
                            <FontAwesomeIcon icon={faLaptop} className="text-4xl text-primary" />
                        </div>
                    </div>
                    <div className="pt-20 pb-6 px-4 text-center">
                        <h3 className="text-xl font-semibold text-primary mb-2">
                            Manage IT Equipment
                        </h3>
                        <p className="text-neutral text-sm sm:text-base">
                            Track, reserve, and manage IT hardware needs with ease.
                        </p>
                    </div>
                </div>

                {/* Feature 4: Smart Scheduling */}
                <div className="relative bg-card-bg rounded-xl border border-card-border shadow-lg overflow-visible transition transform hover:scale-105 duration-300 mb-8">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-24 h-24 rounded-full border-4 border-primary bg-white flex items-center justify-center">
                            <FontAwesomeIcon
                                icon={faCalendarAlt}
                                className="text-4xl text-primary"
                            />
                        </div>
                    </div>
                    <div className="pt-20 pb-6 px-4 text-center">
                        <h3 className="text-xl font-semibold text-primary mb-2">
                            Smart Scheduling
                        </h3>
                        <p className="text-neutral text-sm sm:text-base">
                            View your upcoming reservations and orders in one convenient
                            dashboard.
                        </p>
                    </div>
                </div>

                {/* Feature 5: Real-Time Notifications */}
                <div className="relative bg-card-bg rounded-xl border border-card-border shadow-lg overflow-visible transition transform hover:scale-105 duration-300 mb-8">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-24 h-24 rounded-full border-4 border-primary bg-white flex items-center justify-center">
                            <FontAwesomeIcon icon={faBell} className="text-4xl text-primary" />
                        </div>
                    </div>
                    <div className="pt-20 pb-6 px-4 text-center">
                        <h3 className="text-xl font-semibold text-primary mb-2">
                            Real-Time Notifications
                        </h3>
                        <p className="text-neutral text-sm sm:text-base">
                            Get instant updates about your reservations and orders.
                        </p>
                    </div>
                </div>

                {/* Feature 6: Food Delivery */}
                <div className="relative bg-card-bg rounded-xl border border-card-border shadow-lg overflow-visible transition transform hover:scale-105 duration-300 mb-8">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-24 h-24 rounded-full border-4 border-primary bg-white flex items-center justify-center">
                            <FontAwesomeIcon icon={faUtensils} className="text-4xl text-primary" />
                        </div>
                    </div>
                    <div className="pt-20 pb-6 px-4 text-center">
                        <h3 className="text-xl font-semibold text-primary mb-2">
                            Food Delivery
                        </h3>
                        <p className="text-neutral text-sm sm:text-base">
                            Enjoy meals and snacks delivered right to your desk quickly and
                            conveniently.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
