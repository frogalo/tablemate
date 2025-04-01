"use client";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="relative w-24 h-24">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute top-0 left-0 w-6 h-6 rounded-full bg-accent/50 animate-pulse-${
                            i + 1
                        }`}
                        style={{
                            animationDelay: `${i * 0.3}s`,
                            animationDuration: "1.5s",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
