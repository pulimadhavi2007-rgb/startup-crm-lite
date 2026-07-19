import React, { memo } from "react";

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-600"></div>

      <div className="mt-5 h-8 w-20 rounded bg-gray-300 dark:bg-gray-600"></div>

      <div className="mt-6 h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
    </div>
  );
}

function SkeletonChart() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 h-4 w-56 rounded bg-gray-300 dark:bg-gray-600"></div>

      <div className="h-80 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SkeletonChart />
        <SkeletonChart />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SkeletonChart />
        <SkeletonChart />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SkeletonChart />
        <SkeletonChart />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SkeletonChart />
        <SkeletonChart />
      </div>

    </div>
  );
}

export default memo(LoadingSkeleton);