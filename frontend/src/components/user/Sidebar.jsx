// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   AiFillHome,
//   AiOutlineHeart,
//   AiOutlineClose,
//   AiOutlineUser,
//   AiOutlineMail,
// } from "react-icons/ai";
// import { BsCartCheck } from "react-icons/bs";
// import { FaInfoCircle, FaComments, FaWhatsapp, FaInstagram } from "react-icons/fa";
// import { MdMessage } from "react-icons/md";
// import api from "../../api/axios";

// const Sidebar = ({ isOpen, onClose }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   // dropdown state for chat
//   const [openChatDropdown, setOpenChatDropdown] = useState(false);

//   const goTo = (path) => {
//     if (!path) return;
//     navigate(path);
//     onClose();
//   };

//   // Fetch user profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get("/auth/profile");
//         setUser(res.data);
//       } catch (err) {
//         console.error("Failed to fetch profile", err);
//       }
//     };
//     fetchProfile();
//   }, []);

//   // Logout
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-500">Loading...</p>
//       </div>
//     );
//   }

//   // Sidebar Item
//   const SidebarItem = ({ label, icon, path, onClick }) => (
//     <div
//       className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition"
//       onClick={onClick ? onClick : () => goTo(path)}
//     >
//       <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>
//       <span className="font-medium text-gray-800">{label}</span>
//     </div>
//   );

//   return (
//     <>
//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <div className="h-full flex flex-col">
//           {/* TOP */}
//           <div className="p-4 border-b flex justify-between items-center">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
//                 <AiOutlineUser size={20} />
//               </div>
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-900">
//                   {user.name || "User"}
//                 </h2>
//                 <p className="text-sm text-gray-500">{user.email}</p>
//               </div>
//             </div>

//             <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
//               <AiOutlineClose size={22} />
//             </button>
//           </div>

//           {/* CONTENT */}
//           <div className="flex-1 overflow-y-auto p-4 space-y-2">
//             <SidebarItem label="Home" icon={<AiFillHome />} path="/UserHome" />
//             <SidebarItem label="Orders" icon={<BsCartCheck />} path="/my-orders" />
//             <SidebarItem label="Wishlist" icon={<AiOutlineHeart />} path="/wishlist" />
//             <SidebarItem label="Profile" icon={<AiOutlineUser />} path="/profile" />
//             <SidebarItem label="About Us" icon={<FaInfoCircle />} path="/aboutus" />

//             {/* CHAT DROPDOWN */}
//             <div className="relative">
//               <div
//                 className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition"
//                 onClick={() => setOpenChatDropdown(!openChatDropdown)}
//               >
//                 <div className="p-2 bg-gray-100 rounded-lg">
//                   <FaComments />
//                 </div>
//                 <span className="font-medium text-gray-800">Chat</span>
//               </div>

//               {openChatDropdown && (
//                 <div className="mt-2 bg-gray-50 rounded-xl p-3 space-y-2 border">
                  
//                   {/* Email */}
//                   <a
//                     href="mailto:golelaksh@gmail.com"
//                     className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-white"
//                   >
//                     <AiOutlineMail size={18} />
//                     <span>Email</span>
//                   </a>

//                   {/* WhatsApp */}
//                   <a
//                     href="https://wa.me/6265580736"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-white"
//                   >
//                     <FaWhatsapp size={18} />
//                     <span>WhatsApp</span>
//                   </a>

//                   {/* SMS */}
//                   <a
//                     href="sms:+6265580736"
//                     className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-white"
//                   >
//                     <MdMessage size={18} />
//                     <span>SMS</span>
//                   </a>

//                   {/* Instagram */}
//                   <a
//                     href="https://instagram.com/mr.laksh_._gole"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-white"
//                   >
//                     <FaInstagram size={18} />
//                     <span>Instagram</span>
//                   </a>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* LOGOUT */}
//           <div className="p-4 border-t">
//             <button
//               onClick={handleLogout}
//               className="w-full py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AiFillHome,
  AiOutlineHeart,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineMail,
} from "react-icons/ai";

import { BsCartCheck } from "react-icons/bs";
import { FaInfoCircle, FaComments, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdMessage } from "react-icons/md";

import api from "../../api/axios";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [openChatDropdown, setOpenChatDropdown] = useState(false);

  const goTo = (path) => {
    if (!path) return;
    navigate(path);
    onClose();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setUser(res.data.user); // updated based on your backend response
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const SidebarItem = ({ label, icon, path, onClick, iconBg }) => (
    <div
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition"
      onClick={onClick ? onClick : () => goTo(path)}
    >
      <div className={`p-2 rounded-lg ${iconBg} text-white`}>
        {icon}
      </div>
      <span className="font-medium text-gray-800">{label}</span>
    </div>
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full flex flex-col">

          {/* TOP */}
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              
              {/* Avatar */}
              <img
                src={user.avatar || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500"
              />

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {user.name || "User"}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
              <AiOutlineClose size={22} />
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <SidebarItem
              label="Home"
              icon={<AiFillHome />}
              path="/UserHome"
              iconBg="bg-indigo-500"
            />
            <SidebarItem
              label="Orders"
              icon={<BsCartCheck />}
              path="/my-orders"
              iconBg="bg-green-500"
            />
            <SidebarItem
              label="Wishlist"
              icon={<AiOutlineHeart />}
              path="/wishlist"
              iconBg="bg-pink-500"
            />
            <SidebarItem
              label="Profile"
              icon={<AiOutlineUser />}
              path="/profile"
              iconBg="bg-blue-500"
            />
            <SidebarItem
              label="About Us"
              icon={<FaInfoCircle />}
              path="/aboutus"
              iconBg="bg-yellow-500"
            />

            {/* CHAT DROPDOWN */}
            <div className="relative">
              <div
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition"
                onClick={() => setOpenChatDropdown(!openChatDropdown)}
              >
                <div className="p-2 bg-gray-100 rounded-lg text-indigo-600">
                  <FaComments />
                </div>
                <span className="font-medium text-gray-800">Chat</span>
              </div>

              {openChatDropdown && (
                <div className="mt-2 bg-gray-50 rounded-xl p-3 space-y-2 border">
                  
                  <a
                    href="mailto:golelaksh@gmail.com"
                    className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-white"
                  >
                    <AiOutlineMail size={18} />
                    <span>Email</span>
                  </a>

                  <a
                    href="https://wa.me/6265580736"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-white"
                  >
                    <FaWhatsapp size={18} />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="sms:+6265580736"
                    className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-white"
                  >
                    <MdMessage size={18} />
                    <span>SMS</span>
                  </a>

                  <a
                    href="https://instagram.com/mr.laksh_._gole"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg hover:bg-white"
                  >
                    <FaInstagram size={18} />
                    <span>Instagram</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* LOGOUT */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
