import React from "react";
import { BarChart3, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyAnalyticsState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-20 text-center shadow-sm">

      {/* Icon */}

      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
        <BarChart3
          size={42}
          className="text-blue-600"
        />
      </div>

      {/* Title */}

      <h2 className="text-2xl font-bold text-slate-900">
        No analytics available yet
      </h2>

      {/* Description */}

      <p className="mt-3 max-w-md text-slate-500">
        Add your first lead to start tracking your
        sales performance, revenue trends, pipeline
        health and business growth.
      </p>

      {/* Button */}

      <Link
        to="/leads"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <Plus size={18} />
        Add Lead
      </Link>

    </div>
  );
}