"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import RestaurantForm from "@/components/forms/RestaurantForm";
import AccessoryForm from "@/components/forms/AccessoryForm";
import SkeletonTable from "@/components/ui/SkeletonTable";
import Filters from "@/components/Filters";

// Returns a background/text color class based on status
function getStatusBg(status) {
    const s = status.toLowerCase();
    if (s === "delivered") return "bg-green-100 text-green-800";
    if (s === "processing") return "bg-yellow-100 text-yellow-800";
    if (s === "shipped") return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
}

export default function AdminOrders() {
    // --- MOCK/INITIAL DATA ---
    const initialItOrders = [
        {
            id: "1001",
            user: "john.doe@example.com",
            item: "Laptop",
            status: "Processing",
        },
        {
            id: "1002",
            user: "jane.smith@example.com",
            item: "Monitor",
            status: "Shipped",
        },
        {
            id: "1003",
            user: "david.lee@example.com",
            item: "Keyboard",
            status: "Delivered",
        },
    ];

    // --- Local States ---
    const [itOrders, setItOrders] = useState(initialItOrders);
    const [filteredOrders, setFilteredOrders] = useState(initialItOrders);
    const [accessories, setAccessories] = useState([]);
    const [filteredAccessories, setFilteredAccessories] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [loadingAccessories, setLoadingAccessories] = useState(true);
    const [loadingRestaurants, setLoadingRestaurants] = useState(true);

    // --- Filter States for Orders ---
    const [orderFilterText, setOrderFilterText] = useState("");
    const [orderStatusFilter, setOrderStatusFilter] = useState("ALL");
    const [orderSortDirection, setOrderSortDirection] = useState("asc");

    // --- Filter States for Accessories ---
    const [accessoryFilterText, setAccessoryFilterText] = useState("");
    const [accessorySortDirection, setAccessorySortDirection] = useState("asc");

    // --- Filter States for Restaurants ---
    const [restaurantFilterText, setRestaurantFilterText] = useState("");
    const [restaurantSortDirection, setRestaurantSortDirection] = useState("asc");

    // --- Modal & Edit/Delete States ---
    const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
    const [isAccessoryModalOpen, setIsAccessoryModalOpen] = useState(false);
    const [restaurantToEdit, setRestaurantToEdit] = useState(null);
    const [restaurantToDelete, setRestaurantToDelete] = useState(null);
    const [accessoryToEdit, setAccessoryToEdit] = useState(null);
    const [accessoryToDelete, setAccessoryToDelete] = useState(null);

    // --- Fetch Data from API on Component Mount ---
    useEffect(() => {
        async function fetchData() {
            try {
                const [ordersRes, accessoriesRes, restaurantsRes] = await Promise.all([
                    fetch("/api/orders"),
                    fetch("/api/accessories"),
                    fetch("/api/restaurants"),
                ]);

                if (ordersRes.ok) {
                    const ordersData = await ordersRes.json();
                    setItOrders(ordersData);
                }
                if (accessoriesRes.ok) {
                    const accessoriesData = await accessoriesRes.json();
                    setAccessories(accessoriesData);
                }
                if (restaurantsRes.ok) {
                    const restaurantsData = await restaurantsRes.json();
                    setRestaurants(restaurantsData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoadingOrders(false);
                setLoadingAccessories(false);
                setLoadingRestaurants(false);
            }
        }
        fetchData();
    }, []);

    // --- Filter & Sort Orders ---
    useEffect(() => {
        let filtered = itOrders.filter((order) => {
            const searchText = orderFilterText.toLowerCase();
            const idMatch = order.id.toLowerCase().includes(searchText);
            const userMatch = order.user.toLowerCase().includes(searchText);
            const itemMatch = order.item.toLowerCase().includes(searchText);
            const statusMatch =
                orderStatusFilter === "ALL" ||
                order.status.toLowerCase() === orderStatusFilter.toLowerCase();
            return (idMatch || userMatch || itemMatch) && statusMatch;
        });

        filtered = [...filtered].sort((a, b) => {
            let fieldA = a.id.toLowerCase();
            let fieldB = b.id.toLowerCase();
            if (fieldA < fieldB) return orderSortDirection === "asc" ? -1 : 1;
            if (fieldA > fieldB) return orderSortDirection === "asc" ? 1 : -1;
            return 0;
        });

        setFilteredOrders(filtered);
    }, [itOrders, orderFilterText, orderStatusFilter, orderSortDirection]);

    const toggleOrderSortDirection = () => {
        setOrderSortDirection(
            orderSortDirection === "asc" ? "desc" : "asc"
        );
    };

    const clearOrderFilters = () => {
        setOrderFilterText("");
        setOrderStatusFilter("ALL");
        setOrderSortDirection("asc");
    };

    // --- Filter & Sort Accessories ---
    useEffect(() => {
        let filtered = accessories.filter((acc) =>
            acc.name.toLowerCase().includes(accessoryFilterText.toLowerCase())
        );

        filtered = [...filtered].sort((a, b) => {
            let fieldA = a.name.toLowerCase();
            let fieldB = b.name.toLowerCase();
            if (fieldA < fieldB) return accessorySortDirection === "asc" ? -1 : 1;
            if (fieldA > fieldB) return accessorySortDirection === "asc" ? 1 : -1;
            return 0;
        });

        setFilteredAccessories(filtered);
    }, [accessories, accessoryFilterText, accessorySortDirection]);

    const toggleAccessorySortDirection = () => {
        setAccessorySortDirection(
            accessorySortDirection === "asc" ? "desc" : "asc"
        );
    };

    const clearAccessoryFilters = () => {
        setAccessoryFilterText("");
        setAccessorySortDirection("asc");
    };

    // --- Filter & Sort Restaurants ---
    useEffect(() => {
        let filtered = restaurants.filter((r) =>
            r.name.toLowerCase().includes(restaurantFilterText.toLowerCase()) ||
            r.email.toLowerCase().includes(restaurantFilterText.toLowerCase())
        );

        filtered = [...filtered].sort((a, b) => {
            let fieldA = a.name.toLowerCase();
            let fieldB = b.name.toLowerCase();
            if (fieldA < fieldB) return restaurantSortDirection === "asc" ? -1 : 1;
            if (fieldA > fieldB) return restaurantSortDirection === "asc" ? 1 : -1;
            return 0;
        });

        setFilteredRestaurants(filtered);
    }, [restaurants, restaurantFilterText, restaurantSortDirection]);

    const toggleRestaurantSortDirection = () => {
        setRestaurantSortDirection(
            restaurantSortDirection === "asc" ? "desc" : "asc"
        );
    };

    const clearRestaurantFilters = () => {
        setRestaurantFilterText("");
        setRestaurantSortDirection("asc");
    };

    // --- Handlers for Add/Edit/Remove ---
    const handleAddCompany = (newRestaurant) => {
        setRestaurants([...restaurants, { ...newRestaurant, orderCount: 0 }]);
        setIsCompanyModalOpen(false);
    };

    const handleAddAccessory = (newAccessory) => {
        if (accessoryToEdit) {
            setAccessories(
                accessories.map((acc) =>
                    acc.id === newAccessory.id ? newAccessory : acc
                )
            );
            setAccessoryToEdit(null);
        } else {
            setAccessories([...accessories, newAccessory]);
        }
        setIsAccessoryModalOpen(false);
    };

    const handleEditItem = (item, type) => {
        if (type === "restaurant") {
            setRestaurantToEdit(item);
            setIsCompanyModalOpen(true);
        } else if (type === "accessory") {
            setAccessoryToEdit(item);
            setIsAccessoryModalOpen(true);
        } else {
            console.log("Edit", type, item);
        }
    };

    const handleRemoveItem = async (item, type) => {
        try {
            let apiUrl = "";
            if (type === "restaurant") {
                apiUrl = `/api/restaurants/${item.id}`;
            } else if (type === "accessory") {
                apiUrl = `/api/accessories/${item.id}`;
            } else if (type === "order") {
                apiUrl = `/api/orders/${item.id}`;
            } else {
                console.log("Unknown type:", type);
                return;
            }
            const res = await fetch(apiUrl, { method: "DELETE" });
            if (!res.ok) {
                console.error(`Failed to remove ${type}`);
                return;
            }
            if (type === "restaurant") {
                setRestaurants(restaurants.filter((r) => r.id !== item.id));
            } else if (type === "accessory") {
                setAccessories(accessories.filter((a) => a.id !== item.id));
            } else if (type === "order") {
                setItOrders(itOrders.filter((o) => o.id !== item.id));
            }
        } catch (error) {
            console.error("Error removing", type, error);
        }
    };

    // --- Render Row Functions ---
    const renderOrderRow = (order) => (
        <tr key={order.id} className="border-b border-accent last:border-0">
            <td className="w-1/5 px-4 py-2 text-neutral hidden md:table-cell whitespace-normal">
                {order.id}
            </td>
            <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                {order.user}
            </td>
            <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                {order.item}
            </td>
            <td
                className={`w-1/5 px-4 py-2 text-center ${getStatusBg(
                    order.status
                )} whitespace-normal`}
            >
                {order.status}
            </td>
            <td className="w-1/5 px-4 py-2 text-neutral hidden sm:table-cell whitespace-normal">
                <button
                    type="button"
                    onClick={() => handleEditItem(order, "order")}
                    className="mx-1 text-blue-500 hover:text-blue-700"
                >
                    <i className="fa fa-pencil"></i>
                </button>
                <button
                    type="button"
                    onClick={() => handleRemoveItem(order, "order")}
                    className="mx-1 text-red-500 hover:text-red-700"
                >
                    <i className="fa fa-trash"></i>
                </button>
            </td>
        </tr>
    );

    const renderAccessoryRow = (accessory) => (
        <tr key={accessory.id} className="border-b border-accent last:border-0">
            <td className="w-1/5 px-4 py-2 text-neutral hidden md:table-cell whitespace-normal">
                {accessory.id}
            </td>
            <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                {accessory.name}
            </td>
            <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                {accessory.quantity}
            </td>
            <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                {accessory.allocated || 0}
            </td>
            <td className="w-1/5 px-4 py-2 text-neutral hidden sm:table-cell whitespace-normal">
                <button
                    type="button"
                    onClick={() => handleEditItem(accessory, "accessory")}
                    className="cursor-pointer mx-1 text-blue-500 hover:text-blue-700"
                >
                    <i className="fa fa-pencil"></i>
                </button>
                <button
                    type="button"
                    onClick={() => setAccessoryToDelete(accessory)}
                    className="cursor-pointer mx-1 text-red-500 hover:text-red-700"
                >
                    <i className="fa fa-trash"></i>
                </button>
            </td>
        </tr>
    );

    const renderRestaurantRow = (restaurant) => (
        <tr key={restaurant.id} className="border-b border-accent last:border-0">
            <td className="w-1/5 px-4 py-2 text-neutral hidden md:table-cell whitespace-normal">
                {restaurant.id}
            </td>
            <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                {restaurant.name}
            </td>
            <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                {restaurant.email}
            </td>
            <td className="w-1/5 px-4 py-2 text-neutral whitespace-normal">
                {restaurant.orderCount}
            </td>
            <td className="w-1/5 px-4 py-2 text-neutral hidden sm:table-cell whitespace-normal">
                <button
                    type="button"
                    onClick={() => {
                        setRestaurantToEdit(restaurant);
                        setIsCompanyModalOpen(true);
                    }}
                    className="cursor-pointer mx-1 text-blue-500 hover:text-blue-700"
                >
                    <i className="fa fa-pencil"></i>
                </button>
                <button
                    type="button"
                    onClick={() => setRestaurantToDelete(restaurant)}
                    className="cursor-pointer mx-1 text-red-500 hover:text-red-700"
                >
                    <i className="fa fa-trash"></i>
                </button>
            </td>
        </tr>
    );

    return (
        <ProtectedRoute>
            <div className="p-8 space-y-12">
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">
                        Admin Orders &amp; Inventory
                    </h1>
                    <p className="text-neutral">
                        Manage IT accessories orders, monitor IT accessories inventory (with allocation
                        details), and add new food delivery companies. Use this panel to keep track of orders,
                        storage items, and their allocation to users.
                    </p>
                </div>

                {/* IT Accessories Orders Section */}
                <section>
                    <h2 className="text-2xl font-semibold text-primary mb-4">
                        IT Accessories Orders
                    </h2>
                    <Filters
                        filterText={orderFilterText}
                        setFilterText={setOrderFilterText}
                        filterOptions={[
                            { value: "ALL", label: "All Statuses" },
                            { value: "processing", label: "Processing" },
                            { value: "shipped", label: "Shipped" },
                            { value: "delivered", label: "Delivered" },
                        ]}
                        selectedFilter={orderStatusFilter}
                        setSelectedFilter={setOrderStatusFilter}
                        sortField="ID"
                        sortDirection={orderSortDirection}
                        handleSort={toggleOrderSortDirection}
                        clearFilters={clearOrderFilters}
                        totalCount={itOrders.length}
                        filteredCount={filteredOrders.length}
                    />
                    {loadingOrders ? (
                        <SkeletonTable columns={["ID", "User", "Item", "Status", "Actions"]} />
                    ) : filteredOrders.length > 0 ? (
                        <div className="card overflow-x-auto">
                            <table className="table-fixed w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral hidden md:table-cell">
                                        ID
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        User
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        Item
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        Status
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral hidden sm:table-cell">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>{filteredOrders.map(renderOrderRow)}</tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-neutral">No orders found.</p>
                    )}
                </section>

                {/* IT Accessories Inventory Section */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-primary">IT Accessories Inventory</h2>
                        <button
                            onClick={() => {
                                setAccessoryToEdit(null);
                                setIsAccessoryModalOpen(true);
                            }}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Add New IT Accessory
                        </button>
                    </div>
                    <Filters
                        filterText={accessoryFilterText}
                        setFilterText={setAccessoryFilterText}
                        // No dropdown filter for accessories in this example:
                        filterOptions={null}
                        selectedFilter={null}
                        setSelectedFilter={null}
                        sortField="Name"
                        sortDirection={accessorySortDirection}
                        handleSort={toggleAccessorySortDirection}
                        clearFilters={clearAccessoryFilters}
                        totalCount={accessories.length}
                        filteredCount={filteredAccessories.length}
                    />
                    {loadingAccessories ? (
                        <SkeletonTable
                            columns={["ID", "Accessory Name", "In Storage", "With Users", "Actions"]}
                        />
                    ) : filteredAccessories.length > 0 ? (
                        <div className="card overflow-x-auto">
                            <table className="table-fixed w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral hidden md:table-cell">
                                        ID
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        Accessory Name
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        In Storage
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        With Users
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral hidden sm:table-cell">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>{filteredAccessories.map(renderAccessoryRow)}</tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-neutral">No IT accessories in inventory yet.</p>
                    )}
                </section>

                {/* Restaurants Section */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-primary">Restaurants</h2>
                        <button
                            onClick={() => {
                                setRestaurantToEdit(null);
                                setIsCompanyModalOpen(true);
                            }}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Add New Restaurant
                        </button>
                    </div>
                    <Filters
                        filterText={restaurantFilterText}
                        setFilterText={setRestaurantFilterText}
                        // No dropdown filter for restaurants in this example
                        filterOptions={null}
                        selectedFilter={null}
                        setSelectedFilter={null}
                        sortField="Name"
                        sortDirection={restaurantSortDirection}
                        handleSort={toggleRestaurantSortDirection}
                        clearFilters={clearRestaurantFilters}
                        totalCount={restaurants.length}
                        filteredCount={filteredRestaurants.length}
                    />
                    {loadingRestaurants ? (
                        <SkeletonTable columns={["ID", "Name", "Email", "Orders", "Actions"]} />
                    ) : filteredRestaurants.length > 0 ? (
                        <div className="card overflow-x-auto">
                            <table className="table-fixed w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral hidden md:table-cell">
                                        ID
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        Name
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        Email
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral whitespace-normal">
                                        Orders
                                    </th>
                                    <th className="w-1/5 px-4 py-2 text-left text-neutral hidden sm:table-cell">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody>{filteredRestaurants.map(renderRestaurantRow)}</tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-neutral">No restaurants added yet.</p>
                    )}
                </section>

                {/* Confirmation Modal for Deleting a Restaurant */}
                {restaurantToDelete && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
                        <div
                            className="absolute inset-0 bg-black opacity-50"
                            onClick={() => setRestaurantToDelete(null)}
                        ></div>
                        <div className="relative bg-light rounded p-6 mx-4 max-w-sm w-full card">
                            <h3 className="text-xl font-bold text-primary mb-4">Confirm Delete</h3>
                            <p className="mb-6 text-neutral">
                                Are you sure you want to delete restaurant &quot;{restaurantToDelete.name}&quot;?
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setRestaurantToDelete(null)}
                                    className="px-4 py-2 rounded bg-gray-300 text-neutral hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleRemoveItem(restaurantToDelete, "restaurant");
                                        setRestaurantToDelete(null);
                                    }}
                                    className="cursor-pointer px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Confirmation Modal for Deleting an Accessory */}
                {accessoryToDelete && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 fade-in">
                        <div
                            className="absolute inset-0 bg-black opacity-50"
                            onClick={() => setAccessoryToDelete(null)}
                        ></div>
                        <div className="relative bg-light rounded p-6 mx-4 max-w-sm w-full card">
                            <h3 className="text-xl font-bold text-primary mb-4">Confirm Delete</h3>
                            <p className="mb-6 text-neutral">
                                Are you sure you want to delete accessory &quot;{accessoryToDelete.name}&quot;?
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setAccessoryToDelete(null)}
                                    className="px-4 py-2 rounded bg-gray-300 text-neutral hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleRemoveItem(accessoryToDelete, "accessory");
                                        setAccessoryToDelete(null);
                                    }}
                                    className="cursor-pointer px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modals */}
                <AccessoryForm
                    isOpen={isAccessoryModalOpen}
                    onClose={() => {
                        setIsAccessoryModalOpen(false);
                        setAccessoryToEdit(null);
                    }}
                    onSave={handleAddAccessory}
                    initialAccessory={accessoryToEdit}
                />
                <RestaurantForm
                    isOpen={isCompanyModalOpen}
                    onClose={() => {
                        setIsCompanyModalOpen(false);
                        setRestaurantToEdit(null);
                    }}
                    onSave={handleAddCompany}
                    initialRestaurant={restaurantToEdit}
                />
            </div>
        </ProtectedRoute>
    );
}
