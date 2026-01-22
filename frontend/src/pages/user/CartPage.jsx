import { useEffect, useState } from "react";
import api from "../../api/axios";
import { FaHeart, FaRegHeart, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import BottomFooter from "../../components/user/BottomFooter";
import Sidebar from "../../components/user/Sidebar";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistAdded, setWishlistAdded] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch cart items
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await api.get("/cart");
      setCartItems(res.data.items || []);

      // Wishlist info
      const wishlistRes = await api.get("/wishlist");
      const wishlistIds = wishlistRes.data.map((p) => p._id);
      const wishlistState = {};
      res.data.items.forEach((item) => {
        wishlistState[item.product._id] = wishlistIds.includes(item.product._id);
      });
      setWishlistAdded(wishlistState);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Remove from cart
  const removeFromCart = async (productId) => {
    try {
      await api.delete(`/cart/${productId}`);
      setCartItems((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  // Update quantity
  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      await api.put(`/cart/${productId}`, { quantity: newQty });
      setCartItems((prev) =>
        prev.map((item) =>
          item.product._id === productId ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  // Wishlist toggle
  const toggleWishlist = async (productId) => {
    try {
      if (!wishlistAdded[productId]) {
        await api.post("/wishlist/add", { productId });
        setWishlistAdded((prev) => ({ ...prev, [productId]: true }));
      } else {
        await api.delete(`/wishlist/remove/${productId}`);
        setWishlistAdded((prev) => ({ ...prev, [productId]: false }));
      }
    } catch (err) {
      console.error("Wishlist toggle failed", err);
    }
  };

  // Grand total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.discount
        ? Math.round(
            item.product.price -
              (item.product.price * item.product.discount) / 100
          )
        : item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg animate-pulse">
        Loading cart...
      </p>
    );

  if (!loading && cartItems.length === 0)
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center max-w-md">
            <h2 className="text-2xl font-bold mb-3">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-6">
              Add items to your cart and they will appear here.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate("/products")}
                className="px-6 py-2 rounded-full bg-black text-white font-medium hover:bg-gray-900 transition"
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
              >
                Back
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
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition"
          >
            <FaArrowLeft />
            <span className="font-medium">Back</span>
          </button>

          <h2 className="text-3xl font-bold">My Cart</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {cartItems.map(({ product, quantity }) => {
              const finalPrice = product.discount
                ? Math.round(
                    product.price -
                      (product.price * product.discount) / 100
                  )
                : product.price;

              return (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition overflow-hidden relative"
                >
                  {/* IMAGE */}
                  <div className="relative cursor-pointer overflow-hidden">
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* DISCOUNT BADGE */}
                    {product.discount > 0 && (
                      <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
                        {product.discount}% OFF
                      </span>
                    )}

                    {/* WISHLIST */}
                    <button
                      onClick={() => toggleWishlist(product._id)}
                      className="absolute top-3 right-3 text-xl text-red-600 bg-white/80 p-2 rounded-full"
                    >
                      {wishlistAdded[product._id] ? (
                        <FaHeart />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                  </div>

                  {/* DETAILS */}
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-xs text-gray-400 mb-1">
                      Product Code: #{product.code || product._id.slice(-6)}
                    </p>

                    <h3 className="font-medium text-sm line-clamp-2 mb-1">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-semibold text-black">
                        ₹{finalPrice}
                      </span>
                      {product.discount > 0 && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{product.price}
                        </span>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center mb-3">
                      <button
                        onClick={() =>
                          updateQuantity(product._id, quantity - 1)
                        }
                        className="px-3 py-1 bg-gray-300 rounded-l hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-t border-b">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(product._id, quantity + 1)
                        }
                        className="px-3 py-1 bg-gray-300 rounded-r hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>

                    <div className="mt-auto grid-cols-2 gap-2 w-full grid">
                      <button
                        onClick={() => navigate(`/products/${product._id}`)}
                        className="py-2 rounded-md text-sm font-medium bg-black text-white hover:bg-gray-900 transition"
                      >
                        View Product
                      </button>

                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>

            <div className="flex justify-between text-gray-600 mb-2">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-4">
              <span>Delivery</span>
              <span>Free</span>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{calculateTotal()}</span>
              </div>

              {/* <button
                onClick={() => navigate("/checkout")}
                className="mt-6 w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-900 transition"
              >
                Proceed to Checkout
              </button> */}

              <button
                onClick={() => navigate("/products")}
                className="mt-3 w-full py-3 rounded-xl bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition"
              >
                Continue Shopping
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

export default CartPage;
