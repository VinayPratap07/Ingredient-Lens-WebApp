import UserProfile from "../Components/UserProfile";
import AnalysisHistoryList from "../Components/UserAnalysisHistory";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../API_Services/User_Api";
import NavBar from "../Components/NavBar";
import Loading from "../Components/LoadingComponent";
import axios from "axios";
import ErrorState from "../Components/ErrorComponent";

function UserProfilePage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["a"],
    queryFn: getUserProfile,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    if (axios.isAxiosError(error)) {
      return <ErrorState error={error} />;
    }
    return <ErrorState />;
  }

  return (
    <div>
      <NavBar />

      <UserProfile
        name={data.user.fullName}
        email={data.user.email}
        joinDate={data.user.createdAt}
        AnalysisRun={data.analysis.length}
      />
      <AnalysisHistoryList analysis={data.analysis} />
    </div>
  );
}

export default UserProfilePage;
