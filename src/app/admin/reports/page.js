"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

// Generic list item with a standardized action slot
function ListItem({ report, onDelete }) {
    const fileType = report.name.split(".").pop().toUpperCase();

    return (
        <li className="py-2 border-b border-accent last:border-0 flex justify-between items-center">
            <div>
                <h3 className="text-lg font-semibold text-primary">{report.name}</h3>
                <p className="text-sm text-neutral">
                    Generated on {report.date} - Type: {fileType}
                </p>
            </div>

            <div className="space-x-2">
                <a
                    href={report.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center text-center h-10 rounded-lg text-lg hover:scale-105 transition-transform"
                >
                    <i className="fa fa-download mr-2"></i>
                    Download
                </a>
                {/* Add your actual delete function here */}
                <button
                    onClick={() => onDelete(report.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    <i className="fa fa-trash"></i>
                </button>
            </div>
        </li>
    );
}

export default function AdminReports() {
    // State to store the list of generated reports
    const [reports, setReports] = useState([]);

    // Function to fetch the reports from an API endpoint
    useEffect(() => {
        async function fetchReports() {
            // Simulate API fetch delay for better UI interaction
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // Use real API endpoints for production environment
            const data = [
                {
                    id: 1,
                    name: "UserActivityReport.pdf",
                    url: "#",
                    date: "2024-05-03",
                },
                {
                    id: 2,
                    name: "OrderSummary.csv",
                    url: "#",
                    date: "2024-05-02",
                },
                {
                    id: 3,
                    name: "ReservationBreakdown.xlsx",
                    url: "#",
                    date: "2024-05-01",
                },
            ];

            setReports(data);
        }

        fetchReports();
    }, []);

    // Handlers
    const handleGenerateReport = (reportType) => {
        alert(`Generating ${reportType} Report! This action is simulated.`);
    };

    // Handler
    const handleDeleteReport = (id) => {
        setReports(reports.filter((report) => report.id !== id));
    };

    return (
        <ProtectedRoute>
            <div className="p-8 main-container">
                {/* Header section of the admin panel page */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary">Admin Reports</h1>
                    <p className="text-neutral mt-2">
                        Generate and manage reports for platform analytics and monitoring.
                    </p>
                </div>

                {/* Actions Panel containing available generation commands */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-primary mb-4">
                        Generate New Report
                    </h2>

                    <div className="card flex flex-wrap gap-4">
                        <button
                            onClick={() => handleGenerateReport("User Activity")}
                            className="btn-primary px-5 py-3 rounded-lg hover:scale-105 transition-transform"
                        >
                            Generate User Activity Report
                        </button>
                        <button
                            onClick={() => handleGenerateReport("Orders")}
                            className="btn-primary px-5 py-3 rounded-lg hover:scale-105 transition-transform"
                        >
                            Generate Orders Report
                        </button>
                        <button
                            onClick={() => handleGenerateReport("Reservations")}
                            className="btn-primary px-5 py-3 rounded-lg hover:scale-105 transition-transform"
                        >
                            Generate Reservations Report
                        </button>
                    </div>
                </section>

                {/* Reports List: Display current generated files */}
                <section>
                    <h2 className="text-xl font-semibold text-primary mb-4">
                        Existing Reports
                    </h2>

                    <div className="card">
                        {reports.length > 0 ? (
                            <ul className="divide-y divide-accent">
                                {reports.map((report) => (
                                    <ListItem
                                        key={report.id}
                                        report={report}
                                        onDelete={handleDeleteReport}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <p className="text-neutral">No reports generated yet.</p>
                        )}
                    </div>
                </section>
            </div>
        </ProtectedRoute>
    );
}
