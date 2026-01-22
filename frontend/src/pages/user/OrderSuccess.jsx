import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  // 🔐 Safety check
  if (!state || !state.product || !state.address) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
        <p className="text-lg font-medium text-gray-700">
          Order not found 😕
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 rounded-lg bg-black text-white hover:bg-gray-900 transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  const {
    product,
    address,
    paymentMethod,
    orderId,
    totalAmount,
  } = state;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center">

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="bg-green-100 p-4 rounded-full shadow-inner">
            <CheckCircle size={72} className="text-green-500" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-6">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-600 mt-2">
          Thank you for shopping with us. Your order is on its way!
        </p>

        {/* Order ID */}
        {orderId && (
          <div className="mt-4 inline-block bg-gray-100 px-4 py-2 rounded-full text-sm">
            <span className="font-medium text-gray-700">Order ID:</span>{" "}
            <span className="font-mono text-gray-900">{orderId}</span>
          </div>
        )}

        {/* Product Summary */}
        <div className="mt-8 text-left bg-gray-50 rounded-2xl p-5 border">
          <p className="font-semibold mb-3 text-gray-800">
            📦 Order Summary
          </p>

          <div className="flex gap-4 items-center">
            <img
              src={product.images?.[0]?.url}
              alt={product.name}
              className="w-20 h-20 rounded-xl object-cover border"
            />

            <div>
              <p className="font-medium text-gray-900">
                {product.name}
              </p>
              <p className="text-gray-600 text-sm">
                Payment:{" "}
                <span className="font-medium">{paymentMethod}</span>
              </p>
              <p className="text-lg font-bold mt-1">
                ₹{totalAmount || product.finalPrice}
              </p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mt-5 text-left bg-gray-50 rounded-2xl p-5 border">
          <p className="font-semibold mb-2 text-gray-800">
            🏠 Delivery Address
          </p>
          <p className="text-gray-700">{address.name}</p>
          <p className="text-gray-600">{address.phoneNo}</p>
          <p className="text-gray-600">{address.addressLine}</p>
          <p className="text-gray-600">
            {address.city}, {address.state} - {address.pincode}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-10 space-y-4">
          <button
            onClick={() => navigate(`/my-orders/${orderId}`)}
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition"
          >
            View Order Details <ArrowRight size={18} />
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border py-3 rounded-xl hover:bg-gray-100 transition text-gray-800"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

