
import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const UserSlider = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  // const [loading, setLoading] = useState(true);

  // Fetch slider images
  const fetchSliderImages = async () => {
    try {
      const res = await api.get("/admin/slider");
      if (res.data && Array.isArray(res.data.images)) {
        setImages(res.data.images);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error("Failed to load slider images", error);
      setImages([]);
    } finally {
        // setLoading(false);
        console.log("Slider images loaded:", images);
    }
  };

  useEffect(() => {
    fetchSliderImages();
    const refreshInterval = setInterval(fetchSliderImages, 15000);
    return () => clearInterval(refreshInterval);
  }, []);

  // Auto slide
  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  

  if (!images.length)
    return (
      <p className="text-center my-10 text-gray-500 text-lg">
        No slider images available
      </p>
    );

  return (
    <section className="w-full mt-20 px-3 sm:px-6 lg:px-10">
      <div className="relative group overflow-hidden rounded-3xl shadow-2xl
        min-h-[220px] sm:min-h-[320px] md:min-h-[420px] lg:min-h-[480px]">

        {/* Images */}
        {images.map((img, index) => (
          <img
            key={img._id}
            src={img.url}
            alt={`slider-${index}`}
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-all duration-1000 ease-in-out
              ${index === current
                ? "opacity-100 scale-100 z-10"
                : "opacity-0 scale-105 z-0"}
            `}
          />
        ))}

        {/* Luxury Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-black/40 z-10 pointer-events-none"></div>

        {/* LEFT ARROW */}
        <button
          onClick={() =>
            setCurrent(current === 0 ? images.length - 1 : current - 1)
          }
          className="
            absolute left-4 top-1/2 -translate-y-1/2 z-20
            hidden sm:flex
            items-center justify-center
            w-10 h-10 md:w-12 md:h-12
            rounded-full
            bg-white/80 backdrop-blur
            text-gray-800
            hover:bg-white hover:scale-110
            transition-all duration-300
            shadow-lg
            opacity-0 group-hover:opacity-100
          "
        >
          <FiChevronLeft className="text-2xl" />
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={() =>
            setCurrent(current === images.length - 1 ? 0 : current + 1)
          }
          className="
            absolute right-4 top-1/2 -translate-y-1/2 z-20
            hidden sm:flex
            items-center justify-center
            w-10 h-10 md:w-12 md:h-12
            rounded-full
            bg-white/80 backdrop-blur
            text-gray-800
            hover:bg-white hover:scale-110
            transition-all duration-300
            shadow-lg
            opacity-0 group-hover:opacity-100
          "
        >
          <FiChevronRight className="text-2xl" />
        </button>

        {/* DOTS */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`
                h-2.5 md:h-3 rounded-full transition-all duration-300
                ${current === index
                  ? "w-6 md:w-8 bg-white"
                  : "w-2.5 md:w-3 bg-white/50 hover:bg-white/80"}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserSlider;
