import { AxiosError } from "axios";
import axios from "axios";
import { FiAlertTriangle } from "react-icons/fi";
import { FcRefresh } from "react-icons/fc";
import { HiHomeModern } from "react-icons/hi2";
import { Link, useNavigate } from "react-router";

type ErrorResponse = {
  success: boolean;
  message: string;
};

type ErrorStateProps = {
  title?: string;
  message?: string;
  error?: AxiosError<ErrorResponse> | Error;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "Error",
  message = "An unhandled execution error occurred while processing your request.",
  error,
  onRetry,
}: ErrorStateProps) {
  const navigate = useNavigate();

  // Extract message if a native Error object is passed directly
  let detailedMessage: string | undefined;
  let errorCode: number | undefined;

  if (axios.isAxiosError(error)) {
    detailedMessage = error.response?.data?.message ?? message;
    errorCode = error.response?.status ?? 500;
  } else if (error instanceof Error) {
    detailedMessage = error.message;
    errorCode = 500;
  }

  return (
    <div className="w-full max-w-2xl mx-auto my-12 p-8 bg-[#DFE2D6] border border-red-500/10 rounded-3xl backdrop-blur-md relative overflow-hidden selection:bg-red-500/20">
      {/* Decorative subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col items-center text-center relative z-10">
        {/* Error Icon Block */}
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 mb-6 animate-pulse">
          <FiAlertTriangle />
        </div>

        {/* Content */}
        <h2 className="text-lg font-mono font-black uppercase tracking-widest text-white mb-2">
          {title}
        </h2>
        <p className="text-sm text-zinc-400 max-w-md leading-relaxed mb-6 font-sans">
          {message}
        </p>

        {/* Technical Log Trace (Visible only if an error is explicitly provided) */}
        {detailedMessage && (
          <div className="w-full bg-[#305B49] border border-white/5 rounded-xl p-4 mb-8 text-left font-mono text-xs text-red-400/80 overflow-x-auto max-h-32 leading-normal">
            <span className="text-[white] block mb-1 uppercase tracking-wider text-[10px] font-bold">
              Exception Trace:
            </span>
            {detailedMessage}
            <br />
            {errorCode}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-white font-mono text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 active:scale-95"
            >
              <FcRefresh className="w-3.5 h-3.5" /> Re-execute Query
            </button>
          )}

          <Link to="/">
            <button
              onClick={() => navigate("/")}
              className="px-5 py-2.5 bg-white text-black hover:bg-zinc-200 font-mono text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 active:scale-95"
            >
              <HiHomeModern className="w-3.5 h-3.5" /> Return Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
