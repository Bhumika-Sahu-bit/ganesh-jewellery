import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FaHeart, FaRegHeart, FaArrowLeft } from "react-icons/fa";

import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import BottomFooter from "../../components/user/BottomFooter";
import Sidebar from "../../components/user/Sidebar";
import { notifySuccess, notifyError } from "../../utils/notify.js";
const ProductList = () => {
  const { categoryId, subCategoryId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartAdded, setCartAdded] = useState({});
  const [wishlistAdded, setWishlistAdded] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [categoryId, subCategoryId]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const url = subCategoryId
        ? `/products/sub-category/${subCategoryId}`
        : categoryId
        ? `/products/category/${categoryId}`
        : `/products`;

      const { data } = await api.get(url);
      setProducts(data);

      /* Wishlist */
      const wishlistRes = await api.get("/wishlist");
      const wishlistIds = wishlistRes.data.map(p => p._id);

      const wishlistState = {};
      data.forEach(p => {
        wishlistState[p._id] = wishlistIds.includes(p._id);
      });
      setWishlistAdded(wishlistState);

      /* Cart */
      const cartRes = await api.get("/cart");
      const cartIds =
        cartRes.data?.items?.map(i => i.product?._id) || [];

      const cartState = {};
      data.forEach(p => {
        cartState[p._id] = cartIds.includes(p._id);
      });
      setCartAdded(cartState);

    } catch (err) {
      console.error("Product fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await api.post("/cart/add", { productId, quantity: 1 });
      setCartAdded(prev => ({ ...prev, [productId]: true }));
      notifySuccess("Product added to cart 🛒");
    } catch (err) {
      console.error("Add to cart failed", err);
      notifySuccess("Product added to cart 🛒");
    }
  };

  const handleWishlist = async (productId) => {
    try {
      if (!wishlistAdded[productId]) {
        await api.post("/wishlist/add", { productId });
        setWishlistAdded(prev => ({ ...prev, [productId]: true }));
        notifySuccess("Added to wishlist ❤️");
      } else {
        await api.delete(`/wishlist/remove/${productId}`);
        setWishlistAdded(prev => ({ ...prev, [productId]: false }));
        notifySuccess("Removed from wishlist 💔");
      }
    } catch (err) {
      console.error("Wishlist error", err);
      notifyError("Wishlist operation failed");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500 animate-pulse">
        Loading Products...
      </p>
    );
  }

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="max-w-7xl mx-auto px-4 py-8 mt-10">
        
        {/* Back Button */}
        {products.length > 0 && (
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition"
            >
              <FaArrowLeft />
              <span className="font-medium">Back</span>
            </button>
          </div>
        )}

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {products.map(p => {
              const finalPrice = p.discount
                ? Math.round(p.price - (p.price * p.discount) / 100)
                : p.price;

              return (
                <div
                  key={p._id}
                  className="group bg-white rounded-2xl border border-gray-400 hover:shadow-2xl transition overflow-hidden"
                >
                  {/* IMAGE */}
                  <div
                    className="relative cursor-pointer overflow-hidden"
                    onClick={() => navigate(`/products/${p._id}`)}
                  >
                    <img
                      src={p.images?.[0]?.url}
                      alt={p.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* DISCOUNT */}
                    {p.discount && (
                      <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
                        {p.discount}% OFF
                      </span>
                    )}

                    {/* WISHLIST */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlist(p._id);
                      }}
                      className="absolute top-3 right-3 text-xl text-red-600 bg-white/80 p-2 rounded-full"
                    >
                      {wishlistAdded[p._id] ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  </div>

                  {/* DETAILS */}
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-1">
                      Product Code: #{p.code || p._id.slice(-6)}
                    </p>

                    <h3 className="font-medium text-sm line-clamp-2 mb-1">
                      {p.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-semibold text-black">
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
                      className={`w-full py-2 rounded-md text-sm font-medium transition ${
                        cartAdded[p._id]
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-black text-white hover:bg-gray-900"
                      }`}
                    >
                      {cartAdded[p._id] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Template when no products found
          <div className="bg-white rounded-3xl shadow-lg p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              No Products Found
            </h2>
            <p className="text-gray-500 mt-3">
              Sorry! Currently there are no products available in this category.
            </p>

            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 rounded-full bg-black text-white font-medium hover:bg-gray-900 transition"
              >
                Go Back
              </button>

              <button
                onClick={() => navigate("/products")}
                className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
              >
                Browse All Products
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="hidden md:block">
        <Footer />
      </div>
      <BottomFooter />
    </>
  );
};

export default ProductList;
