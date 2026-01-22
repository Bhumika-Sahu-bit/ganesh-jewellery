import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Footer from "../../components/user/Footer";
import BottomFooter from "../../components/user/BottomFooter";

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistAdded, setWishlistAdded] = useState({});

  // ===== FETCH WISHLIST =====
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await api.get("/wishlist");
      setWishlistItems(res.data || []);

      // Initialize wishlistAdded state
      const wishlistState = {};
      (res.data || []).forEach((item) => {
        wishlistState[item._id] = true;
      });
      setWishlistAdded(wishlistState);
    } catch (err) {
      console.error("Wishlist fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ===== REMOVE OR TOGGLE WISHLIST =====
  const toggleWishlist = async (productId) => {
    try {
      if (wishlistAdded[productId]) {
        const res = await api.delete(`/wishlist/remove/${productId}`);
        setWishlistItems(res.data || []);
        setWishlistAdded((prev) => ({ ...prev, [productId]: false }));
      } else {
        await api.post("/wishlist/add", { productId });
        fetchWishlist();
      }
    } catch (err) {
      console.error("Wishlist toggle error:", err);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg animate-pulse">
        Loading wishlist...
      </p>
    );

  if (!loading && wishlistItems.length === 0)
    return (
      <div className="min-h-screen flex flex-col bg-[#faf9f7]">
        <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 px-4 py-3 flex items-center gap-3 ">
          <AiOutlineArrowLeft
            size={22}
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="font-semibold text-lg">My Wishlist</h2>
        </div>

        <div className="h-16" />

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md">
            <span className="text-6xl mb-4 text-red-500">♡</span>
            <h2 className="text-2xl font-bold mb-3">Your Wishlist is Empty</h2>
            <p className="text-gray-500 mb-6">
              Add your favourite products to wishlist and save them for later.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => navigate("/products")}
                className="px-6 py-2 rounded-full bg-black text-white font-medium hover:bg-gray-900 transition"
              >
                Shop Now
              </button>

              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <Footer />
        </div>
        <BottomFooter />
      </div>
    );

  return (
    <>
      <div className="bg-[#faf9f7] min-h-screen">
        {/* ===== NAVBAR ===== */}
        <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 px-4 py-3 flex items-center gap-3 ">
          <AiOutlineArrowLeft
            size={22}
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="font-semibold text-lg">My Wishlist</h2>
        </div>

        {/* NAVBAR SPACE */}
        <div className="h-16" />

        {/* ===== WISHLIST GRID ===== */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-6">
            {wishlistItems.map((item) => {
              const finalPrice = item.discount
                ? Math.round(
                    item.price - (item.price * item.discount) / 100
                  )
                : item.price;

              return (
                <div
                  key={item._id}
                  className="group bg-white rounded-xl border border-gray-300 hover:shadow-xl transition overflow-hidden"
                >
                  {/* IMAGE */}
                  <div
                    className="relative cursor-pointer overflow-hidden"
                    onClick={() => navigate(`/products/${item._id}`)}
                  >
                    <img
                      src={item.images?.[0]?.url}
                      alt={item.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* DISCOUNT */}
                    {item.discount && (
                      <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
                        {item.discount}% OFF
                      </span>
                    )}

                    {/* HEART */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item._id);
                      }}
                      className="absolute top-3 right-3 text-xl text-red-600 bg-white/80 p-2 rounded-full"
                    >
                      {wishlistAdded[item._id] ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>

                  {/* DETAILS */}
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-1">
                      Product Code: #{item.code || item._id.slice(-6)}
                    </p>

                    <h3 className="font-medium text-sm line-clamp-2 mb-1">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-semibold text-black">
                        ₹{finalPrice}
                      </span>
                      {item.discount && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{item.price}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(`/products/${item._id}`)}
                      className="w-full py-2 rounded-md text-sm font-medium bg-black text-white hover:bg-gray-900 transition"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              );
            })}
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

export default WishlistPage;
