import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { notifyError, notifySuccess, notifyWarning } from "../../utils/notify";

const Checkout = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const productId = params.get("productId");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState({
    name: "",
    phoneNo: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  // ================= LOAD CASHFREE SDK =================
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/products/${productId}`);
        setProduct(res.data);

        const addressRes = await api.get("/profile/address");
        if (addressRes.data.address) {
          setAddress(addressRes.data.address);
        }
      } catch (error) {
        console.error(error);
        notifyError("Failed to load details");
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchData();
  }, [productId]);

  // ================= CASHFREE PAYMENT =================
  const startOnlinePayment = async (addressId) => {
    try {
      const res = await api.post("/checkout/online-payment", {
        productId,
        addressId,
      });

      console.log("Backend Response:", res.data);

      const { paymentSessionId } = res.data;

      if (!paymentSessionId) {
        notifyError("Payment session not received");
        return;
      }

      if (!window.Cashfree) {
        notifyError("Payment SDK not loaded");
        return;
      }

      const cashfree = new window.Cashfree({
        mode: "sandbox", // change to "production" in live
      });

      cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_self",
      });

    } catch (error) {
      console.error("Payment error:", error);
      notifyError("Payment failed. Try again.");
    }
  };

  // ================= PLACE ORDER =================
  const placeOrder = async () => {
    const { addressLine, city, state, pincode, phoneNo } = address;

    if (!addressLine || !city || !state || !pincode || !phoneNo) {
      notifyWarning("Please fill complete address");
      return;
    }

    try {
      const addressRes = await api.put("/profile/address", address);
      const addressId = addressRes.data.address._id;

      if (paymentMethod === "COD") {
        const res = await api.post("/checkout/buy-now", {
          productId,
          addressId,
          paymentMethod: "COD",
        });

        notifySuccess("Order placed successfully!");

        navigate("/order-success", {
          state: {
            product,
            address: addressRes.data.address,
            paymentMethod: "COD",
            orderId: res.data?.orderId,
            totalAmount: product.finalPrice,
          },
        });

      } else {
        startOnlinePayment(addressId);
      }

    } catch (error) {
      console.error(error);
      notifyError("Checkout failed");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading Checkout</p>;
  if (!product) return <p className="text-center mt-20">Product not found</p>;

  return (
    <div className="min-h-screen bg-[#fafafa]">

      {/* TOP BAR */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 px-4 py-3 flex items-center gap-3">
        <AiOutlineArrowLeft
          size={22}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="font-semibold text-lg">Checkout</h2>
      </div>

      <div className="h-16" />

      <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">

          {/* PRODUCT */}
          <div className="bg-white rounded-2xl shadow p-5 flex gap-5">
            <img
              src={product.images?.[0]?.url}
              alt={product.name}
              className="w-28 h-28 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="mt-2 font-bold">₹{product.finalPrice}</p>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="bg-white p-6 rounded-2xl shadow space-y-4">
            <h3 className="font-semibold">Address</h3>

            {["name", "phoneNo", "addressLine", "city", "state", "pincode"].map((field) => (
              <input
                key={field}
                className="input"
                placeholder={field}
                value={address[field]}
                onChange={(e) =>
                  setAddress({ ...address, [field]: e.target.value })
                }
              />
            ))}
          </div>

          {/* PAYMENT */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="font-semibold mb-3">Payment</h3>

            <label>
              <input
                type="radio"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              COD
            </label>

            <br />

            <label>
              <input
                type="radio"
                checked={paymentMethod === "ONLINE"}
                onChange={() => setPaymentMethod("ONLINE")}
              />
              Online Payment
            </label>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="font-semibold mb-4">Summary</h3>

          <div className="flex justify-between">
            <span>Price</span>
            <span>₹{product.finalPrice}</span>
          </div>

          <div className="mt-4 font-bold flex justify-between">
            <span>Total</span>
            <span>₹{product.finalPrice}</span>
          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900"
          >
            Place Order
          </button>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Checkout;