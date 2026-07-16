import React, { memo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function BarChartCard({ analytics }) {
  const data = analytics?.monthlyLeads || [];

  return (
    <div className="rounded-2xl bg-slate-900 p-6 shadow-lg h-[450px]">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Monthly Lead Growth
        </h2>

       <p className="text-gray-500">
          Leads generated each month
        </p>
      </div>

      <ResponsiveContainer width="100%" height="82%">
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="month"
            stroke="#94A3B8"
          />

          <YAxis
            stroke="#94A3B8"
          />

          <Tooltip
            contentStyle={{
              background: "#1E293B",
              border: "none",
              borderRadius: 10,
            }}
          />

          <Bar
            dataKey="leads"
            fill="#3B82F6"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default memo(BarChartCard);