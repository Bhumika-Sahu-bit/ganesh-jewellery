import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-6">

      {/* 🔥 Navbar */}
      <Skeleton height={50} className="w-full rounded-lg" />

      {/* 🔥 Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 🔥 Left: Image Section */}
        <div>
          {/* Main Image */}
          <Skeleton 
            height={280} 
            className="w-full rounded-xl sm:h-[320px] md:h-[380px] lg:h-[420px]" 
          />

          {/* Thumbnail Images */}
          <div className="flex gap-2 mt-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton 
                key={i} 
                width={60} 
                height={60} 
                className="rounded-md sm:w-[70px] sm:h-[70px]" 
              />
            ))}
          </div>
        </div>

        {/* 🔥 Right: Content Section */}
        <div className="space-y-4">

          {/* Title */}
          <Skeleton height={24} width="80%" />

          {/* Subtitle / Brand */}
          <Skeleton height={18} width="60%" />

          {/* Rating */}
          <Skeleton height={18} width="40%" />

          {/* Price */}
          <Skeleton height={30} width="30%" />

          {/* Buttons */}
          <Skeleton height={45} className="w-full rounded-md" />
          <Skeleton height={45} className="w-full rounded-md" />

          {/* Description */}
          <Skeleton count={4} />

        </div>
      </div>

    </div>
  );
};

export default ProductDetailsSkeleton;