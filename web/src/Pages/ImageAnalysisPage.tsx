import IngredientCard from "../Components/IngredientCard";
import { useQuery } from "@tanstack/react-query";
import { imageAnalysisRes } from "../API_Services/Analysis_Api";
import { useParams } from "react-router";
import BenefitsAndConcernsSection from "../Components/Benefits_Concern_Section";
import Loading from "../Components/LoadingComponent";
import ErrorComp from "../Components/ErrorComponent";

export function ImageAnalysisPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="min-h-screen bg-[#DDE5DF] p-6 flex items-center justify-center text-[#B96555] font-semibold">
        Invalid analysis ID
      </div>
    );
  }

  const { isLoading, error, data } = useQuery({
    queryKey: ["response", id],
    queryFn: () => imageAnalysisRes(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      if (status === "Processing") return 3000;
      return false;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComp error={data.message} />;
  }

  if (data?.status === "Processing") {
    return (
      <div className="min-h-screen bg-[#DDE5DF] flex items-center justify-center text-[#23483A] font-medium">
        Analyzing your image...
      </div>
    );
  }

  if (data?.status === "Failed") {
    return (
      <div className="min-h-screen bg-[#DDE5DF] flex flex-col items-center justify-center gap-2">
        <h2 className="text-lg font-bold text-[#B96555]">Analysis failed</h2>
        <p className="text-sm text-[#66736B]">
          We couldn't analyze this image. Please try again.
        </p>
      </div>
    );
  }

  if (data?.status === "Completed") {
    const analysisList = data.Analysis ?? [];

    return (
      <div className="min-h-screen bg-[#DDE5DF] text-[#18201C] py-8 px-4 sm:px-6 w-full">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {/* Page Header */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#66736B]">
              Analysis Results
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18201C] mt-1">
              Product Breakdown
            </h1>
          </div>

          {/* Overview Ingredients Summary Card */}
          <div className="w-full bg-[#F7F3EA] rounded-2xl border border-[#C8D0CA] p-5 shadow-sm font-sans text-[#18201C]">
            <div className="flex items-center justify-between pb-3">
              <h3 className="text-lg font-bold tracking-tight text-[#18201C]">
                Ingredients List
              </h3>
              <span className="text-xs font-semibold text-[#66736B]">
                {analysisList.length} Items Detected
              </span>
            </div>

            <hr className="h-2 rounded-xl bg-[#C5B98A] border-0 mb-1" />

            {/* Compact Rows */}
            <div className="divide-y divide-[#C8D0CA]/50 max-h-[380px] overflow-y-auto pr-1">
              {analysisList.map((item: any) => {
                const firstAlias =
                  Array.isArray(item.aliases) && item.aliases.length > 0
                    ? item.aliases[0]
                    : null;

                const functionText =
                  item.analysis?.whatItDoes ||
                  item.category ||
                  "Cosmetic Ingredient";

                return (
                  <div
                    key={item._id || item.id}
                    className="py-2.5 px-2 flex items-center justify-between gap-3 hover:bg-[#DDE5DF]/30 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <svg
                        className="w-4 h-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="#C5B98A"
                      >
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                      </svg>

                      <div className="truncate">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="text-xs sm:text-sm font-bold text-[#18201C] truncate">
                            {item.name}
                          </span>
                          {firstAlias && (
                            <span className="text-[11px] text-[#66736B] line-through truncate max-w-[140px] sm:max-w-[200px]">
                              ({firstAlias})
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#66736B] truncate">
                          {functionText}
                        </p>
                      </div>
                    </div>

                    {item.casNumber && (
                      <span className="text-[10px] font-mono text-[#66736B] bg-[#DDE5DF]/60 px-2 py-0.5 rounded border border-[#C8D0CA] shrink-0">
                        {item.casNumber}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Aggregated Benefits & Concerns breakdown */}
          <BenefitsAndConcernsSection analysisData={analysisList} />

          {/* Individual Accordion Cards */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#66736B] px-1">
              Detailed Breakdown ({analysisList.length})
            </h2>
            {analysisList.map((item: any) => (
              <IngredientCard key={item._id || item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
