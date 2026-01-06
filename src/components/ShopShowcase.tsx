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
    name: 'Aurora Bloom',
    price: 'GBP 14.99',
    category: '3D Printed Lamp',
    description:
      'Aurora Bloom is a gradient lamp shade with a soft spiral that diffuses light into a warm glow. Printed in precision PLA with smooth layering, it brings ambient color to desks, shelves, and bedside tables.',
    longDescription:
      'Aurora Bloom is a gradient lamp shade with a soft spiral that diffuses light into a warm glow. Printed in precision PLA with smooth layering, it brings ambient color to desks, shelves, and bedside tables.',
    image: '/ablamp2.webp',
    gallery: ['/ablamp2.webp', '/ablamp.webp'],
    accent: 'from-emerald-500/70 via-amber-400/60 to-rose-300/50',
    badge: 'Warm glow',
    shipTime: 'Ships in 3-4 days',
    size: '14 cm tall',
    finish: 'Smooth PLA layering',
    eco: 'Plant-based PLA, plastic-free wrap',
    features: ['Soft spiral diffuser', 'Ambient glow', 'Precision PLA print', 'Leeds made']
  },
  {
    id: 'nebula-owl',
    name: 'Leeds Owl',
    price: 'GBP 5.99',
    category: 'Display Model',
    description:
      'A Leeds-inspired owl with a warm gradient that fades from amber to blush. Crisp feather detail makes it a standout accent for studios and shelves.',
    longDescription:
      'A Leeds-inspired owl with a warm gradient that fades from amber to blush. Crisp feather detail makes it a standout accent for studios and shelves.',
    image: '/owl.webp',
    accent: 'from-amber-500/60 via-rose-400/50 to-red-500/50',
    badge: 'Leeds made',
    shipTime: 'Ships in 2 days',
    size: '9 cm tall',
    finish: 'Gradient PLA',
    eco: 'Plant-based PLA, plastic-free mailer',
    features: ['Crisp feather detail', 'Warm gradient tones', 'Compact display size', 'Studio-ready']
  },
  {
    id: 'forest-dragon',
    name: 'Forest Dragon',
    price: 'GBP 4.99',
    category: 'Display Model',
    description:
      'A detailed, articulated dragon with layered scales and a balanced pose. The green PLA blend shifts under light, making it feel alive on shelves, desks, or diorama bases.',
    longDescription:
      'A detailed, articulated dragon with layered scales and a balanced pose. The green PLA blend shifts under light, making it feel alive on shelves, desks, or diorama bases.',
    image: '/dragon.webp',
    gallery: ['/dragon.webp', '/dice-dragon.webp'],
    accent: 'from-emerald-500/60 via-lime-400/50 to-slate-400/40',
    badge: 'Layered scales',
    shipTime: 'Ships in 2 days',
    size: '8 cm long',
    finish: 'PLA blend',
    eco: 'Plant-based PLA, recycled padding',
    features: ['Articulated pose', 'Layered scales', 'Balanced stance', 'Leeds made']
  },
  {
    id: 'dice-guardian',
    name: 'Dice Guardian',
    price: 'GBP 5.99',
    category: 'Fidget Toy',
    description:
      'A compact dragon head designed to cradle a full set of D&D dice. PETG adds toughness, and the sculpted form keeps it sharp and tabletop-ready.',
    longDescription:
      'A compact dragon head designed to cradle a full set of D&D dice. PETG adds toughness, and the sculpted form keeps it sharp and tabletop-ready.',
    image: '/dice-dragon.webp',
    accent: 'from-indigo-500/60 via-slate-500/50 to-blue-900/40',
    badge: 'Tabletop ready',
    shipTime: 'Ships in 3 days',
    size: '7 cm tall',
    finish: 'PETG',
    eco: 'PETG, paper fill',
    features: ['Dice cradle form', 'Tough PETG build', 'Compact footprint', 'Clean sculpt']
  }
];

const ProductModal = ({
  product,
  onClose,
  onOpenImage,
}: {
  product: Product;
  onClose: () => void;
  onOpenImage: () => void;
}) => (
  <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-10 sm:px-6">
    <div className="modal-overlay absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" onClick={onClose} aria-hidden />
    <div className="shop-modal relative mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-slate-950 to-slate-950 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
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
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpenImage();
          }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 text-left shadow-lg shadow-blue-500/10"
          aria-label={`Open ${product.name} image`}
        >
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
              <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                View image
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
        </button>

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
  const [imageOpen, setImageOpen] = useState(false);

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

      {activeProduct ? (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
          onOpenImage={() => setImageOpen(true)}
        />
      ) : null}

      {activeProduct && imageOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4 py-6"
          onClick={() => setImageOpen(false)}
        >
          <img
            src={activeProduct.image}
            alt={activeProduct.name}
            className="max-h-[90vh] w-auto max-w-[92vw] rounded-3xl border border-white/10 object-contain shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
            loading="lazy"
          />
        </div>
      ) : null}
    </section>
  );
};

export default ShopShowcase;
