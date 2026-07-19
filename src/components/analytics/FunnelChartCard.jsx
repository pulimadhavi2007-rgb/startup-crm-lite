import React, { memo } from "react";
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

function FunnelChartCard({ analytics }) {
  const data = analytics?.funnelData || [];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Sales Funnel
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Lead progression through the pipeline
        </p>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "none",
                borderRadius: "10px",
                color: "#ffffff",
              }}
            />

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

    </div>
  );
}

export default memo(FunnelChartCard);