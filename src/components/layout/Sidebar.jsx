import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  X,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    subtitle: "Overview",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Leads",
    subtitle: "Manage Leads",
    icon: Users,
    path: "/leads",
  },
  {
    title: "Analytics",
    subtitle: "Reports",
    icon: BarChart3,
    path: "/analytics",
  },
];

export default function Sidebar({
  sidebarOpen,
  onClose,
}) {
  return (
    <>
      {/* Desktop Sidebar */}

      <aside
        className="
          hidden
          lg:flex
          w-72
          flex-col
          border-r
          border-gray-200
          dark:border-gray-700
          bg-white
          dark:bg-gray-800
          transition-colors
          duration-200
        "
      >
        {/* Logo */}

        <div className="border-b border-gray-200 dark:border-gray-700 p-6">

          <h1 className="text-2xl font-bold text-blue-600">
            Startup CRM
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Lite Dashboard
          </p>

        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-2 p-4">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl p-4 transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <Icon size={22} />

                <div>

                  <p className="font-semibold">
                    {item.title}
                  </p>

                  <p className="text-xs opacity-80">
                    {item.subtitle}
                  </p>

                </div>

              </NavLink>
            );
          })}

        </nav>

        {/* Footer */}

        <div className="border-t border-gray-200 dark:border-gray-700 p-4">

          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            © 2026 Startup CRM Lite
          </p>

        </div>

      </aside>

      {/* Mobile Sidebar */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-40
          h-full
          w-72
          bg-white
          dark:bg-gray-800
          border-r
          border-gray-200
          dark:border-gray-700
          transform
          transition-transform
          duration-300
          lg:hidden
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-5">

          <div>

            <h2 className="text-xl font-bold text-blue-600">
              Startup CRM
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Lite Dashboard
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={22} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="space-y-2 p-4">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-xl p-4 transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`
                }
              >
                <Icon size={22} />

                <span className="font-medium">
                  {item.title}
                </span>

              </NavLink>
            );
          })}

        </nav>

      </aside>

      {/* Bottom Navigation */}

      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-40
          flex
          justify-around
          border-t
          border-gray-200
          dark:border-gray-700
          bg-white
          dark:bg-gray-800
          py-2
          lg:hidden
        "
      >
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-500 dark:text-gray-400"
                }`
              }
            >
              <Icon size={22} />

              <span className="mt-1">
                {item.title}
              </span>

            </NavLink>
          );
        })}
      </nav>
    </>
  );
}