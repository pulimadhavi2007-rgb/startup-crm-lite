import React from "react";
import { GaugeCircle } from "lucide-react";

export default function SalesVelocityCard({ analytics }) {
  const velocity = analytics?.salesVelocity ?? 0;

  return (
    <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-lg h-[280px]">
      <h2 className="text-xl font-semibold text-white">
        Sales Velocity
      </h2>

      <p className="text-slate-400 mt-2">
        Average speed of closing deals.
      </p>

      <div className="mt-10 flex items-center gap-4">
        <div className="rounded-xl bg-blue-500/20 p-4">
          <GaugeCircle
            className="text-blue-400"
            size={30}
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-white">
            {velocity}
          </h1>

          <p className="text-slate-400">
            Days
          </p>
        </div>
      </div>
    </div>
  );
}