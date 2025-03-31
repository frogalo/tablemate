export default function Footer() {
    return (
        <footer className="bg-white border-t border-accent mt-auto">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-neutral">
                    © {new Date().getFullYear()} TableMate. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
