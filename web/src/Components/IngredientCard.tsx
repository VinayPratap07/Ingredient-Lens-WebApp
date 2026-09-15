import { useState } from "react";
import type {
  IngredientCardProps,
  IngredientStatus,
} from "../API_Services/API_Response";

// Safely format evidence arrays or strings
function formatEvidence(evidence: unknown): string | null {
  if (!evidence) return null;
  if (typeof evidence === "string") return evidence.trim() || null;
  if (Array.isArray(evidence)) {
    const joined = evidence
      .map((e) =>
        typeof e === "string"
          ? e
          : (e as { description?: string })?.description || "",
      )
      .filter(Boolean)
      .join("; ");
    return joined || null;
  }
  return null;
}

const COMPATIBILITY_STYLES: Record<string, { bg: string; text: string }> = {
  great: { bg: "bg-[#23483A]/15", text: "text-[#23483A]" },
  good: { bg: "bg-[#23483A]/10", text: "text-[#23483A]" },
  neutral: { bg: "bg-[#C5B98A]/25", text: "text-[#5C532A]" },
  caution: { bg: "bg-[#B96555]/20", text: "text-[#B96555]" },
};

export default function IngredientCard({ item }: IngredientCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const name = item.name || "Unknown Ingredient";
  const category = item.category || "General";
  const casNumber = item.casNumber?.trim() || null;
  const aliases = Array.isArray(item.aliases) ? item.aliases : [];

  const analysis = item.analysis;
  const rawStatus = (
    analysis?.status ||
    item.status ||
    "neutral"
  ).toLowerCase() as IngredientStatus;
  const status: IngredientStatus = ["good", "neutral", "dangerous"].includes(
    rawStatus,
  )
    ? rawStatus
    : "neutral";

  const fullDescription =
    analysis?.description || "No full description available.";
  const shortDescription =
    fullDescription.length > 120
      ? `${fullDescription.slice(0, 117)}...`
      : fullDescription;

  // Normalize whatItDoes to an array
  const whatItDoesList: string[] = Array.isArray(analysis?.whatItDoes)
    ? analysis.whatItDoes
    : typeof analysis?.whatItDoes === "string" && analysis.whatItDoes.trim()
      ? [analysis.whatItDoes.trim()]
      : [];

  const skinCompatibility = analysis?.skinCompatibility;

  const benefits = Array.isArray(analysis?.benefits) ? analysis.benefits : [];
  const risks = Array.isArray(analysis?.potentialRisks)
    ? analysis.potentialRisks
    : Array.isArray(analysis?.risks)
      ? analysis.risks
      : [];

  const statusConfig = {
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
  }[status];

  return (
    <div
      style={{
        backgroundColor: "#F7F3EA",
        borderColor: "#C8D0CA",
        borderLeftColor: statusConfig.borderAccent,
      }}
      className="w-full rounded-xl border border-l-4 shadow-sm transition-all duration-200 overflow-hidden font-sans text-[#18201C]"
    >
      {/* Clickable Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-5 flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus:bg-[#DDE5DF]/30 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="space-y-1.5 pr-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              style={{
                backgroundColor: statusConfig.badgeBg,
                color: statusConfig.badgeText,
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide"
            >
              <span
                style={{ backgroundColor: statusConfig.dot }}
                className="w-1.5 h-1.5 rounded-full"
              />
              {statusConfig.label}
            </span>
            <span className="text-xs uppercase tracking-tight text-[#66736B] font-medium">
              {category}
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
          className="p-1.5 rounded-lg border bg-[#DDE5DF]/40 text-[#18201C] shrink-0 mt-1 transition-transform duration-200"
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
          {skinCompatibility && Object.keys(skinCompatibility).length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#66736B] mb-2">
                Skin Type Compatibility
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(skinCompatibility).map(([type, rating]) => {
                  if (!rating) return null;
                  const normalizedRating = String(rating).toLowerCase();
                  const style =
                    COMPATIBILITY_STYLES[normalizedRating] ||
                    COMPATIBILITY_STYLES.neutral;
                  const formattedType = type.replace(/([A-Z])/g, " $1").trim();

                  return (
                    <div
                      key={type}
                      className={`px-3 py-2 rounded-lg border border-[#C8D0CA]/80 flex flex-col justify-between ${style.bg}`}
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[#66736B] capitalize">
                        {formattedType}
                      </span>
                      <span className={`text-xs font-bold ${style.text}`}>
                        {String(rating)}
                      </span>
                    </div>
                  );
                })}
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
                {benefits.map((b, idx) => {
                  const text = typeof b === "string" ? b : b?.description;
                  const evidenceStr =
                    typeof b === "object" ? formatEvidence(b?.evidence) : null;
                  const key =
                    typeof b === "object" && b?._id
                      ? b._id
                      : `${name}-benefit-${idx}`;

                  return (
                    <li
                      key={key}
                      className="flex items-start gap-2 text-xs text-[#18201C]"
                    >
                      <span className="text-[#23483A] font-bold shrink-0">
                        ✓
                      </span>
                      <div>
                        <p>{text}</p>
                        {evidenceStr && (
                          <span className="block text-[10px] text-[#66736B] mt-0.5 italic">
                            Evidence: {evidenceStr}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
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
            {risks.length > 0 ? (
              <ul className="space-y-2">
                {risks.map((r, idx) => {
                  const text = typeof r === "string" ? r : r?.description;
                  const evidenceStr =
                    typeof r === "object" ? formatEvidence(r?.evidence) : null;
                  const key =
                    typeof r === "object" && r?._id
                      ? r._id
                      : `${name}-risk-${idx}`;

                  return (
                    <li
                      key={key}
                      className="flex items-start gap-2 text-xs text-[#18201C]"
                    >
                      <span className="text-[#B96555] font-bold shrink-0">
                        ✕
                      </span>
                      <div>
                        <p>{text}</p>
                        {evidenceStr && (
                          <span className="block text-[10px] text-[#66736B] mt-0.5 italic">
                            Evidence: {evidenceStr}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
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
