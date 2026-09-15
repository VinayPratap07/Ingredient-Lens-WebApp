import { useQuery } from "@tanstack/react-query";
import { getIngredients } from "../API_Services/Analysis_Api";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { IngredientsApiResponse } from "../API_Services/API_Response";

export default function Ingredient() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const {
    isLoading,
    isError,
    data: response,
  } = useQuery<IngredientsApiResponse>({
    queryKey: ["ingredients", page],
    queryFn: () => getIngredients(page),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <div className="w-full max-w-xl p-6 text-center text-[#66736B] font-medium">
        Loading ingredients...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full max-w-xl p-6 rounded-xl border border-[#B96555] bg-[#B96555]/10 text-center text-[#B96555] font-medium">
        Failed to load ingredients.
      </div>
    );
  }

  const items = response?.data ?? [];
  const currentPage = response?.pagination?.page ?? page;
  const totalPages = response?.pagination?.totalPages ?? 1;

  if (items.length === 0) {
    return (
      <div className="w-full max-w-xl p-8 rounded-xl border border-[#C8D0CA] bg-[#F7F3EA] text-center text-[#66736B]">
        No ingredients found to display.
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl flex flex-col gap-3 font-sans text-[#18201C]">
      {/* Header Info */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold uppercase tracking-wider text-[#66736B]">
          Ingredients ({items.length})
        </span>
        <span className="text-xs text-[#66736B]">Click an item to expand</span>
      </div>

      {/* Accordion List */}
      {items.map((item) => {
        const isOpen = expandedId === item.id;
        const hasAliases = Boolean(item.aliases && item.aliases.length > 0);
        const hasCas = Boolean(item.casNumber?.trim());

        return (
          <div
            key={item.id}
            style={{
              backgroundColor: "#F7F3EA",
              borderColor: isOpen ? "#23483A" : "#C8D0CA",
            }}
            className="rounded-xl border transition-all duration-200 shadow-sm overflow-hidden"
          >
            {/* Clickable Header */}
            <button
              type="button"
              onClick={() => toggleExpand(item.id)}
              className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:bg-[#DDE5DF]/30 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="space-y-1 pr-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#23483A]" />
                  <h3 className="text-sm font-bold tracking-tight text-[#18201C]">
                    {item.name}
                  </h3>
                </div>

                {hasCas && (
                  <p className="text-xs text-[#66736B] pl-4 font-mono">
                    CAS: {item.casNumber}
                  </p>
                )}
              </div>

              {/* Chevron Icon */}
              <div
                style={{ borderColor: "#C8D0CA" }}
                className="p-1 rounded-md border bg-[#DDE5DF]/40 text-[#23483A] shrink-0 transition-transform duration-200"
              >
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {/* Expanded Content */}
            {isOpen && (
              <div className="px-4 pb-4 pt-3 border-t border-[#C8D0CA] bg-[#DDE5DF]/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                  {/* Left Column: CAS */}
                  <div className="p-3 rounded-lg bg-[#DDE5DF]/40 border border-[#C8D0CA] h-full flex flex-col justify-start">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#66736B] mb-1">
                      CAS Registry Number
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#18201C]">
                      {hasCas ? item.casNumber : "Not Assigned"}
                    </span>
                  </div>

                  {/* Right Column: Aliases */}
                  <div className="p-3 rounded-lg bg-[#DDE5DF]/40 border border-[#C8D0CA] h-full flex flex-col justify-start">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#66736B] mb-1.5">
                      Alternative Names / Aliases
                    </span>
                    {hasAliases ? (
                      <div className="flex flex-wrap gap-1.5">
                        {item.aliases!.map((alias, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[11px] bg-[#E6D5B5] text-[#18201C] font-medium"
                          >
                            {alias}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[#66736B] italic">
                        No common aliases recorded.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Pagination Controls */}
      <div className="mt-2 flex items-center justify-between p-3 rounded-xl border border-[#C8D0CA] bg-[#F7F3EA] shadow-sm text-xs">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage <= 1}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C8D0CA] bg-[#DDE5DF]/40 text-[#18201C] font-medium hover:bg-[#DDE5DF] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <FiChevronLeft className="w-3.5 h-3.5 text-[#23483A]" />
          Previous
        </button>

        <span className="font-semibold text-[#66736B]">
          Page <span className="text-[#18201C]">{currentPage}</span> of{" "}
          <span className="text-[#18201C]">{totalPages}</span>
        </span>

        <button
          type="button"
          onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
          disabled={currentPage >= totalPages}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C8D0CA] bg-[#DDE5DF]/40 text-[#18201C] font-medium hover:bg-[#DDE5DF] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          Next
          <FiChevronRight className="w-3.5 h-3.5 text-[#23483A]" />
        </button>
      </div>
    </div>
  );
}
