import React, { memo } from "react";
import { GaugeCircle } from "lucide-react";

function SalesVelocityCard({ analytics }) {
  const velocity = analytics?.salesVelocity ?? 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">

      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Sales Velocity
      </h2>

      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Average speed of closing deals.
      </p>

      {/* Content */}
      <div className="mt-10 flex items-center gap-4">
        <div className="rounded-xl bg-blue-100 p-4 dark:bg-blue-900/30">
          <GaugeCircle
            className="text-blue-600 dark:text-blue-400"
            size={30}
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {velocity}
          </h1>

          <p className="text-gray-500 dark:text-gray-400">
            Days
          </p>
        </div>
      </div>

    </div>
  );
}

export default memo(SalesVelocityCard);