import { useEffect, useState } from "react";
import api from "../../api/axios";

const AdminNavbar = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get("/admin/orders");
      const newOrders = res.data.filter(o => o.orderStatus === "Placed");
      setCount(newOrders.length);
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex justify-between p-4 bg-black text-white">
      <h1 className="font-bold">Admin Panel</h1>

      <div className="relative">
        🛒
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 rounded-full">
            {count}
          </span>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
