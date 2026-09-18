import { useState } from "react";
import {
  FaGithub,
  FaDatabase,
  FaShieldAlt,
  FaBookOpen,
  FaServer,
  FaCode,
} from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import { SiSparkar } from "react-icons/si";
import { FaFlask } from "react-icons/fa6";
import { Link } from "react-router";

const TECH_STACK = [
  {
    category: "Frontend Experience",
    badge: "Client-Side",
    icon: <FaCode className="w-5 h-5 text-[#204533]" />,
    items: [
      { name: "React 18", desc: "Component-driven reactive user interface" },
      {
        name: "TypeScript",
        desc: "Strict end-to-end typed safety for ingredient payloads",
      },
      {
        name: "Tailwind CSS",
        desc: "Design-system styled with natural cosmetic hues",
      },
      {
        name: "TanStack Query",
        desc: "Optimistic caching & server-state syncing",
      },
    ],
  },
  {
    category: "Backend Engine",
    badge: "Core Service",
    icon: <FaServer className="w-5 h-5 text-[#204533]" />,
    items: [
      {
        name: "Node.js & Express",
        desc: "REST micro-pipeline & file streaming gateway",
      },
      {
        name: "MongoDB & Mongoose",
        desc: "Schema persistence for ingredient knowledge graphs",
      },
      {
        name: "Multer Middleware",
        desc: "Safe multipart buffer handling for cosmetic photos",
      },
      {
        name: "JWT Auth",
        desc: "Stateless, secure tokenized user authentication",
      },
    ],
  },
  {
    category: "AI & Processing",
    badge: "Intelligence Layer",
    icon: <SiSparkar className="w-5 h-5 text-[#204533]" />,
    items: [
      {
        name: "Gemini & Groq",
        desc: "Low-latency large language model synthesis",
      },
      {
        name: "Llama 3.1:8B Instruct",
        desc: "Quantized on-demand clinical evidence extraction",
      },
      {
        name: "Cheerio Web Scraper",
        desc: "Real-time extraction of chemical nomenclatures",
      },
    ],
  },
  {
    category: "Evidence Sources",
    badge: "Clinical Verification",
    icon: <FaBookOpen className="w-5 h-5 text-[#204533]" />,
    items: [
      {
        name: "PubMed Central",
        desc: "Peer-reviewed biomedical literature and clinical trials",
      },
      {
        name: "DermNet NZ",
        desc: "Dermatological authoritative skin biology repository",
      },
      {
        name: "INCIDecoder",
        desc: "International standard cosmetic ingredient dictionary",
      },
    ],
  },
];

const PRINCIPLES = [
  {
    number: "01",
    title: "Evidence Over Assumptions",
    description:
      "Every cosmetic verdict is rooted in peer-reviewed dermatology and clinical literature—never ungrounded LLM hallucinations.",
    icon: <FaFlask className="w-6 h-6 text-[#204533]" />,
  },
  {
    number: "02",
    title: "Reuse Before Recompute",
    description:
      "Prioritizing the ingredient database cache eliminates redundant AI invocations, cutting API costs and latency to sub-second speeds.",
    icon: <MdRefresh className="w-6 h-6 text-[#204533]" />,
  },
  {
    number: "03",
    title: "Radical Simplicity",
    description:
      "Packaging complex OCR extraction, regex normalization, and biochemical taxonomies into a one-tap image upload.",
    icon: <FaShieldAlt className="w-6 h-6 text-[#204533]" />,
  },
];

const ROADMAP_ITEMS = [
  {
    title: "Product-Level Safety Scoring",
    description:
      "Aggregate overall formulation balance instead of isolated ingredient evaluations.",
  },
  {
    title: "Cross-Ingredient Interaction Engine",
    description:
      "Detect conflicting active pairings such as high-strength AHAs combined with unbuffered Retinoids.",
  },
  {
    title: "Redis Low-Latency Layer",
    description:
      "Sub-millisecond query caches for the top 5,000 most commonly scanned ingredients globally.",
  },
  {
    title: "Personalized Sensitivity Matrix",
    description:
      "Custom user profiles flagging comedogenic, fragrance, and eczema-triggering chemicals.",
  },
];

const PipelineVisualizer = () => {
  const [activeStep, setActiveStep] = useState(2);

  const steps = [
    {
      id: 0,
      title: "1. Image Upload & OCR",
      sub: "Multipart ingest via Multer",
      detail:
        "The uploaded product packaging image is preprocessed with noise filtering before passing into the OCR engine. Text lines are tokenized and cleaned into potential chemical nomenclature.",
    },
    {
      id: 1,
      title: "2. Fuzzy DB Lookup",
      sub: "Alias & INCI mapping",
      detail:
        "Queries MongoDB using fuzzy string distance algorithms. Recognizes variations like 'Foeniculum Vulgare Fruit Extract' vs 'Fennel Extract', preventing duplicate entries.",
    },
    {
      id: 2,
      title: "3. Cache vs AI Branch",
      sub: "Database-First evaluation",
      detail:
        "If the normalized ingredient exists with complete research, it returns instantly (< 120ms). If absent, the payload enters the asynchronous AI clinical retrieval queue.",
    },
    {
      id: 3,
      title: "4. PubMed & DermNet AI",
      sub: "Evidence synthesis",
      detail:
        "Llama 3.1 parses clinical literature (PubMed, DermNet, INCIDecoder and SkinSort). It breaks down cosmetic functions, proven benefits, potential risks, and verified study citations.",
    },
    {
      id: 4,
      title: "5. Persistent Store & UI",
      sub: "Cached for future users",
      detail:
        "The synthesized clinical profile is committed to MongoDB Atlas. Subsequent scans by any user worldwide for this ingredient are instantly served from disk.",
    },
  ];

  return (
    <div className="bg-[#edf2eb] border border-[#cedad0] rounded-2xl p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row gap-6 items-start justify-between border-b border-[#cedad0] pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#204533] bg-[#dbe6d9] px-3 py-1 rounded-full">
            Execution Flow
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#13241b] mt-2">
            The Database-First Processing Pipeline
          </h3>
          <p className="text-[#4f6657] text-sm max-w-xl mt-1">
            Click each step in the sequential pipeline to inspect how
            IngredientLens handles raw images and minimizes redundant AI
            compute.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#f8faf7] px-4 py-2 rounded-xl border border-[#cedad0] text-xs font-mono text-[#204533]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
          Pipeline Status: Active
        </div>
      </div>

      {/* Step Selector Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 my-6">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`text-left p-3 rounded-xl transition-all border ${
                isActive
                  ? "bg-[#204533] text-white border-[#204533] shadow-md -translate-y-0.5"
                  : "bg-[#f8faf7] text-[#13241b] border-[#cedad0] hover:bg-[#e4ede2]"
              }`}
            >
              <div
                className={`text-xs font-semibold ${isActive ? "text-[#c6ab7e]" : "text-[#4f6657]"}`}
              >
                Step {step.id + 1}
              </div>
              <div className="text-sm font-medium truncate mt-0.5">
                {step.title.split(". ")[1]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase */}
      <div className="bg-[#f8faf7] border border-[#cedad0] rounded-xl p-5 sm:p-6 transition-all">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#204533] text-white text-sm font-bold">
              {activeStep + 1}
            </span>
            <h4 className="text-lg font-semibold text-[#13241b]">
              {steps[activeStep].title}
            </h4>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-[#e3ebe1] text-[#204533] font-mono font-medium">
            {steps[activeStep].sub}
          </span>
        </div>
        <p className="mt-3 text-sm text-[#3b5043] leading-relaxed">
          {steps[activeStep].detail}
        </p>
      </div>

      {/* Visual ASCII Flow Chart representation for developers */}
      <div className="mt-6 bg-[#163124] text-[#d6ded4] rounded-xl p-4 sm:p-5 font-mono text-xs overflow-x-auto shadow-inner">
        <div className="text-emerald-400 mb-2 font-bold flex items-center gap-2">
          <span>{">"}</span> System Architecture Pathway
        </div>
        <pre className="text-emerald-100/90 leading-snug">
          {`User Photo ──► Multer Filter ──► OCR Extraction ──► MongoDB Search
                                                        │
                      ┌─────────────────────────────────┴─────────────────────────────────┐
                      ▼                                                                   ▼
             [ Analysis Exists ]                                                 [ Analysis Missing ]
                      │                                                                   │
             Instant DB Return (100ms)                                       LLM Research Pipeline (Pubmed/DermNet)
                      ▲                                                                   │
                      │                                                          MongoDB Auto-Indexing
                      └────────────────────────── Response Payload ◄──────────────────────┘`}
        </pre>
      </div>
    </div>
  );
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#f8faf7] text-[#13241b] flex flex-col font-sans selection:bg-[#204533] selection:text-white">
      {}

      {}
      <section className="bg-gradient-to-b from-[#204533] to-[#173627] text-white pt-16 pb-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle ambient decorative circle */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-950/40 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block mb-3">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#c6ab7e] bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-sm">
              INGREDIENT INTELLIGENCE & ARCHITECTURE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight sm:leading-snug">
            Ingredient Lens
          </h1>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-[#d8e2dc] max-w-2xl mx-auto font-light leading-relaxed">
            IngredientLens is an AI-powered cosmetic analysis platform that
            scans product ingredient labels, extracts scientific evidence, and
            delivers honest safety, function, and clinical research.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="px-6 py-2.5 rounded-full bg-[#f8faf7] text-[#204533] font-semibold text-sm hover:bg-[#e4ede2] transition shadow-md flex items-center gap-2"
            >
              Try the Lens Scanner
              <FiArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="https://github.com/VinayPratap07/Ingredient-Lens-WebApp"
              target="_blank"
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/20 transition backdrop-blur-sm"
            >
              <FaGithub className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
          </div>
        </div>
      </section>

      {}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 space-y-16">
        {/* Core Value Proposition Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 relative z-20">
          <div className="bg-[#ffffff] border border-[#cedad0] rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-[#edf2eb] flex items-center justify-center text-[#204533] mb-4">
              <SiSparkar className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#13241b]">
              OCR Extraction
            </h3>
            <p className="text-[#4f6657] text-sm mt-2 leading-relaxed">
              Upload photos of curved bottles or fine-print packaging.
              Intelligent image preprocessing isolates cosmetic INCI titles
              accurately.
            </p>
          </div>

          <div className="bg-[#ffffff] border border-[#cedad0] rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-[#edf2eb] flex items-center justify-center text-[#204533] mb-4">
              <FaDatabase className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#13241b]">
              Database-First Cache
            </h3>
            <p className="text-[#4f6657] text-sm mt-2 leading-relaxed">
              Why run an LLM 1,000 times for Niacinamide? We search pre-verified
              chemical analyses before triggering expensive AI research passes.
            </p>
          </div>

          <div className="bg-[#ffffff] border border-[#cedad0] rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-[#edf2eb] flex items-center justify-center text-[#204533] mb-4">
              <FaFlask className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#13241b]">
              Clinical Literature
            </h3>
            <p className="text-[#4f6657] text-sm mt-2 leading-relaxed">
              Synthesizing DermNet, PubMed, SkinSort and INCIDecoder to provide
              factual references rather than vague marketing terminology.
            </p>
          </div>
        </section>

        {}
        <section id="architecture" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#204533] bg-[#edf2eb] px-3 py-1 rounded-full border border-[#cedad0]">
                Performance Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#13241b] mt-2">
                Why Database-First Architecture?
              </h2>
            </div>
            <p className="text-[#4f6657] text-sm max-w-md">
              AI inference is compute-heavy, costly, and subject to external
              latency. IngredientLens reuses stored clinical knowledge like a
              global brain.
            </p>
          </div>

          {/* Side-by-side comparison cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Inefficient Model */}
            <div className="bg-[#ffffff] border border-red-200/80 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-100 text-red-800 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wide">
                Naive Approach
              </div>
              <div>
                <h4 className="font-bold text-[#13241b] text-base mb-1">
                  Direct AI Every Request
                </h4>
                <p className="text-xs text-[#4f6657] mb-4">
                  Every scan executes heavy LLM inference regardless of
                  frequency.
                </p>
                <div className="space-y-2 text-xs font-mono bg-[#fdf8f8] p-3 rounded-lg border border-red-100 text-red-900">
                  <div>100 Users scan Niacinamide</div>
                  <div>──► 100 LLM API Queries</div>
                  <div>──► ~$0.30 - $1.20 API costs consumed</div>
                  <div>──► High 3-7s response latency</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-red-100 flex items-center gap-2 text-xs text-red-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Wasteful, high-cost & poor scalability
              </div>
            </div>

            {/* IngredientLens Database First Model */}
            <div className="bg-[#edf2eb] border border-[#204533]/30 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 bg-[#204533] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wide">
                IngredientLens Way
              </div>
              <div>
                <h4 className="font-bold text-[#13241b] text-base mb-1">
                  Persistent Analysis Caching
                </h4>
                <p className="text-xs text-[#4f6657] mb-4">
                  Query MongoDB first. Synthesize with AI once, serve to
                  millions.
                </p>
                <div className="space-y-2 text-xs font-mono bg-[#f8faf7] p-3 rounded-lg border border-[#cedad0] text-[#204533]">
                  <div>User 1 ──► DB Miss ──► AI Research ──► Save DB</div>
                  <div>User 2..100 ──► DB Hit (Indexed) ──► 50ms Return</div>
                  <div>──► 99% cost reduction on high-volume runs</div>
                  <div>──► Scalable under sudden viral product traffic</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#cedad0] flex items-center gap-2 text-xs text-[#204533] font-medium">
                <circle className="w-4 h-4 text-emerald-700" />
                Sub-100ms response & persistent scientific records
              </div>
            </div>
          </div>

          {/* Interactive Pipeline Widget */}
          <PipelineVisualizer />
        </section>

        {}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#204533] bg-[#edf2eb] px-3 py-1 rounded-full border border-[#cedad0]">
              Guiding Ethos
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#13241b] mt-2">
              Our Core Design Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRINCIPLES.map((principle, idx) => (
              <div
                key={idx}
                className="bg-[#ffffff] border border-[#cedad0] rounded-2xl p-6 relative hover:border-[#204533] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono font-bold text-2xl text-[#204533]/40">
                      {principle.number}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#edf2eb]">
                      {principle.icon}
                    </div>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#13241b] mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-[#4f6657] text-xs sm:text-sm leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#204533] bg-[#edf2eb] px-3 py-1 rounded-full border border-[#cedad0]">
                Engineering
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#13241b] mt-2">
                The Full-Stack Ecosystem
              </h2>
            </div>
            <span className="text-xs text-[#4f6657]">
              MERN Architecture with Multi-Model AI
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_STACK.map((group, idx) => (
              <div
                key={idx}
                className="bg-[#ffffff] border border-[#cedad0] rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-xl bg-[#edf2eb]">
                      {group.icon}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#204533] bg-[#edf2eb] px-2 py-0.5 rounded">
                      {group.badge}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-[#13241b] mb-3">
                    {group.category}
                  </h3>

                  <ul className="space-y-3">
                    {group.items.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="border-b border-[#edf2eb] pb-2 last:border-0 last:pb-0"
                      >
                        <div className="font-semibold text-xs text-[#13241b] flex items-center justify-between">
                          <span>{item.name}</span>
                        </div>
                        <p className="text-[11px] text-[#4f6657] mt-0.5 leading-snug">
                          {item.desc}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {}
        <section className="bg-[#163124] text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-md">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-emerald-900/80">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#c6ab7e]">
                Document Schema
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                Cosmetic Knowledge Graph Record
              </h3>
            </div>
            <div className="text-xs font-mono text-emerald-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
              Collection: db.ingredients
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#0f2118] p-4 sm:p-5 rounded-xl border border-emerald-900/60 font-mono text-xs overflow-x-auto">
              <pre className="text-emerald-300/90 leading-relaxed">
                {`{
  "_id": "65e2b02f9c32a0014ef82b91",
  "name": "Foeniculum Vulgare (Fennel) Fruit Extract",
  "aliases": [
    "Fennel Fruit Extract",
    "Foeniculum Vulgare Extract"
  ],
  "cosmeticFunction": [
    "Skin Conditioning",
    "Antioxidant"
  ],
  "analysis": {
    "safetyRating": "Generally Safe",
    "evidenceLevel": "Moderate Clinical Evidence",
    "benefits": [
      "Free radical neutralization via trans-anethole flavonoids",
      "Slight anti-inflammatory action on irritated skin"
    ],
    "concerns": [
      "Potential contact allergic dermatitis in sensitive cohorts"
    ],
    "citations": [
      { "source": "PubMed", "pmid": "31548231" }
    ]
  },
  "cachedAt": "2026-03-12T08:14:22Z"
}`}
              </pre>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center space-y-4 text-xs sm:text-sm text-[#d8e2dc]">
              <h4 className="font-serif text-base font-bold text-white">
                Fuzzy Normalization in Action
              </h4>
              <p className="leading-relaxed">
                Bottles frequently spell the same compound differently. When OCR
                captures <em>"Foeniculum Vulgare Fruit Extract"</em>, the
                Mongoose alias index resolves it directly without spinning up
                duplicate records.
              </p>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-emerald-300">
                  <circle className="w-4 h-4" />
                  <span>Prevents split rating reports</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <circle className="w-4 h-4" />
                  <span>Guarantees verified citation traceability</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#204533] bg-[#edf2eb] px-3 py-1 rounded-full border border-[#cedad0]">
                Evolution
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#13241b] mt-2">
                What’s Next for IngredientLens
              </h2>
            </div>
            <span className="text-xs text-[#4f6657]">
              Continuous research & product improvements
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ROADMAP_ITEMS.map((item, index) => (
              <div
                key={index}
                className="bg-[#ffffff] border border-[#cedad0] rounded-xl p-5 hover:border-[#204533] transition flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-[#edf2eb] text-[#204533] flex items-center justify-center font-bold text-xs flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-[#13241b]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#4f6657] mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {}
        <section className="bg-gradient-to-r from-[#204533] to-[#28523d] text-white rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-lg">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight">
              Ready to analyze your skincare shelf?
            </h2>
            <p className="text-[#d8e2dc] text-sm sm:text-base font-light">
              Take a snap of any cosmetics packaging, get scientific
              transparency in seconds, and shop with confidence.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Link
                to="/"
                className="px-6 py-2.5 rounded-full bg-white text-[#204533] font-semibold text-sm hover:bg-[#edf2eb] transition shadow"
              >
                Go to Image Scanner
              </Link>
              <Link
                to="https://github.com/VinayPratap07/Ingredient-Lens-WebApp"
                target="_blank"
                className="px-6 py-2.5 rounded-full bg-[#163124] text-white font-medium text-sm hover:bg-[#0f241a] transition border border-white/20 flex items-center gap-2"
              >
                <FaGithub className="w-4 h-4" />
                Contribute on GitHub
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
