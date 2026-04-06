import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserHomeSkeleton = () => {
  return (
    <div className="p-4 space-y-6">

      {/* 🔥 Navbar */}
      <div className="flex justify-between items-center">
        <Skeleton width={120} height={30} />
        <div className="flex gap-4">
          <Skeleton width={30} height={30} circle />
          <Skeleton width={30} height={30} circle />
          <Skeleton width={30} height={30} circle />
        </div>
      </div>

      {/* 🔥 Slider / Banner */}
      <Skeleton height={180} className="w-full rounded-xl sm:h-[220px] md:h-[280px]" />

      {/* 🔥 Categories */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton circle width={50} height={50} />
            <Skeleton width={40} height={10} />
          </div>
        ))}
      </div>

      {/* 🔥 Rectangle Banner */}
      <Skeleton height={120} className="w-full rounded-xl sm:h-[150px] md:h-[180px]" />

      {/* 🔥 Product Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton height={150} className="rounded-lg sm:h-[180px] md:h-[200px]" />
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