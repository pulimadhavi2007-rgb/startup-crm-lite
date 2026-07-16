import { CalendarDays } from "lucide-react";

export default function AnalyticsFilters({
  selectedFilter,
  onFilterChange,
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Analytics Dashboard
        </h1>

        <p className="mt-1 text-slate-500">
          Monitor your CRM performance and business insights.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">

          <CalendarDays
            size={18}
            className="text-slate-500"
          />

          <select
            value={selectedFilter}
            onChange={(e) =>
              onFilterChange(e.target.value)
            }
            className="bg-transparent outline-none"
          >
            <option value="7days">
              Last 7 Days
            </option>

            <option value="30days">
              Last 30 Days
            </option>

            <option value="90days">
              Last 90 Days
            </option>

            <option value="year">
              This Year
            </option>

            <option value="all">
              All Time
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}