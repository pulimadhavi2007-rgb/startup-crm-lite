import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

/**
 * LeadTable Component
 *
 * Props:
 * leads
 * onEdit
 * onDelete
 */

export default function LeadTable({
  leads,
  onEdit,
  onDelete,
}) {
  if (!leads.length) {
    return (
      <div className="bg-white rounded-xl border p-10 text-center text-gray-500">
        No leads available.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Name
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Company
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Email
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Phone
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Source
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 font-medium">
                {lead.name}
              </td>

              <td className="px-6 py-4">
                {lead.company}
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={lead.status} />
              </td>

              <td className="px-6 py-4">
                {lead.email}
              </td>

              <td className="px-6 py-4">
                {lead.phone}
              </td>

              <td className="px-6 py-4">
                {lead.source}
              </td>

              <td className="px-6 py-4">
                <div className="flex gap-2">

                  <button
                    onClick={() => onEdit(lead)}
                    className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                    aria-label="Edit Lead"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(lead.id)}
                    className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
                    aria-label="Delete Lead"
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