import React from "react";
import Footer from "../../components/user/Footer";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";


const RefundPolicy = () => {
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

      <h1 className="text-3xl font-semibold mb-6">
        Refund & Cancellation Policy
      </h1>

      <h2 className="font-semibold mt-6 mb-2">Order Cancellation</h2>
      <p>
        Orders can be cancelled within 24 hours of placing the order. After
        dispatch, cancellation is not possible.
      </p>

      <h2 className="font-semibold mt-6 mb-2">Refund Policy</h2>
      <p>
        Refunds are applicable only for damaged, defective, or wrong products.
        Customers must inform us within 48 hours of delivery with proof images.
      </p>

      <h2 className="font-semibold mt-6 mb-2">Refund Process</h2>
      <p>
        Once approved, refunds will be processed within 5-7 working days to the
        original payment method.
      </p>

      <h2 className="font-semibold mt-6 mb-2">Non-Refundable Items</h2>
      <ul className="list-disc ml-6">
        <li>Used products</li>
        <li>Customized jewellery</li>
        <li>Discounted items</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">Contact</h2>
      <p>Email: support@ganeshartjewellery.com</p>

      <Footer />
    </div>
  );
};

export default RefundPolicy;
