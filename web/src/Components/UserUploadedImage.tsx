export interface UserImageCardProps {
  imageSrc?: string | null;
  fileName?: string;
  timestamp?: string;
  onReplace?: () => void;
  onRemove?: () => void;
}

export default function UserImageCard({
  imageSrc,
  fileName = "ingredient_label.jpg",
  timestamp = "Just now",
  onReplace,
  onRemove,
}: UserImageCardProps) {
  return (
    <div
      style={{
        backgroundColor: "#F7F3EA",
        borderColor: "#C8D0CA",
      }}
      className="w-full max-w-xl rounded-xl border p-5 shadow-sm font-sans text-[#18201C]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#C8D0CA]">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#66736B]">
            Product Reference
          </span>
          <h3 className="text-md font-bold text-[#18201C] tracking-tight">
            Scanned Ingredient Label
          </h3>
        </div>

        {imageSrc ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#DDE5DF] text-[#23483A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#23483A]" />
            Active Scan
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E6D5B5] text-[#18201C]">
            No Image
          </span>
        )}
      </div>

      {/* Main Display Area */}
      {imageSrc ? (
        <div className="space-y-4">
          <div className="relative w-full h-64 rounded-lg overflow-hidden border border-[#C8D0CA] bg-[#DDE5DF]/30 flex items-center justify-center">
            <img
              src={imageSrc}
              alt="User uploaded ingredient label"
              className="w-full h-full object-contain p-2"
            />
          </div>

          {/* Metadata & Quick Action Controls */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-2 text-[#66736B] truncate max-w-[260px]">
              <span className="text-[#18201C] font-semibold truncate">
                {fileName}
              </span>
              <span>•</span>
              <span>{timestamp}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onReplace && (
                <button
                  type="button"
                  onClick={onReplace}
                  className="px-3 py-1.5 rounded-lg bg-[#DDE5DF] hover:bg-[#A9BCAF] text-[#23483A] font-semibold transition cursor-pointer"
                >
                  Replace
                </button>
              )}
              {onRemove && (
                <button
                  type="button"
                  onClick={onRemove}
                  className="px-3 py-1.5 rounded-lg bg-[#B96555]/10 hover:bg-[#B96555]/20 text-[#B96555] font-semibold transition cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Fallback Empty State */
        <div className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-[#C8D0CA] rounded-lg bg-[#DDE5DF]/20 text-center p-4">
          <div className="w-10 h-10 rounded-full bg-[#E6D5B5] flex items-center justify-center text-[#23483A] mb-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold text-[#18201C]">
            No image provided
          </p>
          <p className="text-xs text-[#66736B] mt-0.5">
            Pass an image URL via the{" "}
            <code className="text-[#23483A]">imageSrc</code> prop
          </p>
        </div>
      )}
    </div>
  );
}
