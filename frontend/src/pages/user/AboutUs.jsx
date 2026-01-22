import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiGooglepay, SiPaytm, SiPhonepe } from "react-icons/si";
import { FaUniversity } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaShareAlt } from "react-icons/fa";
import logoImg from "../../assets/GAT-logo.png";
import Footer from "../../components/user/Footer.jsx";
import BottomFooter from "../../components/user/BottomFooter.jsx";


const AboutUs = () => {
  const navigate = useNavigate();
  const [activeOption, setActiveOption] = useState("Profile");

  const options = ["Profile", "Payment Options", "Contact Us"];

  return (
    <>
      

    <div className="bg-white min-h-screen">
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow px-4 py-4 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <AiOutlineArrowLeft size={24} />
          <span className="font-semibold text-lg">About Us</span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <FaShareAlt size={20} />
          <span className="font-medium">Share</span>
        </div>
      </div>

      {/* NAVBAR SPACE */}
      <div className="h-16" />

      {/* LOGO + NAME */}
      <div className="flex items-center gap-4 px-4 md:px-16 mb-4">
        <img src={logoImg} alt="Logo" className="w-20 h-20 object-contain" />
        <h2 className="text-xl md:text-2xl font-semibold">
          GaneshArt Jewellery
        </h2>
      </div>

      {/* TABS */}
      <div className="sticky top-16 z-40 bg-white border-b">
        <div className="flex justify-around px-4 md:px-16">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => setActiveOption(opt)}
              className="cursor-pointer py-3"
            >
              <span
                className={`text-lg ${
                  activeOption === opt
                    ? "text-red-600 font-medium"
                    : "text-gray-800"
                }`}
              >
                {opt}
              </span>

              {activeOption === opt && (
                <div className="h-[3px] bg-red-600 mt-1 w-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 md:px-16 mt-4">
        {/* PROFILE */}
        {activeOption === "Profile" && (
          <>
            <h3 className="text-lg font-semibold mb-1">GaneshArt Jewellery</h3>

            <p className="text-gray-800 mb-6">
              GaneshArt Jewellery is a brand of Leo Clothing company. We are
              manufacturing imitation jewellery since 2014. We cater clients
              within India and across the globe. Quality is our priority and we
              offer B2B factory price supply.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border border-gray-300 text-center">
                <tbody>
                  {[
                    ["Business Type", "Manufacturer & Exporter"],
                    ["Year of Establishment", "2014"],
                    ["Registration Type", "Proprietor"],
                    ["Banker", "Bank of India"],
                    ["GST No.", "27ANYPJ1582D1ZO"],
                    ["Payment Mode", "Bank / UPI Transfer"],
                  ].map(([a, b], i) => (
                    <tr key={i}>
                      <td className="border p-3">{a}</td>
                      <td className="border p-3">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold mb-2">Product Line</h3>

            <div className="flex flex-wrap gap-3 mb-10">
              {[
                "Earring",
                "Ring",
                "Bangles",
                "Maang Tikka",
                "Bracelets",
                "Nose Pins",
                "Mangalsutras",
                "Necklace Set",
                "Pendant Set",
                "Anklets",
                "Armlets",
                "Hathphool",
                "Kamarpatta",
              ].map((item) => (
                <span
                  key={item}
                  className="bg-gray-200 px-4 py-1 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </>
        )}

        {/* PAYMENT OPTIONS */}
        {activeOption === "Payment Options" && (
          <div className="mt-4">
            {/* UPI OPTION */}
            <h3 className="text-lg font-semibold mb-1">UPI Option</h3>
            <p className="text-gray-600 text-sm mb-3">
              Please note the below UPI options to pay using UPI transfer.
            </p>

            <div className="border rounded-lg overflow-hidden mb-6">
              {[
                { name: "Bhim UPI", value: "leoclothing2014@oksbi" },
                { name: "Google Pay", value: "9664260936" },
                { name: "Paytm", value: "9664260936" },
                { name: "Phone Pe", value: "9664260936" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 border-b last:border-b-0"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                    {item.name === "Bhim UPI" && <FaUniversity size={22} />}
                    {item.name === "Google Pay" && <SiGooglepay size={22} />}
                    {item.name === "Paytm" && <SiPaytm size={22} />}
                    {item.name === "Phone Pe" && <SiPhonepe size={22} />}
                  </div>

                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WALLET OPTION */}
            <h3 className="text-lg font-semibold mb-1">Wallet Option</h3>
            <p className="text-gray-600 text-sm mb-3">
              Please note the below wallet options to pay using wallet.
            </p>

            <div className="border rounded-lg p-4 mb-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                <SiPaytm size={22} />
              </div>

              <div>
                <p className="font-medium">Paytm</p>
                <p className="text-gray-600 text-sm">9664260936</p>
              </div>
            </div>

            {/* BANK DETAILS */}
            <h3 className="text-lg font-semibold mb-1">Bank Details</h3>
            <p className="text-gray-600 text-sm mb-3">
              Please note the below bank details to pay using cheque, net
              banking or cash deposit.
            </p>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                  <FaUniversity size={22} />
                </div>

                <p className="font-semibold">Bank Of India</p>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <p className="text-gray-600">AC Name</p>
                <p>Leo Clothing</p>

                <p className="text-gray-600">AC No.</p>
                <p>004020110000817</p>

                <p className="text-gray-600">Branch Name</p>
                <p>Santacruz</p>

                <p className="text-gray-600">IFSC Code</p>
                <p>BKID0000040</p>
              </div>
            </div>
          </div>
        )}

        {/* CONTACT US */}
        {activeOption === "Contact Us" && (
          <div className="mt-4">
            {/* ADDRESS */}
            <p className="text-gray-700 text-center mb-6 leading-relaxed">
              Heera Jewellers, Shop No. 45, 2nd Floor, Crystal Plaza Mall, Opp.
              Malad Station, Malad West, Mumbai - 400064, Maharashtra, India
            </p>

            {/* CONTACT CARDS */}
            <div className="border rounded-lg overflow-hidden">
              {/* WHATSAPP */}
              <div className="flex items-center gap-4 p-4 border-b">
                <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                  <FaWhatsapp size={22} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <p className="text-gray-600 text-sm">+91 9664260936</p>
                </div>
              </div>

              {/* CALL */}
              <div className="flex items-center gap-4 p-4 border-b">
                <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                  <FaPhoneAlt size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-gray-600 text-sm">+91 9664260936</p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                  <MdEmail size={22} className="text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-gray-600 text-sm">nivishkaa@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

        <div className="hidden md:block">
          <Footer />
        </div>

        <BottomFooter />
    </>
  );
};

export default AboutUs;
