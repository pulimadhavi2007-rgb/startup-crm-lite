/**
 * StatusBadge Component
 * Displays a colored badge based on lead status.
 */

const STATUS_STYLES = {
  New: "bg-gray-100 text-gray-700",

  Contacted: "bg-blue-100 text-blue-700",

  "Meeting Scheduled": "bg-yellow-100 text-yellow-700",

  "Proposal Sent": "bg-purple-100 text-purple-700",

  Won: "bg-green-100 text-green-700",

  Lost: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        STATUS_STYLES[status] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}