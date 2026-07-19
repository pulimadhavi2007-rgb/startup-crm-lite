import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {isDarkMode ? "Dark" : "Light"}
      </span>

      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className="
          relative
          flex
          items-center
          w-14
          h-8
          rounded-full
          bg-gray-300
          dark:bg-blue-600
          transition-all
          duration-300
          focus:outline-none
          shadow-inner
        "
      >
        <span
          className={`
            absolute
            flex
            items-center
            justify-center
            w-6
            h-6
            bg-white
            rounded-full
            shadow-md
            transition-all
            duration-300
            ${
              isDarkMode
                ? "translate-x-7 text-yellow-500"
                : "translate-x-1 text-gray-700"
            }
          `}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </span>
      </button>
    </div>
  );
};

export default DarkModeToggle;