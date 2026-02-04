import React from "react";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-10 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Ganesh Art Jewellery
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Discover handcrafted jewellery designed with elegance,
              tradition, and timeless beauty.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-black cursor-pointer transition">
                Necklace Sets
              </li>
              <li className="hover:text-black cursor-pointer transition">
                Earrings
              </li>
              <li className="hover:text-black cursor-pointer transition">
                Bangles
              </li>
              <li className="hover:text-black cursor-pointer transition">
                Bridal Jewellery
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">
              Help
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/terms" className="hover:text-black transition">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link to="/refund-policy" className="hover:text-black transition">
                  Refund Policy
                </Link>
              </li>

              <li>
                <Link to="/privacy-policy" className="hover:text-black transition">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link to="/aboutus" className="hover:text-black transition">
                  About Us
                </Link>
              </li>

              <li>
                <Link to="/aboutus" className="hover:text-black transition">
                  Contact us
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <div className="flex items-start gap-3 text-sm text-gray-600 mb-3">
              <FaMapMarkerAlt className="mt-1" />
              <p>
                Sarafa Bazar Koteshwar, Mandir Marg,  
                Guna, Madhya Pradesh – 473001
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <FaPhoneAlt />
              <p>+91 96855 78996</p>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Ganesh Art Jewellery. All rights reserved.
          </p>
          <p>
            Designed with ❤ for timeless elegance
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
