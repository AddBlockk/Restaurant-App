import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Loading() {
  return (
    <SkeletonTheme>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4 lg:px-20 xl:px-40 items-center">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="relative bg-cover p-2">
            <div className="text-white flex flex-col justify-between ">
              <div>
                <Skeleton height={70} className="mb-4" />
                <Skeleton height={180} className="my-4" />
              </div>
              <Skeleton width={100} className="mb-2 p-2" />
            </div>
          </div>
        ))}
      </div>
    </SkeletonTheme>
  );
}
