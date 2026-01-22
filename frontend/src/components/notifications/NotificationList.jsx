import React from "react";
import { FiBell } from "react-icons/fi";

const NotificationList = ({ notifications }) => {
  return (
    <div
      className="
        w-full
        max-h-[420px]
        flex flex-col
        bg-white
        rounded-xl
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div
        className="
          px-4 py-3
          flex items-center justify-between
          border-b
          bg-gradient-to-r from-gray-50 to-gray-100
        "
      >
        <div className="flex items-center gap-2">
          <FiBell className="text-gray-600" />
          <h3 className="text-sm font-semibold text-gray-800">
            Notifications
          </h3>
        </div>

        <span className="text-xs text-gray-400">
          {notifications.length}
        </span>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {notifications.length === 0 ? (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-14 text-gray-400">
            <FiBell className="text-4xl mb-3 opacity-60" />
            <p className="text-sm">No notifications yet</p>
            <p className="text-xs mt-1">You’re all caught up ✨</p>
          </div>
        ) : (
          notifications.map((n, index) => (
            <div
              key={index}
              className="
                group
                px-4 py-3
                border-b last:border-b-0
                cursor-pointer
                transition
                hover:bg-gradient-to-r hover:from-gray-50 hover:to-white
              "
            >
              <div className="flex items-start gap-3">
                {/* ICON */}
                <div
                  className="
                    mt-1
                    h-8 w-8
                    rounded-full
                    bg-blue-50
                    flex items-center justify-center
                    text-blue-500
                    group-hover:bg-blue-100
                    transition
                  "
                >
                  <FiBell size={16} />
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 leading-snug">
                    {n.title || "New Update"}
                  </p>

                  <p className="text-sm text-gray-600 mt-0.5 leading-snug">
                    {n.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(n.time).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationList;
