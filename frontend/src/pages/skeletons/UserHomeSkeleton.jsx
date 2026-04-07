import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserHomeSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-6">

      {/* 🔥 Navbar */}
      <Skeleton height={50} className="w-full rounded-lg" />

      {/* 🔥 Slider */}
      <Skeleton 
        height={180} 
        className="w-full rounded-lg sm:h-[220px] md:h-[260px] lg:h-[300px]" 
      />

      {/* 🔥 Categories (4 per row responsive) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton 
            key={i} 
            height={80} 
            className="w-full rounded-lg sm:h-[90px] md:h-[100px]" 
          />
        ))}
      </div>

      {/* 🔥 Banner */}
      <Skeleton 
        height={120} 
        className="w-full rounded-lg sm:h-[140px] md:h-[160px] lg:h-[180px]" 
      />

      {/* 🔥 Product Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="space-y-2">
            
            {/* Image */}
            <Skeleton 
              height={140} 
              className="w-full rounded-lg sm:h-[160px] md:h-[180px] lg:h-[200px]" 
            />

            {/* Text lines */}
            <Skeleton height={12} width="80%" />
            <Skeleton height={12} width="60%" />
            <Skeleton height={12} width="40%" />
          </div>
        ))}
      </div>

    </div>
  );
};

export default UserHomeSkeleton;