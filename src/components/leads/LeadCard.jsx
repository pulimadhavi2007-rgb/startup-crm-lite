import { Pencil, Trash2, Mail, Phone, Building2, User } from "lucide-react";
import StatusBadge from "./StatusBadge";

/**
 * LeadCard Component
 *
 * Props:
 * lead
 * onEdit
 * onDelete
 */

export default function LeadCard({
  lead,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">

            <User className="text-blue-600" size={22} />

          </div>

          <div>

            <h2 className="font-bold text-lg text-gray-800">
              {lead.name}
            </h2>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Building2 size={15} />
              {lead.company}
            </div>

          </div>

        </div>

        <StatusBadge status={lead.status} />

      </div>

      {/* Body */}

      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-3 text-gray-600">

          <Mail size={18} />

          <span>{lead.email}</span>

        </div>

        <div className="flex items-center gap-3 text-gray-600">

          <Phone size={18} />

          <span>{lead.phone}</span>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex justify-end gap-3">

        <button
          onClick={() => onEdit(lead)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
        >
          <Pencil size={18} />
          Edit
        </button>

        <button
          onClick={() => onDelete(lead.id)}
          className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 transition"
        >
          <Trash2 size={18} />
          Delete
        </button>

      </div>

    </div>
  );
}