import React, { memo, useMemo } from "react";
import { useLeads } from "../../context/LeadContext";

function RecentLeads() {
  const { leads } = useLeads();

  const recentLeads = useMemo(() => {
    return leads.slice(0, 5);
  }, [leads]);

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
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recent Leads
        </h2>

        <button
          className="
            text-sm
            font-medium
            text-blue-600
            dark:text-blue-400
            hover:underline
          "
        >
          View All
        </button>

      </div>

      {/* Responsive Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b border-gray-200 dark:border-gray-700">

              <th className="pb-3 text-left text-sm font-semibold text-gray-500 dark:text-gray-400">
                Name
              </th>

              <th className="pb-3 text-left text-sm font-semibold text-gray-500 dark:text-gray-400">
                Company
              </th>

              <th className="pb-3 text-left text-sm font-semibold text-gray-500 dark:text-gray-400">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="
                    border-b
                    border-gray-200
                    dark:border-gray-700
                    hover:bg-gray-50
                    dark:hover:bg-gray-700
                    transition-colors
                    duration-200
                  "
                >
                  <td className="py-4 font-medium text-gray-900 dark:text-white">
                    {lead.name}
                  </td>

                  <td className="text-gray-700 dark:text-gray-300">
                    {lead.company}
                  </td>

                  <td>
                    <span
                      className="
                        inline-flex
                        rounded-full
                        bg-blue-100
                        dark:bg-blue-900
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-blue-700
                        dark:text-blue-300
                      "
                    >
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>

                <td
                  colSpan={3}
                  className="
                    py-8
                    text-center
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  No leads available.
                </td>

              </tr>
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default memo(RecentLeads);