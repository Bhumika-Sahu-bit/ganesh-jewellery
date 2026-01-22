import React from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdVerified } from "react-icons/md";

const TrustSection = () => {
  return (
    <div className="w-full bg-gray-100 py-10 my-10 mt-10 rounded-lg shadow-md">
      <div className="flex justify-between items-center px-8 md:px-28">

        {/* Made in India */}
        <div className="flex flex-col items-center gap-1 text-gray-700">
          <MdVerified className="text-4xl md:text-5xl" />
          <p className="text-sm md:text-base font-medium text-center">
            Made In India
          </p>
        </div>

        {/* Timely Delivery */}
        <div className="flex flex-col items-center gap-1 text-gray-700">
          <FaTruck className="text-4xl md:text-5xl" />
          <p className="text-sm md:text-base font-medium text-center">
            Timely Delivery
          </p>
        </div>

        {/* Secure Payments */}
        <div className="flex flex-col items-center gap-1 text-gray-700">
          <RiSecurePaymentLine className="text-4xl md:text-5xl" />
          <p className="text-sm md:text-base font-medium text-center">
            Secure Payments
          </p>
        </div>

        {/* Assured Quality */}
        <div className="flex flex-col items-center gap-1 text-gray-700">
          <BsPatchCheckFill className="text-4xl md:text-5xl" />
          <p className="text-sm md:text-base font-medium text-center">
            Assured Quality
          </p>
        </div>

      </div>
    </div>
  );
};

export default TrustSection;