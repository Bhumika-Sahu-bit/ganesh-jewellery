import React from "react";
import Footer from "../../components/user/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen px-6 md:px-20 py-10 text-gray-700">
      <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        GaneshArt Jewellery values your privacy. This Privacy Policy explains how
        we collect, use, and protect your personal information when you use our website.
      </p>

      <h2 className="font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Name, phone number, email address</li>
        <li>Shipping and billing address</li>
        <li>Payment details (processed securely via Razorpay)</li>
        <li>Order history and browsing data</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>To process orders and payments</li>
        <li>To deliver products</li>
        <li>To provide customer support</li>
        <li>To improve our services</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-2">Payment Security</h2>
      <p className="mb-4">
        All payments are securely processed through Razorpay. We do not store your
        card or bank details on our servers.
      </p>

      <h2 className="font-semibold mt-6 mb-2">Data Protection</h2>
      <p className="mb-4">
        We take appropriate security measures to protect your information from
        unauthorized access or misuse.
      </p>

      <h2 className="font-semibold mt-6 mb-2">Contact Us</h2>
      <p>
        GaneshArt Jewellery <br/>
        Guna, Madhya Pradesh – 473001 <br/>
        Email: support@ganeshartjewellery.com <br/>
        Phone: +91 XXXXX XXXXX
      </p>

      <p className="mt-8 text-sm text-gray-500">
        Last Updated: {new Date().getFullYear()}
      </p>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
