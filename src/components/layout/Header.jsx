import {
  Bell,
  Search,
  UserCircle,
  Menu,
} from "lucide-react";
import DarkModeToggle from "../common/DarkModeToggle";

export default function Header({ onMenuClick }) {
  return (
    <header
      className="
        sticky
        top-0
        z-20
        flex
        items-center
        justify-between
        border-b
        border-gray-200
        dark:border-gray-700
        bg-white
        dark:bg-gray-800
        px-4
        py-3
        md:px-6
        transition-colors
        duration-200
      "
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">

        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="
            lg:hidden
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-lg
            hover:bg-gray-100
            dark:hover:bg-gray-700
            transition
          "
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>

        <div>
          <h1
            className="
              text-lg
              md:text-2xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            Startup CRM Lite
          </h1>

          <p
            className="
              hidden
              sm:block
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            Manage your leads efficiently
          </p>
        </div>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4">

        {/* Search */}
        <div className="relative hidden md:block">

          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-64
              rounded-xl
              border
              border-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-700
              py-2
              pl-10
              pr-4
              text-gray-900
              dark:text-white
              placeholder:text-gray-400
              focus:border-blue-500
              focus:outline-none
            "
          />

        </div>

        {/* Dark Mode */}
        <DarkModeToggle />

        {/* Notification */}
        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            hover:bg-gray-100
            dark:hover:bg-gray-700
            transition
          "
          aria-label="Notifications"
        >
          <Bell
            size={22}
            className="
              text-gray-700
              dark:text-gray-200
            "
          />
        </button>

        {/* Profile */}
        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            hover:bg-gray-100
            dark:hover:bg-gray-700
            transition
          "
          aria-label="Profile"
        >
          <UserCircle
            size={36}
            className="
              text-gray-600
              dark:text-gray-300
            "
          />
        </button>

      </div>
    </header>
  );
}