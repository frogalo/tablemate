"use client";

import { PulseLoader } from "react-spinners";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <PulseLoader color="#yourAccentColor" size={16} />
        </div>
    );
}
