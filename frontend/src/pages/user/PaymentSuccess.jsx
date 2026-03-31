import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import { notifyError, notifySuccess } from "../../utils/notify";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const order_id = params.get("order_id");
        const productId = params.get("productId");
        const addressId = params.get("addressId");

        // ❌ safety check
        if (!order_id || !productId || !addressId) {
          notifyError("Payment data missing");
          navigate("/");
          return;
        }

        // 🔥 backend verify call
        const res = await api.post("/checkout/verify-payment", {
          order_id,
          productId,
          addressId,
        });

        console.log("✅ Verify Response:", res.data);

        notifySuccess("Payment Successful 🎉");

        // ✅ redirect with full data
        navigate("/order-success", {
          state: {
            orderId: res.data.orderId,
            product: res.data.product,
            address: res.data.address,
            totalAmount: res.data.totalAmount,
            paymentMethod: "ONLINE",
          },
        });

      } catch (error) {
        console.error("❌ Payment verify error:", error);
        notifyError("Payment verification failed");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [params, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {loading ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold">Verifying Payment...</h2>
          <p className="text-gray-500 mt-2">Please wait ⏳</p>
        </div>
      ) : (
        <p>Redirecting...</p>
      )}
    </div>
  );
};

export default PaymentSuccess;