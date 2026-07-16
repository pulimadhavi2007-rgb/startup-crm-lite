import { Plus, Eye, Download } from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "Add Lead",
      icon: Plus,
      color: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    {
      title: "View Leads",
      icon: Eye,
      color: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    },
    {
      title: "Export Data",
      icon: Download,
      color: "bg-green-600 hover:bg-green-700 text-white",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full">
      <h2 className="text-xl font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="space-y-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition ${action.color}`}
            >
              <Icon size={20} />
              <span className="font-medium">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}