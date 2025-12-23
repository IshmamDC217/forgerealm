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
      className="theme-surface relative py-24 overflow-hidden bg-gradient-to-bl from-[#0b0b0e] via-[#101018] to-yellow-900"
    >
      {/* Ambient yellow glow lights */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-yellow-200/30 blur-[120px] -z-10" />
      <div className="absolute right-1/3 bottom-0 h-72 w-72 rounded-full bg-amber-400/20 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header with floating GIF */}
        <div className="flex items-center gap-3">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[color:var(--fg)]">FAQs</h2>
          <div className="relative flex-shrink-0 text-amber-100 drop-shadow-[0_0_16px_rgba(255,230,150,0.55)]">
            <FaQuestionCircle className="w-7 h-7 sm:w-9 sm:h-9" aria-hidden />
          </div>
        </div>

        {/* FAQ items */}
        <div className="mt-8 divide-y divide-[color:var(--border)] rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] backdrop-blur-md light-panel">
          {faqs.map((item) => (
            <details key={item.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[color:var(--fg)]/80 font-semibold">
                <span>{item.q}</span>
                <span aria-hidden className="transition-transform duration-300 group-open:rotate-180">
                  <HiChevronDown />
                </span>
              </summary>
              <div className="mt-3 text-sm text-[color:var(--fg)]/70">{item.a}</div>
            </details>
          ))}
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
