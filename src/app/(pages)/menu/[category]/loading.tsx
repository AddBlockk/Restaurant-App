import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Loading() {
  const skeletonArray = Array.from({ length: 3 });

  return (
    <div className="flex flex-wrap">
      {skeletonArray.map((_, i) => (
        <div
          key={i}
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-500 sm:w-1/2 lg:w-1/3 p-4 flex flex-col justify-between">
          <div className="relative h-[80%]">
            <SkeletonTheme>
              <Skeleton className="h-full w-full" />
            </SkeletonTheme>
          </div>
          <div className="items-end font-bold">
            <SkeletonTheme>
              <Skeleton height={30} width="100%" />
              <div className="h-[40px] flex justify-end">
                <Skeleton width={70} height={30} />
              </div>
            </SkeletonTheme>
          </div>
        </div>
      ))}
    </div>
  );
}
