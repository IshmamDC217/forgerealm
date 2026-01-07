"use client";
import { useRef } from "react";
import {
  FaShoppingCart,
  FaStore,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaLeaf } from "react-icons/fa";
import { MdBrush } from "react-icons/md";
import { FiBox, FiHeadphones, FiLayers, FiMapPin, FiShare2, FiUsers } from "react-icons/fi";

export default function Services() {
  const ref = useRef(null);

  return (
    <section
      id="services"
      data-observe
      className="reveal theme-surface relative overflow-hidden py-24 bg-transparent border-y border-white/10"
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
            <FiLayers className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden />
          </div>
        </div>

        <p className="mt-3 text-slate-200/80 max-w-2xl">
          ForgeRealm is a UK-based business offering unique, customisable
          3D-printed products. You can order online, contact us for bespoke
          prints, or visit us at our pop-up stalls and booths around Leeds.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-6 auto-rows-fr">
          {[
            { title: "Eco Friendly", detail: "Biodegradable and low-impact materials.", icon: <FaLeaf className="text-emerald-300 text-lg" /> },
            { title: "Material Options", detail: "PLA and PETG choices for each build.", icon: <FiBox className="text-blue-300 text-lg" /> },
            { title: "Local Collection", detail: "Leeds pickup options when available.", icon: <FiMapPin className="text-blue-300 text-lg" /> },
            { title: "Social Drops", detail: "New releases and stall dates posted weekly.", icon: <FiShare2 className="text-pink-300 text-lg" /> },
            { title: "Support First", detail: "Real replies from the makers.", icon: <FiHeadphones className="text-blue-300 text-lg" /> },
            { title: "Workshops Soon", detail: "Collaborations and events in the pipeline.", icon: <FiUsers className="text-sky-300 text-lg" /> },
          ].map((item, idx) => (
            <div
              key={item.title}
              className={`rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-2xl hover:border-blue-400/70 hover:shadow-blue-500/20 hover:shadow-lg transition ${
                idx === 0 ? "lg:col-span-4" : idx === 1 ? "lg:col-span-2" : idx === 2 ? "lg:col-span-3" : "lg:col-span-3"
              }`}
            >
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                {item.icon}
                <span>{item.title}</span>
              </div>
              <p className="mt-2 text-xs text-slate-200/80">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* Service grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <FaShoppingCart className="text-blue-400 text-xl" />,
              title: "Order Online",
              text: "Browse and buy our 3D-printed products directly from our website, or find us on Etsy, eBay, and Vinted.",
            },
            {
              icon: <MdBrush className="text-blue-400 text-xl" />,
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
            <a href="https://www.instagram.com/forgerealmltd/" aria-label="Instagram" className="hover:text-pink-400 transition">
              <FaInstagram className="text-lg" />
            </a>
            <a href="https://www.linkedin.com/company/forgerealm" aria-label="LinkedIn" className="hover:text-sky-400 transition">
              <FaLinkedin className="text-lg" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
