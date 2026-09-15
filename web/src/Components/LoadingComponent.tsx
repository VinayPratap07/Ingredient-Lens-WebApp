interface LoadingProps {
  label?: string;
  fullscreen?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-3",
  lg: "w-12 h-12 border-4",
};

export default function Loading({
  label = "Loading...",
  fullscreen = false,
  size = "md",
}: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      {/* Spinner */}
      <div
        className={`rounded-full border-[#C8D0CA] border-t-[#23483A] animate-spin ${SIZES[size]}`}
        role="status"
        aria-label="Loading"
      />

      {/* Label */}
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wider text-[#66736B]">
          {label}
        </span>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#DDE5DF]/80 backdrop-blur-xs font-sans">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8 w-full font-sans">
      {content}
    </div>
  );
}
