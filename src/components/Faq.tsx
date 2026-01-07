"use client";
import { HiChevronDown } from "react-icons/hi";
import { FaQuestionCircle } from "react-icons/fa";

export default function Faq() {
  const faqs = [
    {
      q: "Where do you sell and ship?",
      a:
        "We're based in Leeds and you'll often find us at local stalls. We ship 3D prints anywhere in the UK. Order online or visit us in person for friendly, expert advice.",
    },
    {
      q: "Are your materials eco-friendly?",
      a:
        "We care about the impact of every part we sell. Our PLA is biodegradable, and we offer PETG with recyclable properties. We're always working to make 3D printing more sustainable.",
    },
    {
      q: "Can I order custom prints?",
      a:
        "Absolutely! Contact us with your ideas or designs. We're happy to help and love bringing your projects to life. Expect quality prints and friendly service.",
    },
  ];

  return (
    <section
      id="faq"
      data-observe
      className="reveal theme-surface relative py-24 overflow-hidden bg-gradient-to-bl from-[#0b0b0e] via-[#101018] to-[#1a1408] border-y border-white/10"
    >
      {/* Ambient yellow glow lights */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-yellow-200/30 blur-[120px] -z-10" />
      <div className="absolute right-1/3 bottom-0 h-72 w-72 rounded-full bg-amber-400/20 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[360px_1fr]">
          {/* Left spotlight */}
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-amber-400/20 via-yellow-500/10 to-transparent blur-[120px]" />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
              <div className="flex items-center gap-3">
                <div className="rounded-full border border-amber-200/40 bg-amber-300/10 p-2 text-amber-100 shadow-[0_0_20px_rgba(255,230,150,0.35)]">
                  <FaQuestionCircle className="h-6 w-6" aria-hidden />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">Help Center</p>
                  <h2 className="font-display text-3xl font-extrabold text-white">FAQs</h2>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-300">
                Quick answers to shipping, materials, and custom prints. Tap any question to expand.
              </p>
              <div className="mt-6 grid gap-3 text-xs text-slate-300">
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="uppercase tracking-[0.3em] text-amber-200 text-[10px]">Response time</p>
                  <p className="mt-1 text-white font-semibold">Under 24 hours</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="uppercase tracking-[0.3em] text-amber-200 text-[10px]">Shipping</p>
                  <p className="mt-1 text-white font-semibold">UK wide delivery</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="uppercase tracking-[0.3em] text-amber-200 text-[10px]">Materials</p>
                  <p className="mt-1 text-white font-semibold">PLA and PETG</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ items */}
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <details
                key={item.q}
                className="group rounded-[1.5rem] border border-white/10 bg-white/5 backdrop-blur-md transition hover:border-amber-300/60 hover:shadow-[0_0_30px_-10px_rgba(251,191,36,0.45)]"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 text-white">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200/40 bg-amber-400/10 text-xs font-semibold tracking-[0.25em] text-amber-100">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-semibold text-white/90">{item.q}</span>
                  <span className="ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition group-open:rotate-180">
                    <HiChevronDown />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-sm text-slate-300">{item.a}</div>
              </details>
            ))}
          </div>
        </div>

        {/* FAQPage JSON-LD */}
        <script
          id="ld-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
