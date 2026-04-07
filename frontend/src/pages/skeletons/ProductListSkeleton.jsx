import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductListSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-6">

      {/* 🔥 Navbar */}
      <Skeleton height={50} className="w-full rounded-lg" />

      {/* 🔥 Title + Filter */}
      <div className="flex justify-between items-center">
        <Skeleton width={150} height={20} />
        <Skeleton width={100} height={35} className="rounded-md" />
      </div>

      {/* 🔥 Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="space-y-2">
            
            {/* Image */}
            <Skeleton 
              height={150} 
              className="w-full rounded-lg sm:h-[170px] md:h-[190px] lg:h-[210px]" 
            />

            {/* Title */}
            <Skeleton height={12} width="80%" />

            {/* Price */}
            <Skeleton height={12} width="50%" />

            {/* Rating */}
            <Skeleton height={12} width="30%" />
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductListSkeleton;