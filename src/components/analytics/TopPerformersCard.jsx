import React, { memo } from "react";
import { Trophy } from "lucide-react";

function TopPerformersCard({ analytics }) {
  const performers = analytics?.topPerformers || [];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">

      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Top Performers
      </h2>

      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Best performing sales representatives.
      </p>

      {/* Performer List */}
      <div className="mt-6 space-y-4">
        {performers.length > 0 ? (
          performers.map((person, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-gray-200
                dark:border-gray-700
                bg-gray-50
                dark:bg-gray-900
                px-4
                py-3
                transition-colors
              "
            >
              <div className="flex items-center gap-3">
                <Trophy
                  className="text-yellow-500 dark:text-yellow-400"
                  size={20}
                />

                <span className="font-medium text-gray-900 dark:text-white">
                  {person.name}
                </span>
              </div>

              <span className="font-semibold text-green-600 dark:text-green-400">
                {person.value}
              </span>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            No performer data available.
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(TopPerformersCard);