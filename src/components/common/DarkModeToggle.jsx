import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        relative
        flex
        items-center
        justify-center
        w-11
        h-11
        rounded-xl
        border
        border-gray-200
        dark:border-gray-700
        bg-white
        dark:bg-gray-800
        text-gray-700
        dark:text-yellow-400
        hover:scale-105
        transition-all
        duration-200
        shadow-sm
      "
      aria-label="Toggle Theme"
      title={isDarkMode ? "Light Mode" : "Dark Mode"}
    >
      {isDarkMode ? (
        <Sun
          size={20}
          className="transition-transform duration-300 rotate-0"
        />
      ) : (
        <Moon
          size={20}
          className="transition-transform duration-300 rotate-0"
        />
      )}
    </button>
  );
};

export default DarkModeToggle;