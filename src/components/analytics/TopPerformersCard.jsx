import React from "react";
import { Trophy } from "lucide-react";

export default function TopPerformersCard({ analytics }) {
  const performers = analytics?.topPerformers || [];

  return (
    <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-lg h-[320px]">
      <h2 className="text-xl font-semibold text-white">
        Top Performers
      </h2>

      <div className="mt-6 space-y-4">
        {performers.map((person, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg bg-slate-800 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <Trophy
                className="text-yellow-400"
                size={20}
              />

              <span className="text-white">
                {person.name}
              </span>
            </div>

            <span className="font-semibold text-green-400">
              {person.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}