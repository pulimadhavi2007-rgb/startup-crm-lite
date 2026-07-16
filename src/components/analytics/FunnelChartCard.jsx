import React from "react";
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Cell,
  Tooltip,
  LabelList,
} from "recharts";

const COLORS = [
  "#94A3B8", // New
  "#2563EB", // Contacted
  "#F59E0B", // Meeting Scheduled
  "#7C3AED", // Proposal Sent
  "#22C55E", // Won
];

export default function FunnelChartCard({ analytics }) {
  const data = analytics?.funnelData || [];

  return (
    <div className="rounded-2xl bg-slate-900 p-6 shadow-lg h-[450px]">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Sales Funnel
        </h2>

        <p className="text-slate-400 text-sm">
          Lead progression through the pipeline
        </p>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <FunnelChart>
          <Tooltip />

          <Funnel
            data={data}
            dataKey="value"
            isAnimationActive
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.stage}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

            <LabelList
              dataKey="stage"
              position="right"
              fill="#ffffff"
              stroke="none"
            />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
}