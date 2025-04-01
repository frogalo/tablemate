"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import OrderFoodForm from "@/components/forms/OrderFoodForm";
import ITEquipmentForm from "@/components/forms/ITEquipmentForm";

// Implement color from different status
function getStatusClass(status) {
    const s = status.toLowerCase();
    if (s === "delivered") return "bg-green-100 text-green-800";
    if (s === "processing") return "bg-yellow-100 text-yellow-800";
    if (s === "shipped") return "bg-blue-100 text-blue-800";
    return "bg-red-100 text-red-800"; // default
}

// The core code has started.
export default function AdminOrders() {
    // List being set to display.
    const [itOrders, setItOrders] = useState([]);
    const [foodOrders, setFoodOrders] = useState([]);
    const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
    const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);

    // Add to UI based on a setting, will load data.
    useEffect(() => {
        // Add data for each group:
        async function loadMockData() {
            // Load info and set to an object: to match. Or do that later on the code to get correct loading action.

            // Implement a "fake" order process so that you know this is working
            const mockupFoodOrders = [
                {
                    id: 1,
                    itemType: "MEAL",
                    itemId: 101,
                    userId: 1001,
                    restaurant: "Italian Place",
                    menuItem: "Pizza",
                    price: 12.99,
                    orderDate: "2024-05-04",
                    status: "Shipped", // Implement for JSON format later that it can use
                },
                {
                    id: 2,
                    itemType: "MEAL",
                    itemId: 102,
                    userId: 1002,
                    restaurant: "Mexican Grill",
                    menuItem: "Tacos",
                    price: 8.99,
                    orderDate: "2024-05-03",
                    status: "Processing",
                },
            ];

            const mockupITOrders = [
                {
                    id: 3,
                    itemType: "IT_EQUIPMENT",
                    itemId: 201,
                    userId: 2001,
                    equipmentType: "Laptop",
                    price: 1200.00,
                    orderDate: "2024-05-02",
                    status: "Delivered", // Again the text with JSON
                },
                {
                    id: 4,
                    itemType: "IT_EQUIPMENT",
                    itemId: 202,
                    userId: 2002,
                    equipmentType: "Keyboard",
                    price: 75.00,
                    orderDate: "2024-05-01",
                    status: "Processing", // Use the "String" format here. To match to make easier all to come in sync, and to be able to make function for each object to have all be correct and be in data and be tested with.
                },
            ];

            // Call object from component so this happens properly
            setFoodOrders(mockupFoodOrders);
            setItOrders(mockupITOrders);
        }

        loadMockData();
    }, []);

    // Void components which won't affect it.
    const handleAddFoodOrder = () => {
        setIsFoodModalOpen(true);
    };

    //Set to perform
    const handleAddITEquipmentOrder = () => {
        setIsEquipmentModalOpen(true);
    };

    return (
        <ProtectedRoute>
            <div className="p-8 space-y-12">
                {/* The code here that displays to  */}
                <div>
                    <h1 className="text-3xl font-bold text-primary mb-2">
                        Admin Orders
                    </h1>
                    <p className="text-neutral">
                        Manage food and IT equipment orders. Use this panel to view, track,
                        and create new orders.
                    </p>
                </div>

                {/* Show card to add an order, from the side that is for a new meal.*/}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-primary">Food Orders</h2>
                        {/* Call component, test, make sure all data comes across based on settings made to function.*/}
                        <button
                            onClick={handleAddFoodOrder}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Create New Food Order
                        </button>
                    </div>
                    {foodOrders.length > 0 ? (
                        <div className="card">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    <th className="text-left pb-3 text-neutral">Order ID</th>
                                    <th className="text-left pb-3 text-neutral">Item</th>
                                    <th className="text-left pb-3 text-neutral">User ID</th>
                                    <th className="text-left pb-3 text-neutral">Price</th>
                                    <th className="text-left pb-3 text-neutral">Order Date</th>
                                    {/* The center set properties now */}
                                    <th className="text-center pb-3 text-neutral">Status</th>
                                    <th className="text-center pb-3 text-neutral">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {foodOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="border-b border-accent last:border-0"
                                    >
                                        <td className="py-3 text-neutral">ORD-{order.id}</td>
                                        <td className="py-3 text-neutral">
                                            {order.restaurant} - {order.menuItem}
                                        </td>
                                        <td className="py-3 text-neutral">{order.userId}</td>
                                        <td className="py-3 text-neutral">${order.price}</td>
                                        <td className="py-3 text-neutral">{order.orderDate}</td>
                                        {/* Implemented status functions and UI functions that present user a choice of what could/can be done with properties from that item object. All styles set from a function! */}
                                        <td className="py-3 text-center">
                        <span
                            className={`px-2 py-1 rounded-full text-xs ${getStatusClass(
                                order.status
                            )}`}
                        >
                          {order.status}
                        </span>
                                        </td>
                                        {/* The actions here, set and properly formated with function calls to do just that . The center function is the big key here. This section of code displays the component of the current function when is on "loading or setting new state." It is recommended that any loading and or UI features for these functions will be here with components or logic.*/}
                                        <td className="py-3 text-center">
                                            {/* Can make it so that all functions called now have proper set.
                   - It's recommended that you properly set and load components that you may make, to make your process way better in the long run.
                   - Also, call or perform functions to run only and exactly what code it must perform. If you call all to the same or the same to all, you might not want that for certain processes so make the load functions and their UI clear, concise and organized for what might present the best code, with less problems when doing these kinds of complex components. There will not be a case that is universal for all processes all the time so you need to be set with all data to make it come across to you.*/}
                                            {order.status === "Processing" && (
                                                <>
                                                    <button className="mx-2 text-blue-500 hover:text-blue-700">
                                                        Edit
                                                    </button>
                                                    <button className="mx-2 text-red-500 hover:text-red-700">
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-neutral">No food orders yet.</p>
                    )}
                </section>

                {/* Load table where it is set if it is IT Equip */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-primary">
                            IT Equipment Orders
                        </h2>
                        {/* Set or generate new JSON */}
                        <button
                            onClick={handleAddITEquipmentOrder}
                            className="btn-primary px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Create New IT Equipment Order
                        </button>
                    </div>
                    {itOrders.length > 0 ? (
                        <div className="card">
                            <table className="w-full">
                                <thead>
                                <tr className="border-b border-accent">
                                    {/* Implement or change based on what you are loading at properties.
               - You will have to match those and then test and set the correct functions, code, implementation with all test functions to call or implement data that has been pulled using async and load functions and then test it to be functional and the format proper.*/}
                                    <th className="text-left pb-3 text-neutral">Order ID</th>
                                    <th className="text-left pb-3 text-neutral">Item</th>
                                    <th className="text-left pb-3 text-neutral">User ID</th>
                                    <th className="text-left pb-3 text-neutral">Price</th>
                                    <th className="text-left pb-3 text-neutral">Order Date</th>
                                    <th className="text-center pb-3 text-neutral">Status</th>
                                    <th className="text-center pb-3 text-neutral">Actions</th>
                                </tr>
                                </thead>
                                {/* Here or where all code is pulled. That will depend on where the data must take place,  as I’ve said before.*/}
                                <tbody>
                                {itOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="border-b border-accent last:border-0"
                                    >
                                        <td className="py-3 text-neutral">ORD-{order.id}</td>
                                        <td className="py-3 text-neutral">{order.equipmentType}</td>
                                        <td className="py-3 text-neutral">{order.userId}</td>
                                        <td className="py-3 text-neutral">${order.price}</td>
                                        <td className="py-3 text-neutral">{order.orderDate}</td>
                                        {/* Function gets used at each object in each row to set with JSON info the component properties. Or You can create and format for that function, and add it from here or on this step. The objective is always the best. */}
                                        <td className="py-3 text-center">
                        <span
                            className={`px-2 py-1 rounded-full text-xs ${getStatusClass(
                                order.status
                            )}`}
                        >
                          {order.status}
                        </span>
                                        </td>
                                        <td className="py-3 text-center">
                                            {/* You can also add what more actions are available based on the object you implement.  Just test or add to these for what that set does or adds to a full component implementation with more code and details based on it . */}
                                            {order.status === "Processing" && (
                                                <>
                                                    <button className="mx-2 text-blue-500 hover:text-blue-700">
                                                        Edit
                                                    </button>
                                                    <button className="mx-2 text-red-500 hover:text-red-700">
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-neutral">No IT equipment orders yet.</p>
                    )}
                </section>

                {/* Implement  Forms that now you set the core of how they work but remember: these still have that loading set before set! So with load functions to manage code on loading and if there's ever  API issues it won't cause core parts of web layout to mess up  Also they are loaded with functions that are  vois and used in API.Js*/}
                <OrderFoodForm
                    isOpen={isFoodModalOpen}
                    onClose={() => setIsFoodModalOpen(false)}
                    onSubmit={() => console.log("Submitting Food data. ")}
                />
                <ITEquipmentForm
                    isOpen={isEquipmentModalOpen}
                    onClose={() => setIsEquipmentModalOpen(false)}
                    onSubmit={() => console.log("Submitting ITEquipment data. ")}
                />
            </div>
        </ProtectedRoute>
    );
}
