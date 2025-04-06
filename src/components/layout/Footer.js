"use client";

export default function Footer() {
    return (
        <footer className="bg-card-bg border-t border-accent mt-auto transition-colors duration-300">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-neutral transition-colors duration-300">
                    © {new Date().getFullYear()} Lab Dynamics. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
