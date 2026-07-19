import React, { memo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

function LeadTable({
  leads,
  onEdit,
  onDelete,
}) {
  if (!leads.length) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-10 text-center shadow-sm">
        <p className="text-lg text-gray-500 dark:text-gray-400">
          No leads available.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        overflow-x-auto
        rounded-2xl
        border
        border-gray-200
        dark:border-gray-700
        bg-white
        dark:bg-gray-800
        shadow-sm
      "
    >
      <table className="min-w-full">
        <thead className="bg-gray-100 dark:bg-gray-900">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Company
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Status
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Phone
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
              Source
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="
                border-t
                border-gray-200
                dark:border-gray-700
                hover:bg-gray-50
                dark:hover:bg-gray-700
                transition
              "
            >
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                {lead.name}
              </td>

              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                {lead.company}
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={lead.status} />
              </td>

              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                {lead.email}
              </td>

              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                {lead.phone}
              </td>

              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                {lead.source}
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-3">

                  <button
                    onClick={() => onEdit(lead)}
                    aria-label={`Edit ${lead.name}`}
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-600
                      text-white
                      hover:bg-blue-700
                      transition
                    "
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(lead.id)}
                    aria-label={`Delete ${lead.name}`}
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-red-500
                      text-white
                      hover:bg-red-600
                      transition
                    "
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default memo(LeadTable);