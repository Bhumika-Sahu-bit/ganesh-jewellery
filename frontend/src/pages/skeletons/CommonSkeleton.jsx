import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CommonSkeleton = () => {
  return (
    <div className="p-4 space-y-4">

      {/* Header */}
      <Skeleton height={40} width="60%" />

      {/* Banner */}
      <Skeleton height={180} />

      {/* Content lines */}
      <Skeleton count={5} />

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} height={120} />
        ))}
      </div>

    </div>
  );
};

export default CommonSkeleton;