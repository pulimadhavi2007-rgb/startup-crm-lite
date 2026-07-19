import {
  Users,
  DollarSign,
  TrendingUp,
  Target,
} from "lucide-react";

export default function StatsCards({ analytics }) {
  const summary = analytics?.summary || {};

  const cards = [
    {
      title: "Total Leads",
      value: summary.totalLeads ?? 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Revenue",
      value: `$${summary.totalRevenue ?? 0}`,
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      title: "Conversion",
      value: `${summary.conversionRate ?? 0}%`,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      title: "Pipeline",
      value: `$${summary.pipelineValue ?? 0}`,
      icon: Target,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-2xl
              border
              border-gray-200
              dark:border-gray-700
              bg-white
              dark:bg-gray-800
              p-6
              shadow-sm
              hover:shadow-lg
              transition-all
              duration-200
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.color} rounded-xl p-4 text-white shadow`}
              >
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}