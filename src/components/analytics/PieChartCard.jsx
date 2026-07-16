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
  "#06B6D4",
];

export default function PieChartCard({ analytics }) {
  const data = analytics?.statusDistribution || [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-[420px]">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Lead Status Distribution
        </h2>

        <p className="text-sm text-slate-500">
          Distribution of leads by status
        </p>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
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