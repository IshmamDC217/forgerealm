import { useEffect, useState } from 'react';
import { FiArrowUpRight, FiClock, FiFeather, FiPackage, FiX, FiZap } from 'react-icons/fi';

type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[];
  accent: string;
  badge: string;
  shipTime: string;
  size: string;
  finish: string;
  eco: string;
  features: string[];
};

const products: Product[] = [
  {
    id: 'aurora-lamp',
    name: 'Aurora Bloom Lamp',
    price: 'GBP 48',
    category: 'Lighting',
    description: 'Plant-based gradient diffuser with a soft, cinematic glow.',
    longDescription:
      'Layered diffuser petals, printed slow in Leeds with bio-based PLA. Satin-finished by hand for a glassy edge and sealed with a water-based, low-VOC coat. Ships with a dimmable LED and plastic-free packaging.',
    image: '/ablamp2.webp',
    gallery: ['/ablamp2.webp', '/ablamp.webp'],
    accent: 'from-blue-500/70 via-emerald-400/70 to-cyan-300/70',
    badge: 'Glow drop',
    shipTime: 'Ships in 3-4 days',
    size: '210 mm tall',
    finish: 'Satin PLA Pro',
    eco: 'Bio-based, low-VOC finish',
    features: ['USB-C powered', 'Wet-sanded edges', 'Dimmable LED included', 'Plastic-free wrap']
  },
  {
    id: 'forest-dragon',
    name: 'Forest Dragon Guardian',
    price: 'GBP 62',
    category: 'Figurines',
    description: 'Scaled detail for shelves and battle stations, printed slow and cool.',
    longDescription:
      'Micro-detail profile for scales and horns, then chilled between layers to prevent warping. Finished with a satin, water-based clear coat so it is paint-ready. Balanced tail lets it perch without wobble on plants or desks.',
    image: '/dragon.webp',
    gallery: ['/dragon.webp', '/dice-dragon.webp'],
    accent: 'from-emerald-500/70 via-lime-400/70 to-sky-300/70',
    badge: 'Paint-ready',
    shipTime: 'Ships in 2 days',
    size: '165 mm tall',
    finish: 'Matte PLA+ with light sanding',
    eco: 'Bio-based PLA+, recycled padding',
    features: ['Ultra-detailed scales', 'Weighted tail perch', 'Paint-ready matte', 'Plastic-free mailer']
  },
  {
    id: 'dice-guardian',
    name: 'Dice Guardian Tower',
    price: 'GBP 54',
    category: 'Accessories',
    description: 'Hidden tray, prismatic wings, and table-safe feet for prized dice.',
    longDescription:
      'Removable wing span and slotted tray keep dice tucked away between sessions. Printed in a pearl PLA blend that shifts under warm light, then backed with felt feet to protect tables. Packed in recycled paper and starch-based tape.',
    image: '/dice-dragon.webp',
    accent: 'from-purple-500/70 via-blue-500/70 to-fuchsia-400/70',
    badge: 'Tabletop hit',
    shipTime: 'Ships in 3 days',
    size: '140 mm tall',
    finish: 'Pearlescent PLA',
    eco: 'Pearl PLA, paper fill',
    features: ['Hidden dice tray', 'Pearl shimmer', 'Table-safe felt feet', 'Paper-only packaging']
  },
  {
    id: 'nebula-owl',
    name: 'Nebula Owl Companion',
    price: 'GBP 42',
    category: 'Figurines',
    description: 'Layered feathers with a nebula gradient and soft satin sheen.',
    longDescription:
      'Printed with cooling towers for crisp feather edges, then misted with a satin blend to smooth the gradient. Each owl is leveled for a stable stance and ships in recycled padding with zero plastic.',
    image: '/owl.webp',
    accent: 'from-amber-400/70 via-rose-500/70 to-indigo-500/70',
    badge: 'Desk mascot',
    shipTime: 'Ships in 2 days',
    size: '125 mm tall',
    finish: 'Satin gradient PLA',
    eco: 'Gradient PLA, plastic-free mailer',
    features: ['Soft gradient feathers', 'Balanced stance', 'Satin clear coat', 'Zero plastic in box']
  },
  {
    id: 'halo-orb',
    name: 'Halo Desk Orb',
    price: 'GBP 38',
    category: 'Lighting',
    description: 'Palm-sized orb with floating ring diffuser and calm, even glow.',
    longDescription:
      'Minimalist desk light tuned for calls and late-night builds. The ring diffuser snaps in place and disperses light in a 140-degree cone for even coverage. Printed in frosted PLA with VOC-free finishing and recyclable wrap.',
    image: '/ablamp.webp',
    accent: 'from-cyan-400/70 via-sky-500/70 to-blue-600/70',
    badge: 'Studio ready',
    shipTime: 'Ships in 2 days',
    size: '120 mm tall',
    finish: 'Frosted PLA',
    eco: 'Frosted PLA, recycled wrap',
    features: ['Snap-in ring diffuser', 'USB-C powered', '140-degree throw pattern', 'Recyclable packaging']
  }
];

const ProductModal = ({ product, onClose }: { product: Product; onClose: () => void }) => (
  <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-10 sm:px-6">
    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={onClose} aria-hidden />
    <div className="relative mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-950 to-slate-950 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-blue-200/80">Product window</p>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold text-white">{product.name}</h3>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-200">
              {product.category}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-semibold text-blue-100 shadow-inner shadow-blue-500/30">
            {product.price}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg text-white transition hover:-translate-y-[1px] hover:border-white/30 hover:bg-white/10"
            aria-label="Close product window"
          >
            <FiX />
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] p-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-lg shadow-blue-500/10">
          <div className={`absolute inset-0 opacity-60 blur-3xl bg-gradient-to-br ${product.accent}`} aria-hidden />
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={product.gallery?.[0] ?? product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            <div className="absolute left-4 bottom-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-100 backdrop-blur">
                <FiZap className="text-sm" />
                {product.badge}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-100 backdrop-blur">
                <FiClock className="text-sm" />
                {product.shipTime}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-100 backdrop-blur">
                Eco build
              </span>
            </div>
          </div>
          {product.gallery && product.gallery.length > 1 ? (
            <div className="relative grid grid-cols-2 gap-3 p-3">
              {product.gallery.slice(1).map((src) => (
                <div key={src} className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/70">
                  <img src={src} alt={`${product.name} detail`} className="h-28 w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-5">
          <p className="text-sm leading-relaxed text-slate-200">{product.longDescription}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">Finish</p>
              <p className="text-white font-semibold">{product.finish}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">Size</p>
              <p className="text-white font-semibold">{product.size}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">Lead time</p>
              <p className="text-white font-semibold">{product.shipTime}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">Eco grade</p>
              <p className="text-white font-semibold">{product.eco}</p>
            </div>
          </div>

          <div className="grid gap-2">
            {product.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-2 rounded-lg border border-white/5 bg-slate-900/80 px-3 py-2 text-sm text-slate-100"
              >
                <FiFeather className="mt-[3px] text-blue-300" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-slate-950 shadow-lg shadow-blue-500/30 transition hover:-translate-y-[1px] hover:bg-blue-400">
              Reserve build slot
              <FiArrowUpRight className="text-base" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:-translate-y-[1px] hover:border-white/40 hover:bg-white/10">
              Add to moodboard
            </button>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-100">
              <FiPackage className="text-sm" />
              Plastic-free packaging
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ShopShowcase = () => {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!activeProduct) return;

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProduct(null);
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      html.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeProduct]);

  return (
    <section id="products" className="relative mx-auto max-w-6xl px-6 sm:px-10 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-blue-200/80">Eco drop</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
            Eco-forward drops, precision printed in Leeds.
          </h2>
          <p className="mt-2 text-slate-300 max-w-2xl">
            Tap a piece to open its own window, study the finish, and lock in a build slot without losing your place.
            Every build is plant-based, water-finished, and packed plastic-free.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
          <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur">Leeds made</span>
          <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur">Plant-based PLA</span>
          <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur">Plastic-free packaging</span>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => setActiveProduct(product)}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-xl shadow-blue-500/10 transition hover:-translate-y-[3px] hover:border-blue-300/60 hover:shadow-blue-500/25"
          >
            <div className={`absolute inset-0 opacity-50 blur-3xl bg-gradient-to-br ${product.accent}`} aria-hidden />
            <div className="relative overflow-hidden">
              <div className="aspect-[5/4] overflow-hidden rounded-b-3xl rounded-t-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:rotate-[0.4deg]"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-80" aria-hidden />
              <div className="absolute right-4 top-4 flex flex-col items-end gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-100 backdrop-blur">
                  <FiZap className="text-sm" />
                  {product.badge}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                  <FiClock className="text-sm" />
                  {product.shipTime}
                </span>
              </div>
            </div>

            <div className="relative space-y-2 px-5 pb-5 pt-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-300">{product.category}</p>
                  <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                </div>
                <span className="rounded-full border border-white/15 bg-slate-900/70 px-3 py-1 text-sm font-semibold text-blue-100">
                  {product.price}
                </span>
              </div>
              <p className="text-sm text-slate-200/90">{product.description}</p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs font-semibold uppercase tracking-wide text-blue-200">
                <span className="inline-flex items-center gap-2">
                  <FiArrowUpRight className="text-base" />
                  Open product window
                </span>
                <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.28em] text-slate-100">
                  Plant-based build
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeProduct ? <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} /> : null}
    </section>
  );
};

export default ShopShowcase;
