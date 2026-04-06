


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

// 🔥 Common Skeleton (fallback for less important pages)
const RouteSkeleton = () => (
  <div className="p-4 space-y-4">
    <Skeleton height={40} />
    <Skeleton height={200} />
    <Skeleton count={5} />
  </div>
);

// 🔥 Import custom skeletons
import UserHomeSkeleton from "./pages/skeletons/UserHomeSkeleton";
import ProductListSkeleton from "./pages/skeletons/ProductListSkeleton";
import ProductDetailsSkeleton from "./pages/skeletons/ProductDetailSkeleton";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <>
      {/* ❌ Global Skeleton removed */}
      <Suspense fallback={null}>
        <Routes>

          {/* 🏠 Home (NO skeleton) */}
          <Route path="/" element={<Home />} />

          {/* 🔓 Public Routes */}
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

          {/* 🔥 USER ROUTES */}

          {/* 🏠 User Home */}
          <Route
            path="/user"
            element={
              <UserRoute>
                <Suspense fallback={<UserHomeSkeleton />}>
                  <UserHome />
                </Suspense>
              </UserRoute>
            }
          />

          {/* 👤 Profile */}
          <Route
            path="/profile"
            element={
              <UserRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <ProfilePage />
                </Suspense>
              </UserRoute>
            }
          />

          {/* 📂 Category */}
          <Route
            path="/category/:categoryId/subcategories"
            element={
              <UserRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <SubCategoryPage />
                </Suspense>
              </UserRoute>
            }
          />

          {/* 🛍️ Product List */}
          <Route
            path="/products/sub-category/:subCategoryId"
            element={
              <UserRoute>
                <Suspense fallback={<ProductListSkeleton />}>
                  <ProductList />
                </Suspense>
              </UserRoute>
            }
          />

          <Route
            path="/products/category/:categoryId"
            element={
              <UserRoute>
                <Suspense fallback={<ProductListSkeleton />}>
                  <ProductList />
                </Suspense>
              </UserRoute>
            }
          />

          {/* 📦 Product Details */}
          <Route
            path="/products/:productId"
            element={
              <UserRoute>
                <Suspense fallback={<ProductDetailsSkeleton />}>
                  <ProductDetails />
                </Suspense>
              </UserRoute>
            }
          />

          {/* 🔍 Search */}
          <Route
            path="/search/:query"
            element={
              <UserRoute>
                <Suspense fallback={<ProductListSkeleton />}>
                  <SearchPage />
                </Suspense>
              </UserRoute>
            }
          />

          {/* 🛒 Cart */}
          <Route
            path="/cart"
            element={
              <UserRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <CartPage />
                </Suspense>
              </UserRoute>
            }
          />

          {/* ❤️ Wishlist */}
          <Route
            path="/wishlist"
            element={
              <UserRoute>
                <Suspense fallback={<ProductListSkeleton />}>
                  <WishlistPage />
                </Suspense>
              </UserRoute>
            }
          />

          {/* 💳 Checkout */}
          <Route
            path="/checkout"
            element={
              <UserRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <Checkout />
                </Suspense>
              </UserRoute>
            }
          />

          {/* ✅ Payment */}
          <Route
            path="/payment-success"
            element={
              <UserRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <PaymentSuccess />
                </Suspense>
              </UserRoute>
            }
          />

          <Route
            path="/order-success"
            element={
              <UserRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <OrderSuccess />
                </Suspense>
              </UserRoute>
            }
          />

          {/* 📦 Orders */}
          <Route
            path="/my-orders"
            element={
              <UserRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <MyOrders />
                </Suspense>
              </UserRoute>
            }
          />

          <Route
            path="/my-orders/:id"
            element={
              <UserRoute>
                <Suspense fallback={<RouteSkeleton />}>
                  <OrderDetails />
                </Suspense>
              </UserRoute>
            }
          />

          {/* 📄 Static Pages */}
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

          {/* 🛠️ Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* ❌ Catch all */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Suspense>

      {/* 🔔 Toast */}
      <ToastContainer position="top-center" autoClose={2500} theme="dark" />
    </>
  );
}

export default App;