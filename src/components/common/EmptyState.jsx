import { SearchX } from "lucide-react";

/**
 * EmptyState Component
 *
 * Props:
 * title
 * description
 * buttonText
 * onAction
 */

export default function EmptyState({
  title = "No Leads Found",
  description = "Try changing your search or create a new lead.",
  buttonText = "Add Lead",
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-8 py-16 text-center shadow-sm">

      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
        <SearchX size={40} className="text-blue-600" />
      </div>

      <h2 className="text-2xl font-bold text-gray-800">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        {description}
      </p>

      {onAction && (
        <button
          onClick={onAction}
          className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}