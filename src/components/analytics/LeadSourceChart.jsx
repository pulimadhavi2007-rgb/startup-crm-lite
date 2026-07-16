import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];

export default function LeadSourceChart({ analytics }) {
  const data = analytics?.leadSources || [];

  return (
    <div className="rounded-2xl bg-slate-900 p-6 shadow-lg h-[450px]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Lead Sources
        </h2>

        <p className="text-slate-400 text-sm">
          Leads grouped by source
        </p>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            dataKey="leads"
            nameKey="source"
            cx="50%"
            cy="50%"
            outerRadius={110}
            label={({ source, percent }) =>
              `${source} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.source}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}