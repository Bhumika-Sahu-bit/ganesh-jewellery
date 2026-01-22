import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get("/admin/orders");
    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.put(`/admin/orders/${id}`, { status });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg p-4 mb-4 bg-white shadow"
        >
          {/* Top Info */}
          <div className="flex justify-between items-center mb-4">
            <p><b>Order ID:</b> {order._id}</p>
            <p><b>User:</b> {order.userId?.name}</p>
            <p><b>Total:</b> ₹{order.totalAmount}</p>
            <p className="font-semibold text-green-600">
              {order.orderStatus}
            </p>
          </div>

          {/* Product Info */}
          <div className="flex items-center gap-4">
            <img
              src={order.items[0]?.image}
              alt={order.items[0]?.name}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div>
              <p className="font-medium">{order.items[0]?.name}</p>
              <p className="text-sm text-gray-600">
                Qty: {order.items[0]?.quantity}
              </p>
              <p className="font-semibold">
                ₹{order.items[0]?.price}
              </p>
            </div>
          </div>

          {/* Status Update */}
          <select
            className="border mt-4 p-2 rounded"
            value={order.orderStatus}
            onChange={(e) => updateStatus(order._id, e.target.value)}
          >
            <option>Placed</option>
            <option>Confirmed</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
