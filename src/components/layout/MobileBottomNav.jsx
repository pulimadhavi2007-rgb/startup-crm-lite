import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
} from "lucide-react";

const items = [
  {
    path: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    path: "/leads",
    icon: Users,
    label: "Leads",
  },
  {
    path: "/analytics",
    icon: BarChart3,
    label: "Analytics",
  },
];

export default function MobileBottomNav() {
  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-gray-200
        bg-white
        dark:bg-gray-800
        dark:border-gray-700
        md:hidden
      "
    >
      <div className="flex justify-around py-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex min-h-[44px] flex-col items-center justify-center px-4 py-2 ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 dark:text-gray-400"
                }`
              }
            >
              <Icon size={22} />
              <span className="mt-1 text-xs">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}