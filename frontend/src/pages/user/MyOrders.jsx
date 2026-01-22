import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import BottomFooter from "../../components/user/BottomFooter";
import Sidebar from "../../components/user/Sidebar";
import { ArrowLeft, ShoppingBag } from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/my-orders");
        setOrders(res.data || []);
      } catch (error) {
        console.error("My Orders error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="min-h-screen bg-gray-50 pt-20 px-4 py-20">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate("/products")}
              className="p-2 rounded-full border hover:bg-gray-100 transition"
            >
              <ArrowLeft size={20} />
            </button>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              My Orders
            </h1>
          </div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-gray-500 mt-20 animate-pulse">
              Loading your orders...
            </p>
          )}

          {/* Empty Orders */}
          {!loading && orders.length === 0 && (
            <div className="bg-white rounded-3xl shadow-lg p-10 text-center mt-20">
              <ShoppingBag size={70} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800">
                No Orders Yet
              </h2>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">
                Looks like you haven’t placed any orders yet.
              </p>

              <button
                onClick={() => navigate("/products")}
                className="mt-6 px-8 py-3 bg-black text-white rounded-full font-medium
                hover:bg-gray-900 transition"
              >
                Start Shopping
              </button>
            </div>
          )}

          {/* Orders List */}
          {!loading && orders.length > 0 && (
            <div className="grid gap-5">
              {orders.map((order) => {
                const previewImage =
                  order.items?.[0]?.image ||
                  "https://via.placeholder.com/150";

                return (
                  <div
                    key={order._id}
                    onClick={() => navigate(`/my-orders/${order._id}`)}
                    className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl
                    transition cursor-pointer border"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">

                      {/* Left Side */}
                      <div className="flex gap-4 items-center">
                        {/* Order Image */}
                        <img
                          src={previewImage}
                          alt="Order Product"
                          className="w-20 h-20 rounded-xl object-cover border"
                        />

                        <div>
                          <p className="text-sm text-gray-500">
                            Order ID
                          </p>
                          <p className="font-semibold text-gray-800">
                            #{order._id.slice(-6).toUpperCase()}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="text-left sm:text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ₹{order.totalAmount}
                        </p>

                        <span
                          className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium
                          ${
                            order.paymentStatus === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>

                        <p className="text-sm text-gray-600 mt-2">
                          Status:{" "}
                          <span className="font-medium text-gray-800">
                            {order.orderStatus}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>
      <BottomFooter />
    </>
  );
};

export default MyOrders;

