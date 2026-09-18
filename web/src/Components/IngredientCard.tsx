import { useState } from "react";
import type { AnalyzedIngredient } from "../API_Services/API_Response";

interface IngredientCardProps {
  item: AnalyzedIngredient;
}

type SafetyLevel = "good" | "neutral" | "dangerous";

const COMPATIBILITY_STYLES: Record<string, { bg: string; text: string }> = {
  great: { bg: "bg-[#23483A]/15", text: "text-[#23483A]" },
  good: { bg: "bg-[#23483A]/10", text: "text-[#23483A]" },
  neutral: { bg: "bg-[#C5B98A]/25", text: "text-[#5C532A]" },
  caution: { bg: "bg-[#B96555]/20", text: "text-[#B96555]" },
};

const STATUS_CONFIG: Record<
  SafetyLevel,
  {
    label: string;
    badgeBg: string;
    badgeText: string;
    borderAccent: string;
    dot: string;
  }
> = {
  good: {
    label: "Safe & Beneficial",
    badgeBg: "#DDE5DF",
    badgeText: "#23483A",
    borderAccent: "#23483A",
    dot: "#23483A",
  },
  neutral: {
    label: "Neutral / Conditional",
    badgeBg: "#E6D5B5",
    badgeText: "#18201C",
    borderAccent: "#C5B98A",
    dot: "#C5B98A",
  },
  dangerous: {
    label: "Potential Risk",
    badgeBg: "#B9655520",
    badgeText: "#B96555",
    borderAccent: "#B96555",
    dot: "#B96555",
  },
};

export default function IngredientCard({ item }: IngredientCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { name, casNumber, aliases, analysis } = item;
  const benefits = analysis?.benefits ?? [];
  const potentialRisks = analysis?.potentialRisks ?? [];
  const whatItDoesList = analysis?.whatItDoes ?? [];
  const skinCompatibility = analysis?.skinCompatibility;

  // Derive status from risks presence since it is not a schema field
  const status: SafetyLevel =
    potentialRisks.length > 0
      ? "dangerous"
      : benefits.length > 0
        ? "good"
        : "neutral";
  const statusTheme = STATUS_CONFIG[status];

  const fullDescription =
    analysis?.description || "No full description available.";
  const shortDescription =
    fullDescription.length > 120
      ? `${fullDescription.slice(0, 117)}...`
      : fullDescription;

  return (
    <div
      style={{
        backgroundColor: "#F7F3EA",
        borderColor: "#C8D0CA",
        borderLeftColor: statusTheme.borderAccent,
      }}
      className="w-full rounded-xl border border-l-4 shadow-sm transition-all duration-200 overflow-hidden font-sans text-[#18201C]"
    >
      {/* Clickable Header */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full text-left p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus:bg-[#DDE5DF]/30 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="space-y-1.5 pr-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              style={{
                backgroundColor: statusTheme.badgeBg,
                color: statusTheme.badgeText,
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide"
            >
              <span
                style={{ backgroundColor: statusTheme.dot }}
                className="w-1.5 h-1.5 rounded-full"
              />
              {statusTheme.label}
            </span>
          </div>

          <h3 className="text-base font-bold text-[#18201C] tracking-tight">
            {name}
          </h3>
          <p className="text-xs text-[#66736B] leading-relaxed">
            {shortDescription}
          </p>
        </div>

        <div
          style={{ borderColor: "#C8D0CA" }}
          className="p-1.5 rounded-lg border bg-[#DDE5DF]/40 text-[#18201C] shrink-0 mt-1"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
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

      {/* Expandable Body */}
      {isExpanded && (
        <div className="px-5 pb-6 pt-3 border-t border-[#C8D0CA] space-y-4 bg-[#DDE5DF]/10">
          {/* CAS & Aliases */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
            <div className="p-3 rounded-lg bg-[#DDE5DF]/40 border border-[#C8D0CA] h-full flex flex-col justify-start">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#66736B] mb-1">
                CAS Registry Number
              </span>
              <span className="font-mono text-xs font-semibold text-[#18201C]">
                {casNumber || "Not Assigned"}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#DDE5DF]/40 border border-[#C8D0CA] h-full flex flex-col justify-start">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#66736B] mb-1.5">
                Alternative Names / Aliases
              </span>
              {aliases.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {aliases.map((alias) => (
                    <span
                      key={alias}
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

          {/* Full Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#66736B] mb-1">
              Overview
            </h4>
            <p className="text-xs text-[#18201C] leading-relaxed">
              {fullDescription}
            </p>
          </div>

          {/* What It Does Tags */}
          {whatItDoesList.length > 0 && (
            <div className="p-3.5 rounded-lg bg-[#DDE5DF]/50 border border-[#C8D0CA]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#23483A] mb-2">
                What It Does
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {whatItDoesList.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/80 text-[#18201C] border border-[#C8D0CA]/80 shadow-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Skin Compatibility Grid */}
          {skinCompatibility && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#66736B] mb-2">
                Skin Type Compatibility
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.entries(skinCompatibility) as [string, string][]).map(
                  ([type, rating]) => {
                    const normalizedRating = rating.toLowerCase();
                    const style =
                      COMPATIBILITY_STYLES[normalizedRating] ||
                      COMPATIBILITY_STYLES.neutral;
                    const formattedType = type
                      .replace(/([A-Z])/g, " $1")
                      .trim();

                    return (
                      <div
                        key={type}
                        className={`px-3 py-2 rounded-lg border border-[#C8D0CA]/80 flex flex-col justify-between ${style.bg}`}
                      >
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-[#66736B] capitalize">
                          {formattedType}
                        </span>
                        <span className={`text-xs font-bold ${style.text}`}>
                          {rating}
                        </span>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          )}

          {/* Key Benefits */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#23483A]">
              Key Benefits
            </h4>
            {benefits.length > 0 ? (
              <ul className="space-y-2">
                {benefits.map((benefit) => (
                  <li
                    key={benefit._id}
                    className="flex items-start gap-2 text-xs text-[#18201C]"
                  >
                    <span className="text-[#23483A] font-bold shrink-0">✓</span>
                    <div>
                      <p>{benefit.description}</p>
                      {benefit.evidence.length > 0 && (
                        <span className="block text-[10px] text-[#66736B] mt-0.5 italic">
                          Evidence: {benefit.evidence.join("; ")}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-[#66736B]">
                No recorded direct benefits.
              </p>
            )}
          </div>

          {/* Potential Risks */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B96555]">
              Potential Concerns
            </h4>
            {potentialRisks.length > 0 ? (
              <ul className="space-y-2">
                {potentialRisks.map((risk) => (
                  <li
                    key={risk._id}
                    className="flex items-start gap-2 text-xs text-[#18201C]"
                  >
                    <span className="text-[#B96555] font-bold shrink-0">✕</span>
                    <div>
                      <p>{risk.description}</p>
                      {risk.evidence.length > 0 && (
                        <span className="block text-[10px] text-[#66736B] mt-0.5 italic">
                          Evidence: {risk.evidence.join("; ")}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-[#66736B]">
                None noted under normal usage.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
