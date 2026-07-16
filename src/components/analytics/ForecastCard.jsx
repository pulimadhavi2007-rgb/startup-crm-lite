import React from "react";
import { TrendingUp } from "lucide-react";

export default function ForecastCard({ analytics }) {
  const forecast = analytics?.forecast || {
    predictedRevenue: 0,
    confidence: 0,
  };

  return (
    <div className="rounded-2xl bg-[#111827] border border-slate-800 p-6 shadow-lg h-[280px]">
      <h2 className="text-xl font-semibold text-white">
        Revenue Forecast
      </h2>

      <p className="text-slate-400 mt-2">
        Estimated revenue for the upcoming period.
      </p>

      <div className="mt-10 flex items-center gap-4">
        <div className="rounded-xl bg-green-500/20 p-4">
          <TrendingUp
            className="text-green-400"
            size={30}
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-white">
            ${forecast.predictedRevenue}
          </h1>

          <p className="text-slate-400 mt-2">
            Confidence: {forecast.confidence}%
          </p>
        </div>
      </div>
    </div>
  );
}