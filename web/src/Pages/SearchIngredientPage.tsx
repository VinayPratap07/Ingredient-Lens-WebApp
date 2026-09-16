import { useQuery } from "@tanstack/react-query";
import { searchIngredient } from "../API_Services/Analysis_Api";
import Loading from "../Components/LoadingComponent";
import ErrorState from "../Components/ErrorComponent";
import { useLocation } from "react-router";
import IngredientList from "../Components/IngredientList";
import type { IngredientItem } from "../API_Services/API_Response";

function SearchIngredientPage() {
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const searchTerm = urlParams.get("q") ?? "";

  const {
    isLoading,
    error,
    data: list,
  } = useQuery({
    queryKey: ["searchResult", searchTerm],
    queryFn: () => searchIngredient(searchTerm),
    enabled: !!searchTerm,
  });

  console.log(list);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorState />;
  }

  const ingredients = list.result;

  if (ingredients.length === 0) {
    return (
      <div className="flex justify-center w-full max-w-xl p-8 rounded-xl border border-[#C8D0CA] bg-[#F7F3EA] text-center text-[#66736B]">
        No ingredients found to display.
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
        {ingredients.map((items: IngredientItem) => (
          <IngredientList
            key={items._id}
            _id={items._id}
            name={items.name}
            casNumber={items.casNumber}
            aliases={items.aliases}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchIngredientPage;
