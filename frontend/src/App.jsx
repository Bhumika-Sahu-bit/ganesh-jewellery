import { Routes, Route , Navigate } from "react-router-dom";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import UserHome from "./pages/user/UserHome.jsx";
import AdminRoute from "./components/admin/AdminRoute.jsx";
import UserRoute from "./components/user/UserRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import SubCategoryPage from "./pages/user/SubCategoryPage.jsx";
import ProductList from "./pages/user/ProductList.jsx";
import ProductDetails from "./pages/user/ProductPage.jsx";
import CartPage from "./pages/user/CartPage.jsx";
import WishlistPage from "./pages/user/WishlistPage.jsx";
import SearchPage from "./pages/user/SearchPage.jsx";
import ProfilePage from "./pages/user/ProfilePage.jsx";
import AboutUs from "./pages/user/AboutUs.jsx";
import Checkout from "./pages/user/Checkout.jsx";
import OrderSuccess from "./pages/user/OrderSuccess.jsx";
import MyOrders from "./pages/user/MyOrders.jsx";
import OrderDetails from "./pages/user/OrderDetails.jsx";
import Home from "./pages/Home";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <>
    <Routes>
      <Route path="/" element={<Home /> } />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

       <Route
        path="/"
        element={
          token
            ? role === "admin"
              ? <Navigate to="/admin/dashboard" />
              : <Navigate to="/user" />
            : <Navigate to="/login" />
        }
      />

      {/* Category/SubCategory/Product Routes */}
      <Route path="/user" element={<UserRoute><UserHome /></UserRoute>} />
      <Route path="/profile" element={<UserRoute><ProfilePage /></UserRoute>} />
      <Route path="/category/:categoryId/subcategories" element={<UserRoute><SubCategoryPage /></UserRoute>} />
      <Route path="/aboutus" element={<UserRoute><AboutUs /></UserRoute>} />
      <Route path="/checkout" element={<UserRoute><Checkout /></UserRoute>} />
      <Route path="/order-success" element={<UserRoute><OrderSuccess /></UserRoute>} />
      <Route path="/my-orders" element={<UserRoute><MyOrders /></UserRoute>} />
      <Route path="/my-orders/:id" element={<UserRoute><OrderDetails /></UserRoute>} />
      <Route
        path="/products/sub-category/:subCategoryId"
        element={
          <UserRoute>
            <ProductList />
          </UserRoute>
        }
      />
      <Route
        path="/products/category/:categoryId"
        element={
          <UserRoute>
            <ProductList />
          </UserRoute>
        } />

        <Route
        path="/products/:productId"
        element={
          <UserRoute>
            <ProductDetails />
          </UserRoute>
        }
      />

      <Route
  path="/search/:query"
  element={
    <UserRoute>
      <SearchPage />
    </UserRoute>
  }
/>

      <Route path="/cart" element={<UserRoute><CartPage /></UserRoute>} />
      <Route path="/wishlist" element={<UserRoute><WishlistPage /></UserRoute>} />

      {/* ===== Catch all unknown routes ===== */}
      <Route path="*" element={<Navigate to="/" />} />

      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
    </Routes>

    <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        rtl={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="dark"
        limit={3}
      />

    </>
  );
}

export default App;
