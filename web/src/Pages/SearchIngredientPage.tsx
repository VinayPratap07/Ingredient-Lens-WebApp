import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { searchIngredient } from "../API_Services/Analysis_Api";
import Loading from "../Components/LoadingComponent";
import ErrorState from "../Components/ErrorComponent";
import IngredientList from "../Components/IngredientList";
import type { AnalyzedIngredient } from "../API_Services/API_Response";

interface SearchResponse {
  result: AnalyzedIngredient[];
}

function SearchIngredientPage() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q")?.trim() ?? "";

  const { isLoading, error, data } = useQuery<SearchResponse>({
    queryKey: ["searchResult", searchTerm],
    queryFn: () => searchIngredient(searchTerm),
    enabled: searchTerm.length > 0,
  });

  if (!searchTerm) {
    return (
      <div className="min-h-screen flex justify-center p-4">
        <div className="flex justify-center w-full max-w-xl h-fit p-8 rounded-xl border border-[#C8D0CA] bg-[#F7F3EA] text-center text-[#66736B] text-sm">
          Please enter a search term to find ingredients.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  const ingredients = data?.result ?? [];

  if (ingredients.length === 0) {
    return (
      <div className="min-h-screen flex justify-center p-4">
        <div className="flex justify-center w-full max-w-xl h-fit p-8 rounded-xl border border-[#C8D0CA] bg-[#F7F3EA] text-center text-[#66736B] text-sm">
          No ingredients found matching "{searchTerm}".
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-xl flex items-center justify-between px-1 mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#66736B]">
          Ingredients ({ingredients.length})
        </span>

        <span className="text-xs text-[#66736B]">Click an item to expand</span>
      </div>

      <div className="w-full max-w-xl flex flex-col gap-3">
        {ingredients.map((item) => (
          <IngredientList
            key={item._id}
            _id={item._id}
            name={item.name}
            casNumber={item.casNumber}
            aliases={item.aliases}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchIngredientPage;
