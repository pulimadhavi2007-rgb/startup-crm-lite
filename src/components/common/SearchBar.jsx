import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search leads...",
}) {
  return (
    <div className="relative w-full">

      {/* Search Icon */}

      <Search
        size={20}
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-gray-400
          dark:text-gray-500
        "
      />

      {/* Input */}

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search Leads"
        className="
          w-full
          min-h-[48px]
          rounded-xl
          border
          border-gray-300
          dark:border-gray-600
          bg-white
          dark:bg-gray-800
          py-3
          pl-11
          pr-12
          text-gray-900
          dark:text-white
          placeholder:text-gray-400
          dark:placeholder:text-gray-500
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          dark:focus:ring-blue-700
          outline-none
          transition
        "
      />

      {/* Clear Button */}

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="
            absolute
            right-2
            top-1/2
            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-lg
            text-gray-400
            hover:bg-gray-100
            hover:text-gray-700
            dark:text-gray-500
            dark:hover:bg-gray-700
            dark:hover:text-white
            transition
          "
        >
          <X size={18} />
        </button>
      )}

    </div>
  );
}