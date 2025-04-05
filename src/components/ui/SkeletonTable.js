"use client";

import { PulseLoader } from "react-spinners";

export default function SkeletonTable({ columns = [] }) {
    return (
        <div className="card overflow-x-auto">
            <table className="table-fixed w-full">
                <thead>
                <tr className="border-b border-accent">
                    {columns.map((col, index) => (
                        <th
                            key={index}
                            className="px-4 py-2 text-left text-neutral font-medium"
                        >
                            {col}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td colSpan={columns.length} className="py-8">
                        <div className="flex justify-center items-center">
                            <PulseLoader color="#3b82f6" size={16} />
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
