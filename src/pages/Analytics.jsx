import { useMemo, useState } from "react";
import { useLeads } from "../context/LeadContext";
import useAnalytics from "../hooks/useAnalytics";

import AnalyticsFilters from "../components/analytics/AnalyticsFilters";
import StatsCards from "../components/analytics/StatsCards";

import PieChartCard from "../components/analytics/PieChartCard";
import FunnelChartCard from "../components/analytics/FunnelChartCard";
import BarChartCard from "../components/analytics/BarChartCard";
import LineChartCard from "../components/analytics/LineChartCard";
import RevenueChartCard from "../components/analytics/RevenueChartCard";
import LeadSourceChart from "../components/analytics/LeadSourceChart";
import ActivityHeatmap from "../components/analytics/ActivityHeatmap";
import TopPerformersCard from "../components/analytics/TopPerformersCard";
import ForecastCard from "../components/analytics/ForecastCard";
import SalesVelocityCard from "../components/analytics/SalesVelocityCard";
import EmptyAnalyticsState from "../components/analytics/EmptyAnalyticsState";

export default function Analytics() {
  const { leads = [] } = useLeads();

  const [filter, setFilter] = useState("30days");

  const filteredLeads = useMemo(() => {
    if (!leads.length) return [];

    // Add filtering logic here if needed
    return leads;
  }, [leads, filter]);

  const analytics = useAnalytics(filteredLeads);

  if (!filteredLeads.length) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <EmptyAnalyticsState />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Filters */}
      <AnalyticsFilters
        selectedFilter={filter}
        onFilterChange={setFilter}
      />

      {/* Statistics */}
      <StatsCards analytics={analytics} />

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <PieChartCard analytics={analytics} />
        <FunnelChartCard analytics={analytics} />

        <BarChartCard analytics={analytics} />
        <LineChartCard analytics={analytics} />

        <RevenueChartCard analytics={analytics} />
        <LeadSourceChart analytics={analytics} />

        <ActivityHeatmap analytics={analytics} />
        <TopPerformersCard analytics={analytics} />

        <ForecastCard analytics={analytics} />
        <SalesVelocityCard analytics={analytics} />

      </div>

    </div>
  );
}