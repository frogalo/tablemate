export default function Header() {
    return (
        <header className="gradient-header">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <a href="/" className="text-2xl font-bold text-white hover:opacity-90 transition-opacity">
                                TableMate
                            </a>
                        </div>
                        {/* Navigation Links */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <a href="/dashboard" className="nav-link">
                                Dashboard
                            </a>
                            <a href="/reservations" className="nav-link">
                                Reservations
                            </a>
                            <a href="/orders" className="nav-link">
                                Orders
                            </a>
                        </div>
                    </div>
                    {/* User Menu */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                        <button
                            type="button"
                            className="nav-link rounded-full"
                        >
                            <span className="sr-only">View notifications</span>
                            <svg
                                className="h-6 w-6"
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
                        </button>
                        {/* Profile dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                className="nav-link rounded-full"
                            >
                                <span className="sr-only">Open user menu</span>
                                <div className="h-8 w-8 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">
                                        U
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
