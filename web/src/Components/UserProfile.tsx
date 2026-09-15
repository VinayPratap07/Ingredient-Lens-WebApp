import { useMutation } from "@tanstack/react-query";
import { FaTrash, FaUser } from "react-icons/fa";
import { FiCalendar, FiMail, FiLogOut } from "react-icons/fi";
import { logOutUser } from "../API_Services/User_Api";
import { useNavigate } from "react-router";

export interface UserProfileData {
  name: string;
  email: string;
  joinDate: string;
  AnalysisRun: string;
}

export default function UserProfile({
  name,
  email,
  joinDate,
  AnalysisRun,
}: UserProfileData) {
  const handleDelete = () => {};

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      navigate("/");
    },
  });

  const onLogout = () => {
    mutation.mutate();
  };

  const formattedDate = new Date(joinDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className=" bg-[#DDE5DF] py-10 px-4 sm:px-6 lg:px-8 font-sans text-[#18201C]">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Main Profile Card */}
        <div className="bg-[#F7F3EA] rounded-2xl p-6 sm:p-8 shadow-sm border border-[#C8D0CA] space-y-6">
          {/* User Identity */}
          <div className="flex items-center gap-4">
            {/* Default Avatar */}
            <div className="w-16 h-16 rounded-full bg-[#DDE5DF] border border-[#C8D0CA] flex items-center justify-center text-[#23483A] shrink-0">
              <FaUser className="w-7 h-7" />
            </div>

            <div className="min-w-0 space-y-1">
              <h1 className="text-xl font-bold tracking-tight text-[#18201C] truncate">
                {name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-[#66736B]">
                <span className="inline-flex items-center gap-1.5 truncate">
                  <FiMail className="w-3.5 h-3.5 shrink-0" />
                  {email}
                </span>
                <span className="inline-flex items-center gap-1.5 shrink-0">
                  <FiCalendar className="w-3.5 h-3.5 shrink-0" />
                  Joined {formattedDate}.
                </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-[#DDE5DF]/30 p-4 rounded-xl border border-[#C8D0CA] text-center">
              <span className="text-2xl font-bold text-[#23483A] block">
                {AnalysisRun}
              </span>
              <span className="text-xs font-medium text-[#66736B]">
                Analyses Run
              </span>
            </div>

            <div className="bg-[#DDE5DF]/30 p-4 rounded-xl border border-[#C8D0CA] text-center">
              <span className="text-2xl font-bold text-[#18201C] block">
                {AnalysisRun}
              </span>
              <span className="text-xs font-medium text-[#66736B]">
                Analyses So Far
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-[#C8D0CA]/60 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#DDE5DF]/40 text-[#18201C] border border-[#C8D0CA] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <FiLogOut className="w-3.5 h-3.5 text-[#66736B]" />
              Log Out
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#B96555]/10 hover:bg-[#B96555] text-[#B96555] hover:text-white border border-[#B96555]/30 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <FaTrash className="w-3.5 h-3.5" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
