import { useMutation } from "@tanstack/react-query";
import React, { useState, useRef } from "react";
import { FiUploadCloud, FiX, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router";
import { imageAnalysis } from "../API_Services/Analysis_Api";

export default function UploadImage({
  onAnalyze,
}: {
  onAnalyze?: (file: File) => void;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const clearSelection = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const mutation = useMutation({
    mutationFn: imageAnalysis,
    onSuccess: (data) => {
      navigate(`/image-analysis/${data.analysisId}`);
    },
    onError: (error) => {
      alert("error uploading image");
    },
  });

  const handleAnalyze = () => {
    if (selectedFile && onAnalyze) {
      onAnalyze(selectedFile);
    }
    if (!selectedFile) {
      return;
    }

    mutation.mutate({
      thumbnail: selectedFile,
    });
  };

  return (
    <section className="mx-auto w-full max-w-xl px-4 py-8">
      {/* Upload Box / Preview Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-6 text-center transition-all duration-200 ${
          isDragging
            ? "border-[#23483A] bg-[#E6D5B5]/50 scale-[1.01]"
            : "border-[#23483A]/30 bg-[#E6D5B5]/20 hover:border-[#23483A] hover:bg-[#E6D5B5]/30"
        }`}
        onClick={() => !selectedFile && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          id="upload-photo"
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        />

        {previewUrl ? (
          <div className="relative flex flex-col items-center">
            <div className="relative h-48 w-48 overflow-hidden rounded-2xl shadow-md">
              <img
                src={previewUrl}
                alt="Uploaded skin area preview"
                className="h-full w-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
              }}
              aria-label="Remove image"
              className="absolute -top-2 -right-2 rounded-full bg-red-600 p-1.5 text-white shadow hover:bg-red-700 focus:outline-none"
            >
              <FiX className="h-4 w-4" />
            </button>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#23483A]">
              <FiCheckCircle className="text-emerald-700" />
              {selectedFile?.name}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <div className="rounded-full bg-[#23483A]/10 p-4 text-[#23483A]">
              <FiUploadCloud className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold text-[#18201C]">
                Upload a clear photo
              </p>
              <p className="text-xs text-[#18201C]/70">
                Drag and drop or browse (JPEG, PNG, WEBP up to 10MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          disabled={!selectedFile}
          onClick={handleAnalyze}
          className={`w-full rounded-2xl py-4 text-center text-lg font-bold tracking-wide transition-all duration-200 shadow-md ${
            selectedFile
              ? "bg-[#23483A] text-white hover:bg-[#315C4A] hover:shadow-lg active:scale-[0.99] cursor-pointer"
              : "bg-neutral-300 text-neutral-500 cursor-not-allowed shadow-none"
          }`}
        >
          Analyze Now
        </button>
      </div>
    </section>
  );
}
