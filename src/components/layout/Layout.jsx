import Sidebar from "./Sidebar";
import Header from "./Header";
import AppRoutes from "../../routes";

export default function Layout() {
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Pages */}
        <main className="flex-1 overflow-y-auto p-6">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}