import React, { useState } from "react";
import {
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGithub,
} from "react-icons/si";
import {
  FaDatabase,
  FaServer,
  FaBrain,
  FaBookMedical,
  FaLock,
  FaShieldAlt,
  FaArrowRight,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaHome,
  FaSearch,
  FaCamera,
  FaCodeBranch,
} from "react-icons/fa";
import { MdSpeed } from "react-icons/md";

// --- Types ---

type FlowMode = "hit" | "miss";

interface MetricCardProps {
  label: string;
  val: string;
  sub: string;
}

interface SpecItemProps {
  title: string;
  badge: string;
  desc: string;
}

// --- Subcomponents ---

const SpecItem: React.FC<SpecItemProps> = ({ title, badge, desc }) => (
  <div className="p-4 bg-[#FDFEFD] rounded-xl border border-[#39624F]/15 flex flex-col justify-between">
    <div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-bold text-[#2A5242] text-sm">{title}</span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DFE2D6] text-[#2A5242] border border-[#39624F]/20">
          {badge}
        </span>
      </div>
      <p className="text-xs text-[#305B49] leading-relaxed">{desc}</p>
    </div>
  </div>
);

const MetricCard: React.FC<MetricCardProps> = ({ label, val, sub }) => (
  <div className="p-4 bg-[#F9F6EF] rounded-xl border border-[#39624F]/15">
    <span className="text-[11px] font-mono uppercase tracking-wider text-[#39624F]/80 block mb-1">
      {label}
    </span>
    <span className="text-xl font-extrabold text-[#2A5242] block font-mono">
      {val}
    </span>
    <span className="text-xs text-[#305B49]/80 mt-1 block">{sub}</span>
  </div>
);

// --- Main Page Component ---

export const AboutPage: React.FC = () => {
  const [activeBranch, setActiveBranch] = useState<FlowMode>("hit");

  // Fix: Replaces native hash jumps (#...) which force layout reflows down to the bottom
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navSections = [
    { id: "pipeline-engine", label: "Pipeline" },
    { id: "architecture-specs", label: "Architecture" },
    { id: "stack-dependencies", label: "Stack & Deps" },
    { id: "runtime-environments", label: "Local vs Demo" },
    { id: "system-guarantees", label: "Reliability & Limits" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFEFD] text-[#305B49] font-sans selection:bg-[#DDE5DF]">
      {/* 1. Global Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#FDFEFD]/95 backdrop-blur border-b border-[#DDE5DF] py-2.5 px-4 sm:px-8 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Quick Route Actions */}
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#DFE2D6] text-[#2A5242] hover:bg-[#305B49] hover:text-white transition-all border border-[#39624F]/20"
              title="Return to Main Application"
            >
              <FaHome className="text-sm" />
              <span>Home</span>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#F9F6EF] text-[#2A5242] hover:bg-[#305B49] hover:text-white transition-all border border-[#39624F]/20"
            >
              <SiGithub className="text-sm" />
              <span>Source</span>
            </a>
          </div>

          {/* Section Jumper */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto text-xs font-mono py-1">
            {navSections.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => scrollToSection(sec.id)}
                className="px-3 py-1.5 rounded-full text-[#305B49] hover:text-[#2A5242] hover:bg-[#DFE2D6] transition-colors whitespace-nowrap cursor-pointer"
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 2. Hero Header */}
      <header className="border-b border-[#DDE5DF] bg-gradient-to-b from-[#DFE2D6]/40 via-[#FDFEFD] to-[#FDFEFD] pt-12 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#DFE2D6] text-[#2A5242] border border-[#39624F]/20 mb-6">
            <span>MERN Engine</span>
            <span>•</span>
            <span>RAG Verification</span>
            <span>•</span>
            <span>Local & Cloud Inference</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#2A5242] tracking-tight mb-4">
            IngredientLens Technical Specification
          </h1>
          <p className="text-base sm:text-lg text-[#305B49] max-w-3xl mx-auto leading-relaxed mb-8">
            An open architecture designed to eliminate hallucinations in
            cosmetic chemistry by pairing multimodal OCR with deterministic
            clinical retrieval from PubMed, DermNet, and INCIDecoder.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <MetricCard
              label="Strategy"
              val="Cache-First"
              sub="MongoDB Atlas indexing"
            />
            <MetricCard
              label="OCR Engine"
              val="Gemini Vision"
              sub="Multimodal extraction"
            />
            <MetricCard
              label="Summarizer"
              val="Ollama / Gemini"
              sub="Local LLM with fallback"
            />
            <MetricCard
              label="Evidence"
              val="3 Sources"
              sub="PubMed, DermNet, INCI"
            />
          </div>
        </div>
      </header>

      {/* 3. Main Document Stream */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-20">
        {/* Section 1: Redesigned Pipeline Process */}
        <section id="pipeline-engine" className="scroll-mt-24">
          <div className="border-b border-[#DDE5DF] pb-4 mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#39624F]/70 block mb-1">
              Architecture Focus // Analysis Pipeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2A5242]">
              How the Analysis Pipeline Works
            </h2>
            <p className="text-xs sm:text-sm text-[#305B49] mt-2 leading-relaxed">
              IngredientLens enforces a{" "}
              <strong>database-first caching strategy</strong>. The system
              extracts individual ingredients via Gemini OCR and checks MongoDB
              Atlas for each one. Unindexed ingredients run through clinical
              evidence retrieval and summarization; indexed ingredients return
              immediately.
            </p>
          </div>

          {/* Stepper Pipeline Architecture */}
          <div className="space-y-6">
            {/* Step 1 & 2: Ingestion & Extraction */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#FDFEFD] border border-[#39624F]/20 relative shadow-xs">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-lg bg-[#DFE2D6] text-[#2A5242] flex items-center justify-center font-mono font-bold text-xs">
                    01
                  </span>
                  <div className="flex items-center gap-2 text-[#2A5242]">
                    <FaCamera className="text-sm text-[#39624F]" />
                    <h3 className="font-bold text-sm">
                      Image Upload & Sanitization
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[#305B49] leading-relaxed">
                  The client transmits a cosmetic product label photo. Express
                  intercepts the stream using Multer memory storage, validates
                  MIME types, and readies the image buffer for multi-modal
                  ingestion.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FDFEFD] border border-[#39624F]/20 relative shadow-xs">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-lg bg-[#DFE2D6] text-[#2A5242] flex items-center justify-center font-mono font-bold text-xs">
                    02
                  </span>
                  <div className="flex items-center gap-2 text-[#2A5242]">
                    <FaSearch className="text-sm text-[#39624F]" />
                    <h3 className="font-bold text-sm">
                      Gemini Vision OCR Extraction
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[#305B49] leading-relaxed">
                  Gemini parses unstructured label typography and transforms
                  curved text into a normalized array of standard INCI
                  ingredient tokens (e.g.{" "}
                  <code>["Aqua", "Niacinamide", "Retinol"]</code>).
                </p>
              </div>
            </div>

            {/* Step 3: Central Decision Hub (The Fork) */}
            <div className="p-6 rounded-2xl bg-[#F9F6EF] border-2 border-[#39624F]/20 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DF] pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 text-[#2A5242] font-bold text-sm">
                    <FaCodeBranch className="text-[#39624F]" />
                    <span>Stage 03: Per-Ingredient Cache Inspection</span>
                  </div>
                  <p className="text-xs text-[#305B49] mt-0.5">
                    Select a route to view how the application handles each
                    state:
                  </p>
                </div>

                {/* Path Toggle Buttons */}
                <div className="inline-flex p-1 bg-[#DFE2D6] rounded-xl border border-[#39624F]/20 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setActiveBranch("hit")}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      activeBranch === "hit"
                        ? "bg-[#305B49] text-white shadow-xs"
                        : "text-[#2A5242] hover:text-[#305B49]"
                    }`}
                  >
                    Branch A: Cache Hit
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveBranch("miss")}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                      activeBranch === "miss"
                        ? "bg-[#305B49] text-white shadow-xs"
                        : "text-[#2A5242] hover:text-[#305B49]"
                    }`}
                  >
                    Branch B: Cache Miss
                  </button>
                </div>
              </div>

              {/* Branch Details Display */}
              {activeBranch === "hit" ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#FDFEFD] rounded-xl border border-[#39624F]/20">
                    <span className="text-[10px] font-mono text-[#39624F] font-bold uppercase block mb-1">
                      Lookup Found
                    </span>
                    <h4 className="font-bold text-sm text-[#2A5242]">
                      1. Immediate Read
                    </h4>
                    <p className="text-xs text-[#305B49] mt-1">
                      MongoDB Atlas locates pre-analyzed ingredient data by
                      canonical name or alias.
                    </p>
                  </div>
                  <div className="p-4 bg-[#FDFEFD] rounded-xl border border-[#39624F]/20">
                    <span className="text-[10px] font-mono text-[#39624F] font-bold uppercase block mb-1">
                      Resource Bypass
                    </span>
                    <h4 className="font-bold text-sm text-[#2A5242]">
                      2. Zero Scraping / LLM
                    </h4>
                    <p className="text-xs text-[#305B49] mt-1">
                      External web scraping, NCBI calls, and Ollama/Gemini
                      summarizations are skipped.
                    </p>
                  </div>
                  <div className="p-4 bg-[#DFE2D6] rounded-xl border border-[#39624F]/30">
                    <span className="text-[10px] font-mono text-[#2A5242] font-bold uppercase block mb-1">
                      Result
                    </span>
                    <h4 className="font-bold text-sm text-[#2A5242]">
                      3. Instant UI Hydration
                    </h4>
                    <p className="text-xs text-[#305B49] mt-1">
                      Cached analysis returns directly through React Query in
                      milliseconds.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#305B49] text-[#FDFEFD] rounded-xl border border-[#2A5242]">
                    <span className="text-[10px] font-mono text-[#DDE5DF] font-bold uppercase block mb-1">
                      Harvesting
                    </span>
                    <h4 className="font-bold text-sm text-[#F9F6EF]">
                      1. Multi-Source Scraping
                    </h4>
                    <p className="text-xs text-[#DDE5DF] mt-1">
                      Cheerio dispatches concurrent queries to PubMed Central,
                      DermNet, and INCIDecoder.
                    </p>
                  </div>
                  <div className="p-4 bg-[#305B49] text-[#FDFEFD] rounded-xl border border-[#2A5242]">
                    <span className="text-[10px] font-mono text-[#DDE5DF] font-bold uppercase block mb-1">
                      Inference
                    </span>
                    <h4 className="font-bold text-sm text-[#F9F6EF]">
                      2. Evidence Summarization
                    </h4>
                    <p className="text-xs text-[#DDE5DF] mt-1">
                      Ollama (local) or Gemini (cloud demo) formats the raw
                      clinical text into deterministic JSON.
                    </p>
                  </div>
                  <div className="p-4 bg-[#305B49] text-[#FDFEFD] rounded-xl border border-[#2A5242]">
                    <span className="text-[10px] font-mono text-[#DDE5DF] font-bold uppercase block mb-1">
                      Persistence
                    </span>
                    <h4 className="font-bold text-sm text-[#F9F6EF]">
                      3. Write to Atlas
                    </h4>
                    <p className="text-xs text-[#DDE5DF] mt-1">
                      The generated analysis is written to MongoDB so future
                      queries hit the fast path.
                    </p>
                  </div>
                </div>
              )}

              {/* Per-Ingredient Demonstration Box */}
              <div className="mt-5 pt-4 border-t border-[#DDE5DF]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#39624F] font-bold block mb-2">
                  Sample Batch Evaluation:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-[#FDFEFD] border border-[#39624F]/20 flex items-center justify-between">
                    <span>Niacinamide</span>
                    <span className="text-[#39624F] font-bold">Cache Hit</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FDFEFD] border border-[#39624F]/20 flex items-center justify-between">
                    <span>Glycerin</span>
                    <span className="text-[#39624F] font-bold">Cache Hit</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#305B49] text-white border border-[#2A5242] flex items-center justify-between">
                    <span>Hexapeptide-11</span>
                    <span className="text-[#DFE2D6] font-bold">
                      Pipeline Run
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Architecture */}
        <section id="architecture-specs" className="scroll-mt-24">
          <div className="border-b border-[#DDE5DF] pb-4 mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#39624F]/70 block mb-1">
              Section 02 // Engineering Design
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2A5242]">
              System Architecture & Communication
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-[#FDFEFD] rounded-2xl border border-[#39624F]/20 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 text-[#2A5242]">
                  <SiReact className="text-xl text-[#39624F]" />
                  <h3 className="font-bold text-base">Client Interface</h3>
                </div>
                <p className="text-xs text-[#305B49] leading-relaxed mb-4">
                  Built on React 19 and Tailwind CSS. State is completely
                  decoupled between local UI interactions and remote data cache.
                </p>
                <ul className="text-xs space-y-2 text-[#305B49]">
                  <li>
                    <strong>TanStack Query:</strong> Retains cached ingredient
                    documents in client memory.
                  </li>
                  <li>
                    <strong>Axios:</strong> Handles multipart image transfers
                    and credential cookies.
                  </li>
                </ul>
              </div>
              <span className="text-[10px] font-mono text-[#39624F]/70 mt-6 pt-3 border-t border-[#DDE5DF] block">
                Protocol: REST / HTTPS
              </span>
            </div>

            <div className="p-6 bg-[#FDFEFD] rounded-2xl border border-[#39624F]/20 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 text-[#2A5242]">
                  <SiExpress className="text-xl text-[#39624F]" />
                  <h3 className="font-bold text-base">Node.js / Express</h3>
                </div>
                <p className="text-xs text-[#305B49] leading-relaxed mb-4">
                  Orchestrates asynchronous tasks, validates file boundaries,
                  and bridges external clinical literature APIs.
                </p>
                <ul className="text-xs space-y-2 text-[#305B49]">
                  <li>
                    <strong>Multer:</strong> Memory storage buffer for image
                    payloads.
                  </li>
                  <li>
                    <strong>Cheerio:</strong> High-performance server-side HTML
                    parser for clinical databases.
                  </li>
                </ul>
              </div>
              <span className="text-[10px] font-mono text-[#39624F]/70 mt-6 pt-3 border-t border-[#DDE5DF] block">
                Runtime: Express v5 on Node
              </span>
            </div>

            <div className="p-6 bg-[#FDFEFD] rounded-2xl border border-[#39624F]/20 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 text-[#2A5242]">
                  <SiMongodb className="text-xl text-[#39624F]" />
                  <h3 className="font-bold text-base">Persistence & AI</h3>
                </div>
                <p className="text-xs text-[#305B49] leading-relaxed mb-4">
                  Dual-purpose storage acting as both high-speed lookup cache
                  and perpetual analysis repository.
                </p>
                <ul className="text-xs space-y-2 text-[#305B49]">
                  <li>
                    <strong>MongoDB Atlas:</strong> Indexes ingredients to
                    prevent duplicate processing.
                  </li>
                  <li>
                    <strong>Ollama / Gemini:</strong> Pure summarization of
                    verified clinical text.
                  </li>
                </ul>
              </div>
              <span className="text-[10px] font-mono text-[#39624F]/70 mt-6 pt-3 border-t border-[#DDE5DF] block">
                Database: Cloud Mongoose Schema
              </span>
            </div>
          </div>

          <div className="p-5 bg-[#2A5242] text-[#DDE5DF] rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
            <span className="text-[#F9F6EF] block mb-2">
              // Conceptual MongoDB Document (Deduplication Record)
            </span>
            {`{
  "_id": "ObjectId('...')",
  "ingredientName": "Niacinamide",
  "aliases": ["Nicotinamide", "Pyridine-3-carboxamide"],
  "sources": [
    { "name": "PubMed Central", "type": "Clinical Studies", "retrieved": "2026-01" },
    { "name": "DermNet NZ", "type": "Dermatology Standard", "retrieved": "2026-01" },
    { "name": "INCIDecoder", "type": "Cosmetic Context", "retrieved": "2026-01" }
  ],
  "analysis": {
    "barrierRepair": "Clinically proven to stimulate ceramide synthesis",
    "irritationRisk": "Minimal under 5% concentrations",
    "contraindications": ["Low-pH ascorbic acid solutions causing transient flushing"]
  }
}`}
          </div>
        </section>

        {/* Section 3: Tech Stack & Dependencies */}
        <section id="stack-dependencies" className="scroll-mt-24">
          <div className="border-b border-[#DDE5DF] pb-4 mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#39624F]/70 block mb-1">
              Section 03 // Module Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2A5242]">
              Technologies & Core Dependencies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SpecItem
              title="@google/genai (^2.18.0)"
              badge="Vision & Fallback"
              desc="Interprets photographed product labels to extract raw INCI text strings. Also serves as the deployed summarization fallback when local inference hardware is unavailable."
            />
            <SpecItem
              title="ollama (^0.6.3)"
              badge="Local ML Inference"
              desc="Executes local LLMs on private compute during development. Summarizes gathered evidence without recurring token fees or transmitting data externally."
            />
            <SpecItem
              title="@tanstack/react-query (^5.102.8)"
              badge="Server State"
              desc="Manages asynchronous ingredient fetches, handles loading states across the multi-phase OCR pipeline, and prevents duplicate requests from the UI."
            />
            <SpecItem
              title="cheerio (^1.2.0)"
              badge="HTML Extraction"
              desc="Parses DOM structures scraped from external dermatology and cosmetic encyclopedias to extract clinical paragraphs while removing navigational noise."
            />
            <SpecItem
              title="mongoose (^9.9.2)"
              badge="Object Modeling"
              desc="Enforces typed document schemas for ingredient records, validating clinical citations and caching structured analyses."
            />
            <SpecItem
              title="groq-sdk (^1.6.0)"
              badge="Acceleration Hook"
              desc="Included as an available high-throughput API integration client for rapid inference and summarization."
            />
          </div>
        </section>

        {/* Section 4: Environments */}
        <section id="runtime-environments" className="scroll-mt-24">
          <div className="border-b border-[#DDE5DF] pb-4 mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#39624F]/70 block mb-1">
              Section 04 // Deployment Constraints
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2A5242]">
              Local vs. Deployed Architecture
            </h2>
          </div>

          <div className="p-6 bg-[#F9F6EF] rounded-2xl border border-[#39624F]/20 space-y-6">
            <p className="text-xs sm:text-sm text-[#305B49] leading-relaxed">
              Hosting local open-weights LLMs via Ollama in cloud environments
              requires dedicated GPU instances that are cost-prohibitive for
              standard demo deployments. Consequently, the application
              dynamically swaps its summarization engine based on the running
              environment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 bg-[#DFE2D6] rounded-xl border border-[#39624F]/20">
                <span className="font-bold text-[#2A5242] block mb-2 text-sm font-sans">
                  Local Development (Ollama)
                </span>
                <span className="text-[#39624F] block">
                  Evidence → Ollama (Local LLM) → Analysis
                </span>
                <p className="font-sans text-[11px] text-[#305B49] mt-2">
                  Zero token costs, completely offline inference, and no daily
                  volume quotas.
                </p>
              </div>

              <div className="p-4 bg-[#FDFEFD] rounded-xl border border-[#39624F]/20">
                <span className="font-bold text-[#2A5242] block mb-2 text-sm font-sans">
                  Deployed Cloud Demo (Gemini)
                </span>
                <span className="text-[#39624F] block">
                  Evidence → Gemini API → Analysis
                </span>
                <p className="font-sans text-[11px] text-[#2A5242] mt-2">
                  Strictly constrained to <strong>~8 requests per day</strong>{" "}
                  under deployment demo tiers.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#DFE2D6]/50 border border-[#39624F]/30 flex items-start gap-3">
              <FaExclamationTriangle className="text-[#2A5242] shrink-0 mt-0.5" />
              <p className="text-xs text-[#2A5242] leading-relaxed">
                <strong>Why the database cache is critical:</strong> Because the
                deployed demo is limited to ~8 Gemini requests per day,
                evaluating a single cosmetic product with 15 unfamiliar
                ingredients would immediately exhaust the daily quota without
                the database-first architecture. Stored analyses in MongoDB
                Atlas keep the demo viable.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Guarantees, Security, and Limits */}
        <section id="system-guarantees" className="scroll-mt-24">
          <div className="border-b border-[#DDE5DF] pb-4 mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#39624F]/70 block mb-1">
              Section 05 // Reliability Spec
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2A5242]">
              System Guarantees & Constraints
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#FDFEFD] rounded-xl border border-[#39624F]/20">
              <div className="flex items-center gap-2 mb-3">
                <FaShieldAlt className="text-[#39624F]" />
                <h4 className="font-bold text-[#2A5242] text-sm">
                  Security Standards
                </h4>
              </div>
              <ul className="text-xs text-[#305B49] space-y-2">
                <li>
                  • JWT authentication stored strictly in{" "}
                  <strong>HttpOnly</strong> cookies.
                </li>
                <li>
                  • All API keys, tokens, and database credentials remain on the
                  Express server.
                </li>
                <li>
                  • Image uploads are verified via Multer memory buffers and
                  MIME headers.
                </li>
              </ul>
            </div>

            <div className="p-5 bg-[#FDFEFD] rounded-xl border border-[#39624F]/20">
              <div className="flex items-center gap-2 mb-3">
                <MdSpeed className="text-[#39624F]" />
                <h4 className="font-bold text-[#2A5242] text-sm">
                  Fault Tolerance
                </h4>
              </div>
              <ul className="text-xs text-[#305B49] space-y-2">
                <li>
                  • Scraper timeouts prevent hung connections when external
                  sites alter DOM structures.
                </li>
                <li>
                  • Partial product analysis: cached ingredients render
                  immediately if others fail.
                </li>
                <li>
                  • Explicit "Evidence Missing" notices rather than synthetic
                  hallucinated claims.
                </li>
              </ul>
            </div>

            <div className="p-5 bg-[#FDFEFD] rounded-xl border border-[#39624F]/20">
              <div className="flex items-center gap-2 mb-3">
                <FaLock className="text-[#39624F]" />
                <h4 className="font-bold text-[#2A5242] text-sm">
                  Known Limitations
                </h4>
              </div>
              <ul className="text-xs text-[#305B49] space-y-2">
                <li>
                  • Deployed demo rate cap: ~8 requests per day on Gemini API.
                </li>
                <li>
                  • External DOM dependency: Web changes on source sites can
                  break extractors.
                </li>
                <li>
                  • Local Ollama performance depends on available host CPU/VRAM
                  resources.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DDE5DF] bg-[#F9F6EF] py-8 px-4 text-center text-xs font-mono text-[#39624F]/80">
        <div className="flex justify-center items-center gap-4 mb-3">
          <a href="/" className="hover:underline">
            Home
          </a>
          <span>•</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
        </div>
        IngredientLens System Specification • Built with React 19, Express,
        MongoDB Atlas, and Tailwind CSS
      </footer>
    </div>
  );
};

export default AboutPage;
