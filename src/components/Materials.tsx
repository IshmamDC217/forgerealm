"use client";
import { useRef } from "react";
import { TbLeaf } from "react-icons/tb";

export default function Materials() {
  const ref = useRef(null);

  return (
    <section
      id="materials"
      className="theme-surface relative py-24 bg-transparent overflow-hidden border-y border-white/10"
    >
      {/* Subtle background lights */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-[140px]" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-indigo-500/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(59,130,246,0.08),transparent_34%),radial-gradient(circle_at_76%_16%,rgba(16,185,129,0.08),transparent_32%),radial-gradient(circle_at_55%_80%,rgba(129,140,248,0.08),transparent_32%)]" />
      </div>

      <div
        ref={ref}
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative"
      >
        {/* Header with icon */}
        <div className="max-w-2xl flex items-center gap-3">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white whitespace-nowrap">
            Materials
          </h2>
          <div className="relative flex-shrink-0 flex items-center text-emerald-200 drop-shadow-[0_0_16px_rgba(110,231,183,0.55)]">
            <TbLeaf className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden />
          </div>
        </div>

        <p className="mt-3 text-slate-200/80 max-w-xl">
          We offer the following filaments for 3D printing:
        </p>

        {/* Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-2">
          {[
            {
              title: "PLA",
              label: "Eco-friendly",
              labelColor: "text-green-400 border-green-400/50 bg-green-400/10",
              points: [
                "Biodegradable and sustainable",
                "Renewable and low impact",
              ],
              colorDot: "bg-green-400",
              desc: "Biodegradable and made from renewable resources. Our main filament, eco-friendly, safe, and perfect for customisation.",
            },
            {
              title: "PETG",
              label: "Recyclable",
              labelColor: "text-blue-400 border-blue-400/50 bg-blue-400/10",
              points: [
                "Durable and flexible structure",
                "Ideal for high-stress parts",
              ],
              colorDot: "bg-blue-400",
              desc: "Recyclable and durable. A strong, flexible option for prints needing extra toughness.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition-all hover:border-blue-400/70 hover:shadow-[0_0_35px_-8px_rgba(59,130,246,0.4)]"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[color:var(--fg)]">
                  {item.title}
                </h3>
                <span
                  className={`text-xs rounded-full border px-2 py-0.5 ${item.labelColor}`}
                >
                  {item.label}
                </span>
              </div>
              <p className="text-sm text-slate-200/80 leading-relaxed">
                {item.desc}
              </p>

              <ul className="mt-5 space-y-2 text-sm text-slate-200/80">
                {item.points.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span
                      className={`h-2 w-2 rounded-full ${item.colorDot} flex-shrink-0`}
                    />
                    <span className="leading-snug">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer capsule */}
        <div className="max-w-2xl mt-12">
          <div className="inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-900 to-emerald-800 text-white text-sm font-semibold shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]">
            We focus on sustainable materials. More filament types and resin
            printing coming soon.
          </div>
        </div>
      </div>

      {/* Float animation keyframes */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
