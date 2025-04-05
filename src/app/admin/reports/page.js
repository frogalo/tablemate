"use client";

import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useToast } from "@/lib/useToast";

function ListItem({ report, onDelete }) {
    const fileType = report.name.split(".").pop().toUpperCase();

    return (
        <li className="py-3 border-b border-neutral last:border-0 flex justify-between items-center gap-4">
            <div className="flex-grow min-w-0">
                <h3 className="text-lg font-semibold text-primary truncate">
                    {report.name}
                </h3>
                <p className="text-sm text-neutral">
                    Generated on {report.date} - Type: {fileType}
                </p>
            </div>
            <div className="flex-shrink-0 flex items-center space-x-3">
                <a
                    href={report.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-3 py-1.5 rounded-md text-sm inline-flex items-center justify-center hover:scale-105 transition-transform"
                >
                    <i className="fas fa-download mr-1.5"></i>
                    Download
                </a>
                <button
                    onClick={() => onDelete(report.id, report.name)}
                    className="text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    aria-label={`Delete report ${report.name}`}
                >
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </li>
    );
}

export default function AdminReports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToast } = useToast();

    useEffect(() => {
        async function fetchReports() {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            try {
                const data = [
                    {
                        id: 1,
                        name: "UserActivityReport_2024-05-03.pdf",
                        url: "#",
                        date: "2024-05-03",
                    },
                    {
                        id: 2,
                        name: "OrderSummary_May_Week1.csv",
                        url: "#",
                        date: "2024-05-02",
                    },
                    {
                        id: 3,
                        name: "ReservationBreakdown_Q1.xlsx",
                        url: "#",
                        date: "2024-05-01",
                    },
                ];
                setReports(data);
            } catch (error) {
                console.error("Error fetching reports:", error);
                addToast("Failed to load reports.", "error");
            } finally {
                setLoading(false);
            }
        }
        fetchReports();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGenerateReport = (reportType) => {
        console.log(`Simulating generation of ${reportType} Report...`);
        addToast(`Generating ${reportType} report...`, "info");
    };

    const handleDeleteReport = (id, reportName) => {
        console.log(`Simulating deletion of report ID: ${id}`);
        setReports((prevReports) => prevReports.filter((report) => report.id !== id));
        addToast(`Report "${reportName}" deleted successfully.`, "success");
    };

    return (
        <ProtectedRoute>
            <div className="p-6 md:p-8 min-h-screen">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary">Admin Reports</h1>
                    <p className="text-neutral mt-2">
                        Generate and manage reports for platform analytics and monitoring.
                    </p>
                </div>
                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-primary mb-4">
                        Generate New Report
                    </h2>
                    <div className="card bg-card-bg p-4 md:p-6 rounded-lg shadow">
                        <div className="flex flex-wrap gap-3 md:gap-4">
                            <button
                                onClick={() => handleGenerateReport("User Activity")}
                                className="btn-primary px-4 py-2 rounded-md text-sm md:text-base hover:scale-105 transition-transform"
                            >
                                Generate User Activity Report
                            </button>
                            <button
                                onClick={() => handleGenerateReport("Orders")}
                                className="btn-primary px-4 py-2 rounded-md text-sm md:text-base hover:scale-105 transition-transform"
                            >
                                Generate Orders Report
                            </button>
                            <button
                                onClick={() => handleGenerateReport("Reservations")}
                                className="btn-primary px-4 py-2 rounded-md text-sm md:text-base hover:scale-105 transition-transform"
                            >
                                Generate Reservations Report
                            </button>
                        </div>
                    </div>
                </section>
                <section>
                    <h2 className="text-xl font-semibold text-primary mb-4">
                        Existing Reports
                    </h2>
                    <div className="card bg-card-bg p-4 md:p-6 rounded-lg shadow">
                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <ClipLoader size={40} color="var(--primary)" />
                            </div>
                        ) : reports.length > 0 ? (
                            <ul className="">
                                {reports.map((report) => (
                                    <ListItem
                                        key={report.id}
                                        report={report}
                                        onDelete={handleDeleteReport}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <p className="text-neutral text-center py-4">
                                No reports generated yet.
                            </p>
                        )}
                    </div>
                </section>
            </div>
        </ProtectedRoute>
    );
}
