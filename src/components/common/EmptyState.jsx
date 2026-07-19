import { SearchX } from "lucide-react";

/**
 * EmptyState Component
 *
 * Props:
 * - title
 * - description
 * - buttonText
 * - onAction
 */

export default function EmptyState({
  title = "No Leads Found",
  description = "Try changing your search or create a new lead.",
  buttonText = "Add Lead",
  onAction,
}) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-gray-200
        dark:border-gray-700
        bg-white
        dark:bg-gray-800
        py-16
        px-6
        text-center
        shadow-sm
        transition-colors
        duration-200
      "
    >
      {/* Icon */}
      <div
        className="
          mb-5
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-blue-50
          dark:bg-blue-900/30
        "
      >
        <SearchX
          size={40}
          className="text-blue-600 dark:text-blue-400"
        />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>

      {/* Description */}
      <p className="mt-3 max-w-md text-gray-500 dark:text-gray-400">
        {description}
      </p>

      {/* Action Button */}
      {onAction && (
        <button
          onClick={onAction}
          className="
            mt-8
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-medium
            text-white
            hover:bg-blue-700
            transition-colors
            duration-200
          "
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}