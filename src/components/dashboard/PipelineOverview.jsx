import { useMemo } from "react";
import { useLeads } from "../../context/LeadContext";

const STATUSES = [
  { name: "New", color: "#94A3B8" },
  { name: "Contacted", color: "#2563EB" },
  { name: "Meeting Scheduled", color: "#F59E0B" },
  { name: "Proposal Sent", color: "#7C3AED" },
  { name: "Won", color: "#22C55E" },
  { name: "Lost", color: "#EF4444" },
];

export default function PipelineOverview() {
  const { leads } = useLeads();

  const statusCounts = useMemo(() => {
    const counts = {};

    STATUSES.forEach((status) => {
      counts[status.name] = 0;
    });

    leads.forEach((lead) => {
      if (counts[lead.status] !== undefined) {
        counts[lead.status]++;
      }
    });

    return counts;
  }, [leads]);

  const totalLeads = leads.length || 1;

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

      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Pipeline Overview
      </h2>

      {/* Progress Bar */}

      <div className="mt-6 flex h-5 overflow-hidden rounded-full">

        {STATUSES.map((status) => (
          <div
            key={status.name}
            title={`${status.name}: ${statusCounts[status.name]}`}
            style={{
              width: `${(statusCounts[status.name] / totalLeads) * 100}%`,
              backgroundColor: status.color,
            }}
          />
        ))}

      </div>

      {/* Status Cards */}

      <div
        className="
          mt-8
          grid
          grid-cols-2
          gap-4
          md:grid-cols-3
        "
      >
        {STATUSES.map((status) => (
          <div
            key={status.name}
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-gray-200
              dark:border-gray-700
              bg-gray-50
              dark:bg-gray-900
              p-3
              transition-colors
              duration-200
            "
          >
            <div className="flex items-center gap-2">

              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: status.color,
                }}
              />

              <span className="text-sm text-gray-700 dark:text-gray-300">
                {status.name}
              </span>

            </div>

            <span className="font-semibold text-gray-900 dark:text-white">
              {statusCounts[status.name]}
            </span>

          </div>
        ))}
      </div>
    </div>
  );
}