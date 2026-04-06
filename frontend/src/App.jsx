


// import { Routes, Route, Navigate } from "react-router-dom";
// import { lazy, Suspense } from "react";

// // 🔥 Lazy Imports 
// const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
// const UserHome = lazy(() => import("./pages/user/UserHome.jsx"));
// const Login = lazy(() => import("./pages/Login.jsx"));
// const Register = lazy(() => import("./pages/Register.jsx"));
// const SubCategoryPage = lazy(() => import("./pages/user/SubCategoryPage.jsx"));
// const ProductList = lazy(() => import("./pages/user/ProductList.jsx"));
// const ProductDetails = lazy(() => import("./pages/user/ProductPage.jsx"));
// const CartPage = lazy(() => import("./pages/user/CartPage.jsx"));
// const WishlistPage = lazy(() => import("./pages/user/WishlistPage.jsx"));
// const SearchPage = lazy(() => import("./pages/user/SearchPage.jsx"));
// const ProfilePage = lazy(() => import("./pages/user/ProfilePage.jsx"));
// const AboutUs = lazy(() => import("./pages/user/AboutUs.jsx"));
// const Checkout = lazy(() => import("./pages/user/Checkout.jsx"));
// const OrderSuccess = lazy(() => import("./pages/user/OrderSuccess.jsx"));
// const MyOrders = lazy(() => import("./pages/user/MyOrders.jsx"));
// const OrderDetails = lazy(() => import("./pages/user/OrderDetails.jsx"));
// const PrivacyPolicy = lazy(() => import("./pages/user/PrivacyPolicy"));
// const TermsConditions = lazy(() => import("./pages/user/TermsConditions"));
// const RefundPolicy = lazy(() => import("./pages/user/RefundPolicy"));
// const PaymentSuccess = lazy(() => import("./pages/user/PaymentSuccess.jsx"));
// const Home = lazy(() => import("./pages/Home"));


// import AdminRoute from "./components/admin/AdminRoute.jsx";
// import UserRoute from "./components/user/UserRoute.jsx";
// import PublicRoute from "./components/PublicRoute.jsx";

// import "./App.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function App() {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   return (
//     <>
//       {/* 🔥 Suspense Wrapper */}
//       <Suspense fallback={<div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>}>
        
//         <Routes>
//           <Route path="/" element={<Home />} />

//           <Route
//             path="/login"
//             element={
//               <PublicRoute>
//                 <Login />
//               </PublicRoute>
//             }
//           />

//           <Route
//             path="/register"
//             element={
//               <PublicRoute>
//                 <Register />
//               </PublicRoute>
//             }
//           />

//           <Route
//             path="/home"
//             element={
//               token ? (
//                 role === "admin" ? (
//                   <Navigate to="/admin/dashboard" />
//                 ) : (
//                   <Navigate to="/user" />
//                 )
//               ) : (
//                 <Navigate to="/login" />
//               )
//             }
//           />

//           {/* User Routes */}
//           <Route
//             path="/user"
//             element={
//               <UserRoute>
//                 <UserHome />
//               </UserRoute>
//             }
//           />

//           <Route
//             path="/profile"
//             element={
//               <UserRoute>
//                 <ProfilePage />
//               </UserRoute>
//             }
//           />

//           <Route
//             path="/category/:categoryId/subcategories"
//             element={
//               <UserRoute>
//                 <SubCategoryPage />
//               </UserRoute>
//             }
//           />

//           <Route path="/aboutus" element={<AboutUs />} />

//           <Route
//             path="/checkout"
//             element={
//               <UserRoute>
//                 <Checkout />
//               </UserRoute>
//             }
//           />

//           <Route
//             path="/payment-success"
//             element={
//               <UserRoute>
//                 <PaymentSuccess />
//               </UserRoute>
//             }
//           />

//           <Route
//             path="/order-success"
//             element={
//               <UserRoute>
//                 <OrderSuccess />
//               </UserRoute>
//             }
//           />

//           <Route
//             path="/my-orders"
//             element={
//               <UserRoute>
//                 <MyOrders />
//               </UserRoute>
//             }
//           />

//           <Route
//             path="/my-orders/:id"
//             element={
//               <UserRoute>
//                 <OrderDetails />
//               </UserRoute>
//             }
//           />

//           <Route
//             path="/products/sub-category/:subCategoryId"
//             element={
//               <UserRoute>
//                 <ProductList />
//               </UserRoute>
//             }
//           />

//           <Route
//             path="/products/category/:categoryId"
//             element={
//               <UserRoute>
//                 <ProductList />
//               </UserRoute>
//             }
//           />

//           <Route
//             path="/products/:productId"
//             element={
//               <UserRoute>
//                 <ProductDetails />
//               </UserRoute>
//             }
//           />

//           <Route
//             path="/search/:query"
//             element={
//               <UserRoute>
//                 <SearchPage />
//               </UserRoute>
//             }
//           />

//           <Route
//             path="/cart"
//             element={
//               <UserRoute>
//                 <CartPage />
//               </UserRoute>
//             }
//           />

//           <Route
//             path="/wishlist"
//             element={
//               <UserRoute>
//                 <WishlistPage />
//               </UserRoute>
//             }
//           />

//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/terms" element={<TermsConditions />} />
//           <Route path="/refund-policy" element={<RefundPolicy />} />

//           {/* Admin Route */}
//           <Route
//             path="/admin/dashboard"
//             element={
//               <AdminRoute>
//                 <AdminDashboard />
//               </AdminRoute>
//             }
//           />

//           {/* Catch all */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>

//       </Suspense>

//       {/* Toast */}
//       <ToastContainer
//         position="top-center"
//         autoClose={2500}
//         hideProgressBar={false}
//         newestOnTop
//         rtl={false}
//         closeOnClick
//         pauseOnHover
//         draggable
//         pauseOnFocusLoss
//         theme="dark"
//         limit={3}
//       />
//     </>
//   );
// }

// export default App;


import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// 🔥 Lazy Imports 
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const UserHome = lazy(() => import("./pages/user/UserHome.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const SubCategoryPage = lazy(() => import("./pages/user/SubCategoryPage.jsx"));
const ProductList = lazy(() => import("./pages/user/ProductList.jsx"));
const ProductDetails = lazy(() => import("./pages/user/ProductPage.jsx"));
const CartPage = lazy(() => import("./pages/user/CartPage.jsx"));
const WishlistPage = lazy(() => import("./pages/user/WishlistPage.jsx"));
const SearchPage = lazy(() => import("./pages/user/SearchPage.jsx"));
const ProfilePage = lazy(() => import("./pages/user/ProfilePage.jsx"));
const AboutUs = lazy(() => import("./pages/user/AboutUs.jsx"));
const Checkout = lazy(() => import("./pages/user/Checkout.jsx"));
const OrderSuccess = lazy(() => import("./pages/user/OrderSuccess.jsx"));
const MyOrders = lazy(() => import("./pages/user/MyOrders.jsx"));
const OrderDetails = lazy(() => import("./pages/user/OrderDetails.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/user/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/user/TermsConditions"));
const RefundPolicy = lazy(() => import("./pages/user/RefundPolicy"));
const PaymentSuccess = lazy(() => import("./pages/user/PaymentSuccess.jsx"));
const Home = lazy(() => import("./pages/Home"));

// 🔥 Skeletons
import UserHomeSkeleton from "./pages/skeletons/UserHomeSkeleton.jsx";
import ProductListSkeleton from "./pages/skeletons/ProductListSkeleton.jsx";
import ProductDetailsSkeleton from "./pages/skeletons/ProductDetailSkeleton.jsx";

// 🔥 Routes
import AdminRoute from "./components/admin/AdminRoute.jsx";
import UserRoute from "./components/user/UserRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔥 Common fallback
const RouteSkeleton = () => (
  <div className="p-4 space-y-4">
    <Skeleton height={40} />
    <Skeleton height={200} />
    <Skeleton count={5} />
  </div>
);

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <>
      <Routes>

        {/* 🏠 Home */}
        <Route
          path="/"
          element={
            <Suspense fallback={null}>
              <Home />
            </Suspense>
          }
        />

        {/* 🔓 Public Routes */}
        <Route
          path="/login"
          element={
            <Suspense fallback={null}>
              <PublicRoute>
                <Login />
              </PublicRoute>
            </Suspense>
          }
        />

        <Route
          path="/register"
          element={
            <Suspense fallback={null}>
              <PublicRoute>
                <Register />
              </PublicRoute>
            </Suspense>
          }
        />

        {/* 🔁 Redirect */}
        <Route
          path="/home"
          element={
            token ? (
              role === "admin"
                ? <Navigate to="/admin/dashboard" />
                : <Navigate to="/user" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 🔥 USER ROUTES (FIXED) */}

        {/* 🏠 User Home */}
        <Route
          path="/user"
          element={
            <Suspense fallback={<UserHomeSkeleton />}>
              <UserRoute>
                <UserHome />
              </UserRoute>
            </Suspense>
          }
        />

        {/* 👤 Profile */}
        <Route
          path="/profile"
          element={
            <Suspense fallback={<RouteSkeleton />}>
              <UserRoute>
                <ProfilePage />
              </UserRoute>
            </Suspense>
          }
        />

        {/* 📂 Category */}
        <Route
          path="/category/:categoryId/subcategories"
          element={
            <Suspense fallback={<RouteSkeleton />}>
              <UserRoute>
                <SubCategoryPage />
              </UserRoute>
            </Suspense>
          }
        />

        {/* 🛍️ Product List */}
        <Route
          path="/products/sub-category/:subCategoryId"
          element={
            <Suspense fallback={<ProductListSkeleton />}>
              <UserRoute>
                <ProductList />
              </UserRoute>
            </Suspense>
          }
        />

        <Route
          path="/products/category/:categoryId"
          element={
            <Suspense fallback={<ProductListSkeleton />}>
              <UserRoute>
                <ProductList />
              </UserRoute>
            </Suspense>
          }
        />

        {/* 📦 Product Details */}
        <Route
          path="/products/:productId"
          element={
            <Suspense fallback={<ProductDetailsSkeleton />}>
              <UserRoute>
                <ProductDetails />
              </UserRoute>
            </Suspense>
          }
        />

        {/* 🔍 Search */}
        <Route
          path="/search/:query"
          element={
            <Suspense fallback={<ProductListSkeleton />}>
              <UserRoute>
                <SearchPage />
              </UserRoute>
            </Suspense>
          }
        />

        {/* 🛒 Cart */}
        <Route
          path="/cart"
          element={
            <Suspense fallback={<RouteSkeleton />}>
              <UserRoute>
                <CartPage />
              </UserRoute>
            </Suspense>
          }
        />

        {/* ❤️ Wishlist */}
        <Route
          path="/wishlist"
          element={
            <Suspense fallback={<ProductListSkeleton />}>
              <UserRoute>
                <WishlistPage />
              </UserRoute>
            </Suspense>
          }
        />

        {/* 💳 Checkout */}
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<RouteSkeleton />}>
              <UserRoute>
                <Checkout />
              </UserRoute>
            </Suspense>
          }
        />

        {/* ✅ Payment */}
        <Route
          path="/payment-success"
          element={
            <Suspense fallback={<RouteSkeleton />}>
              <UserRoute>
                <PaymentSuccess />
              </UserRoute>
            </Suspense>
          }
        />

        <Route
          path="/order-success"
          element={
            <Suspense fallback={<RouteSkeleton />}>
              <UserRoute>
                <OrderSuccess />
              </UserRoute>
            </Suspense>
          }
        />

        {/* 📦 Orders */}
        <Route
          path="/my-orders"
          element={
            <Suspense fallback={<RouteSkeleton />}>
              <UserRoute>
                <MyOrders />
              </UserRoute>
            </Suspense>
          }
        />

        <Route
          path="/my-orders/:id"
          element={
            <Suspense fallback={<RouteSkeleton />}>
              <UserRoute>
                <OrderDetails />
              </UserRoute>
            </Suspense>
          }
        />

        {/* 📄 Static Pages */}
        <Route
          path="/aboutus"
          element={
            <Suspense fallback={null}>
              <AboutUs />
            </Suspense>
          }
        />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />

        {/* 🛠️ Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <Suspense fallback={<RouteSkeleton />}>
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            </Suspense>
          }
        />

        {/* ❌ Catch all */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

      {/* 🔔 Toast */}
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