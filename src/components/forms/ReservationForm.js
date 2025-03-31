'use client';

import { useState } from 'react';

export default function ReservationForm() {
    const [formData, setFormData] = useState({
        resourceId: '',
        startTime: '',
        endTime: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userId: 1, // This should come from authentication
                }),
            });
            const data = await response.json();
            if (response.ok) {
                // Handle success
                console.log('Reservation created:', data);
            } else {
                // Handle error
                console.error('Error:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Resource
                </label>
                <select
                    value={formData.resourceId}
                    onChange={(e) =>
                        setFormData({ ...formData, resourceId: parseInt(e.target.value) })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                >
                    <option value="">Select a resource</option>
                    {/* Add resource options */}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Start Time
                </label>
                <input
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={(e) =>
                        setFormData({ ...formData, startTime: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    End Time
                </label>
                <input
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Create Reservation
            </button>
        </form>
    );
}
