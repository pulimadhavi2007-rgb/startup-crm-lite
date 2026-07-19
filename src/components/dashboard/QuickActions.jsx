import React, { memo } from "react";
import { Plus, Eye, Download } from "lucide-react";

const ACTIONS = [
  {
    title: "Add Lead",
    icon: Plus,
    className:
      "bg-blue-600 hover:bg-blue-700 text-white",
  },
  {
    title: "View Leads",
    icon: Eye,
    className:
      "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-white",
  },
  {
    title: "Export Data",
    icon: Download,
    className:
      "bg-green-600 hover:bg-green-700 text-white",
  },
];

function QuickActions() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        dark:border-gray-700
        bg-white
        dark:bg-gray-800
        p-6
        shadow-sm
        transition-colors
        duration-200
      "
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Quick Actions
      </h2>

      <div className="mt-6 space-y-4">
        {ACTIONS.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              aria-label={action.title}
              className={`
                flex
                min-h-[44px]
                w-full
                items-center
                gap-3
                rounded-xl
                px-4
                py-4
                font-medium
                transition-all
                duration-200
                hover:scale-[1.02]
                active:scale-95
                ${action.className}
              `}
            >
              <Icon size={20} />

              <span>{action.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default memo(QuickActions);