import {useState} from 'react'
import { FaUndoAlt, FaCreditCard, FaCheckCircle } from "react-icons/fa";

const ProductInfoBadges = () => {
    const [activePopup, setActivePopup] = useState(null)

    const closePopup = () => setActivePopup(null);
  return (
    <>
    {/* ================= INFO BADGES ================= */}
    <div className="flex flex-wrap justify-between gap-4 mb-6">
        <button
            onClick={() => setActivePopup("noReturn")}
            className="flex-1 min-w-37.5 flex items-center gap-2 border rounded-lg p-3 hover:shadow transition"
            > 
            <FaUndoAlt className="text-red-500" />
          <span className="text-sm font-medium">No Returns</span>
        </button>

        <button
          onClick={() => setActivePopup("payment")}
          className="flex-1 min-w-37.5 flex items-center gap-2 border rounded-lg p-3 hover:shadow transition"
        >
          <FaCreditCard className="text-green-600" />
          <span className="text-sm font-medium">Payment Allowed</span>
        </button>

        <button
          onClick={() => setActivePopup("quality")}
          className="flex-1 min-w-37.5 flex items-center gap-2 border rounded-lg p-3 hover:shadow transition"
        >
          <FaCheckCircle className="text-blue-600" />
          <span className="text-sm font-medium">Quality Assured</span>
        </button>

    </div>

    {/* ================= POPUP MODAL ================= */}
    { activePopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 relative animate-fadeIn">
                <button
              onClick={closePopup}
              className="absolute top-3 right-3 text-gray-400 hover:text-black"
            >
              ✕
            </button>

            {activePopup === "noReturn" && (
                <>
                <h3 className="text-lg font-semibold mb-2">No Returns Policy</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  This product is not eligible for return or exchange once
                  delivered. Please read all product details carefully before
                  placing your order.
                </p>
              </>
            )}

            {activePopup === "payment" && (
              <>
                <h3 className="text-lg font-semibold mb-2">Payment Options</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We support both <b>Cash on Delivery (COD)</b> and
                  <b> secure online payments</b> including UPI, Debit Card,
                  Credit Card, and Net Banking.
                </p>
              </>
            )}

            {activePopup === "quality" && (
              <>
                <h3 className="text-lg font-semibold mb-2">Quality Assurance</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All our products go through strict quality checks to ensure
                  durability, performance, and customer satisfaction.
                </p>
              </>
            )}
            </div>
        </div>
    )}
    </>
  )
}

export default ProductInfoBadges