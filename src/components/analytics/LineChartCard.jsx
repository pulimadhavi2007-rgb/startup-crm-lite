import React, { memo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function LineChartCard({ analytics }) {
  const data = analytics?.conversionTrend || [];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Monthly Conversion Trend
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Won leads compared to total leads each month
        </p>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              formatter={(value) => [
                `${value}%`,
                "Conversion Rate",
              ]}
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "none",
                borderRadius: "10px",
                color: "#ffffff",
              }}
            />

            <Line
              type="monotone"
              dataKey="conversion"
              stroke="#22C55E"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "#22C55E",
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default memo(LineChartCard);