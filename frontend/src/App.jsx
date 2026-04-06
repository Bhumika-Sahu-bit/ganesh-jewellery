


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

import AdminRoute from "./components/admin/AdminRoute.jsx";
import UserRoute from "./components/user/UserRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔥 Skeleton Layout for Routes
const RouteSkeleton = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* Navbar */}
      <Skeleton height={50} />

      {/* Banner */}
      <Skeleton height={200} style={{ marginTop: "15px" }} />

      {/* Cards */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
        {[...Array(6)].map((_, i) => (
          <div key={i}>
            <Skeleton height={150} width={200} />
            <Skeleton width={150} />
            <Skeleton width={100} />
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <>
      {/* 🔥 Suspense Wrapper with Skeleton */}
      <Suspense fallback={<RouteSkeleton />}>
        
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/home"
            element={
              token ? (
                role === "admin" ? (
                  <Navigate to="/admin/dashboard" />
                ) : (
                  <Navigate to="/user" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* User Routes */}
          <Route
            path="/user"
            element={
              <UserRoute>
                <UserHome />
              </UserRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <UserRoute>
                <ProfilePage />
              </UserRoute>
            }
          />

          <Route
            path="/category/:categoryId/subcategories"
            element={
              <UserRoute>
                <SubCategoryPage />
              </UserRoute>
            }
          />

          <Route path="/aboutus" element={<AboutUs />} />

          <Route
            path="/checkout"
            element={
              <UserRoute>
                <Checkout />
              </UserRoute>
            }
          />

          <Route
            path="/payment-success"
            element={
              <UserRoute>
                <PaymentSuccess />
              </UserRoute>
            }
          />

          <Route
            path="/order-success"
            element={
              <UserRoute>
                <OrderSuccess />
              </UserRoute>
            }
          />

          <Route
            path="/my-orders"
            element={
              <UserRoute>
                <MyOrders />
              </UserRoute>
            }
          />

          <Route
            path="/my-orders/:id"
            element={
              <UserRoute>
                <OrderDetails />
              </UserRoute>
            }
          />

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
            }
          />

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

          <Route
            path="/cart"
            element={
              <UserRoute>
                <CartPage />
              </UserRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <UserRoute>
                <WishlistPage />
              </UserRoute>
            }
          />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

          {/* Admin Route */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

      </Suspense>

      {/* Toast */}
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