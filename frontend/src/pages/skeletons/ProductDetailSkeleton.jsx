import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetailsSkeleton = () => {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* 🔥 Left Image Section */}
      <div>
        <Skeleton height={300} className="rounded-xl md:h-[400px]" />
        <div className="flex gap-2 mt-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} width={60} height={60} />
          ))}
        </div>
      </div>

      {/* 🔥 Right Content Section */}
      <div className="space-y-4">
        <Skeleton height={25} width="80%" />
        <Skeleton height={20} width="60%" />
        <Skeleton height={20} width="40%" />

        <Skeleton height={30} width="30%" />

        <Skeleton height={40} width="100%" />
        <Skeleton height={40} width="100%" />

        <Skeleton count={4} />
      </div>

    </div>
  );
};

export default ProductDetailsSkeleton;