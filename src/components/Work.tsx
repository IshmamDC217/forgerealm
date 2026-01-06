"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiX } from "react-icons/fi";

type PrintItem = {
  id: string;
  indexLabel: string;
  name: string;
  category: string;
  priceGBP: number;
  material: "PLA" | "PETG" | "ABS" | "Resin";
  size: string;
  colors: string[];
  imageUrl: string;
  description: string;
  accent: string;
};

const prints: PrintItem[] = [
  {
    id: "aurora-lamp",
    indexLabel: "01",
    name: "Aurora Bloom",
    category: "3D Printed Lamp",
    priceGBP: 14.99,
    material: "PLA",
    size: "14 cm tall",
    colors: ["#2c522d", "#dc8a54", "#cf8678", "#f3d7ae"],
    imageUrl: "/ablamp.webp",
    accent: "from-emerald-500/15 via-amber-400/10 to-rose-300/10",
    description:
      "Aurora Bloom is a gradient lamp shade with a soft spiral that diffuses light into a warm glow. Printed in precision PLA with smooth layering, it brings ambient color to desks, shelves, and bedside tables.",
  },
  {
    id: "nebula-owl",
    indexLabel: "02",
    name: "Leeds Owl",
    category: "Display Model",
    priceGBP: 5.99,
    material: "PLA",
    size: "9 cm tall",
    colors: ["#cca671", "#bd7d5e", "#bd7d5e", "#e98492", "#a23b40"],
    imageUrl: "/owl.webp",
    accent: "from-amber-500/15 via-rose-400/10 to-red-500/10",
    description:
      "A Leeds-inspired owl with a warm gradient that fades from amber to blush. Crisp feather detail makes it a standout accent for studios and shelves.",
  },
  {
    id: "forest-dragon",
    indexLabel: "03",
    name: "Forest Dragon",
    category: "Display Model",
    priceGBP: 4.99,
    material: "PLA",
    size: "8 cm long",
    colors: ["#14532d", "#86efac", "#0f172a"],
    imageUrl: "/dragon.webp",
    accent: "from-emerald-500/15 via-lime-400/10 to-slate-400/10",
    description:
      "A detailed, articulated dragon with layered scales and a balanced pose. The green PLA blend shifts under light, making it feel alive on shelves, desks, or diorama bases.",
  },
  {
    id: "dice-guardian",
    indexLabel: "04",
    name: "Dice Guardian",
    category: "Fidget Toy",
    priceGBP: 5.99,
    material: "PETG",
    size: "7 cm tall",
    colors: ["#474a6a", "#2f3341", "#121013", "#0b1d3a"],
    imageUrl: "/dice-dragon.webp",
    accent: "from-indigo-500/15 via-slate-500/10 to-blue-900/10",
    description:
      "A compact dragon head designed to cradle a full set of D&D dice. PETG adds toughness, and the sculpted form keeps it sharp and tabletop-ready.",
  },
];

const spring = { type: "spring", stiffness: 140, damping: 22, mass: 0.6 };

export default function Work() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [imageOpen, setImageOpen] = useState(false);
  const openItem = prints.find((item) => item.id === openId) ?? null;

  useEffect(() => {
    if (!openId) return;
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previousOverflow;
    };
  }, [openId]);

  return (
    <section id="work" className="theme-surface relative bg-transparent border-y border-white/10">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-[160px]" />
        <div className="absolute right-1/5 bottom-1/4 h-[30rem] w-[30rem] rounded-full bg-emerald-500/20 blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.12),transparent_32%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 sm:px-10 py-20 lg:py-24">
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Featured Prints</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">Featured Prints</h2>
            <p className="mt-2 text-sm text-slate-400">ForgeRealm - Made to Order</p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {prints.map((item, idx) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setOpenId(item.id)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative text-left rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-5 transition hover:border-blue-400/60 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] ${
                idx % 3 === 0 ? "lg:col-span-2" : "lg:col-span-1"
              }`}
            >
              <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${item.accent}`} aria-hidden />
              <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-[0.3em]">
                <span>{item.indexLabel}</span>
                <span>{item.category}</span>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-[180px_1fr] items-center">
                <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                  <p className="mt-2 text-sm text-slate-300 line-clamp-3">{item.description}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">GBP {item.priceGBP}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{item.material}</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{item.size}</span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openItem ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-10 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <div
              className="modal-overlay absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpenId(null)}
              aria-hidden
            />
            <motion.div
              className="work-modal relative flex w-full max-w-5xl flex-col rounded-[2.5rem] border border-white/10 bg-slate-950/95 shadow-[0_40px_140px_rgba(0,0,0,0.55)] max-h-[85vh] sm:max-h-[90vh]"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: spring }}
              exit={{ opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.2 } }}
            >
              <div className="modal-header flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
                <div>
                  <p className="modal-label text-[10px] uppercase tracking-[0.35em] text-blue-200/80">Product window</p>
                  <h3 className="text-xl font-semibold text-white">{openItem.name}</h3>
                  <p className="text-xs text-slate-400">{openItem.category}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-lg text-white transition hover:border-white/40"
                  aria-label="Close details"
                >
                  <FiX />
                </button>
              </div>

              <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto p-6 lg:grid-cols-[1.2fr_0.8fr] max-h-[calc(85vh-88px)] sm:max-h-[calc(90vh-88px)]">
                <button
                  type="button"
                  onClick={() => setImageOpen(true)}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left"
                  aria-label={`Open ${openItem.name} image`}
                >
                  <img src={openItem.imageUrl} alt={openItem.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    View image
                  </span>
                </button>
                <div className="flex flex-col gap-4 text-slate-200">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-blue-200/70 modal-label">Full description</p>
                    <p className="mt-3 text-base leading-relaxed">{openItem.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <p className="uppercase tracking-[0.2em] text-[10px] text-slate-400">Price</p>
                      <p className="text-white font-semibold">GBP {openItem.priceGBP}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <p className="uppercase tracking-[0.2em] text-[10px] text-slate-400">Material</p>
                      <p className="text-white font-semibold">{openItem.material}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <p className="uppercase tracking-[0.2em] text-[10px] text-slate-400">Size</p>
                      <p className="text-white font-semibold">{openItem.size}</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <p className="uppercase tracking-[0.2em] text-[10px] text-slate-400">Colors</p>
                      <div className="mt-1 flex items-center gap-2">
                        {openItem.colors.map((color) => (
                          <span
                            key={color}
                            className="h-4 w-4 rounded-full border border-white/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-blue-400">
                      Reserve print
                      <FiArrowUpRight />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {openItem && imageOpen ? (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            onClick={() => setImageOpen(false)}
          >
            <motion.img
              src={openItem.imageUrl}
              alt={openItem.name}
              className="max-h-[90vh] w-auto max-w-[92vw] rounded-3xl border border-white/10 object-contain shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: spring }}
              exit={{ scale: 0.98, opacity: 0, transition: { duration: 0.2 } }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
