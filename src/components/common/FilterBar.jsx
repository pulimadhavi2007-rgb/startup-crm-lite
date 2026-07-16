const FILTERS = [
  "All",
  "New",
  "Contacted",
  "Meeting Scheduled",
  "Proposal Sent",
  "Won",
  "Lost",
];

export default function FilterBar({
  activeFilter,
  onFilterChange,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
            activeFilter === filter
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}