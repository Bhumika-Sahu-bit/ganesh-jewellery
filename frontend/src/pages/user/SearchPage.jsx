import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FaHeart, FaRegHeart, FaArrowLeft } from "react-icons/fa";

import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import BottomFooter from "../../components/user/BottomFooter";
import Sidebar from "../../components/user/Sidebar";

const SearchPage = () => {
  const { query } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistAdded, setWishlistAdded] = useState({});
  const [cartAdded, setCartAdded] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchResults();
  }, [query]);

  const fetchResults = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/products/search/${query}`);
      setProducts(data);

      const wishlistRes = await api.get("/wishlist");
      const wishlistIds = wishlistRes.data.map((p) => p._id);

      const wishlistState = {};
      data.forEach((p) => {
        wishlistState[p._id] = wishlistIds.includes(p._id);
      });
      setWishlistAdded(wishlistState);

      const cartRes = await api.get("/cart");
      const cartIds =
        cartRes.data?.items?.map((i) => i.product?._id) || [];

      const cartState = {};
      data.forEach((p) => {
        cartState[p._id] = cartIds.includes(p._id);
      });
      setCartAdded(cartState);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await api.post("/cart/add", { productId, quantity: 1 });
      setCartAdded((prev) => ({ ...prev, [productId]: true }));
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  const handleWishlist = async (productId) => {
    try {
      if (!wishlistAdded[productId]) {
        await api.post("/wishlist/add", { productId });
        setWishlistAdded((prev) => ({ ...prev, [productId]: true }));
      } else {
        await api.delete(`/wishlist/remove/${productId}`);
        setWishlistAdded((prev) => ({ ...prev, [productId]: false }));
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  /* ===================== LOADING ===================== */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600 animate-pulse">
          Searching for “{query}” 🔍
        </p>
      </div>
    );
  }

  /* ===================== EMPTY STATE ===================== */
  if (!loading && products.length === 0) {
    return (
      <>
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 ">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
            alt="No results"
            className="w-40 mb-6 opacity-80"
          />

          <h2 className="text-2xl font-bold mb-2">
            No results found
          </h2>

          <p className="text-gray-500 mb-6">
            We couldn’t find anything for <b>“{query}”</b>
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-6 py-3 border rounded-xl hover:bg-gray-100 transition"
            >
              <FaArrowLeft /> Go Back
            </button>

            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        <BottomFooter />
      </>
    );
  }

  /* ===================== MAIN UI ===================== */
  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full border hover:bg-gray-100 transition"
          >
            <FaArrowLeft />
          </button>

          <h2 className="text-2xl md:text-3xl font-bold">
            Search results for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              “{query}”
            </span>
          </h2>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((p) => {
            const finalPrice = p.discount
              ? Math.round(p.price - (p.price * p.discount) / 100)
              : p.price;

            return (
              <div
                key={p._id}
                className="group bg-white rounded-2xl border hover:shadow-2xl transition overflow-hidden"
              >
                {/* IMAGE */}
                <div
                  onClick={() => navigate(`/products/${p._id}`)}
                  className="relative cursor-pointer overflow-hidden"
                >
                  <img
                    src={p.images?.[0]?.url}
                    alt={p.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition duration-500"
                  />

                  {p.discount && (
                    <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                      {p.discount}% OFF
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlist(p._id);
                    }}
                    className="absolute top-3 right-3 bg-white shadow-lg p-2 rounded-full text-red-600 hover:scale-110 transition"
                  >
                    {wishlistAdded[p._id] ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </div>

                {/* DETAILS */}
                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-1">
                    #{p.code || p._id.slice(-6)}
                  </p>

                  <h3 className="font-medium text-sm line-clamp-2 mb-2">
                    {p.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-semibold">
                      ₹{finalPrice}
                    </span>
                    {p.discount && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{p.price}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(p._id)}
                    disabled={cartAdded[p._id]}
                    className={`w-full py-2.5 rounded-xl text-sm font-medium transition ${
                      cartAdded[p._id]
                        ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-900"
                    }`}
                  >
                    {cartAdded[p._id]
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>
      <BottomFooter />
    </>
  );
};

export default SearchPage;
