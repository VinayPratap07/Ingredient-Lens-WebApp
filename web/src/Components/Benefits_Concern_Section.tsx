import { useState, useMemo } from "react";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import type { IconType } from "react-icons";

// 1. Explicit Data Contracts matching backend payload
export interface RawAttribute {
  description?: string;
  evidence?: string | unknown[];
  _id?: string;
}

export interface IngredientAnalysis {
  _id?: string;
  id?: string;
  name?: string;
  analysis?: {
    benefits?: Array<string | RawAttribute>;
    potentialRisks?: Array<string | RawAttribute>;
    risks?: Array<string | RawAttribute>;
  };
}

export interface AggregatedItem {
  title: string;
  description: string;
  count: number;
  sources: string[];
}

interface BenefitsAndConcernsSectionProps {
  analysisData?: IngredientAnalysis[];
}

// Safely unwraps strings, arrays, or objects into a single clean string
function toCleanString(val: unknown): string {
  if (typeof val === "string") return val.trim();
  if (Array.isArray(val)) {
    return val
      .map((item) =>
        typeof item === "string" ? item : item?.description || "",
      )
      .filter(Boolean)
      .join("; ")
      .trim();
  }
  if (val != null && typeof val === "object" && "description" in val) {
    return String((val as { description: unknown }).description).trim();
  }
  return "";
}

// 2. Collector Logic
function aggregateAttributes(
  data: IngredientAnalysis[] = [],
  extractor: (
    item: IngredientAnalysis,
  ) => Array<string | RawAttribute> | undefined,
  fallbackDescription: string,
): AggregatedItem[] {
  const map = new Map<
    string,
    { item: AggregatedItem; sourceSet: Set<string> }
  >();

  for (const entry of data) {
    const ingredientName = toCleanString(entry.name) || "Unknown Ingredient";
    const rawList = extractor(entry) ?? [];

    for (const raw of rawList) {
      if (!raw) continue;

      let title = "";
      let evidence = "";

      if (typeof raw === "string") {
        title = raw.trim();
      } else if (typeof raw === "object") {
        title = toCleanString(raw.description);
        evidence = toCleanString(raw.evidence);
      }

      if (!title) title = "Unspecified";
      const key = title.toLowerCase();

      const existing = map.get(key);
      if (existing) {
        existing.item.count += 1;
        existing.sourceSet.add(ingredientName);
      } else {
        const sourceSet = new Set<string>([ingredientName]);
        map.set(key, {
          item: {
            title,
            description: evidence || fallbackDescription,
            count: 1,
            sources: [],
          },
          sourceSet,
        });
      }
    }
  }

  return Array.from(map.values()).map(({ item, sourceSet }) => ({
    ...item,
    sources: Array.from(sourceSet),
  }));
}

// 3. Reusable Section
interface AttributeBlockProps {
  title: string;
  badgeLabel: string;
  emptyLabel: string;
  items: AggregatedItem[];
  icon: IconType;
  theme: {
    badgeText: string;
    iconBg: string;
    cardBorder: string;
    cardBg: string;
    cardHoverBg: string;
    sourceBg: string;
    sourceText: string;
  };
}

const INITIAL_VISIBLE_COUNT = 4;

function AttributeBlock({
  title,
  badgeLabel,
  emptyLabel,
  items,
  icon: Icon,
  theme,
}: AttributeBlockProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, INITIAL_VISIBLE_COUNT);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold tracking-tight text-[#18201C]">
          {title}
        </h3>
        <span className={`text-xs font-semibold ${theme.badgeText}`}>
          {badgeLabel}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-[#66736B] italic">{emptyLabel}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleItems.map((item) => (
              <div
                key={item.title.toLowerCase()}
                className={`flex items-start justify-between gap-3 p-3 rounded-xl border transition-colors ${theme.cardBorder} ${theme.cardBg} ${theme.cardHoverBg}`}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-full text-white flex items-center justify-center shrink-0 mt-0.5 ${theme.iconBg}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#18201C] leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#66736B] leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[10px] text-[#66736B] font-medium uppercase tracking-wider">
                        From:
                      </span>
                      {item.sources.map((src) => (
                        <span
                          key={src}
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold truncate max-w-[150px] ${theme.sourceBg} ${theme.sourceText}`}
                        >
                          {src}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {item.count > 1 && (
                  <span className="text-xs font-bold text-[#66736B]/60 shrink-0 ml-1">
                    {item.count}
                  </span>
                )}
              </div>
            ))}
          </div>

          {items.length > INITIAL_VISIBLE_COUNT && (
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="mt-4 px-4 py-2 rounded-xl border border-[#C8D0CA] bg-white text-xs font-semibold text-[#18201C] hover:bg-[#DDE5DF]/30 transition shadow-sm cursor-pointer"
            >
              {showAll
                ? `Show less ${title.toLowerCase()}`
                : `Show all ${items.length} ${title.toLowerCase()}`}
            </button>
          )}
        </>
      )}
    </div>
  );
}

// 4. Primary Component
export default function BenefitsAndConcernsSection({
  analysisData = [],
}: BenefitsAndConcernsSectionProps) {
  const benefits = useMemo(
    () =>
      aggregateAttributes(
        analysisData,
        (item) => item.analysis?.benefits,
        "Supports healthy skin barrier and function.",
      ),
    [analysisData],
  );

  const potentialRisks = useMemo(
    () =>
      aggregateAttributes(
        analysisData,
        (item) => item.analysis?.potentialRisks ?? item.analysis?.risks,
        "May cause sensitivity or unwanted reaction in vulnerable skin.",
      ),
    [analysisData],
  );

  return (
    <div className="w-full bg-[#F7F3EA] rounded-2xl border border-[#C8D0CA] p-6 shadow-sm font-sans text-[#18201C] mb-6 space-y-8">
      <AttributeBlock
        title="Benefits"
        badgeLabel={`${benefits.length} Total Identified`}
        emptyLabel="No specific positive attributes documented for this formulation."
        items={benefits}
        icon={FiCheckCircle}
        theme={{
          badgeText: "text-[#23483A]",
          iconBg: "bg-[#23483A]",
          cardBorder: "border-[#C8D0CA]/60",
          cardBg: "bg-[#DDE5DF]/20",
          cardHoverBg: "hover:bg-[#DDE5DF]/40",
          sourceBg: "bg-[#E6D5B5]",
          sourceText: "text-[#23483A]",
        }}
      />

      <hr className="border-[#C8D0CA]/60" />

      <AttributeBlock
        title="Concerns"
        badgeLabel={`${potentialRisks.length} Flags Detected`}
        emptyLabel="No known irritation risks or adverse triggers recorded."
        items={potentialRisks}
        icon={FiAlertCircle}
        theme={{
          badgeText: "text-[#B96555]",
          iconBg: "bg-[#B96555]",
          cardBorder: "border-[#B96555]/20",
          cardBg: "bg-[#B96555]/5",
          cardHoverBg: "hover:bg-[#B96555]/10",
          sourceBg: "bg-[#B96555]/20",
          sourceText: "text-[#B96555]",
        }}
      />
    </div>
  );
}
