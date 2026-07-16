import { useLeads } from "../../context/LeadContext";

export default function RecentLeads() {
  const { leads } = useLeads();

  const recent = [...leads].slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          Recent Leads
        </h2>

        <span className="text-sm text-blue-600 cursor-pointer hover:underline">
          View All
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="pb-3">Name</th>
              <th className="pb-3">Company</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {recent.map((lead) => (
              <tr
                key={lead.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 font-medium">
                  {lead.name}
                </td>

                <td>{lead.company}</td>

                <td>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}

            {recent.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="py-8 text-center text-gray-500"
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