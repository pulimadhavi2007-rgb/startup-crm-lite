import React, { memo } from "react";
import {
  Pencil,
  Trash2,
  Mail,
  Phone,
  Building2,
  User,
} from "lucide-react";

import StatusBadge from "./StatusBadge";

function LeadCard({
  lead,
  onEdit,
  onDelete,
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
        transition
        hover:shadow-lg
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-blue-100
              dark:bg-blue-900
            "
          >
            <User
              size={22}
              className="text-blue-600 dark:text-blue-300"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {lead.name}
            </h2>

            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Building2 size={15} />
              {lead.company}
            </div>
          </div>

        </div>

        <StatusBadge status={lead.status} />

      </div>

      {/* Contact */}

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <Mail size={18} />
          <span className="break-all">
            {lead.email}
          </span>
        </div>

        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <Phone size={18} />
          <span>{lead.phone}</span>
        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex gap-3">

        <button
          onClick={() => onEdit(lead)}
          aria-label={`Edit ${lead.name}`}
          className="
            flex-1
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-4
            py-3
            text-white
            hover:bg-blue-700
            transition
            min-h-[44px]
          "
        >
          <Pencil size={18} />
          Edit
        </button>

        <button
          onClick={() => onDelete(lead.id)}
          aria-label={`Delete ${lead.name}`}
          className="
            flex-1
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-red-500
            px-4
            py-3
            text-white
            hover:bg-red-600
            transition
            min-h-[44px]
          "
        >
          <Trash2 size={18} />
          Delete
        </button>

      </div>

    </div>
  );
}

export default memo(LeadCard);