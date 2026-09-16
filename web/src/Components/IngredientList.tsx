import { useState } from "react";
import type { IngredientItem } from "../API_Services/API_Response";
import { useNavigate } from "react-router";

export default function IngredientList({
  _id,
  name,
  casNumber,
  aliases,
}: IngredientItem) {
  const [isOpen, setIsOpen] = useState(false);

  const hasCas = Boolean(casNumber?.trim());
  const navigate = useNavigate();

  const onViewAnalysis = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(_id);
    navigate(`/ingredient/${_id}`);
  };

  return (
    <div className="w-full max-w-xl flex flex-col gap-3 font-sans text-[#18201C]">
      <div
        className={`rounded-xl border transition-all duration-200 shadow-sm overflow-hidden bg-[#F7F3EA] ${
          isOpen ? "border-[#23483A]" : "border-[#C8D0CA]"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:bg-[#DDE5DF]/30 transition-colors"
          aria-expanded={isOpen}
        >
          <div className="space-y-1 pr-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#23483A]" />
              <h3 className="text-sm font-bold tracking-tight text-[#18201C]">
                {name}
              </h3>
            </div>

            {hasCas && (
              <p className="text-xs text-[#66736B] pl-4 font-mono">
                CAS: {casNumber}
              </p>
            )}
          </div>

          <div className="p-1 rounded-md border border-[#C8D0CA] bg-[#DDE5DF]/40 text-[#23483A] shrink-0">
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

        {isOpen && (
          <div className="px-4 pb-4 pt-3 border-t border-[#C8D0CA] bg-[#DDE5DF]/10 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
              {/* CAS */}
              <div className="p-3 rounded-lg bg-[#DDE5DF]/40 border border-[#C8D0CA]">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#66736B] mb-1">
                  CAS Registry Number
                </span>
                <span className="font-mono text-xs font-semibold text-[#18201C]">
                  {hasCas ? casNumber : "Not Assigned"}
                </span>
              </div>

              {/* Aliases */}
              <div className="p-3 rounded-lg bg-[#DDE5DF]/40 border border-[#C8D0CA]">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#66736B] mb-1.5">
                  Alternative Names / Aliases
                </span>

                {aliases && aliases.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {aliases.map((alias, idx) => (
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

            {/* View Analysis Action */}
            <div className="pt-1 flex justify-end">
              <button
                onClick={onViewAnalysis}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-[#23483A] hover:bg-[#1b382d] text-[#F7F3EA] text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-[#23483A] focus:ring-offset-1 cursor-pointer"
              >
                <span>View Analysis</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
