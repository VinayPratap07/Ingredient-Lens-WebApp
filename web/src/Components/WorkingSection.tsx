import {
  FiCamera,
  FiCpu,
  FiActivity,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";

export default function WorkingSection() {
  const steps = [
    {
      step: "01",
      title: "Upload",
      description: "Snap or upload a photo of the product's ingredient label.",
      icon: FiCamera,
    },
    {
      step: "02",
      title: "Extract",
      description: "OCR engine isolates and parses individual chemical names.",
      icon: FiCpu,
    },
    {
      step: "03",
      title: "Analyze",
      description:
        "Cross-checks against clinical databases for safety and efficacy.",
      icon: FiActivity,
    },
    {
      step: "04",
      title: "Understand",
      description:
        "Review a clean breakdown of benefits, alerts, and active functions.",
      icon: FiCheckCircle,
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      {/* Header */}
      <div className="text-center md:text-left max-w-2xl">
        <span className="inline-block rounded-full bg-[#E6D5B5]/60 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#23483A]">
          Process
        </span>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-[#23483A] sm:text-3xl">
          Ingredients Simplified
        </h2>
        <p className="mt-2 text-base text-[#18201C]/80 sm:text-md">
          Turn any complex product label into clear, actionable data in four
          simple steps.
        </p>
      </div>

      {/* Sequential Steps Grid */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((item, idx) => (
          <div
            key={item.step}
            className="relative flex flex-col justify-between rounded-3xl border border-emerald-900/10 bg-[#E6D5B5]/20 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#23483A]/30 hover:shadow-md"
          >
            <div>
              {/* Top Row: Step Number & Icon */}
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black tracking-tight text-[#23483A]">
                  {item.step}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#23483A] text-white">
                  <item.icon className="h-5 w-5" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="mt-6 text-xl font-bold text-[#18201C]">
                {item.title}
              </h3>
              <p className="mt-2 text-md leading-relaxed text-[#18201C]/75">
                {item.description}
              </p>
            </div>

            {/* Desktop Sequence Indicator (Arrow) */}
            {idx < steps.length - 1 && (
              <div className="hidden lg:absolute -right-3 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white p-1 text-[#23483A] shadow-sm border border-emerald-900/10">
                <FiArrowRight className="h-3.5 w-3.5" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Pipeline Track */}
      <div className="mt-10 flex items-center justify-center rounded-2xl bg-[#23483A]/5 py-3.5 px-6 text-center">
        <p className="text-xs sm:text-base font-bold tracking-wider text-[#23483A] uppercase">
          Scan <span className="mx-2 text-emerald-600">→</span> Extract{" "}
          <span className="mx-2 text-emerald-600">→</span> Analyze{" "}
          <span className="mx-2 text-emerald-600">→</span> Understand
        </p>
      </div>
    </section>
  );
}
