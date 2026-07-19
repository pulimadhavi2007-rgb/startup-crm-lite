import React, { memo } from "react";
import { TrendingUp } from "lucide-react";

function StatsCard({
  title,
  value,
  icon: Icon,
  change = "+12%",
  color,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        dark:border-gray-700
        bg-white
        dark:bg-gray-800
        p-5
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
      "
    >
      {/* Top Section */}

      <div className="flex items-center justify-between">

        <div className="min-w-0">

          <p
            className="
              text-sm
              font-medium
              text-gray-500
              dark:text-gray-400
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-2
              text-2xl
              sm:text-3xl
              font-bold
              text-gray-900
              dark:text-white
              break-words
            "
          >
            {value}
          </h2>

        </div>

        <div
          className={`
            ${color}
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-xl
            text-white
            shadow-md
            shrink-0
          `}
        >
          <Icon size={28} />
        </div>

      </div>

      {/* Bottom Section */}

      <div className="mt-5 flex items-center gap-2">

        <TrendingUp
          size={16}
          className="text-green-500"
        />

        <span
          className="
            font-semibold
            text-green-600
            dark:text-green-400
          "
        >
          {change}
        </span>

        <span
          className="
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >
          vs last month
        </span>

      </div>
    </div>
  );
}

export default memo(StatsCard);