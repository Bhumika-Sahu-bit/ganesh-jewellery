import { useState } from "react";
import {
  FaUndoAlt,
  FaCreditCard,
  FaShieldAlt,
  FaChevronRight,
} from "react-icons/fa";

const ProductInfoBadges = () => {
  const [activePopup, setActivePopup] = useState(null);

  return (
    <>
      {/* ================= INFO STRIP ================= */}
      <div className="border-y py-4 mb-6">
        <div className="grid grid-cols-3 gap-3">

          {/* No Returns */}
          <button
            onClick={() => setActivePopup("noReturn")}
            className="flex items-start gap-3 text-left"
          >
            <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
              <FaUndoAlt className="text-blue-600 text-lg" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium leading-tight">
                No returns
              </p>
            </div>

            <FaChevronRight className="text-gray-400 text-sm mt-1 shrink-0" />
          </button>

          {/* Payment */}
          <button
            onClick={() => setActivePopup("payment")}
            className="flex items-start gap-3 text-left"
          >
            <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
              <FaCreditCard className="text-blue-600 text-lg" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium leading-tight">
                Payment allowed
              </p>
            </div>

            <FaChevronRight className="text-gray-400 text-sm mt-1 shrink-0" />
          </button>

          {/* Quality */}
          <button
            onClick={() => setActivePopup("quality")}
            className="flex items-start gap-3 text-left"
          >
            <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
              <FaShieldAlt className="text-blue-600 text-lg" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium leading-tight">
                Quality assured
              </p>
            </div>

            <FaChevronRight className="text-gray-400 text-sm mt-1 shrink-0" />
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
                <h3 className="text-lg font-semibold mb-2">
                  No Returns Policy
                </h3>
                <p className="text-sm text-gray-600">
                  This product cannot be returned or exchanged after delivery.
                  Please review product details before ordering.
                </p>
              </>
            )}

            {activePopup === "payment" && (
              <>
                <h3 className="text-lg font-semibold mb-2">
                  Payment Allowed
                </h3>
                <p className="text-sm text-gray-600">
                  Secure online payments via UPI, Debit Card, Credit Card and
                  Net Banking are supported.
                </p>
              </>
            )}

            {activePopup === "quality" && (
              <>
                <h3 className="text-lg font-semibold mb-2">
                  Quality Assurance
                </h3>
                <p className="text-sm text-gray-600">
                  Products are quality-checked to ensure reliability and
                  customer satisfaction.
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
