"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "@/lib/UserContext";

export default function Header() {
    const pathname = usePathname();
    const { user, setUser } = useContext(UserContext); // Access user state
    const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown toggle
    const [notifications, setNotifications] = useState(3); // Example notification count

    const handleUserChange = (newUser) => {
        setUser(newUser);
        setDropdownOpen(false); // Close dropdown after selection
    };

    const renderNavLinks = () => {
        if (user === "SignedOut") {
            return null; // No navigation links for SignedOut
        }

        if (user === "Admin") {
            return (
                <>
                    <Link
                        href="/admin/dashboard"
                        className={`nav-link ${pathname === "/admin/dashboard" ? "nav-link-active" : ""}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/reports"
                        className={`nav-link ${pathname === "/admin/reports" ? "nav-link-active" : ""}`}
                    >
                        Reports
                    </Link>
                    <Link
                        href="/admin/reservations"
                        className={`nav-link ${pathname === "/admin/reservations" ? "nav-link-active" : ""}`}
                    >
                        Reservations
                    </Link>
                    <Link
                        href="/admin/users"
                        className={`nav-link ${pathname === "/admin/users" ? "nav-link-active" : ""}`}
                    >
                        Users
                    </Link>
                </>
            );
        }

        if (user === "User") {
            return (
                <>
                    <Link
                        href="/user/dashboard"
                        className={`nav-link ${pathname === "/user/dashboard" ? "nav-link-active" : ""}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/user/orders"
                        className={`nav-link ${pathname === "/user/orders" ? "nav-link-active" : ""}`}
                    >
                        Orders
                    </Link>
                    <Link
                        href="/user/reservations"
                        className={`nav-link ${pathname === "/user/reservations" ? "nav-link-active" : ""}`}
                    >
                        Reservations
                    </Link>
                    <Link
                        href="/user/profile"
                        className={`nav-link ${pathname === "/user/profile" ? "nav-link-active" : ""}`}
                    >
                        Profile
                    </Link>
                </>
            );
        }
    };

    return (
        <header className="gradient-header">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
                            <img
                                src="/logo.png"
                                alt="TableMate Logo"
                                className="h-8 w-8 mr-2"
                            />
                            <span className="text-2xl font-bold text-white hover:opacity-90 transition-opacity">
                                TableMate
                            </span>
                        </Link>
                    </div>
                    {/* Navigation Links */}
                    <div className="hidden sm:flex sm:space-x-8">
                        {renderNavLinks()}
                    </div>
                    {/* User Menu */}
                    <div className="relative flex items-center space-x-4">
                        {/* Notification Button */}
                        {user !== "SignedOut" && (
                            <button
                                type="button"
                                className="relative bg-white/20 p-2 rounded-full hover:bg-white/30 transition cursor-pointer flex items-center"
                                aria-label="Notifications"
                            >
                                <svg
                                    className="h-6 w-6 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                                {notifications > 0 && (
                                    <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {notifications}
        </span>
                                )}
                            </button>
                        )}
                        {/* User Circle */}
                        {user === "SignedOut" ? (
                            <Link
                                href="/login"
                                className="nav-link rounded-full flex items-center bg-white/20 px-4 py-2 text-sm text-white hover:bg-white/30 transition cursor-pointer"
                            >
                                Login
                            </Link>
                        ) : (
                            <button
                                type="button"
                                className="nav-link rounded-full flex items-center"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <span className="sr-only">Open user menu</span>
                                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-white/20">
                                    <span className="text-white text-sm font-medium">
                                        {user === "Admin" ? "AD" : "US"}
                                    </span>
                                </div>
                            </button>
                        )}
                        {/* Dropdown Menu */}
                        {dropdownOpen && user !== "SignedOut" && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                <ul className="py-1">
                                    <li>
                                        <button
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            onClick={() => handleUserChange("Admin")}
                                        >
                                            Switch to Admin
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            onClick={() => handleUserChange("User")}
                                        >
                                            Switch to User
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                            onClick={() => handleUserChange("SignedOut")}
                                        >
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
