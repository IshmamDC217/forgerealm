"use client";
import { useRef } from "react";
import {
  FaShoppingCart,
  FaCogs,
  FaStore,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

export default function Services() {
  const ref = useRef(null);

  return (
    <section
      id="services"
      className="theme-surface relative overflow-hidden py-24 bg-transparent border-t border-white/10"
    >
      {/* Subtle background accent lights */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/5 top-1/3 h-64 w-64 rounded-full bg-blue-500/20 blur-[140px]" />
        <div className="absolute right-1/6 bottom-1/4 h-72 w-72 rounded-full bg-emerald-500/15 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(59,130,246,0.08),transparent_36%),radial-gradient(circle_at_78%_18%,rgba(94,234,212,0.07),transparent_28%),radial-gradient(circle_at_55%_80%,rgba(129,140,248,0.06),transparent_30%)]" />
      </div>

      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header with icon */}
        <div className="max-w-2xl flex items-center gap-4">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white flex items-center">
            Our Services
          </h2>
          <div className="text-indigo-200 drop-shadow-[0_0_16px_rgba(129,140,248,0.6)]">
            <FaCogs className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden />
          </div>
        </div>

        <p className="mt-3 text-slate-200/80 max-w-2xl">
          ForgeRealm is a UK-based business offering unique, customisable
          3D-printed products. You can order online, contact us for bespoke
          prints, or visit us at our pop-up stalls and booths around Leeds.
        </p>

        {/* Service grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <FaShoppingCart className="text-blue-400 text-xl" />,
              title: "Order Online",
              text: "Browse and buy our 3D-printed products directly from our website, or find us on Etsy, eBay, and Vinted.",
            },
            {
              icon: <FaCogs className="text-blue-400 text-xl" />,
              title: "Custom & Bespoke Prints",
              text: "Contact us to discuss your ideas or request a personalised print.",
            },
            {
              icon: <FaStore className="text-blue-400 text-xl" />,
              title: "Leeds Booths & Stalls",
              text: "Find us at local markets, fairs, and events across Leeds. Follow us on social media for updates on where we’ll be next.",
            },
          ].map((service, i) => (
            <article
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-2xl hover:border-blue-400/70 hover:shadow-blue-500/20 hover:shadow-lg transition flex flex-col"
            >
              <div className="flex items-center gap-3 mb-2">
                {service.icon}
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-200/80">{service.text}</p>
            </article>
          ))}
        </div>

        {/* Follow us capsule */}
        <div className="max-w-2xl mt-16 rounded-lg border border-white/10 bg-white/5 backdrop-blur-2xl p-6 hover:border-blue-400/60 hover:shadow-blue-500/20 transition">
          <p className="text-slate-200/80 text-sm mb-4">
            Follow us on Instagram and other socials for the latest news, stall
            locations, and new product launches. More services, including
            workshops and collaborations, coming soon!
          </p>

          <div className="flex items-center gap-4 text-slate-200/80 mt-2">
            <a href="#" aria-label="Instagram" className="hover:text-pink-400 transition">
              <FaInstagram className="text-lg" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition">
              <FaFacebook className="text-lg" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-sky-400 transition">
              <FaTwitter className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
