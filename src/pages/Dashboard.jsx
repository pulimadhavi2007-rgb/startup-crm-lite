import { useMemo } from "react";
import {
  Users,
  Trophy,
  XCircle,
  TrendingUp,
} from "lucide-react";

import { useLeads } from "../context/LeadContext";

import StatsGrid from "../components/dashboard/StatsGrid";
import PipelineOverview from "../components/dashboard/PipelineOverview";
import QuickActions from "../components/dashboard/QuickActions";
import RecentLeads from "../components/dashboard/RecentLeads";

export default function Dashboard() {
  const { leads } = useLeads();

  const stats = useMemo(() => {
    const totalLeads = leads.length;

    const wonLeads = leads.filter(
      (lead) => lead.status === "Won"
    ).length;

    const lostLeads = leads.filter(
      (lead) => lead.status === "Lost"
    ).length;

    const conversionRate =
      totalLeads === 0
        ? "0%"
        : `${((wonLeads / totalLeads) * 100).toFixed(1)}%`;

    return [
      {
        title: "Total Leads",
        value: totalLeads,
        icon: Users,
        change: "+12%",
        color: "bg-blue-500",
      },
      {
        title: "Won Leads",
        value: wonLeads,
        icon: Trophy,
        change: "+8%",
        color: "bg-green-500",
      },
      {
        title: "Lost Leads",
        value: lostLeads,
        icon: XCircle,
        change: "-2%",
        color: "bg-red-500",
      },
      {
        title: "Conversion Rate",
        value: conversionRate,
        icon: TrendingUp,
        change: "+5%",
        color: "bg-purple-500",
      },
    ];
  }, [leads]);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
          Welcome back! Here's your CRM overview.
        </p>
      </div>

      {/* Stats */}
      <StatsGrid stats={stats} />

      {/* Pipeline + Quick Actions */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6
        "
      >
        <div className="lg:col-span-2">
          <PipelineOverview />
        </div>

        <div>
          <QuickActions />
        </div>
      </div>

      {/* Recent Leads */}

      <RecentLeads />

    </div>
  );
}