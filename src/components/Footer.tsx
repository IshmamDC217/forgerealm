"use client";
import { useState } from "react";
import { FaInstagram, FaFacebook, FaTwitter, FaEtsy } from "react-icons/fa";

export default function Footer() {
  const [modal, setModal] = useState<"privacy" | "terms" | "sla" | null>(null);
  return (
    <footer className="relative overflow-hidden py-16 bg-slate-950/85 border-t border-white/10 backdrop-blur">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.08),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(129,140,248,0.06),transparent_36%)]"
        aria-hidden
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-4 gap-10 text-sm text-white/80">
          {/* Brand */}
          <div>
            <div className="inline-flex items-center gap-3">
              <img src="/frhead.webp" alt="ForgeRealm Logo" width={32} height={32} className="rounded-full" loading="lazy" />
              <span className="font-bold text-white text-lg tracking-wide">ForgeRealm</span>
            </div>
            <p className="mt-3 text-white/70 max-w-xs">UK-based creators of custom, sustainable 3D prints from concept to craft.</p>

            {/* Social icons */}
            <div className="flex gap-4 mt-5 text-lg text-white/70">
              <a href="#" aria-label="Instagram" className="hover:text-blue-300 transition">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-blue-300 transition">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-300 transition">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Etsy" className="hover:text-blue-300 transition">
                <FaEtsy />
              </a>
            </div>
          </div>

          {/* Services links */}
          <div>
            <div className="font-semibold text-white">Services</div>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#services" className="hover:text-white transition">
                  Custom Prints
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition">
                  Online Orders
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition">
                  Leeds Booths
                </a>
              </li>
              <li>
                <a href="#materials" className="hover:text-white transition">
                  Materials
                </a>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <div className="font-semibold text-white">Company</div>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="#work" className="hover:text-white transition">
                  Recent Work
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe (Mailchimp embedded) */}
          <div>
            <div className="font-semibold text-white">Stay Updated</div>

            <form
              action="https://app.us12.list-manage.com/subscribe/post?u=ce1d7fb1b345f9a78d8548647&id=6be3589439&f_id=00c366e9f0"
              method="post"
              target="_blank"
              noValidate
              className="mt-3 flex flex-col gap-3"
            >
              <input
                required
                type="text"
                name="FNAME"
                id="mce-FNAME"
                placeholder="First name"
                aria-label="First name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/50"
              />

              <input
                required
                type="email"
                name="EMAIL"
                id="mce-EMAIL"
                placeholder="you@example.com"
                aria-label="Email address"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white/50"
              />

              {/* Honeypot field to prevent spam */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                <input
                  type="text"
                  name="b_ce1d7fb1b345f9a78d8548647_6be3589439"
                  tabIndex={-1}
                  defaultValue=""
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 font-semibold transition shadow-lg shadow-blue-500/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>(c) {new Date().getFullYear()} ForgeRealm Ltd. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => setModal("privacy")} className="hover:text-white transition">
              Privacy
            </button>
            <button type="button" onClick={() => setModal("terms")} className="hover:text-white transition">
              Terms
            </button>
            <button type="button" onClick={() => setModal("sla")} className="hover:text-white transition">
              SLA
            </button>
          </div>
        </div>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6">
          <div className="relative w-full max-w-2xl rounded-2xl border border-white/15 bg-slate-950/95 p-6 text-white shadow-2xl">
            <button
              type="button"
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80 hover:bg-white/20"
              onClick={() => setModal(null)}
            >
              Close
            </button>
            {modal === "privacy" ? (
              <>
                <h3 className="text-xl font-semibold">Privacy Policy</h3>
                <p className="mt-3 text-sm text-white/80">
                  We only collect the details needed to process orders, respond to inquiries, and send updates you opt
                  in to receive. We never sell your data.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>We store email and order details for fulfillment and support.</li>
                  <li>You can opt out of marketing emails at any time.</li>
                  <li>Contact us to request access or deletion of your data.</li>
                </ul>
              </>
            ) : modal === "terms" ? (
              <>
                <h3 className="text-xl font-semibold">Terms of Service</h3>
                <p className="mt-3 text-sm text-white/80">
                  Orders are made to order. Production times vary by item and load. We will confirm timelines and keep
                  you updated on progress.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>Custom orders are final once production begins.</li>
                  <li>Damaged deliveries must be reported within 48 hours.</li>
                  <li>By ordering, you agree to our print and fulfillment timelines.</li>
                </ul>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold">Service Level Agreement</h3>
                <p className="mt-3 text-sm text-white/80">
                  Our standard service levels outline communication and fulfillment expectations for ForgeRealm orders.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>Responses within 24 hours on business days.</li>
                  <li>Production timelines shared before your order is confirmed.</li>
                  <li>Priority support for time-sensitive or event orders.</li>
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
