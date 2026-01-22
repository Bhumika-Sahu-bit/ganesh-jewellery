// import { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import api from "../../api/axios";
// import { AiOutlineArrowLeft } from "react-icons/ai";
// import { notifyError, notifySuccess , notifyWarning } from "../../utils/notify.js";

// const Checkout = () => {
//   const navigate = useNavigate();
//   const [params] = useSearchParams();
//   const productId = params.get("productId");

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ================= ADDRESS =================
//   const [addressLine, setAddressLine] = useState(localStorage.getItem("addressLine") || "");
//   const [city, setCity] = useState(localStorage.getItem("city") || "");
//   const [state, setState] = useState(localStorage.getItem("state") || "");
//   const [pincode, setPincode] = useState(localStorage.getItem("pincode") || "");

//   // ================= PAYMENT =================
//   const [paymentMethod, setPaymentMethod] = useState("COD");

//   // ================= USER =================
//   const userName = localStorage.getItem("userName") || "";
//   const userPhone = localStorage.getItem("phoneNo") || "";

//   // ================= FETCH PRODUCT =================
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await api.get(`/products/${productId}`);
//         setProduct(res.data);
//       } catch (error) {
//         console.error("Product fetch error:", error);
//         notifyError("Failed to load product details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (productId) fetchProduct();
//   }, [productId]);

//   // ================= SAVE ADDRESS =================
//   useEffect(() => {
//     localStorage.setItem("addressLine", addressLine);
//     localStorage.setItem("city", city);
//     localStorage.setItem("state", state);
//     localStorage.setItem("pincode", pincode);
//   }, [addressLine, city, state, pincode]);

//   // ================= ONLINE PAYMENT =================
//   const startOnlinePayment = async (addressId) => {
//     try {
//       const res = await api.post("/checkout/online-payment", {
//         productId: product._id,
//         amount: product.finalPrice,
//         addressId,
//       });

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY,
//         amount: res.data.amount,
//         currency: "INR",
//         name: "My Shop",
//         description: product.name,
//         order_id: res.data.orderId,
//         handler: async (response) => {
//           const verifyRes = await api.post("/checkout/verify-payment", {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             productId: product._id,
//             addressId,
//           });

//           navigate("/order-success", {
//             state: {
//               product,
//               address: { addressLine, city, state, pincode },
//               paymentMethod: "ONLINE",
//               ...verifyRes.data,
//             },
//           });
//         },
//         prefill: { name: userName, contact: userPhone },
//         theme: { color: "#111827" },
//       };

//       new window.Razorpay(options).open();
//     } catch (error) {
//       console.error("Online payment error:", error);
//       notifyError("Online payment failed. Please try again.");
//     }
//   };

//   // ================= PLACE ORDER =================
//   const placeOrder = async () => {
//     if (!addressLine || !city || !state || !pincode) {
//       notifyWarning("Please fill in the complete address details");
//       return;
//     }

//     try {
//       const addressRes = await api.post("/address/add", {
//         name: userName,
//         phoneNo: userPhone,
//         addressLine,
//         city,
//         state,
//         pincode,
//       });

//       const addressId = addressRes.data._id;

//       if (paymentMethod === "COD") {
//         await api.post("/checkout/buy-now", {
//           productId: product._id,
//           addressId,
//           paymentMethod: "COD",
//         });

//         notifySuccess("Order placed successfully!");

//         navigate("/order-success", {
//           state: {
//             product,
//             address: { addressLine, city, state, pincode },
//             paymentMethod: "COD",
//           },
//         });
//       } else {
//         startOnlinePayment(addressId);
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);
//       notifyError("Failed to place order. Please try again.");
//     }
//   };

//   if (loading) return <p className="text-center mt-20">Loading checkout...</p>;
//   if (!product) return <p className="text-center mt-20">Product not found</p>;

//   return (
//     <div className="min-h-screen bg-[#fafafa]">
//       {/* ===== TOP BAR ===== */}
//       <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 px-4 py-3 flex items-center gap-3">
//         <AiOutlineArrowLeft
//           size={22}
//           className="cursor-pointer"
//           onClick={() => navigate(-1)}
//         />
//         <h2 className="font-semibold text-lg">Checkout</h2>
//       </div>

//       <div className="h-16" />

//       {/* ===== CONTENT ===== */}
//       <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        
//         {/* ===== LEFT SECTION ===== */}
//         <div className="md:col-span-2 space-y-6">

//           {/* PRODUCT SUMMARY */}
//           <div className="bg-white rounded-2xl shadow p-5 flex gap-5">
//             <img
//               src={product.images?.[0]?.url}
//               alt={product.name}
//               className="w-28 h-28 rounded-xl object-cover"
//             />
//             <div className="flex-1">
//               <h3 className="font-semibold text-lg">{product.name}</h3>
//               <p className="text-sm text-gray-500 mt-1">Quantity: 1</p>
//               <p className="text-xl font-bold mt-3">₹{product.finalPrice}</p>
//             </div>
//           </div>

//           {/* ADDRESS */}
//           <div className="bg-white rounded-2xl shadow p-6 space-y-4">
//             <h3 className="font-semibold text-lg">Delivery Address</h3>
//             <input className="input" placeholder="Address Line" value={addressLine} onChange={e => setAddressLine(e.target.value)} />
//             <div className="grid grid-cols-2 gap-4">
//               <input className="input" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
//               <input className="input" placeholder="State" value={state} onChange={e => setState(e.target.value)} />
//             </div>
//             <input className="input" placeholder="Pincode" value={pincode} onChange={e => setPincode(e.target.value)} />
//           </div>

//           {/* PAYMENT */}
//           <div className="bg-white rounded-2xl shadow p-6 space-y-4">
//             <h3 className="font-semibold text-lg">Payment Method</h3>
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input type="radio" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} />
//               <span>Cash on Delivery</span>
//             </label>
//             <label className="flex items-center gap-2 cursor-pointer">
//               <input type="radio" checked={paymentMethod === "ONLINE"} onChange={() => setPaymentMethod("ONLINE")} />
//               <span>Online Payment</span>
//             </label>
//           </div>
//         </div>

//         {/* ===== RIGHT SUMMARY ===== */}
//         <div className="bg-white rounded-2xl shadow p-6 h-fit">
//           <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
//           <div className="flex justify-between mb-2">
//             <span>Product Price</span>
//             <span>₹{product.finalPrice}</span>
//           </div>
//           <div className="flex justify-between mb-4">
//             <span>Delivery</span>
//             <span className="text-green-600">FREE</span>
//           </div>
//           <div className="border-t pt-4 flex justify-between font-bold text-lg">
//             <span>Total</span>
//             <span>₹{product.finalPrice}</span>
//           </div>

//           <button
//             onClick={placeOrder}
//             className="w-full mt-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>

//       {/* INPUT STYLE */}
//       <style>
//         {`
//           .input {
//             width: 100%;
//             border: 1px solid #e5e7eb;
//             padding: 12px;
//             border-radius: 12px;
//             outline: none;
//           }
//           .input:focus {
//             border-color: #111827;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Checkout;


import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { notifyError, notifySuccess, notifyWarning } from "../../utils/notify.js";

const Checkout = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const productId = params.get("productId");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= ADDRESS =================
  const [address, setAddress] = useState({
    name: "",
    phoneNo: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ================= PAYMENT =================
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // ================= USER =================
  const [user, setUser] = useState(null);

  // ================= FETCH PRODUCT & USER & ADDRESS =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/products/${productId}`);
        setProduct(res.data);

        // User data
        const userRes = await api.get("/profile");
        setUser(userRes.data.user);

        // Address
        const addressRes = await api.get("/profile/address");
        if (addressRes.data.address) {
          setAddress(addressRes.data.address);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        notifyError("Failed to load details");
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchData();
  }, [productId]);

  // ================= ONLINE PAYMENT =================
  const startOnlinePayment = async (addressId) => {
    try {
      const res = await api.post("/checkout/online-payment", {
        productId: product._id,
        amount: product.finalPrice,
        addressId,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: res.data.amount,
        currency: "INR",
        name: "My Shop",
        description: product.name,
        order_id: res.data.orderId,
        handler: async (response) => {
          const verifyRes = await api.post("/checkout/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            productId: product._id,
            addressId,
          });

          navigate("/order-success", {
            state: {
              product,
              address,
              paymentMethod: "ONLINE",
              ...verifyRes.data,
            },
          });
        },
        prefill: { name: user?.name, contact: user?.phone },
        theme: { color: "#111827" },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      console.error("Online payment error:", error);
      notifyError("Online payment failed. Please try again.");
    }
  };

  // ================= PLACE ORDER =================
  const placeOrder = async () => {
    const { addressLine, city, state, pincode, phoneNo } = address;

    if (!addressLine || !city || !state || !pincode || !phoneNo) {
      notifyWarning("Please fill in the complete address details");
      return;
    }

    try {
      // Update address in backend
      const addressRes = await api.put("/profile/address", { ...address });

      const addressId = addressRes.data.address._id;

      if (paymentMethod === "COD") {
        await api.post("/checkout/buy-now", {
          productId: product._id,
          addressId,
          paymentMethod: "COD",
        });

        notifySuccess("Order placed successfully!");

        navigate("/order-success", {
          state: {
            product,
            address: addressRes.data.address,
            paymentMethod: "COD",
          },
        });
      } else {
        startOnlinePayment(addressId);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      notifyError("Failed to place order. Please try again.");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading checkout...</p>;
  if (!product) return <p className="text-center mt-20">Product not found</p>;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* ===== TOP BAR ===== */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b z-50 px-4 py-3 flex items-center gap-3">
        <AiOutlineArrowLeft
          size={22}
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h2 className="font-semibold text-lg">Checkout</h2>
      </div>

      <div className="h-16" />

      {/* ===== CONTENT ===== */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        
        {/* ===== LEFT SECTION ===== */}
        <div className="md:col-span-2 space-y-6">

          {/* PRODUCT SUMMARY */}
          <div className="bg-white rounded-2xl shadow p-5 flex gap-5">
            <img
              src={product.images?.[0]?.url}
              alt={product.name}
              className="w-28 h-28 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Quantity: 1</p>
              <p className="text-xl font-bold mt-3">₹{product.finalPrice}</p>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <h3 className="font-semibold text-lg">Delivery Address</h3>

            <input
              className="input"
              placeholder="Name"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
            />

            <input
              className="input"
              placeholder="Phone"
              value={address.phoneNo}
              onChange={(e) => setAddress({ ...address, phoneNo: e.target.value })}
            />

            <input
              className="input"
              placeholder="Address Line"
              value={address.addressLine}
              onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                className="input"
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />
              <input
                className="input"
                placeholder="State"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
              />
            </div>

            <input
              className="input"
              placeholder="Pincode"
              value={address.pincode}
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
            />
          </div>

          {/* PAYMENT */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <h3 className="font-semibold text-lg">Payment Method</h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              <span>Cash on Delivery</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={paymentMethod === "ONLINE"}
                onChange={() => setPaymentMethod("ONLINE")}
              />
              <span>Online Payment</span>
            </label>
          </div>
        </div>

        {/* ===== RIGHT SUMMARY ===== */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Product Price</span>
            <span>₹{product.finalPrice}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Delivery</span>
            <span className="text-green-600">FREE</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{product.finalPrice}</span>
          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition"
          >
            Place Order
          </button>
        </div>
      </div>

      {/* INPUT STYLE */}
      <style>
        {`
          .input {
            width: 100%;
            border: 1px solid #e5e7eb;
            padding: 12px;
            border-radius: 12px;
            outline: none;
          }
          .input:focus {
            border-color: #111827;
          }
        `}
      </style>
    </div>
  );
};

export default Checkout;

