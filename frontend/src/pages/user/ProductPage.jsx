import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  FaShoppingCart,
  FaBolt,
  FaArrowLeft,
  FaShareAlt,
} from "react-icons/fa";

import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import BottomFooter from "../../components/user/BottomFooter";
import Sidebar from "../../components/user/Sidebar";
import ProductInfoBadges from "../../components/user/ProductInfoBadges";

import {
  notifySuccess,
  notifyError,
  notifyWarning,
} from "../../utils/notify.js";

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  const fetchProductData = async () => {
    try {
      setLoading(true);

      const productRes = await api.get(`/products/${productId}`);
      const productData = productRes.data;
      setProduct(productData);
      setSelectedImage(productData.images?.[0]?.url || "");

      const wishlistRes = await api.get("/wishlist");
      const wishlistIds = wishlistRes.data.map((p) => p._id);
      setWishlistAdded(wishlistIds.includes(productId));

      const cartRes = await api.get("/cart");
      const cartIds = cartRes.data?.items?.map((i) => i.product?._id) || [];
      setAddedToCart(cartIds.includes(productId));
    } catch (error) {
      console.error("Product load error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await api.post("/cart/add", { productId, quantity: 1 });
      setAddedToCart(true);
      notifySuccess("Product added to cart");
    } catch (error) {
      console.error("Add to cart error", error);
      notifyError("Failed to add product to cart");
    }
  };

  const handleBuyNow = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        notifyWarning("Please login to continue");
        navigate("/login");
        return;
      }

      if (product.stock < 1) {
        notifyWarning("Product is out of stock");
        return;
      }

      await api.post("/buy-now", { productId, quantity: 1 });
      notifySuccess("Proceeding to checkout ⚡");
      navigate("/checkout?buyNow=true&productId=" + productId);
    } catch (error) {
      console.error("Buy Now error", error);
      notifyError("Failed to proceed to buy now");
    }
  };

  const handleWishlist = async () => {
    try {
      if (!wishlistAdded) {
        await api.post("/wishlist/add", { productId });
        setWishlistAdded(true);
        notifySuccess("Added to wishlist ❤️");
      } else {
        await api.delete(`/wishlist/remove/${productId}`);
        setWishlistAdded(false);
        notifySuccess("Removed from wishlist 💔");
      }
    } catch (error) {
      notifyError("Wishlist action failed");
      console.error("Wishlist error", error);
    }
  };

  const handleShare = async () => {
    if(!product) return ;

    const shareData = {
    title: product.name,
    text: `Check out this product:\n${product.name}\n₹${finalPrice}`,
    url: window.location.href,
  };

  try {
    if(navigator.share) {
      await navigator.share(shareData);
    } else {
      notifyWarning("Sharing not supported on this device");
    }
  } catch (error) {
    console.log("User cancelled share", error);
  }
  }

  if (loading) return <p className="text-center mt-10">Loading product...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  const finalPrice = product.discount
    ? Math.round(product.price - (product.price * product.discount) / 100)
    : product.price;

  // WhatsApp Enquiry Link
  const whatsappNumber = "916265580736"; // <-- Replace with your admin number
  const whatsappMessage = encodeURIComponent(
    `Hello! I want to enquire about this product:\n\n` +
      `Product Name: ${product.name}\n` +
      `Price: ₹${finalPrice}\n` +
      `Product Code: ${product.productCode || product._id.slice(-6)}\n` +
      `Category: ${product.category?.name || "N/A"}\n` +
      `SubCategory: ${product.subCategory?.name || "N/A"}\n` +
      `Product Link: ${window.location.href}`,
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="max-w-7xl mx-auto px-4 py-10 mt-10 mb-6">
        <div className="flex items-center justify-between mb-6">
          {/* Back Arrow */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition"
          >
            <FaArrowLeft />
            <span className="font-medium">Back</span>
          </button>

          {/* Stock Badge */}
          <div
            className={`px-4 py-2 rounded-full font-medium ${product.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* ================= IMAGE SECTION ================= */}
          <div className="relative">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[520px] object-cover rounded-xl border"
            />

            {/* Wishlist */}
            <div className="absolute top-4 right-4 flex flex-col gap-3">
              <button
                onClick={handleWishlist}
                className="absolute top-4 right-4 bg-white p-3 rounded-full shadow"
              >
                {wishlistAdded ? (
                  <AiFillHeart className="text-red-600 text-2xl" />
                ) : (
                  <AiOutlineHeart className="text-gray-600 text-2xl" />
                )}
              </button>

              {/* share */}
              <button
                onClick={handleShare}
                className="bg-white p-3 rounded-full shadow"
              >
                <FaShareAlt className="text-gray-700 text-xl" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img.url}
                  alt=""
                  onClick={() => setSelectedImage(img.url)}
                  className={`h-20 w-20 object-cover rounded-lg cursor-pointer border ${
                    selectedImage === img.url
                      ? "border-black"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ================= DETAILS ================= */}
          <div>
            <p className="text-xs tracking-widest text-gray-400 mb-1">
              PRODUCT CODE: {product.productCode || product._id.slice(-6)}
            </p>

            <h1 className="text-3xl font-semibold mb-3">{product.name}</h1>

            <p className="text-sm text-gray-500 mb-4">
              {product.category?.name}
              {product.subCategory && ` / ${product.subCategory.name}`}
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold">₹{finalPrice}</span>
              {product.discount > 0 && (
                <>
                  <span className="line-through text-gray-400">
                    ₹{product.price}
                  </span>
                  <span className="text-red-600 font-medium">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Stock & Services */}
            <div className="text-sm text-gray-600 space-y-1 mb-6">
              {/* <p>Stock Available: {product.stock}</p> */}
              {product.codAvailable && <p>✔ Cash on Delivery</p>}
              {product.returnAvailable && <p>✔ Easy Returns</p>}
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="font-semibold mb-1">Product Details</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {product.shortDesc || product.description}
              </p>
            </div>

            {/* Trust / Info Section */}
            <ProductInfoBadges />

            {/* Buttons */}
            <div className="flex gap-4 mt-6 flex-wrap">
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-1 ${
                  addedToCart
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-900"
                }`}
              >
                <FaShoppingCart />
                {addedToCart ? "Added to Cart" : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700"
              >
                <FaBolt />
                Buy Now
              </button>

              {/* Enquiry Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-lg font-medium flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                Enquiry
              </a>
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

export default ProductPage;
