import { useState } from "react";
import SliderPanel from "./SliderPanel";
import CategoryPanel from "./CategoryPanel";
import SubCategory from "./SubCategory";
import ProductPanel from "./ProductPanel";
import AdminOrder from "./AdminOrders";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activePanel, setActivePanel] = useState("slider");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear all tokens (admin or user)
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login", { replace: true }); // use replace to prevent back navigation
  };

  return (
    <>
          <AdminNavbar />

    <div className="flex min-h-screen bg-gray-100">
      {/* ===== SIDEBAR ===== */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <ul className="space-y-3">
          <li
            onClick={() => setActivePanel("slider")}
            className={`cursor-pointer p-2 rounded ${activePanel === "slider" ? "bg-gray-700" : "hover:bg-gray-800"}`}
          >
            Slider
          </li>

          <li
            onClick={() => setActivePanel("subcategory")}
            className={`cursor-pointer p-2 rounded ${activePanel === "subcategory" ? "bg-gray-700" : "hover:bg-gray-800"}`}
          >
            Sub Category
          </li>

          <li
            onClick={() => setActivePanel("category")}
            className={`cursor-pointer p-2 rounded ${activePanel === "category" ? "bg-gray-700" : "hover:bg-gray-800"}`}
          >
            Category
          </li>

          <li
            onClick={() => setActivePanel("product")}
            className={`cursor-pointer p-2 rounded ${activePanel === "product" ? "bg-gray-700" : "hover:bg-gray-800"}`}
          >
            Product
          </li>

          <li
            onClick={() => setActivePanel("orders")}
            className={`cursor-pointer p-2 rounded ${activePanel === "orders" ? "bg-gray-700" : "hover:bg-gray-800"}`}
          >
            Orders
          </li>
        </ul>

        <div className="mt-10">
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 p-6">
        {activePanel === "slider" && <SliderPanel />}
        {activePanel === "category" && <CategoryPanel />}
        {activePanel === "subcategory" && <SubCategory />}
        {activePanel === "product" && <ProductPanel />}
        {activePanel === "orders" && <AdminOrder />}
      </div>
    </div>

    </>
  );
};

export default AdminDashboard;
