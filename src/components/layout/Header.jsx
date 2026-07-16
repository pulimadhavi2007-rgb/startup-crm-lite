import { Bell, Search, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      {/* Left */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Startup CRM Lite
        </h2>
        <p className="text-sm text-slate-500">
          Manage your leads efficiently
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-xl border border-slate-300 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* Notification */}
        <button className="rounded-xl p-2 hover:bg-slate-100">
          <Bell size={22} />
        </button>

        {/* Profile */}
        <button className="rounded-full hover:bg-slate-100">
          <UserCircle
            size={36}
            className="text-slate-600"
          />
        </button>
      </div>
    </header>
  );
}