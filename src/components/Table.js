"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faTimes,
    faEdit,
    faTrash,
    faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserForm from "@/components/forms/UserForm";
import Filters from "@/components/Filters";
import Table from "@/components/Table";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [filterText, setFilterText] = useState("");
    const [filterRole, setFilterRole] = useState("ALL");
    const [sortField, setSortField] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [deleteConfirm, setDeleteConfirm] = useState({
        show: false,
        user: null,
    });

    // Role filter options
    const roleFilterOptions = [
        { value: "ALL", label: "All Roles" },
        { value: "USER", label: "User" },
        { value: "ADMIN", label: "Admin" },
    ];

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch("/api/users");
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    // Helper to apply different colors based on role.
    const getRoleBadgeClasses = (role) => {
        switch (role) {
            case "ADMIN":
                return "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold";
            case "USER":
                return "bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold";
            default:
                return "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold";
        }
    };

    // Filter and sort users
    useEffect(() => {
        let filtered = users.filter((user) => {
            const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
            const searchText = filterText.toLowerCase();
            const roleMatch = filterRole === "ALL" || user.role === filterRole;
            const textMatch = fullName.includes(searchText);
            return roleMatch && textMatch;
        });

        // Sort the filtered users
        filtered = [...filtered].sort((a, b) => {
            let fieldA, fieldB;

            // Handle name fields specially
            if (sortField === "name") {
                fieldA = `${a.firstName} ${a.lastName}`;
                fieldB = `${b.firstName} ${b.lastName}`;
            } else {
                fieldA = a[sortField];
                fieldB = b[sortField];
            }

            if (typeof fieldA === "string") {
                fieldA = fieldA.toLowerCase();
                fieldB = fieldB.toLowerCase();
            }

            if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1;
            if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });

        setFilteredUsers(filtered);
    }, [users, filterText, filterRole, sortField, sortDirection]);

    const toggleSortDirection = () => {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };

    const handleSort = () => {
        toggleSortDirection();
    };

    // Open modal in "add" mode
    const handleOpenAddModal = () => {
        setEditingUser(null);
        setShowModal(true);
    };

    // Open modal in edit mode with the selected user data
    const handleEditUser = (user) => {
        setEditingUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingUser(null);
    };

    // After adding or editing a user, update the users list accordingly
    const onUserAdded = (newUser) => {
        setUsers([...users, newUser]);
        setShowModal(false);
    };

    const onUserUpdated = (updatedUser) => {
        setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
        setShowModal(false);
    };

    // Instead of using window.confirm, show the confirm modal
    const handleRemoveUserClick = (user) => {
        setDeleteConfirm({ show: true, user });
    };

    const handleCancelDelete = () => {
        setDeleteConfirm({ show: false, user: null });
    };

    const handleConfirmDelete = async () => {
        const { user } = deleteConfirm;
        try {
            const res = await fetch(`/api/users/${user.id}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                console.error("Failed to delete user.");
                return;
            }
            setUsers(users.filter((u) => u.id !== user.id));
        } catch (err) {
            console.error("Error deleting user:", err);
        } finally {
            setDeleteConfirm({ show: false, user: null });
        }
    };

    const clearFilters = () => {
        setFilterText("");
        setFilterRole("ALL");
        setSortDirection("asc");
    };

    // Define columns for the Table component. In this case, we choose not to display the email (identifier)
    const columns = ["Name", "Role", "Actions"];

    return (
        <ProtectedRoute>
            <div className="p-8 main-container space-y-6">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-primary">Admin Users</h1>
                    <button
                        onClick={handleOpenAddModal}
                        className="btn-primary transition-all px-6 py-3 text-lg cursor-pointer flex items-center"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add User
                    </button>
                </div>
                <p className="mb-6 text-neutral">
                    Manage user accounts, roles, and permissions from this page.
                </p>

                {/* Filters Component */}
                <Filters
                    filterText={filterText}
                    setFilterText={setFilterText}
                    filterOptions={roleFilterOptions}
                    selectedFilter={filterRole}
                    setSelectedFilter={setFilterRole}
                    sortField="Name"
                    sortDirection={sortDirection}
                    handleSort={handleSort}
                    clearFilters={clearFilters}
                    totalCount={users.length}
                    filteredCount={filteredUsers.length}
                />

                {/* Loading Spinner */}
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <ClipLoader size={50} color={"var(--primary)"} />
                    </div>
                ) : filteredUsers.length > 0 ? (
                    <Table
                        columns={columns}
                        tableClassName="table-fixed w-full"
                        data={filteredUsers}
                        renderRow={(user) => (
                            <tr
                                key={user.id}
                                className="border-b border-accent last:border-0"
                            >
                                <td className="px-4 py-2">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                                            {user.firstName.charAt(0)}
                                            {user.lastName.charAt(0)}
                                        </div>
                                        <span className="font-medium text-primary">
                      {user.firstName} {user.lastName}
                    </span>
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                  <span className={getRoleBadgeClasses(user.role)}>
                    {user.role}
                  </span>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditUser(user)}
                                            className="cursor-pointer text-primary hover:text-primary/80 p-2 rounded-full hover:bg-primary/10 transition-colors"
                                            type="button"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            onClick={() => handleRemoveUserClick(user)}
                                            className="cursor-pointer text-accent hover:text-accent/80 p-2 rounded-full hover:bg-accent/10 transition-colors"
                                            type="button"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    />
                ) : (
                    <div className="text-center py-12 bg-card-bg rounded-lg border border-neutral/20">
                        <p className="text-neutral text-lg">
                            No users found matching your filters.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="mt-4 text-primary hover:underline flex items-center justify-center mx-auto"
                        >
                            <FontAwesomeIcon icon={faUndo} className="mr-2" />
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Main Modal for Add/Edit Form */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
                        {/* Modal backdrop */}
                        <div
                            className="absolute inset-0 bg-black opacity-50 cursor-pointer"
                            onClick={handleCloseModal}
                        ></div>
                        {/* Modal box */}
                        <div className="relative bg-card-bg rounded-lg p-6 mx-4 max-w-md w-full card">
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="absolute top-2 right-2 text-neutral hover:text-secondary cursor-pointer p-2 rounded-full hover:bg-neutral/10"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                            <h2 className="text-2xl mb-4 text-primary">
                                {editingUser ? "Edit User" : "Add New User"}
                            </h2>
                            <UserForm
                                initialUser={editingUser}
                                onUserAdded={onUserAdded}
                                onUserUpdated={onUserUpdated}
                                onClose={handleCloseModal}
                            />
                        </div>
                    </div>
                )}

                {/* Confirm Delete Modal */}
                {deleteConfirm.show && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
                        {/* Modal backdrop */}
                        <div
                            className="absolute inset-0 bg-black opacity-50 cursor-pointer"
                            onClick={handleCancelDelete}
                        ></div>
                        {/* Modal box */}
                        <div className="relative bg-card-bg rounded-lg p-6 mx-4 max-w-sm w-full card">
                            <h3 className="text-xl font-bold text-primary mb-4">
                                Confirm Delete
                            </h3>
                            <p className="mb-6">
                                Are you sure you want to delete{" "}
                                <span className="font-medium">
                  {deleteConfirm.user?.firstName}{" "}
                                    {deleteConfirm.user?.lastName}
                </span>
                                ?
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={handleCancelDelete}
                                    className="cursor-pointer px-4 py-2 text-sm bg-third rounded-md hover:bg-third/70 transition-colors"
                                    type="button"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="cursor-pointer px-4 py-2 text-sm bg-accent text-white rounded-md hover:bg-accent/80 transition-colors flex items-center"
                                    type="button"
                                >
                                    <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}
