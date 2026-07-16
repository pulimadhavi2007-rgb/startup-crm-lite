import React from "react";

export default function ActivityHeatmap() {
  return (
    <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-lg h-[320px]">
      <h2 className="text-xl font-semibold text-white">
        Activity Heatmap
      </h2>

      <p className="text-slate-400 mt-2">
        User activity throughout the week.
      </p>

      <div className="grid grid-cols-7 gap-2 mt-8">
        {Array.from({ length: 35 }).map((_, index) => (
          <div
            key={index}
            className="h-8 rounded bg-slate-700 hover:bg-blue-500 transition"
          />
        ))}
      </div>
    </div>
  );
}