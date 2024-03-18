import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Loading() {
  return (
    <>
      <div className="p-4 lg:px-20 xl:px-40 flex justify-center items-center text-red-500 md:flex-row md:gap-8">
        <SkeletonTheme>
          <div className="w-full h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8 dm:w-[50%]">
            <Skeleton height={400} className="mb-4" />

            <Skeleton height={40} width={250} className="mb-4" />

            <Skeleton className="mb-2" />
            <Skeleton className="mb-2" />
            <Skeleton className="mb-2" />
            <Skeleton className="mb-2" />

            <Skeleton width={100} className="mb-2 p-2" />
          </div>
        </SkeletonTheme>
      </div>
    </>
  );
}
