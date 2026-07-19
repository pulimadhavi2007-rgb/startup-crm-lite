import React, { memo } from "react";
import StatsCards from "./StatsCards";

function StatsGrid({ stats }) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        xl:grid-cols-4
        transition-colors
        duration-200
      "
    >
      {stats.map((item) => (
        <StatsCards
          key={item.title}
          title={item.title}
          value={item.value}
          icon={item.icon}
          color={item.color}
          change={item.change}
        />
      ))}
    </div>
  );
}

export default memo(StatsGrid);