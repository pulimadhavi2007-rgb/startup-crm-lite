import { BarChart3, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyAnalyticsState() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">

      {/* Icon */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
        <BarChart3
          size={40}
          className="text-blue-600 dark:text-blue-400"
        />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        No Analytics Available
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-lg text-sm leading-6 text-gray-500 dark:text-gray-400">
        Add your first lead to start tracking your sales performance,
        revenue trends, conversion rate, pipeline health, and business
        growth.
      </p>

      {/* Button */}
      <Link
        to="/leads"
        className="
          mt-8
          inline-flex
          min-h-[44px]
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-6
          py-3
          font-medium
          text-white
          transition-all
          duration-200
          hover:bg-blue-700
          active:scale-95
        "
      >
        <Plus size={18} />
        Add Lead
      </Link>
    </div>
  );
}