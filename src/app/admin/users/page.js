"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faTimes,
    faEdit,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserForm from "@/components/forms/UserForm";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [filterText, setFilterText] = useState("");
    const [filterRole, setFilterRole] = useState("ALL");
    const [deleteConfirm, setDeleteConfirm] = useState({
        show: false,
        user: null,
    });

    useEffect(() => {
        async function fetchUsers() {
            const response = await fetch("/api/users");
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        }

        fetchUsers();
    }, []);

    // Filter users by role and search string (first or last name)
    useEffect(() => {
        const filtered = users.filter((user) => {
            const fullName = (user.firstName + " " + user.lastName).toLowerCase();
            const searchText = filterText.toLowerCase();
            const roleMatch = filterRole === "ALL" || user.role === filterRole;
            const textMatch = fullName.includes(searchText);
            return roleMatch && textMatch;
        });
        setFilteredUsers(filtered);
    }, [users, filterText, filterRole]);

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
                // Instead of throwing an error, log or update the state
                console.error("Failed to delete user.");
                // Optionally show an error message, e.g.:
                // setError("Failed to delete user.");
                return;
            }
            setUsers(users.filter((u) => u.id !== user.id));
        } catch (err) {
            console.error("Error deleting user:", err);
        } finally {
            setDeleteConfirm({ show: false, user: null });
        }
    };

    return (
        <ProtectedRoute>
            <div className="p-8 main-container">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-primary">Admin Users</h1>
                    <button
                        onClick={handleOpenAddModal}
                        className="btn-primary transition-all px-6 py-3 text-lg"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Add User
                    </button>
                </div>
                <p className="mb-6 text-neutral">
                    Manage user accounts, roles, and permissions from this page.
                </p>

                {/* Filtering Options */}
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-2">
                        <label className="text-secondary">Filter by Role:</label>
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            className="bg-light text-primary border border-neutral rounded-md p-2"
                        >
                            <option value="ALL">All</option>
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="text-secondary">Search Name:</label>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                            className="bg-light text-primary border border-neutral rounded-md p-2"
                        />
                    </div>
                </div>

                {filteredUsers.length > 0 ? (
                    <ul className="space-y-2">
                        {filteredUsers.map((user) => (
                            <li
                                key={user.id}
                                className="card p-4 flex justify-between items-center"
                            >
                                <div>
                  <span className="font-medium">
                    {user.firstName} {user.lastName}
                  </span>{" "}
                                    &mdash;{" "}
                                    <span className="text-secondary">{user.role}</span>
                                </div>
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleEditUser(user)}
                                        className="text-blue-500 hover:text-blue-600 px-2 py-2 text-xl"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        onClick={() => handleRemoveUserClick(user)}
                                        className="text-red-500 hover:text-red-600 px-2 py-2 text-xl"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No users found.</p>
                )}

                {/* Main Modal for Add/Edit Form */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
                        {/* Modal backdrop */}
                        <div
                            className="absolute inset-0 bg-black opacity-50"
                            onClick={handleCloseModal}
                        ></div>
                        {/* Modal box */}
                        <div className="relative bg-light rounded p-6 mx-4 max-w-md w-full card">
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-2 right-2 text-neutral hover:text-secondary"
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
                            className="absolute inset-0 bg-black opacity-50"
                            onClick={handleCancelDelete}
                        ></div>
                        {/* Modal box */}
                        <div className="relative bg-light rounded p-6 mx-4 max-w-sm w-full card">
                            <h3 className="text-xl font-bold text-primary mb-4">
                                Confirm Delete
                            </h3>
                            <p className="mb-6">
                                Are you sure you want to delete{" "}
                                <span className="font-medium">
                  {deleteConfirm.user.firstName}{" "}
                                    {deleteConfirm.user.lastName}
                </span>
                                ?
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={handleCancelDelete}
                                    className="px-6 py-3 text-lg bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="px-10 py-4 text-xl text-red-500 hover:text-red-600"
                                >
                                    <FontAwesomeIcon icon={faTrash} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}
