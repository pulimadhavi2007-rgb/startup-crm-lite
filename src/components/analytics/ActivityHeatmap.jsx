import React, { memo } from "react";

const activityData = Array.from({ length: 35 }, (_, index) => ({
  id: index,
  level: Math.floor(Math.random() * 4),
}));

const COLORS = [
  "bg-gray-200 dark:bg-gray-700",
  "bg-blue-200 dark:bg-blue-900",
  "bg-blue-400 dark:bg-blue-700",
  "bg-blue-600 dark:bg-blue-500",
];

function ActivityHeatmap() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 dark:border-gray-700 dark:bg-gray-800">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Activity Heatmap
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          User activity throughout the last 5 weeks.
        </p>
      </div>

      {/* Heatmap */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3">
        {activityData.map((item) => (
          <div
            key={item.id}
            title={`Activity ${item.id + 1}`}
            className={`
              h-8
              w-full
              rounded-lg
              transition-all
              duration-200
              hover:scale-105
              ${COLORS[item.level]}
            `}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <span>Less</span>

        {COLORS.map((color, index) => (
          <div
            key={index}
            className={`h-4 w-4 rounded ${color}`}
          />
        ))}

        <span>More</span>
      </div>
    </div>
  );
}

export default memo(ActivityHeatmap);