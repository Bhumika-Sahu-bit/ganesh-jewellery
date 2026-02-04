import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/GAT-logo.png";
import neck4 from "../assets/neck4.webp";
import neck2 from "../assets/neck2.webp";
import neck3 from "../assets/neck3.webp";
import Footer from "../components/user/Footer";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/user", { replace: true });
      }
    }
  }, [navigate]);

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">

      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-yellow-100 via-pink-100 to-transparent opacity-60 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-cyan-100 via-purple-100 to-transparent opacity-50 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

        {/* Navbar */}
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          
          {/* Logo */}
          <img
            src={logo}
            alt="Ganesh Art Jewellery"
            className="h-14 sm:h-16 md:h-20 object-cover"
          />

          {/* Auth Buttons */}
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 sm:px-7 py-2 sm:py-2.5 rounded-full border border-gray-300 text-gray-800 text-sm font-medium hover:bg-gray-100 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 sm:px-7 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 text-white text-sm font-semibold shadow-md hover:shadow-lg transition"
            >
              Register
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-4 sm:space-y-8 text-center md:text-left"> 
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              Jewellery that<br />
              Defines <span className="text-amber-500">Elegance</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
              Experience timeless luxury with finely handcrafted jewellery,
              designed to celebrate beauty, tradition, and modern sophistication.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
              <span className="px-4 sm:px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-gray-700 text-xs sm:text-sm">
                💎 BIS Hallmarked
              </span>
              <span className="px-4 sm:px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-gray-700 text-xs sm:text-sm">
                ✨ Handcrafted Finish
              </span>
              <span className="px-4 sm:px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-gray-700 text-xs sm:text-sm">
                🎁 Premium Packaging
              </span>
            </div>
          </div>

          {/* Right Images */}
          <div className="relative grid grid-cols-2 gap-4 sm:gap-6">
            
            <div className="col-span-1 rounded-3xl overflow-hidden shadow-xl bg-white/60 backdrop-blur-md">
              <img
                src={neck4}
                alt="Luxury Jewellery"
                className="h-80 sm:h-80 md:h-80 w-full object-cover"
              />
            </div>

            <div className="col-span-1 rounded-3xl overflow-hidden shadow-xl bg-white/60 backdrop-blur-md mt-6 sm:mt-10">
              <img
                src={neck2}
                alt="Gold Jewellery"
                className="h-56 sm:h-64 md:h-72 w-full object-cover"
              />
            </div>

            <div className="col-span-2 rounded-3xl overflow-hidden shadow-2xl bg-white/60 backdrop-blur-md">
              <img
                src={neck3}
                alt="Premium Collection"
                className="h-56 sm:h-64 md:h-72 w-full object-cover"
              />
            </div>

          </div>
        </section>

        {/* Footer */}
        {/* <footer className="mt-20 sm:mt-28 py-8 sm:py-10 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-xs sm:text-sm tracking-wide">
            © 2026 Ganesh Art Jewellery — Crafted with Trust & Elegance
          </p>
        </footer> */}
        <Footer />
      </div>

    </div>
  );
};

export default Home;

