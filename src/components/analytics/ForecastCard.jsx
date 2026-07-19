import React, { memo } from "react";
import { TrendingUp } from "lucide-react";

function ForecastCard({ analytics }) {
  const forecast = analytics?.forecast || {
    predictedRevenue: 0,
    confidence: 0,
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800">

      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Revenue Forecast
      </h2>

      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Estimated revenue for the upcoming period.
      </p>

      {/* Forecast */}
      <div className="mt-10 flex items-center gap-4">
        <div className="rounded-xl bg-green-100 p-4 dark:bg-green-900/30">
          <TrendingUp
            className="text-green-600 dark:text-green-400"
            size={30}
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            ${forecast.predictedRevenue}
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Confidence: {forecast.confidence}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(ForecastCard);