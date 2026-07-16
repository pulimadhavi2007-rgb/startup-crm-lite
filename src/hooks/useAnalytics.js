import { useMemo } from "react";

import { useLeads } from "../context/LeadContext";

import {
  getStatusDistribution,
  getMonthlyLeads,
  getConversionByMonth,
  getRevenueByMonth,
  getPipelineValue,
  getWonRevenue,
  getAverageSalesCycle,
  getLostRate,
  getLeadSourceStats,
  getFunnelData,
  getSalesVelocity,
  getForecastRevenue,
  getTopPerformers,
  getActivityHeatmapData,
  getAnalyticsSummary,
} from "../utils/analyticsHelpers";

export default function useAnalytics(filteredLeads = null) {
  const { leads } = useLeads();

  const data = filteredLeads ?? leads;

  const analytics = useMemo(() => {
    return {
      leads: data,

      summary: getAnalyticsSummary(data),

      statusDistribution: getStatusDistribution(data),

      monthlyLeads: getMonthlyLeads(data),

      conversionTrend: getConversionByMonth(data),

      revenueTrend: getRevenueByMonth(data),

      pipelineValue: getPipelineValue(data),

      wonRevenue: getWonRevenue(data),

      averageSalesCycle: getAverageSalesCycle(data),

      lostRate: getLostRate(data),

      leadSources: getLeadSourceStats(data),

      funnelData: getFunnelData(data),

      salesVelocity: getSalesVelocity(data),

      forecast: getForecastRevenue(data),

      topPerformers: getTopPerformers(data),

      activityHeatmap: getActivityHeatmapData(data),
    };
  }, [data]);

  return analytics;
}