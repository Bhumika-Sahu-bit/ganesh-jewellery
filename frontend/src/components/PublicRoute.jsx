import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation(); // optional, future redirect use ke liye

  // If user is logged in, redirect them to their dashboard
  if (token) {
    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (role === "user") {
      return <Navigate to="/user" replace />;
    }
  }

  // Otherwise show the public page
  return children;
};

export default PublicRoute;
