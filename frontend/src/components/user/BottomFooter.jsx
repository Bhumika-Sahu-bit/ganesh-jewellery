import React, { useState } from "react";
import {
  AiFillHome,
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineClose,
  AiOutlineMail,
} from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { FaInfoCircle, FaComments, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdSms } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const BottomFooter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const items = [
    { name: "Home", icon: <AiFillHome size={24} />, route: "/UserHome" },
    { name: "Orders", icon: <BsCartCheck size={24} />, route: "/my-orders" },
    { name: "Wishlist", icon: <AiOutlineHeart size={24} />, route: "/wishlist" },
    { name: "Profile", icon: <AiOutlineUser size={24} />, route: "/profile" },
    { name: "About Us", icon: <FaInfoCircle size={24} />, route: "/aboutus" },
    { name: "Chat", icon: <FaComments size={24} />, route: null },
  ];

  const activeTab =
    items.find((i) => i.route === location.pathname)?.name || "Home";

  const handleClick = (item) => {
    if (item.name === "Chat") {
      setIsChatOpen(true);
      return;
    }
    if (item.route) navigate(item.route);
  };

  return (
    <>
      {/* Bottom Footer */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50">
        <div className="flex overflow-x-auto no-scrollbar">
          {items.map((item) => (
            <div
              key={item.name}
              className={`flex flex-col items-center justify-center cursor-pointer px-5 py-2 min-w-[90px] ${
                activeTab === item.name
                  ? "text-red-500 bg-red-50"
                  : "text-gray-700 hover:text-black"
              }`}
              onClick={() => handleClick(item)}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat PopUp from Bottom */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsChatOpen(false)}
          />

          {/* Popup */}
          <div
            className="relative w-full bg-white rounded-t-3xl p-5 shadow-xl animate-slideUp z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Chat With Us</h2>
              <button onClick={() => setIsChatOpen(false)}>
                <AiOutlineClose size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <a
                href="mailto:golelaksh@gmail.com"
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100"
              >
                <AiOutlineMail size={22} />
                Email
              </a>

              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100"
              >
                <FaWhatsapp size={22} />
                WhatsApp
              </a>

              <a
                href="sms:+6265580736"
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100"
              >
                <MdSms size={22} />
                SMS
              </a>

              <a
                href="https://instagram.com/mr.laksh_._gole"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100"
              >
                <FaInstagram size={22} />
                Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomFooter;
