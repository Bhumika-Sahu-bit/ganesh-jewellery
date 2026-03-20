// import { Navigate, useLocation } from "react-router-dom";

// const PublicRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");
//   const location = useLocation(); // optional, future redirect use ke liye

//   // If user is logged in, redirect them to their dashboard
//   if (token) {
//     if (role === "admin") {
//       return <Navigate to="/admin/dashboard" replace />;
//     } else if (role === "user") {
//       return <Navigate to="/user" replace />;
//     }
//   }

//   // Otherwise show the public page
//   return children;
// };

// export default PublicRoute;

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    try {
      const decoded = jwtDecode(token);

      // 🔥 Check expiry
      // eslint-disable-next-line react-hooks/purity
      if (decoded.exp * 1000 < Date.now()) {
        // Token expired → remove
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      } else {
        // ✅ Valid token → redirect
        if (role === "admin") {
          return <Navigate to="/admin/dashboard" replace />;
        } else {
          return <Navigate to="/user" replace />;
        }
      }
    } catch (error) {
      // ❌ Invalid token → remove
      console.log(error);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }

  // ✅ No token → allow access
  return children;
};

export default PublicRoute;
