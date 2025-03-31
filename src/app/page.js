export default function Home() {
    return (
        <div className="h-full flex flex-col justify-center">
            {/* Hero Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl mb-6">
                    Welcome to TableMate
                </h1>
                <p className="text-lg leading-8 text-neutral max-w-2xl mx-auto">
                    Manage your office resources efficiently. Book desks, conference rooms,
                    parking spots, and IT equipment all in one place.
                </p>
                <div className="mt-8 flex items-center justify-center gap-x-6">
                    <a href="/dashboard" className="btn-primary">
                        Get started
                    </a>
                    <a href="/about" className="text-sm font-semibold leading-6 text-secondary">
                        Learn more <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>

            {/* Feature Grid */}
            <div className="mx-auto w-full">
                <div className="text-center mb-12">
                    <h2 className="text-base font-semibold leading-7 text-primary">
                        Manage Smarter
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-secondary">
                        Everything you need to manage office resources
                    </p>
                </div>
                <dl className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Feature 1 */}
                    <div className="card">
                        <dt className="text-base font-semibold leading-7 text-primary">
                            Resource Reservations
                        </dt>
                        <dd className="mt-1 text-base leading-7 text-neutral">
                            Book desks, conference rooms, and parking spots with ease.
                        </dd>
                    </div>
                    {/* Feature 2 */}
                    <div className="card">
                        <dt className="text-base font-semibold leading-7 text-primary">
                            IT Equipment Management
                        </dt>
                        <dd className="mt-1 text-base leading-7 text-neutral">
                            Track and manage IT equipment requests and availability.
                        </dd>
                    </div>
                    {/* Feature 3 */}
                    <div className="card">
                        <dt className="text-base font-semibold leading-7 text-primary">
                            Real-time Notifications
                        </dt>
                        <dd className="mt-1 text-base leading-7 text-neutral">
                            Stay updated with instant notifications about your reservations
                            and orders.
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}
