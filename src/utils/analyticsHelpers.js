/**
 * Startup CRM Lite
 * Analytics Helper Functions
 * -----------------------------------------
 * Pure utility functions.
 * Safe for useMemo().
 * Handles empty datasets.
 */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function isValidDate(date) {
  return date && !isNaN(new Date(date).getTime());
}

function getMonthName(date) {
  return MONTHS[new Date(date).getMonth()];
}

function daysBetween(start, end) {
  if (!isValidDate(start) || !isValidDate(end)) return 0;

  const diff =
    new Date(end).getTime() -
    new Date(start).getTime();

  return Math.round(diff / (1000 * 60 * 60 * 24));
}

/* =======================================================
   STATUS DISTRIBUTION
======================================================= */

export function getStatusDistribution(leads = []) {
  const statusMap = {};

  leads.forEach((lead) => {
    const status = lead.status || "Unknown";

    statusMap[status] = (statusMap[status] || 0) + 1;
  });

  return Object.entries(statusMap).map(([name, value]) => ({
    name,
    value,
  }));
}

/* =======================================================
   MONTHLY LEADS
======================================================= */

export function getMonthlyLeads(leads = []) {
  const monthly = {};

  leads.forEach((lead) => {
    if (!isValidDate(lead.createdAt)) return;

    const month = getMonthName(lead.createdAt);

    monthly[month] = (monthly[month] || 0) + 1;
  });

  return MONTHS.map((month) => ({
    month,
    leads: monthly[month] || 0,
  }));
}

/* =======================================================
   MONTHLY CONVERSION
======================================================= */

export function getConversionByMonth(leads = []) {
  const total = {};
  const won = {};

  leads.forEach((lead) => {
    if (!isValidDate(lead.createdAt)) return;

    const month = getMonthName(lead.createdAt);

    total[month] = (total[month] || 0) + 1;

    if (lead.status === "Won") {
      won[month] = (won[month] || 0) + 1;
    }
  });

  return MONTHS.map((month) => {
    const totalLeads = total[month] || 0;
    const wonLeads = won[month] || 0;

    return {
      month,
      conversion:
        totalLeads === 0
          ? 0
          : Number(
              ((wonLeads / totalLeads) * 100).toFixed(1)
            ),
    };
  });
}

/* =======================================================
   PIPELINE VALUE
======================================================= */

export function getPipelineValue(leads = []) {
  return leads
    .filter(
      (lead) =>
        lead.status !== "Won" &&
        lead.status !== "Lost"
    )
    .reduce(
      (sum, lead) => sum + Number(lead.value || 0),
      0
    );
}

/* =======================================================
   WON REVENUE
======================================================= */

export function getWonRevenue(leads = []) {
  return leads
    .filter((lead) => lead.status === "Won")
    .reduce(
      (sum, lead) => sum + Number(lead.value || 0),
      0
    );
}

/* =======================================================
   LOST RATE
======================================================= */

export function getLostRate(leads = []) {
  if (!leads.length) return 0;

  const lost = leads.filter(
    (lead) => lead.status === "Lost"
  ).length;

  return Number(
    ((lost / leads.length) * 100).toFixed(1)
  );
}
/* =======================================================
   AVERAGE SALES CYCLE
======================================================= */

export function getAverageSalesCycle(leads = []) {
  const wonLeads = leads.filter(
    (lead) =>
      lead.status === "Won" &&
      isValidDate(lead.createdAt) &&
      isValidDate(lead.wonAt)
  );

  if (!wonLeads.length) return 0;

  const totalDays = wonLeads.reduce(
    (sum, lead) =>
      sum + daysBetween(lead.createdAt, lead.wonAt),
    0
  );

  return Math.round(totalDays / wonLeads.length);
}

/* =======================================================
   REVENUE BY MONTH
======================================================= */

export function getRevenueByMonth(leads = []) {
  const revenue = {};

  leads.forEach((lead) => {
    if (
      lead.status !== "Won" ||
      !isValidDate(lead.wonAt)
    )
      return;

    const month = getMonthName(lead.wonAt);

    revenue[month] =
      (revenue[month] || 0) +
      Number(lead.value || 0);
  });

  return MONTHS.map((month) => ({
    month,
    revenue: revenue[month] || 0,
  }));
}

/* =======================================================
   LEAD SOURCE ANALYTICS
======================================================= */

export function getLeadSourceStats(leads = []) {
  const sources = {};

  leads.forEach((lead) => {
    const source = lead.source || "Unknown";

    sources[source] =
      (sources[source] || 0) + 1;
  });

  return Object.entries(sources)
    .map(([source, leads]) => ({
      source,
      leads,
    }))
    .sort((a, b) => b.leads - a.leads);
}

/* =======================================================
   SALES FUNNEL
======================================================= */

export function getFunnelData(leads = []) {
  const stages = [
    "New",
    "Contacted",
    "Meeting Scheduled",
    "Proposal Sent",
    "Won",
  ];

  const data = stages.map((stage) => ({
    stage,
    value: leads.filter(
      (lead) => lead.status === stage
    ).length,
  }));

  return data.map((item, index) => {
    const previous =
      index === 0
        ? item.value
        : data[index - 1].value;

    return {
      ...item,

      conversion:
        previous === 0
          ? 0
          : Number(
              (
                (item.value / previous) *
                100
              ).toFixed(1)
            ),

      dropOff:
        previous === 0
          ? 0
          : Number(
              (
                ((previous - item.value) /
                  previous) *
                100
              ).toFixed(1)
            ),
    };
  });
}

/* =======================================================
   KPI SUMMARY
======================================================= */

export function getAnalyticsSummary(leads = []) {
  const totalLeads = leads.length;

  const wonLeads = leads.filter(
    (lead) => lead.status === "Won"
  ).length;

  const conversionRate =
    totalLeads === 0
      ? 0
      : Number(
          (
            (wonLeads / totalLeads) *
            100
          ).toFixed(1)
        );

  return {
    totalLeads,

    conversionRate,

    pipelineValue: getPipelineValue(leads),

    wonRevenue: getWonRevenue(leads),

    averageSalesCycle:
      getAverageSalesCycle(leads),

    lostRate: getLostRate(leads),
  };
}
/* =======================================================
   SALES VELOCITY
======================================================= */

export function getSalesVelocity(leads = []) {
  const opportunities = leads.filter(
    (lead) =>
      lead.status !== "Lost" &&
      lead.status !== "Won"
  ).length;

  const wonLeads = leads.filter(
    (lead) => lead.status === "Won"
  );

  const totalLeads = leads.length;

  const winRate =
    totalLeads === 0
      ? 0
      : wonLeads.length / totalLeads;

  const avgDealSize =
    wonLeads.length === 0
      ? 0
      : wonLeads.reduce(
          (sum, lead) =>
            sum + Number(lead.value || 0),
          0
        ) / wonLeads.length;

  const avgSalesCycle =
    getAverageSalesCycle(leads);

  const velocity =
    avgSalesCycle === 0
      ? 0
      : (opportunities *
          winRate *
          avgDealSize) /
        avgSalesCycle;

  return Math.round(velocity);
}

/* =======================================================
   FORECAST REVENUE
======================================================= */

export function getForecastRevenue(leads = []) {
  const revenue = getRevenueByMonth(leads);

  const validMonths = revenue.filter(
    (item) => item.revenue > 0
  );

  if (!validMonths.length) {
    return {
      predictedRevenue: 0,
      confidence: 0,
    };
  }

  const totalRevenue = validMonths.reduce(
    (sum, month) =>
      sum + month.revenue,
    0
  );

  const predictedRevenue = Math.round(
    totalRevenue / validMonths.length
  );

  let confidence = 60;

  if (validMonths.length >= 3)
    confidence = 75;

  if (validMonths.length >= 6)
    confidence = 90;

  return {
    predictedRevenue,
    confidence,
  };
}

/* =======================================================
   TOP PERFORMERS
======================================================= */

export function getTopPerformers(leads = []) {
  const owners = {};

  leads
    .filter((lead) => lead.status === "Won")
    .forEach((lead) => {
      const owner =
        lead.owner || "Unassigned";

      owners[owner] =
        (owners[owner] || 0) +
        Number(lead.value || 0);
    });

  return Object.entries(owners)
    .map(([name, revenue]) => ({
      name,
      revenue,
    }))
    .sort(
      (a, b) => b.revenue - a.revenue
    );
}

/* =======================================================
   ACTIVITY HEATMAP
======================================================= */

export function getActivityHeatmapData(
  leads = []
) {
  const activity = {};

  leads.forEach((lead) => {
    [
      lead.createdAt,
      lead.contactedAt,
      lead.meetingAt,
      lead.proposalAt,
      lead.wonAt,
    ].forEach((date) => {
      if (!isValidDate(date)) return;

      const key = new Date(date)
        .toISOString()
        .split("T")[0];

      activity[key] =
        (activity[key] || 0) + 1;
    });
  });

  return Object.entries(activity).map(
    ([date, count]) => ({
      date,
      count,
    })
  );
}

/* =======================================================
   CURRENCY FORMATTER
======================================================= */

export function formatCurrency(value = 0) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(value);
}

/* =======================================================
   NUMBER FORMATTER
======================================================= */

export function formatNumber(value = 0) {
  return new Intl.NumberFormat(
    "en-IN"
  ).format(value);
}