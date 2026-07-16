import { TrendingUp } from "lucide-react";

export default function StatsCard({
  title,
  value,
  icon: Icon,
  change = "+12%",
  color,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-gray-900">
            {value}
          </h2>
        </div>

        <div className={`${color} p-4 rounded-xl text-white shadow`}>
          <Icon size={28} />
        </div>

      </div>

      <div className="flex items-center gap-2 mt-5">

        <TrendingUp
          size={16}
          className="text-green-500"
        />

        <span className="text-green-600 font-semibold">
          {change}
        </span>

        <span className="text-gray-500 text-sm">
          vs last month
        </span>

      </div>

    </div>
  );
}