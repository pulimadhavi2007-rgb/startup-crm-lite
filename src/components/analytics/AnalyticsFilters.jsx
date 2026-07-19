import { CalendarDays } from "lucide-react";

export default function AnalyticsFilters({
  selectedFilter,
  onFilterChange,
}) {
  return (
    <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Analytics Dashboard
        </h1>

        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Monitor your CRM performance and business insights.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <div
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-gray-200
            dark:border-gray-700
            bg-white
            dark:bg-gray-800
            px-4
            py-2
            shadow-sm
            transition-colors
            duration-200
          "
        >
          <CalendarDays
            size={18}
            className="text-gray-500 dark:text-gray-400"
          />

          <select
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="
              bg-transparent
              text-gray-900
              dark:text-white
              outline-none
              cursor-pointer
            "
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
        </div>

      </div>

    </div>
  );
}