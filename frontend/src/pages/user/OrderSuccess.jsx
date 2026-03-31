import { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import { CheckCircle, ArrowRight } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [params] = useSearchParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        // ✅ orderId state se ya URL se lo
        const orderId = state?.orderId || params.get("orderId");

        if (!orderId) {
          setLoading(false);
          return;
        }

        // ✅ backend call
        const res = await api.get(`/orders/${orderId}`);
        setOrder(res.data);
      } catch (error) {
        console.error("Order fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [state, params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
        <p className="text-lg font-medium text-gray-700">
          Order not found 😕
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 rounded-lg bg-black text-white"
        >
          Go Home
        </button>
      </div>
    );
  }

  const item = order.items?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle size={72} className="text-green-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mt-6">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-600 mt-2">
          Your order is confirmed.
        </p>

        {/* Order ID */}
        <div className="mt-4 bg-gray-100 px-4 py-2 rounded-full inline-block">
          <span className="font-medium">Order ID:</span>{" "}
          <span className="font-mono">{order._id}</span>
        </div>

        {/* Product */}
        <div className="mt-8 text-left bg-gray-50 p-5 rounded-2xl">
          <p className="font-semibold mb-3">📦 Order Summary</p>

          <div className="flex gap-4">
            <img
              src={item?.image}
              alt={item?.name}
              className="w-20 h-20 rounded-xl object-cover"
            />

            <div>
              <p>{item?.name}</p>
              <p className="text-sm text-gray-500">
                Payment: {order.paymentMethod}
              </p>
              <p className="font-bold">₹{order.totalAmount}</p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mt-5 text-left bg-gray-50 p-5 rounded-2xl">
          <p className="font-semibold mb-2">🏠 Delivery Address</p>
          <p>{order.address.name}</p>
          <p>{order.address.phoneNo}</p>
          <p>{order.address.addressLine}</p>
          <p>
            {order.address.city}, {order.address.state} -{" "}
            {order.address.pincode}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 space-y-4">
          <button
            onClick={() => navigate(`/my-orders/${order._id}`)}
            className="w-full bg-black text-white py-3 rounded-xl flex justify-center gap-2"
          >
            View Order <ArrowRight size={18} />
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border py-3 rounded-xl"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;