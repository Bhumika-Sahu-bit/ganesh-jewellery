
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import BottomFooter from "../../components/user/BottomFooter";
import Sidebar from "../../components/user/Sidebar";

import {
  FiEdit,
  FiMapPin,
  FiPhone,
  FiMail,
  FiLogOut,
  FiShoppingBag,
  FiHeart,
  FiShoppingCart,
  FiBox,
} from "react-icons/fi";

import { notifySuccess, notifyError } from "../../utils/notify.js";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(null);

  const [counts, setCounts] = useState({
    orders: 0,
    wishlist: 0,
    cart: 0,
  });

  const [loading, setLoading] = useState(true);

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  const [editAddress, setEditAddress] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await api.get("/profile");
        setUser(profileRes.data.user);

        const addressRes = await api.get("/profile/address");
        setAddress(addressRes.data.address);

        const ordersRes = await api.get("/orders/my-orders");
        const wishlistRes = await api.get("/wishlist");
        const cartRes = await api.get("/cart");

        setCounts({
          orders: ordersRes.data.length,
          wishlist: wishlistRes.data.length,
          cart: cartRes.data.items?.length || 0,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const updateProfile = async () => {
    try {
      let avatar = avatarUrl;

      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const uploadRes = await api.post("/profile/avatar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        avatar = uploadRes.data.user.avatar;
      }

      const res = await api.put("/profile", {
        name: user.name,
        phone: user.phone,
        avatarUrl: avatar,
      });

      setUser(res.data.user);
      notifySuccess("Profile updated ✌️");
    } catch (err) {
      console.log(err);
      notifyError("Something wrong");
    }
  };

  const saveAddress = async () => {
    try {
      const res = await api.put("/profile/address", { ...address });
      setAddress(res.data.address);
      setEditAddress(false);
      notifySuccess("Address updated!");
    } catch (err) {
      console.log(err);
      notifyError("Address update failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="min-h-screen bg-gray-100 p-4 md:p-8 mt-15 mb-15">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT SIDE */}
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
            <div className="relative">
              <img
                src={
                  user?.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="avatar"
                className="w-28 h-28 rounded-full border-4 border-indigo-500 object-cover"
              />
            </div>

            <h2 className="mt-4 text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-500 text-sm">User Account</p>

            <div className="w-full mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-gray-700">
                <FiMail />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FiPhone />
                <span>{user?.phone}</span>
              </div>
            </div>

            <div className="w-full mt-6 space-y-2">
              <NavButton
                icon={<FiShoppingBag />}
                label="My Orders"
                onClick={() => navigate("/my-orders")}
              />
              <NavButton
                icon={<FiHeart />}
                label="Wishlist"
                onClick={() => navigate("/wishlist")}
              />
              <NavButton
                icon={<FiShoppingCart />}
                label="My Cart"
                onClick={() => navigate("/cart")}
              />
            </div>

            <button
              onClick={handleLogout}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
            >
              <FiLogOut /> Logout
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={<FiBox />} label="Total Orders" value={counts.orders} />
              <StatCard icon={<FiHeart />} label="Wishlist Items" value={counts.wishlist} />
              <StatCard icon={<FiShoppingCart />} label="Cart Items" value={counts.cart} />
            </div>

            {/* ADDRESS */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Saved Address</h3>

              {!editAddress && (
                <div className="border border-indigo-600 bg-indigo-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-1 flex items-center gap-2">
                    <FiMapPin /> {address?.name || "Home"}
                  </h4>

                  <p className="text-sm text-gray-600">
                    {address?.addressLine}, {address?.city}, {address?.state} -{" "}
                    {address?.pincode}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    📞 {address?.phoneNo}
                  </p>

                  <button
                    onClick={() => setEditAddress(true)}
                    className="mt-3 text-sm text-indigo-600 hover:underline"
                  >
                    Edit Address
                  </button>
                </div>
              )}

              {editAddress && (
                <div className="space-y-3">
                  <input
                    className="border border-gray-300 rounded-xl p-3 w-full"
                    value={address?.name || ""}
                    onChange={(e) => setAddress({ ...address, name: e.target.value })}
                    placeholder="Address Name (Home/Office)"
                  />

                  <input
                    className="border border-gray-300 rounded-xl p-3 w-full"
                    value={address?.addressLine || ""}
                    onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                    placeholder="Address"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      className="border border-gray-300 rounded-xl p-3"
                      value={address?.city || ""}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="City"
                    />
                    <input
                      className="border border-gray-300 rounded-xl p-3"
                      value={address?.state || ""}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      placeholder="State"
                    />
                    <input
                      className="border border-gray-300 rounded-xl p-3"
                      value={address?.pincode || ""}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      placeholder="Pincode"
                    />
                  </div>

                  <input
                    className="border border-gray-300 rounded-xl p-3 w-full"
                    value={address?.phoneNo || ""}
                    onChange={(e) => setAddress({ ...address, phoneNo: e.target.value })}
                    placeholder="Phone"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={saveAddress}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
                    >
                      Save Address
                    </button>
                    <button
                      onClick={() => setEditAddress(false)}
                      className="bg-gray-300 text-black px-6 py-2 rounded-xl hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* UPDATE PROFILE */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Update Profile</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="border border-gray-300 rounded-xl p-3"
                  value={user?.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  placeholder="Name"
                />
                <input
                  className="border border-gray-300 rounded-xl p-3"
                  value={user?.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  placeholder="Phone"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium">Avatar URL</label>
                <input
                  className="w-full border border-gray-300 rounded-xl p-3"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="Paste avatar URL here"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium">Upload Avatar</label>
                <input
                  type="file"
                  className="w-full border border-gray-300 rounded-xl p-3"
                  onChange={(e) => setAvatarFile(e.target.files[0])}
                />
              </div>

              <button
                onClick={updateProfile}
                className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>
      <BottomFooter />
    </>
  );
};

const NavButton = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-2 rounded-xl border border-gray-200 hover:bg-indigo-50 hover:border-indigo-500 transition text-sm"
  >
    <span className="text-indigo-600">{icon}</span>
    <span>{label}</span>
  </button>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
    <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl text-xl">
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  </div>
);

export default ProfilePage;
