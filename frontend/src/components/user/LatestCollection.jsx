import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { notifyError , notifySuccess } from "../../utils/notify.js";

const LatestCollection = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistAdded, setWishlistAdded] = useState({});
  const [cartAdded, setCartAdded] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/products");
      const productList = res.data || [];
      setProducts(productList);

      // Wishlist
      const wishlistRes = await api.get("/wishlist");
      const wishlistIds = wishlistRes.data.map((p) => p._id);
      const wishlistState = {};
      productList.forEach((p) => {
        wishlistState[p._id] = wishlistIds.includes(p._id);
      });
      setWishlistAdded(wishlistState);

      // Cart
      const cartRes = await api.get("/cart");
      const cartIds =
        cartRes.data?.items?.map((i) => i.product?._id) || [];
      const cartState = {};
      productList.forEach((p) => {
        cartState[p._id] = cartIds.includes(p._id);
      });
      setCartAdded(cartState);
    } catch (err) {
      console.error("Failed to fetch latest collection:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = async (productId) => {
    try {
      if (!wishlistAdded[productId]) {
        await api.post("/wishlist/add", { productId });
        setWishlistAdded((prev) => ({ ...prev, [productId]: true }));
        notifySuccess("Added to wishlist");
      } else {
        await api.delete(`/wishlist/remove/${productId}`);
        setWishlistAdded((prev) => ({ ...prev, [productId]: false }));
        notifyError("Removed from wishlist");
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      notifyError("Wishlist operation failed");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await api.post("/cart/add", { productId, quantity: 1 });
      setCartAdded((prev) => ({ ...prev, [productId]: true }));
      notifySuccess("Added to cart 🛒");
    } catch (err) {
      console.error("Add to cart failed:", err);
      notifyError("Failed to add to cart");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-16 text-gray-500 text-lg animate-pulse">
        Loading Latest Collection...
      </p>
    );

  if (!products.length)
    return (
      <p className="text-center mt-16 text-gray-500">
        No products found in Latest Collection
      </p>
    );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-wide">
          Latest Collection
        </h2>
        <p className="text-gray-500 text-sm md:text-base mt-2">
          Discover our newest handcrafted jewellery
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-7">
        {products.map((p) => {
          const finalPrice = p.discount
            ? Math.round(p.price - (p.price * p.discount) / 100)
            : p.price;

          return (
            <div
              key={p._id}
              className="
                group bg-white
                rounded-2xl
                overflow-hidden
                shadow-md
                hover:shadow-2xl
                transition-all duration-300
                hover:-translate-y-1
              "
            >
              {/* IMAGE */}
              <div
                className="relative cursor-pointer overflow-hidden"
                onClick={() => navigate(`/products/${p._id}`)}
              >
                <img
                  src={p.images?.[0]?.url}
                  alt={p.name}
                  className="
                    w-full h-44 sm:h-52 md:h-56
                    object-cover
                    transition-transform duration-700
                    group-hover:scale-110
                  "
                />

                {/* Discount badge */}
                {p.discount && (
                  <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
                    {p.discount}% OFF
                  </span>
                )}

                {/* Wishlist */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist(p._id);
                  }}
                  className="
                    absolute top-3 right-3
                    bg-white/90 backdrop-blur
                    p-2 rounded-full
                    text-red-600
                    hover:scale-110
                    transition
                  "
                >
                  {wishlistAdded[p._id] ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>

              {/* DETAILS */}
              <div className="p-4">
                <p className="text-[11px] text-gray-400 mb-1">
                  Product Code: #{p.code || p._id.slice(-6)}
                </p>

                <h3 className="text-sm font-medium line-clamp-2 mb-2">
                  {p.name}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-base md:text-lg font-semibold">
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
                  className={`
                    w-full py-2.5 rounded-lg
                    text-sm font-medium
                    transition-all duration-300
                    ${
                      cartAdded[p._id]
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-900"
                    }
                  `}
                >
                  {cartAdded[p._id] ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LatestCollection;
