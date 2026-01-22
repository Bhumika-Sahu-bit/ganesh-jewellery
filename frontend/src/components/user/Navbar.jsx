// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { BsCartCheck } from "react-icons/bs";
// import { FiMenu, FiBell, FiSearch } from "react-icons/fi";
// import api from "../../api/axios"; // backend axios instance
// import logo from "../../assets/logo.png";

// const Navbar = ({ onMenuClick }) => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [cartCount, setCartCount] = useState(0);
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

//   // Fetch cart & notification counts
//   const fetchCounts = async () => {
//     try {
//       const cartRes = await api.get("/cart");
//       setCartCount(cartRes.data.items?.length || 0);

//       //   const notifRes = await api.get("/notifications");
//       //   setNotificationCount(notifRes.data?.length || 0);
//     } catch (err) {
//       console.error("Failed to fetch counts", err);
//     }
//   };

//   useEffect(() => {
//     fetchCounts();
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search/${searchQuery}`);
//       setSearchQuery("");
//       setMobileSearchOpen(false); // close mobile search after submit
//     }
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 z-50 border-b border-gray-300 shadow-sm">
//       <div className="h-16 flex items-center justify-between px-4 md:px-12">
//         {/* LEFT */}
//         <div className="flex items-center gap-4 ">
//           <div
//             onClick={onMenuClick}
//             className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition hidden md:block"
//           >
//             <FiMenu className="text-2xl text-gray-700" />
//           </div>

//             <img src={logo} alt="Logo" className="h-15 w-15" />
          
//         </div>

//         {/* CENTER SEARCH (DESKTOP) */}
//         <div className="hidden md:flex flex-1 justify-center">
//           <form
//             onSubmit={handleSearch}
//             className="
//               relative w-125
//               bg-blue-50
//               hover:bg-blue-100
//               rounded-full
//               px-4 py-2.5
//               flex items-center gap-3
//               cursor-pointer
//               transition
//             "
//           >
//             <FiSearch className="text-blue-500 text-lg" />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search jewellery..."
//               className="
//                 bg-transparent
//                 w-full
//                 text-sm
//                 text-gray-700
//                 placeholder-gray-500
//                 focus:outline-none
//               "
//             />
//             <button
//               type="submit"
//               className="absolute right-3 text-gray-600 hover:text-gray-800"
//             >
//               <FiSearch size={18} />
//             </button>
//           </form>
//         </div>

//         {/* RIGHT */}
//         <div className="flex items-center gap-4 md:gap-6">
//           {/* MOBILE SEARCH ICON */}
//           <div
//             onClick={() => setMobileSearchOpen((prev) => !prev)}
//             className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition md:hidden"
//           >
//             <FiSearch className="text-xl text-gray-700" />
//           </div>

//           {/* NOTIFICATIONS */}
//           <button
//             onClick={() => navigate("/notification")}
//             className="relative flex items-center gap-2 text-gray-800 hover:text-black transition"
//           >
//             <div className="relative">
//               <FiBell className="text-xl" />
//               {notificationCount > 0 && (
//                 <span
//                   className="
//                   absolute -top-2 -right-2
//                   min-w-4.5 h-4.5
//                   px-1
//                   rounded-full
//                   bg-red-500
//                   text-white
//                   text-xs
//                   flex items-center justify-center
//                 "
//                 >
//                   {notificationCount}
//                 </span>
//               )}
//             </div>
//             <span className="hidden md:inline text-sm font-medium mt-1">
//               Notifications
//             </span>
//           </button>

//           {/* CART */}
//           <button
//             onClick={() => navigate("/cart")}
//             className="relative flex gap-2 items-center text-gray-800 hover:text-black transition"
//           >
//             <div className="relative">
//               <BsCartCheck className="text-xl" />
//               {cartCount > 0 && (
//                 <span
//                   className="
//                   absolute -top-2 -right-2
//                   min-w-4.5 h-4.5
//                   px-1
//                   rounded-full
//                   bg-red-500
//                   text-white
//                   text-xs
//                   flex items-center justify-center
//                 "
//                 >
//                   {cartCount}
//                 </span>
//               )}
//             </div>
//             <span className="hidden md:inline text-sm font-medium mt-1">
//               Cart
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* MOBILE SEARCH BAR */}
//       {mobileSearchOpen && (
//         <div className="md:hidden px-4 pb-2 transition-all duration-300">
//           <form
//             onSubmit={handleSearch}
//             className="flex items-center border rounded-full overflow-hidden"
//           >
//             <input
//               type="text"
//               placeholder="Search jewellery..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-1 px-4 py-2 focus:outline-none"
//             />
//             <button
//               type="submit"
//               className="px-4 text-gray-600 hover:text-gray-800"
//             >
//               <FiSearch size={20} />
//             </button>
//           </form>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import { useState, useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import api from "../../api/axios"; // backend axios instance
import logo from "../../assets/GAT-logo.png";
import NotificationBell from "../notifications/NotificationBell";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Fetch cart counts
  const fetchCounts = async () => {
    try {
      const cartRes = await api.get("/cart");
      setCartCount(cartRes.data.items?.length || 0);
    } catch (err) {
      console.error("Failed to fetch counts", err);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
      setMobileSearchOpen(false); // close mobile search after submit
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 z-50 border-b border-gray-300 shadow-sm">
      <div className="h-16 flex items-center justify-between px-4 md:px-12">
        {/* LEFT */}
        <div className="flex items-center gap-2 ">
          <div
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition hidden md:block"
          >
            <FiMenu className="text-2xl text-gray-700" />
          </div>

          <Link to="/user">
            <img src={logo} alt="Logo" className="h-16 w-16" />
          </Link>
        </div>

        {/* CENTER SEARCH (DESKTOP) */}
        <div className="hidden md:flex flex-1 justify-center">
          <form
            onSubmit={handleSearch}
            className="
              relative w-125
              bg-blue-50
              hover:bg-blue-100
              rounded-full
              px-4 py-2.5
              flex items-center gap-3
              cursor-pointer
              transition
            "
          >
            <FiSearch className="text-blue-500 text-lg" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jewellery..."
              className="
                bg-transparent
                w-full
                text-sm
                text-gray-700
                placeholder-gray-500
                focus:outline-none
              "
            />
            <button
              type="submit"
              className="absolute right-3 text-gray-600 hover:text-gray-800"
            >
              <FiSearch size={18} />
            </button>
          </form>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* MOBILE SEARCH ICON */}
          <div
            onClick={() => setMobileSearchOpen((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition md:hidden"
          >
            <FiSearch className="text-xl text-gray-700" />
          </div>

          {/* NOTIFICATIONS */}
          <NotificationBell />

          {/* CART */}
          <button
            onClick={() => navigate("/cart")}
            className="relative flex gap-2 items-center text-gray-800 hover:text-black transition"
          >
            <div className="relative">
              <BsCartCheck className="text-xl" />
              {cartCount > 0 && (
                <span
                  className="
                  absolute -top-2 -right-2
                  min-w-4.5 h-4.5
                  px-1
                  rounded-full
                  bg-red-500
                  text-white
                  text-xs
                  flex items-center justify-center
                "
                >
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden md:inline text-sm font-medium mt-1">
              Cart
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-2 transition-all duration-300">
          <form
            onSubmit={handleSearch}
            className="flex items-center border rounded-full overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 text-gray-600 hover:text-gray-800"
            >
              <FiSearch size={20} />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

