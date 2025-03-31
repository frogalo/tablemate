export default function DashboardLoading() {
    return (
        <div className="fade-in animate-pulse">
            {/* Header Skeleton */}
            <div className="mb-8">
                <div className="h-8 w-48 bg-accent/20 rounded mb-2"></div>
                <div className="h-4 w-64 bg-accent/20 rounded"></div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="card">
                        <div className="h-4 w-24 bg-accent/20 rounded mb-2"></div>
                        <div className="h-8 w-16 bg-accent/20 rounded"></div>
                    </div>
                ))}
            </div>

            {/* Activity and Actions Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                    <div className="h-6 w-32 bg-accent/20 rounded mb-4"></div>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-12 bg-accent/20 rounded mb-2"></div>
                    ))}
                </div>
                <div className="card">
                    <div className="h-6 w-32 bg-accent/20 rounded mb-4"></div>
                    <div className="grid grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-10 bg-accent/20 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
