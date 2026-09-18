import { useNavigate } from "react-router";
import {
  FiCalendar,
  FiLayers,
  FiArrowRight,
  FiAlertTriangle,
  FiClock,
} from "react-icons/fi";
import type {
  ImageAnalysisApiResponse,
  AnalyzedIngredient,
} from "../API_Services/API_Response";

interface AnalysisHistoryListProps {
  analysis: ImageAnalysisApiResponse[];
  onSelectAnalysis?: (id: string) => void;
}

const MAX_DISPLAYED_TAGS = 3;

function formatDate(isoString: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
}

export default function AnalysisHistoryList({
  analysis = [],
  onSelectAnalysis,
}: AnalysisHistoryListProps) {
  const navigate = useNavigate();

  if (analysis.length === 0) {
    return (
      <div className="bg-[#F7F3EA] rounded-2xl border border-[#C8D0CA] p-8 text-center max-w-xl mx-auto">
        <p className="text-sm text-[#66736B] italic">
          No previous analyses found.
        </p>
      </div>
    );
  }

  const handleRowClick = (id: string) => {
    if (onSelectAnalysis) {
      onSelectAnalysis(id);
    } else {
      navigate(`/image-analysis/${id}`);
    }
  };

  return (
    <div className="bg-[#F7F3EA] rounded-2xl border border-[#C8D0CA] p-6 shadow-sm font-sans text-[#18201C] space-y-4 max-w-xl mx-auto">
      <div className="flex items-center justify-between pb-2 border-b border-[#C8D0CA]/60">
        <h2 className="text-lg font-bold tracking-tight text-[#18201C]">
          Past Analyses
        </h2>
        <span className="text-xs font-semibold text-[#23483A]">
          {analysis.length} Total
        </span>
      </div>

      <ul className="divide-y divide-[#C8D0CA]/50">
        {analysis.map((item) => {
          const isCompleted =
            item.status === "Completed" && Array.isArray(item.Analysis);
          const isProcessing = item.status === "Processing";

          const ingredients: AnalyzedIngredient[] = isCompleted
            ? item.Analysis
            : [];
          const totalIngredients = ingredients.length;
          const displayedIngredients = ingredients.slice(0, MAX_DISPLAYED_TAGS);
          const remainingCount = totalIngredients - displayedIngredients.length;

          return (
            <li
              key={item._id}
              onClick={() => handleRowClick(item._id)}
              className="py-4 first:pt-2 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-[#DDE5DF]/20 -mx-3 px-3 rounded-xl transition-colors cursor-pointer"
            >
              <div className="space-y-2 min-w-0">
                <div className="flex items-center gap-2.5 text-xs text-[#66736B] flex-wrap">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <FiCalendar className="w-3.5 h-3.5" />
                    {formatDate(item.createdAt)}
                  </span>

                  <span>•</span>

                  {isCompleted && (
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <FiLayers className="w-3.5 h-3.5 text-[#23483A]" />
                      <strong className="text-[#18201C] font-semibold">
                        {totalIngredients}
                      </strong>{" "}
                      ingredients
                    </span>
                  )}

                  {isProcessing && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5C532A] bg-[#C5B98A]/25 px-2 py-0.5 rounded-md">
                      <FiClock className="w-3 h-3" />
                      Processing
                    </span>
                  )}

                  {!isCompleted && !isProcessing && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B96555] bg-[#B96555]/15 px-2 py-0.5 rounded-md">
                      <FiAlertTriangle className="w-3 h-3" />
                      Failed
                    </span>
                  )}
                </div>

                {isCompleted && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {displayedIngredients.map((ing) => (
                      <span
                        key={ing._id}
                        className="px-2 py-0.5 rounded text-[11px] bg-[#E6D5B5] text-[#18201C] font-medium truncate max-w-[170px]"
                      >
                        {ing.name}
                      </span>
                    ))}

                    {remainingCount > 0 && (
                      <span className="text-[11px] font-semibold text-[#66736B] px-1.5">
                        +{remainingCount} more
                      </span>
                    )}
                  </div>
                )}

                {!isCompleted && !isProcessing && (
                  <p className="text-xs text-[#B96555] truncate max-w-sm italic">
                    Analysis run failed to process.
                  </p>
                )}
              </div>

              <div className="shrink-0 self-end sm:self-center">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#23483A] group-hover:translate-x-0.5 transition-transform">
                  View
                  <FiArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
