import { Users, Trophy, XCircle, TrendingUp } from "lucide-react";
import { useLeads } from "../context/LeadContext";

import StatsGrid from "../components/dashboard/StatsGrid";
import PipelineOverview from "../components/dashboard/PipelineOverview";
import QuickActions from "../components/dashboard/QuickActions";
import RecentLeads from "../components/dashboard/RecentLeads";

export default function Dashboard() {
  const { leads } = useLeads();

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

  const stats = [
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

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Here's your CRM overview.
        </p>
      </div>

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <PipelineOverview />
        </div>

        <div>
          <QuickActions />
        </div>
      </div>

      <RecentLeads />
    </div>
  );
}