// import { useEffect, useState } from "react";
// import api from "../../api/axios.js";

// const UserSlider = () => {
//   const [images, setImages] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Fetch slider images from backend
//   const fetchSliderImages = async () => {
//     try {
//       const res = await api.get("/admin/slider");
//       if (res.data && Array.isArray(res.data.images)) {
//         setImages(res.data.images);
//       } else {
//         setImages([]);
//       }
//     } catch (error) {
//       console.error("Failed to load slider images", error);
//       setImages([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSliderImages();
//     const refreshInterval = setInterval(fetchSliderImages, 15000); // refresh every 15s
//     return () => clearInterval(refreshInterval);
//   }, []);

//   // Auto slide every 5s
//   useEffect(() => {
//     if (images.length === 0) return;
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [images]);

//   if (loading) return <p className="text-center my-6 text-gray-600 text-lg">Loading slider...</p>;
//   if (images.length === 0) return <p className="text-center my-6 text-gray-600 text-lg">No slider images available</p>;

//   return (
//     <div className="relative w-full px-4 md:px-8 lg:px-8 mt-20">
//       <div className="relative overflow-hidden rounded-2xl shadow-xl min-h-[250px] sm:min-h-[350px] md:min-h-[450px] lg:min-h-[450px]">
        
//         {/* Slider Images */}
//         {images.map((img, index) => (
//           <img
//             key={img._id}
//             src={img.url}
//             alt={`slider-${index}`}
//             className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ease-in-out
//               ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}
//             `}
//           />
//         ))}

//         {/* Gradient Overlay for better arrow visibility */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-5 pointer-events-none rounded-2xl"></div>

//         {/* Left Arrow */}
//         <button
//           onClick={() => setCurrent(current === 0 ? images.length - 1 : current - 1)}
//           className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 md:p-3 rounded-full hover:bg-black/70 transition z-20 shadow-lg"
//         >
//           <span className="text-2xl md:text-3xl font-bold select-none">‹</span>
//         </button>

//         {/* Right Arrow */}
//         <button
//           onClick={() => setCurrent(current === images.length - 1 ? 0 : current + 1)}
//           className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 md:p-3 rounded-full hover:bg-black/70 transition z-20 shadow-lg"
//         >
//           <span className="text-2xl md:text-3xl font-bold select-none">›</span>
//         </button>

//         {/* Dots */}
//         <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
//           {images.map((_, index) => (
//             <span
//               key={index}
//               onClick={() => setCurrent(index)}
//               className={`w-3 md:w-4 h-3 md:h-4 rounded-full cursor-pointer transition-all
//                 ${current === index ? "bg-white scale-110 md:scale-125" : "bg-white/50 hover:bg-white/80"}
//               `}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserSlider;

import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const UserSlider = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
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

  if (loading)
    return (
      <p className="text-center my-10 text-gray-500 text-lg animate-pulse">
        Loading slider...
      </p>
    );

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
