import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import {
  FiCheck,
  FiAlertCircle,
  FiArrowLeft,
  FiBookmark,
  FiShare2,
  FiInfo,
  FiShield,
  FiAlertTriangle,
} from "react-icons/fi";
import { useParams, useNavigate } from "react-router";
import { getSingleIngredient } from "../API_Services/Analysis_Api";
import Loading from "../Components/LoadingComponent";
import ErrorState from "../Components/ErrorComponent";
import type { AnalyzedIngredient } from "../API_Services/API_Response";

interface ApiResponse {
  message?: string;
  data: AnalyzedIngredient;
}

export const IngredientAnalysisPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);
  const [showAllBenefits, setShowAllBenefits] = useState(false);

  const { isLoading, error, data } = useQuery<ApiResponse>({
    queryKey: ["IngredientAnalysis", id],
    queryFn: () => getSingleIngredient(id as string),
    enabled: Boolean(id),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const ingredient = data?.data;

  const benefits = useMemo(
    () => ingredient?.analysis?.benefits ?? [],
    [ingredient],
  );
  const risks = useMemo(
    () => ingredient?.analysis?.potentialRisks ?? [],
    [ingredient],
  );
  const whatItDoes = useMemo(
    () => ingredient?.analysis?.whatItDoes ?? [],
    [ingredient],
  );
  const skinCompatibility = ingredient?.analysis?.skinCompatibility;

  const displayedBenefits = showAllBenefits ? benefits : benefits.slice(0, 4);

  if (!id) {
    return (
      <div className="min-h-screen bg-[#f7f3eb] p-6 flex items-center justify-center text-[#af5a4c] font-semibold text-sm">
        Invalid or missing analysis ID.
      </div>
    );
  }

  if (isLoading) return <Loading />;
  if (error) return <ErrorState error={error} />;
  if (!ingredient) {
    return (
      <div className="min-h-screen bg-[#f7f3eb] p-6 flex items-center justify-center text-[#525953] text-sm italic">
        Ingredient details unavailable.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f3eb] text-[#1c1c1c] font-sans antialiased py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation & Controls */}
        <nav className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#525953] hover:text-[#161d1a] transition-colors cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSaved(!saved)}
              className={`p-2 rounded-lg border text-sm transition-all cursor-pointer ${
                saved
                  ? "bg-[#204938] text-white border-[#204938]"
                  : "bg-white border-[#ded7ca] text-[#242924] hover:bg-neutral-50"
              }`}
              title="Save ingredient"
            >
              <FiBookmark className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-2 rounded-lg border border-[#ded7ca] bg-white text-[#242924] hover:bg-neutral-50 transition-all cursor-pointer"
              title="Share report"
            >
              <FiShare2 className="w-4 h-4" />
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="p-6 md:p-8 bg-[#fbf6ee] rounded-2xl border border-[#ede5d8] shadow-sm space-y-5">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#787f79]">
                <span>Active Ingredient</span>
                {ingredient.casNumber && (
                  <>
                    <span>•</span>
                    <span>CAS: {ingredient.casNumber}</span>
                  </>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#161d1a] mt-1 uppercase">
                {ingredient.name}
              </h1>
              {ingredient.aliases && ingredient.aliases.length > 0 && (
                <p className="text-xs font-mono text-[#5c635d] mt-1 tracking-wide line-clamp-1">
                  Aliases: {ingredient.aliases.join(", ")}
                </p>
              )}
            </div>

            {/* Skin Compatibility Indicators */}
            {skinCompatibility && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white/70 backdrop-blur-sm border border-[#e3ded4] p-2.5 rounded-xl self-start text-center">
                {(Object.entries(skinCompatibility) as [string, string][]).map(
                  ([type, rating]) => (
                    <div key={type} className="px-2">
                      <span className="block text-[9px] uppercase font-bold text-[#636b64] truncate">
                        {type.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="text-xs font-black text-[#204938]">
                        {rating}
                      </span>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>

          <p className="text-sm text-[#454c46] leading-relaxed max-w-3xl">
            {ingredient.analysis?.description ||
              "No specific summary available for this compound."}
          </p>

          {/* Primary Actions / What It Does */}
          {whatItDoes.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#eee7da]">
              <span className="text-xs font-semibold text-[#636b64] mr-1">
                Functions:
              </span>
              {whatItDoes.map((func) => (
                <span
                  key={func}
                  className="px-2.5 py-1 text-xs font-medium bg-[#f0e8dc] text-[#3e3522] rounded-md border border-[#dfd6c6]"
                >
                  {func}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Benefits & Concerns Layout */}
        <main className="p-6 md:p-8 bg-[#fbf6ee] rounded-2xl border border-[#ede5d8] shadow-sm space-y-8">
          {/* Section: Benefits */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#eee7da]">
              <div className="flex items-center gap-2">
                <FiShield className="w-5 h-5 text-[#204938]" />
                <h2 className="text-lg font-bold tracking-tight text-[#161d1a]">
                  Benefits
                </h2>
              </div>
              <span className="text-xs font-semibold text-[#5a605b] tracking-wide">
                {benefits.length} Total Identified
              </span>
            </div>

            {benefits.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayedBenefits.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-start gap-3.5 p-4 rounded-xl border border-[#e3ded4] bg-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    >
                      <div className="mt-0.5 shrink-0">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#204938] text-white">
                          <FiCheck className="w-4 h-4 stroke-[2.5]" />
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 space-y-1.5">
                        <h3 className="font-bold text-sm leading-snug text-[#161d1a]">
                          {item.description}
                        </h3>
                        {item.evidence.length > 0 ? (
                          <p className="text-xs text-[#525953] leading-relaxed italic">
                            Evidence: {item.evidence.join("; ")}
                          </p>
                        ) : (
                          <p className="text-xs text-[#525953] leading-relaxed">
                            Documented functional benefit.
                          </p>
                        )}
                        <div className="pt-1 flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-[#636b64]">
                          <span>FROM:</span>
                          <span className="px-2 py-0.5 rounded bg-[#f1e4cb] text-[#4d422a] truncate max-w-[200px]">
                            {ingredient.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {benefits.length > 4 && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAllBenefits(!showAllBenefits)}
                      className="px-4 py-2 text-xs font-semibold rounded-xl bg-white border border-[#ded7ca] text-[#242924] shadow-sm hover:bg-neutral-50 active:scale-[0.99] transition-all cursor-pointer"
                    >
                      {showAllBenefits
                        ? "Show fewer benefits"
                        : `Show all ${benefits.length} benefits`}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 rounded-xl border border-[#e3ded4] bg-white/40 flex items-center gap-2 text-xs text-[#525953]">
                <FiInfo className="w-4 h-4 text-[#204938]" />
                <span>
                  No verified benefits cataloged for this compound yet.
                </span>
              </div>
            )}
          </section>

          {/* Section: Concerns */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#eee7da]">
              <div className="flex items-center gap-2">
                <FiAlertTriangle className="w-5 h-5 text-[#af5a4c]" />
                <h2 className="text-lg font-bold tracking-tight text-[#161d1a]">
                  Concerns
                </h2>
              </div>
              <span className="text-xs font-semibold text-[#b85444] tracking-wide">
                {risks.length} Flags Detected
              </span>
            </div>

            {risks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {risks.map((risk) => (
                  <div
                    key={risk._id}
                    className="flex items-start gap-3.5 p-4 rounded-xl border border-[#f0c5bd] bg-[#fffaf8] shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                  >
                    <div className="mt-0.5 shrink-0">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#af5a4c] text-white">
                        <FiAlertCircle className="w-4 h-4 stroke-[2.5]" />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <h3 className="font-bold text-sm leading-snug text-[#161d1a]">
                        {risk.description}
                      </h3>
                      {risk.evidence.length > 0 && (
                        <p className="text-xs text-[#525953] leading-relaxed italic">
                          Evidence: {risk.evidence.join("; ")}
                        </p>
                      )}
                      <div className="pt-1 flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-[#636b64]">
                        <span>FROM:</span>
                        <span className="px-2 py-0.5 rounded bg-[#f9dbd4] text-[#86372a] truncate max-w-[200px]">
                          {ingredient.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-[#e3ded4] bg-white/40 flex items-center gap-2 text-xs text-[#525953]">
                <FiInfo className="w-4 h-4 text-[#204938]" />
                <span>
                  No high-risk flags, comedogenic triggers, or sensitizers
                  detected for this compound.
                </span>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};
