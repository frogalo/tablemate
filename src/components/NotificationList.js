"use client";

const NotificationList = ({ notifications, onClose }) => {
    // No notifications case
    if (!notifications || notifications.length === 0) {
        return (
            <div className="absolute right-0 top-[100%] w-80 bg-white shadow-xl rounded-md overflow-hidden z-10">
                <div className="py-2 px-4 text-neutral">No new notifications</div>
                <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-neutral"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        );
    }

    return (
        <div className="absolute right-0 top-[100%] w-80 bg-white shadow-xl rounded-md overflow-hidden z-10">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className="px-4 py-2 border-b border-gray-200 text-neutral last:border-none hover:bg-gray-100 cursor-pointer"
                >
                    <div className="font-semibold">{notification.title}</div>
                    <div className="text-sm">{notification.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                </div>
            ))}
            <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-neutral"
                onClick={onClose}
            >
                Close
            </button>
        </div>
    );
};

export default NotificationList;
