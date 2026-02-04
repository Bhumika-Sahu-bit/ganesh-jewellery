import React from "react";
import Footer from "../../components/user/Footer";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";


const TermsConditions = () => {
    const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen px-6 md:px-20 py-10 text-gray-700">
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow px-4 py-4 flex items-center gap-3">
  <AiOutlineArrowLeft
    size={22}
    className="cursor-pointer"
    onClick={() => navigate(-1)}
  />
  <span className="font-semibold text-lg">Terms & Conditions</span>
</div>

<div className="h-16" />

      <h1 className="text-3xl font-semibold mb-6">Terms & Conditions</h1>

      <p className="mb-4">
        By using GaneshArt Jewellery website, you agree to the following terms and conditions.
      </p>

      <h2 className="font-semibold mt-6 mb-2">Products</h2>
      <p>
        We manufacture and sell imitation jewellery. Product colors/designs may
        slightly vary due to photography or screen differences.
      </p>

      <h2 className="font-semibold mt-6 mb-2">Pricing</h2>
      <p>
        All prices are listed in INR. We reserve the right to change prices without notice.
      </p>

      <h2 className="font-semibold mt-6 mb-2">Orders</h2>
      <p>
        Orders will be confirmed only after successful payment. We reserve the
        right to cancel any suspicious or fraudulent order.
      </p>

      <h2 className="font-semibold mt-6 mb-2">Payments</h2>
      <p>
        Payments are processed through Razorpay and other secure payment methods
        such as UPI, cards, net banking, and wallets.
      </p>

      <h2 className="font-semibold mt-6 mb-2">Intellectual Property</h2>
      <p>
        All images, logos, and content belong to GaneshArt Jewellery and may not
        be copied or reused without permission.
      </p>

      <h2 className="font-semibold mt-6 mb-2">Limitation of Liability</h2>
      <p>
        We are not responsible for delays caused by courier services, natural
        disasters, or other uncontrollable situations.
      </p>

      <h2 className="font-semibold mt-6 mb-2">Contact</h2>
      <p>Email: support@ganeshartjewellery.com</p>

      <Footer />
    </div>
  );
};

export default TermsConditions;
