"use client";

import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import ProtectedRoute from "@/components/ProtectedRoute";
import ResourceForm from "@/components/forms/ResourceForm";
import Filters from "@/components/Filters";

// Helper for resource type background colors.
function getResourceTypeBg(type) {
    switch (type) {
        case "PARKING":
            return "bg-yellow-100 text-yellow-900";
        case "DESK":
            return "bg-green-100 text-green-900";
        case "ROOM":
            return "bg-blue-100 text-blue-900";
        case "CONFERENCE_ROOM":
            return "bg-purple-100 text-purple-900";
        default:
            return "bg-gray-100 text-gray-800";
    }
}

export default function AdminResources() {
    // Local state for resources.
    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal state for resources.
    const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
    const [resourceToEdit, setResourceToEdit] = useState(null);
    const [resourceToDelete, setResourceToDelete] = useState(null);

    // Filter states.
    const [filterName, setFilterName] = useState("");
    const [filterType, setFilterType] = useState("");
    const [resourceSortDirection, setResourceSortDirection] = useState("asc");

    // Fetch resources from the API.
    useEffect(() => {
        async function fetchResources() {
            try {
                const res = await fetch("/api/resources");
                if (res.ok) {
                    const data = await res.json();
                    setResources(data);
                }
            } catch (error) {
                console.error("Error fetching resources:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchResources();
    }, []);

    // Recalculate filtered (and sorted) resources when filters change.
    useEffect(() => {
        let filtered = resources.filter((resource) =>
            resource.name.toLowerCase().includes(filterName.toLowerCase())
        );
        if (filterType) {
            filtered = filtered.filter((resource) => resource.type === filterType);
        }
        // Sort alphabetically by name.
        filtered = [...filtered].sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            if (aName < bName) return resourceSortDirection === "asc" ? -1 : 1;
            if (aName > bName) return resourceSortDirection === "asc" ? 1 : -1;
            return 0;
        });
        setFilteredResources(filtered);
    }, [resources, filterName, filterType, resourceSortDirection]);

    // Handler for saving a resource (both for add and edit).
    const handleSaveResource = (newResource) => {
        if (resourceToEdit) {
            setResources(
                resources.map((r) => (r.id === newResource.id ? newResource : r))
            );
            setResourceToEdit(null);
        } else {
            setResources([...resources, newResource]);
        }
        setIsResourceModalOpen(false);
    };

    // Handler for removing a resource.
    const handleRemoveResource = async (resource) => {
        try {
            const res = await fetch(`/api/resources/${resource.id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                console.error("Failed to remove resource");
                return;
            }
            setResources(resources.filter((r) => r.id !== resource.id));
        } catch (error) {
            console.error("Error deleting resource:", error);
        }
    };

    // Toggle sort direction for resources.
    const toggleResourceSortDirection = () => {
        setResourceSortDirection(
            resourceSortDirection === "asc" ? "desc" : "asc"
        );
    };

    // Clear filters for resources.
    const clearResourceFilters = () => {
        setFilterName("");
        setFilterType("");
        setResourceSortDirection("asc");
    };

    return (
        <ProtectedRoute>
            <div className="p-8 space-y-12">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">
                        Admin Resources
                    </h1>
                    <p className="text-neutral">
                        Manage available resources such as parking spots, desk spots, rooms, and
                        conference rooms. These resources will later be available for user
                        reservations.
                    </p>
                </div>

                {/* Filters using the reusable Filters component */}
                <Filters
                    filterText={filterName}
                    setFilterText={setFilterName}
                    filterOptions={[
                        { value: "", label: "All Types" },
                        { value: "PARKING", label: "Parking Spot" },
                        { value: "DESK", label: "Desk Spot" },
                        { value: "ROOM", label: "Room" },
                        { value: "CONFERENCE_ROOM", label: "Conference Room" },
                    ]}
                    selectedFilter={filterType}
                    setSelectedFilter={setFilterType}
                    sortField="Name"
                    sortDirection={resourceSortDirection}
                    handleSort={toggleResourceSortDirection}
                    clearFilters={clearResourceFilters}
                    totalCount={resources.length}
                    filteredCount={filteredResources.length}
                />

                {/* Resources Section */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-primary">
                            Resources Inventory
                        </h2>
                        <button
                            onClick={() => {
                                setResourceToEdit(null);
                                setIsResourceModalOpen(true);
                            }}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                        >
                            Add New Resource
                        </button>
                    </div>
                    <div className="card overflow-x-auto">
                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <ClipLoader size={50} color={"#123abc"} />
                            </div>
                        ) : filteredResources.length > 0 ? (
                            <table className="table-fixed w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral hidden md:table-cell">
                                        ID
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left">
                                        Type
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left">
                                        Name
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left">
                                        Identifier
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left hidden sm:table-cell">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredResources.map((resource) => (
                                    <tr
                                        key={resource.id}
                                        className="border-b border-accent last:border-0"
                                    >
                                        <td className="w-1/5 px-4 py-2 text-neutral hidden md:table-cell">
                                            {resource.id}
                                        </td>
                                        <td
                                            className={`w-1/5 px-4 py-2 ${getResourceTypeBg(
                                                resource.type
                                            )}`}
                                        >
                                            {resource.type}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral">
                                            {resource.name}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral">
                                            {resource.identifier}
                                        </td>
                                        <td className="w-1/5 px-4 py-2 text-neutral hidden sm:table-cell">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setResourceToEdit(resource);
                                                    setIsResourceModalOpen(true);
                                                }}
                                                className="mx-1 text-blue-500 hover:text-blue-700 cursor-pointer"
                                            >
                                                <i className="fa fa-edit"></i>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setResourceToDelete(resource)}
                                                className="mx-1 text-red-500 hover:text-red-700 cursor-pointer"
                                            >
                                                <i className="fa fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-neutral">No resources added yet.</p>
                        )}
                    </div>
                </section>

                {/* Confirmation modal for deleting a resource */}
                {resourceToDelete && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
                        <div
                            className="absolute inset-0 bg-black opacity-50"
                            onClick={() => setResourceToDelete(null)}
                        ></div>
                        <div className="relative bg-light rounded p-6 mx-4 max-w-sm w-full card">
                            <h3 className="text-xl font-bold text-primary mb-4">
                                Confirm Delete
                            </h3>
                            <p className="mb-6 text-neutral">
                                Are you sure you want to delete resource &quot;
                                {resourceToDelete.name}&quot;?
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setResourceToDelete(null)}
                                    className="px-4 py-2 rounded bg-gray-300 text-neutral hover:bg-gray-400 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleRemoveResource(resourceToDelete);
                                        setResourceToDelete(null);
                                    }}
                                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Resource Form Modal */}
                <ResourceForm
                    isOpen={isResourceModalOpen}
                    onClose={() => {
                        setIsResourceModalOpen(false);
                        setResourceToEdit(null);
                    }}
                    onSave={handleSaveResource}
                    initialResource={resourceToEdit}
                />
            </div>
        </ProtectedRoute>
    );
}
