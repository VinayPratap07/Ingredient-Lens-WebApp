import { FiSearch, FiLayers, FiShield } from "react-icons/fi";

export default function PromoSection() {
  const highlights = [
    {
      icon: FiSearch,
      title: "Deconstruct Ingredients",
      description:
        "Break down chemical names and active compounds into simple, clear explanations.",
    },
    {
      icon: FiShield,
      title: "Safety & Irritation Check",
      description:
        "Identify pore-clogging comedogenics, common allergens, and harsh synthetic additives.",
    },
    {
      icon: FiLayers,
      title: "Formulation Synergy",
      description:
        "Understand how active ingredients interact and complement your overall routine.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      {/* Header Container */}
      <div className="max-w-3xl space-y-4">
        <span className="inline-block rounded-full bg-[#E6D5B5]/50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#23483A]">
          Ingredient Intelligence
        </span>
        <h2 className="text-xl font-black tracking-tight text-[#23483A] sm:text-3xl">
          Know more about your skincare products.
        </h2>
        <p className="text-base leading-relaxed text-[#18201C]/80 sm:text-sm">
          Turn complex chemical labels into actionable insights. Simply scan or
          paste your product's ingredient list to unlock data-backed safety
          profiles and benefits.
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="flex flex-col rounded-3xl border border-emerald-900/10 bg-gradient-to-b from-[#E6D5B5]/15 to-transparent p-6 transition-all duration-200 hover:border-[#23483A]/30 hover:shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#23483A] text-white">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-[#18201C]">
              {item.title}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#18201C]/70">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Action Banner / Tagline */}
      <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-[#23483A] to-[#315C4A] p-8 text-white sm:flex-row sm:p-10">
        <div>
          <p className="text-2xl font-black tracking-wide sm:text-3xl">
            Scan. Analyze. Understand.
          </p>
          <p className="mt-1 text-md text-emerald-100/80">
            Make confident, informed choices about what goes on your skin.
          </p>
        </div>
        <a
          href="#upload-photo"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#E6D5B5] px-6 py-3 text-sm font-bold text-[#18201C] transition-all hover:bg-white hover:shadow-md active:scale-95"
        >
          Try Product Scanner
        </a>
      </div>
    </section>
  );
}
