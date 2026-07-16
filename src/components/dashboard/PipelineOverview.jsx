import { useLeads } from "../../context/LeadContext";

export default function PipelineOverview() {
  const { leads } = useLeads();

  const statuses = [
    { name: "New", color: "#94A3B8" },
    { name: "Contacted", color: "#2563EB" },
    { name: "Meeting Scheduled", color: "#F59E0B" },
    { name: "Proposal Sent", color: "#7C3AED" },
    { name: "Won", color: "#22C55E" },
    { name: "Lost", color: "#EF4444" },
  ];

  const total = leads.length || 1;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

      <h2 className="text-xl font-semibold mb-6">
        Pipeline Overview
      </h2>

      <div className="flex h-5 rounded-full overflow-hidden">
        {statuses.map((status) => {
          const count = leads.filter(
            (lead) => lead.status === status.name
          ).length;

          return (
            <div
              key={status.name}
              style={{
                width: `${(count / total) * 100}%`,
                backgroundColor: status.color,
              }}
              title={`${status.name}: ${count}`}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {statuses.map((status) => {
          const count = leads.filter(
            (lead) => lead.status === status.name
          ).length;

          return (
            <div
              key={status.name}
              className="flex items-center justify-between rounded-xl border p-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: status.color,
                  }}
                />

                <span className="text-sm">
                  {status.name}
                </span>
              </div>

              <span className="font-semibold">
                {count}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}