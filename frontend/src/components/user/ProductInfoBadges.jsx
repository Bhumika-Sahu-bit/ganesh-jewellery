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
        <div className="grid grid-cols-3 gap-2">

          {/* ================= ITEM ================= */}
          <button
            onClick={() => setActivePopup("noReturn")}
            className="flex flex-col items-center text-center gap-2
                       md:flex-row md:items-center md:text-left md:gap-3"
          >
            {/* Icon */}
            <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
              <FaUndoAlt className="text-blue-600 text-lg" />
            </div>

            {/* Text */}
            <p className="text-sm font-medium leading-snug md:whitespace-nowrap">
              No returns
            </p>

            {/* Arrow */}
            <FaChevronRight className="text-gray-400 text-sm shrink-0 hidden md:block" />
          </button>

          {/* ================= ITEM ================= */}
          <button
            onClick={() => setActivePopup("payment")}
            className="flex flex-col items-center text-center gap-2
                       md:flex-row md:items-center md:text-left md:gap-3"
          >
            <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
              <FaCreditCard className="text-blue-600 text-lg" />
            </div>

            <p className="text-sm font-medium leading-snug md:whitespace-nowrap">
              Payment allowed
            </p>

            <FaChevronRight className="text-gray-400 text-sm shrink-0 hidden md:block" />
          </button>

          {/* ================= ITEM ================= */}
          <button
            onClick={() => setActivePopup("quality")}
            className="flex flex-col items-center text-center gap-2
                       md:flex-row md:items-center md:text-left md:gap-3"
          >
            <div className="w-10 h-10 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
              <FaShieldAlt className="text-blue-600 text-lg" />
            </div>

            <p className="text-sm font-medium leading-snug md:whitespace-nowrap">
              Quality assured
            </p>

            <FaChevronRight className="text-gray-400 text-sm shrink-0 hidden md:block" />
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
                  All products go through strict quality checks.
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
