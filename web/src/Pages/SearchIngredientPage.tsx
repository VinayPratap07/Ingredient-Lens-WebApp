import Ingredient from "../Components/Ingredient";
import { useQuery } from "@tanstack/react-query";
import { searchIngredient } from "../API_Services/Analysis_Api";
import Loading from "../Components/LoadingComponent";
import ErrorState from "../Components/ErrorComponent";
import { useLocation } from "react-router";

function SearchIngredientPage() {
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const searchTerm = urlParams.get("q") ?? "";

  const { isLoading, error, data } = useQuery({
    queryKey: ["searchResult", searchTerm],
    queryFn: () => searchIngredient(searchTerm),
    enabled: !!searchTerm,
  });

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 "></div>
  );
}

export default SearchIngredientPage;
