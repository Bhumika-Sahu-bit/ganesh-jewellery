import { useState } from "react";
import {
  FaUndoAlt,
  FaShieldAlt,
  FaCreditCard,
  FaChevronRight,
} from "react-icons/fa";

const ProductInfoBadges = () => {
  const [activePopup, setActivePopup] = useState(null);

  return (
    <>
      {/* ================= INFO STRIP ================= */}
      <div className="mb-6">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap border-y py-4">

          {/* No Returns */}
          <button
            onClick={() => setActivePopup("noReturn")}
            className="flex items-center gap-3 min-w-max"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <FaUndoAlt className="text-blue-600 text-lg" />
            </div>

            <div className="text-left">
              <p className="text-sm font-medium">No returns</p>
            </div>

            <FaChevronRight className="text-gray-400 text-sm" />
          </button>

          {/* Payment */}
          <button
            onClick={() => setActivePopup("payment")}
            className="flex items-center gap-3 min-w-max"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <FaCreditCard className="text-blue-600 text-lg" />
            </div>

            <div className="text-left">
              <p className="text-sm font-medium">Payment allowed</p>
            </div>

            <FaChevronRight className="text-gray-400 text-sm" />
          </button>

          {/* Quality */}
          <button
            onClick={() => setActivePopup("quality")}
            className="flex items-center gap-3 min-w-max"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <FaShieldAlt className="text-blue-600 text-lg" />
            </div>

            <div className="text-left">
              <p className="text-sm font-medium">Quality assured</p>
            </div>

            <FaChevronRight className="text-gray-400 text-sm" />
          </button>

        </div>
      </div>

      {/* ================= POPUP ================= */}
      {activePopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">

            <button
              onClick={() => setActivePopup(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            {activePopup === "noReturn" && (
              <>
                <h3 className="text-lg font-semibold mb-2">No Returns Policy</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  This product is not eligible for return or exchange once
                  delivered. Please check product details carefully before
                  ordering.
                </p>
              </>
            )}

            {activePopup === "payment" && (
              <>
                <h3 className="text-lg font-semibold mb-2">Payment Allowed</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We support <b>secure online payments</b> via UPI, Debit Card,
                  Credit Card & Net Banking.
                  <br />
                  <span className="text-red-500 font-medium">
                    Cash on Delivery not available.
                  </span>
                </p>
              </>
            )}

            {activePopup === "quality" && (
              <>
                <h3 className="text-lg font-semibold mb-2">Quality Assurance</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Every product goes through strict quality checks to ensure
                  durability and customer satisfaction.
                </p>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default ProductInfoBadges;
