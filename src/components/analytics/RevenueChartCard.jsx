import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function RevenueChartCard({ analytics }) {
  const data = analytics?.revenueTrend || [];

  return (
    <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-lg h-[420px]">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Revenue Trend
        </h2>

        <p className="text-slate-400 text-sm">
          Monthly revenue growth
        </p>
      </div>

      <ResponsiveContainer width="100%" height="82%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

          <XAxis dataKey="month" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" />

          <Tooltip
            contentStyle={{
              background: "#1E293B",
              border: "none",
              borderRadius: 10,
            }}
          />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#22C55E"
            fill="url(#revenueGradient)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}