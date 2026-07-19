import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AppRoutes from "../../routes";
import { useLead } from "../../context/LeadContext";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { fetchLeads } = useLead();

  useEffect(() => {
    const token = localStorage.getItem("crm-token");

    if (token) {
      fetchLeads().catch((err) => {
        console.error("Failed to fetch leads:", err);
      });
    }
  }, []);

  const handleToggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={handleCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        onClose={handleCloseSidebar}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={handleToggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}