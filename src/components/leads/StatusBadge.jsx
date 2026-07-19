/**
 * StatusBadge Component
 * Displays a colored badge based on lead status.
 */

const STATUS_STYLES = {
  New: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200",

  Contacted:
    "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",

  "Meeting Scheduled":
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",

  "Proposal Sent":
    "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",

  Won:
    "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",

  Lost:
    "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        transition-colors
        duration-200
        ${
          STATUS_STYLES[status] ||
          "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
        }
      `}
    >
      {status}
    </span>
  );
}