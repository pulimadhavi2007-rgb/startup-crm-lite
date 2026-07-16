import { Menu, Bell } from "lucide-react";
import DarkModeToggle from "../common/DarkModeToggle";

const Navbar = ({ onMenuClick }) => {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        items-center
        justify-between
        h-16
        px-6
        bg-white
        dark:bg-gray-800
        border-b
        border-gray-200
        dark:border-gray-700
        transition-colors
        duration-200
      "
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="
            lg:hidden
            p-2
            rounded-lg
            hover:bg-gray-100
            dark:hover:bg-gray-700
            transition-colors
          "
        >
          <Menu
            size={22}
            className="text-gray-700 dark:text-gray-200"
          />
        </button>

        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Startup CRM Lite
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button
          className="
            relative
            p-2
            rounded-lg
            hover:bg-gray-100
            dark:hover:bg-gray-700
            transition-colors
          "
        >
          <Bell
            size={20}
            className="text-gray-700 dark:text-gray-200"
          />
        </button>

        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Navbar;