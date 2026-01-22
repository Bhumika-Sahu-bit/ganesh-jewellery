import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Truck,
  Package,
} from "lucide-react";

/* =======================
   ORDER TRACKING STEPPER
======================= */
const VerticalStepper = ({ status }) => {
  const defaultSteps = ["Placed", "Confirmed", "Shipped", "Delivered"];
  let steps = [...defaultSteps];

  if (status === "Cancelled" || status === "Returned") {
    steps.push(status);
  }

  const currentStep = steps.indexOf(status);

  return (
    <div className="mt-6 space-y-6">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isDanger = step === "Cancelled" || step === "Returned";

        return (
          <div key={step} className="flex gap-4">
            {/* Indicator */}
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white
                ${
                  isDanger
                    ? "bg-red-500"
                    : isCompleted
                    ? "bg-green-500"
                    : isActive
                    ? "bg-black"
                    : "bg-gray-300"
                }`}
              >
                {isDanger ? (
                  <XCircle size={18} />
                ) : isCompleted ? (
                  <CheckCircle size={18} />
                ) : (
                  index + 1
                )}
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={`w-1 h-12 mt-1 rounded
                  ${
                    isDanger
                      ? "bg-red-500"
                      : isCompleted
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
                />
              )}
            </div>

            {/* Label */}
            <div>
              <p className="font-semibold text-gray-800">{step}</p>
              {isActive && !isDanger && (
                <p className="text-sm text-gray-500">Current Status</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* =======================
   ORDER DETAIL PAGE
======================= */
const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/orders/${id}`);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
      navigate("/my-orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, [id]);

  // const handleCancel = async () => {
  //   if (!window.confirm("Cancel this order?")) return;
  //   await api.put(`/orders/cancel/${order._id}`);
  //   fetchOrder();
  // };

  // const handleReturn = async () => {
  //   if (!window.confirm("Return this order?")) return;
  //   await api.put(`/orders/return/${order._id}`);
  //   fetchOrder();
  // };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500 animate-pulse">
        Loading order details...
      </p>
    );
  }

  if (!order) return null;

  const status = order.orderStatus?.trim();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full border hover:bg-gray-100 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Order Details
          </h1>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-3xl shadow-lg p-6 grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-semibold">{order._id}</p>

            <p className="mt-3 text-sm text-gray-500">Placed On</p>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
          </div>

          <div className="md:text-right">
            <p className="text-xl font-bold">₹{order.totalAmount}</p>

            <span
              className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium
              ${
                order.paymentStatus === "Paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.paymentMethod} • {order.paymentStatus}
            </span>

            <p className="mt-2 font-medium text-gray-700">
              Status: {order.orderStatus}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="font-semibold mb-3">📍 Delivery Address</h2>
          <p className="text-gray-700">{order.address.name}</p>
          <p className="text-gray-600">{order.address.phoneNo}</p>
          <p className="text-gray-600">{order.address.addressLine}</p>
          <p className="text-gray-600">
            {order.address.city}, {order.address.state} - {order.address.pincode}
          </p>
        </div>

        {/* Products */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Package size={18} /> Products
          </h2>

          {order.items.map((item) => (
            <div
              key={item._id || item.productId}
              className="flex gap-4 border-b last:border-none pb-4 mb-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-xl object-cover"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                <p className="font-semibold mt-1">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        {/* <div className="flex gap-4">
          {["Placed", "Confirmed"].includes(status) && (
            <button
              onClick={handleCancel}
              className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition"
            >
              Cancel Order
            </button>
          )}

          {status === "Delivered" && (
            <button
              onClick={handleReturn}
              className="flex-1 bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition"
            >
              Return Order
            </button>
          )}
        </div> */}

        {/* Tracking */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Truck size={18} /> Order Tracking
          </h2>
          <VerticalStepper status={status} />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

