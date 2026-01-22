import { useEffect, useState, useRef } from "react";
import socket from "../../utils/socket";
import NotificationList from "./NotificationList";
import { FiBell } from "react-icons/fi";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Listen socket events
  useEffect(() => {
    socket.on("newProduct", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => socket.off("newProduct");
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative flex items-center">
      {/* Bell Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          relative
          p-2
          rounded-full
          hover:bg-gray-100
          active:scale-95
          transition
        "
      >
        <FiBell className="text-xl text-gray-700" />

        {notifications.length > 0 && (
          <span
            className="
              absolute
              -top-0.5 right-0.5
              min-w-[18px] h-[18px]
              px-1
              bg-red-500
              text-white
              text-[11px]
              rounded-full
              flex items-center justify-center
            "
          >
            {notifications.length}
          </span>
        )}
      </button>

      {/* Desktop Text */}
      <span className="hidden md:inline ml-0.5 text-sm font-medium text-gray-800">
        Notifications
      </span>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute
            right-0
            top-full
            mt-3
            w-[92vw]
            sm:w-80
            bg-white
            shadow-xl
            rounded-xl
            overflow-hidden
            z-50
            animate-fadeIn
          "
        >
          <NotificationList notifications={notifications} />
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
