"use client";

import { useEffect, useState } from "react";
import { HiOutlineMenu, HiX, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { FaShoppingBag } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [hasAdminToken, setHasAdminToken] = useState(false);

  const isLight = theme === "light";

  const navLinks = [
    ["Services", "#services"],
    ["Work", "#work"],
    ["FAQ", "#faq"],
    ["Contact", "#contact"],
  ];

  useEffect(() => {
    try {
      const saved = localStorage.getItem("fr-theme") as "light" | "dark" | null;
      const initial = saved || "dark";
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateToken = () => {
      const token = localStorage.getItem("forgerealm_admin_token");
      setHasAdminToken(Boolean(token));
    };

    updateToken();
    window.addEventListener("storage", updateToken);
    window.addEventListener("forgerealm-admin-token-changed", updateToken);

    return () => {
      window.removeEventListener("storage", updateToken);
      window.removeEventListener("forgerealm-admin-token-changed", updateToken);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("fr-theme", next);
    } catch {}
    document.documentElement.setAttribute("data-theme", next);
  };

  const handleLogout = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("forgerealm_admin_token");
    window.dispatchEvent(new Event("forgerealm-admin-token-changed"));
    setHasAdminToken(false);
  };

  return (
    <header className="fixed top-6 z-50 w-full flex justify-center">
      <div className="mx-auto max-w-7xl w-full px-4">
        <div className={`flex border items-center justify-between px-8 py-3 rounded-full backdrop-blur-xl shadow-lg transition-all duration-500 group ${isLight ? 'border-slate-200/50 bg-white/90 shadow-[0_8px_32px_rgba(15,23,42,0.15)] hover:shadow-[0_12px_48px_rgba(15,23,42,0.2)]' : 'border-white/20 bg-gradient-to-r from-blue-500/90 via-blue-600/90 to-indigo-600/90 shadow-[0_8px_32px_rgba(59,130,246,0.3)] hover:shadow-[0_12px_48px_rgba(59,130,246,0.4)]'}`}>
          {/* Subtle animated border glow */}
          <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10 ${isLight ? 'bg-gradient-to-r from-slate-200/30 via-slate-300/20 to-slate-200/30' : 'bg-gradient-to-r from-blue-400/20 via-cyan-300/20 to-blue-500/20'}`} />
          {/* Enhanced Logo */}
          <a href="#homepage" className="inline-flex items-center group/logo" aria-label="ForgeRealm home">
            <img src="/frowl.webp" alt="ForgeRealm Logo" width={32} height={32} className={`h-8 w-8 rounded-full mr-3 ring-1 transition-all duration-300 ${isLight ? 'bg-black p-[2px] ring-slate-300 group-hover/logo:ring-blue-400' : 'ring-transparent'}`} loading="eager" />
            <span className={`font-display font-extrabold tracking-[0.15em] text-sm uppercase drop-shadow-sm transition-all duration-300 ${isLight ? 'text-slate-900 group-hover/logo:drop-shadow-[0_0_8px_rgba(15,23,42,0.3)]' : 'text-white group-hover/logo:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]'}`}>
              Forge<span className={isLight ? "text-blue-600" : "text-blue-100"}>REALM</span>
            </span>
          </a>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12 text-sm font-semibold uppercase tracking-wide">
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className={`relative transition-all duration-300 px-2 py-1 rounded-md hover:shadow-lg ${isLight ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 hover:shadow-[0_0_15px_rgba(15,23,42,0.1)]' : 'text-white/90 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'}`}
              >
                <span className="relative z-10">{label}</span>
                <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[2px] w-0 transition-all duration-300 hover:w-full ${isLight ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gradient-to-r from-blue-300 to-cyan-300'}`} />
              </a>
            ))}
          </nav>

          {/* Enhanced Right side: theme toggle + shop + subscribe */}
          <div className="hidden sm:flex items-center gap-3">
            {hasAdminToken && (
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-wide shadow-lg ${isLight ? 'border-slate-200/50 bg-white/80 text-slate-700 shadow-[0_0_10px_rgba(15,23,42,0.1)]' : 'border-white/20 bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]'}`}
                title="Logged in"
                aria-label="Logged in"
              >
                <FiUser className={`text-sm ${isLight ? 'text-blue-600' : 'text-blue-200'}`} />
                <span className={isLight ? "text-slate-900" : "text-blue-100"}>Logged in</span>
              </div>
            )}

            {/* Enhanced theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to light" : "Switch to dark"}
              className={`rounded-full px-3 py-2 transition-all duration-300 hover:scale-105 border ${isLight ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:shadow-[0_0_20px_rgba(15,23,42,0.2)] border-slate-300/50 hover:border-slate-400/70' : 'bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] border-white/10 hover:border-blue-300/50'}`}
            >
              {theme === "dark" ? <HiOutlineSun className="text-yellow-500" /> : <HiOutlineMoon className="text-slate-600" />}
            </button>

            {/* Enhanced Shop button */}
            <a
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 text-slate-900 font-bold text-xs uppercase tracking-wide px-5 py-2 hover:bg-amber-300 transition-all duration-300 shadow-[0_4px_15px_rgba(251,169,58,0.3)] hover:shadow-[0_6px_20px_rgba(251,169,58,0.4)] hover:scale-105"
            >
              <FaShoppingBag />
              <span>Shop</span>
            </a>

            {/* Enhanced Subscribe button */}
            <a href="/subscribe" className={`rounded-full font-bold text-xs uppercase tracking-wide px-5 py-2 hover:scale-105 transition-all duration-300 ${isLight ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] shadow-[0_4px_15px_rgba(37,99,235,0.3)]' : 'bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-[0_6px_20px_rgba(59,130,246,0.3)] shadow-[0_4px_15px_rgba(255,255,255,0.2)]'}`}>
              Subscribe
            </a>
          </div>

          {/* Enhanced Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            {hasAdminToken && (
              <div
                className={`inline-flex items-center justify-center rounded-full border p-2 shadow-lg ${isLight ? 'border-slate-200/50 bg-white/80 shadow-[0_0_10px_rgba(15,23,42,0.1)]' : 'border-white/20 bg-white/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]'}`}
                title="Logged in"
                aria-label="Logged in"
              >
                <FiUser className={`text-sm ${isLight ? 'text-blue-600' : 'text-blue-200'}`} />
              </div>
            )}
            <button
              onClick={() => setOpen(true)}
              className={`text-2xl p-2 rounded-full transition-all duration-300 hover:scale-105 ${isLight ? 'text-slate-700 hover:bg-slate-100 hover:shadow-[0_0_20px_rgba(15,23,42,0.2)] border border-slate-300/50' : 'text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]'}`}
              aria-label="Open menu"
            >
              <HiOutlineMenu />
            </button>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-40 overflow-hidden ${open ? "" : "pointer-events-none"}`}>
        {/* Enhanced Mobile Drawer Overlay */}
        <div
          className={`absolute inset-0 backdrop-blur-sm transition-all duration-500 ease-in-out ${
            open ? "opacity-100" : "opacity-0"
          } ${isLight ? 'bg-slate-900/40' : 'bg-black/60'}`}
          onClick={() => setOpen(false)}
          aria-hidden={!open}
        />

        {/* Enhanced Mobile Drawer Panel */}
        <aside
          className={`absolute right-0 top-0 bottom-0 w-72 backdrop-blur-xl shadow-2xl border-l p-6 flex flex-col transform transition-all duration-500 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          } ${isLight ? 'bg-white/95 border-slate-200/50 shadow-[0_0_50px_rgba(15,23,42,0.2)]' : 'bg-gradient-to-b from-blue-600 to-indigo-700 shadow-[0_0_50px_rgba(59,130,246,0.3)] border-white/10'}`}
          aria-hidden={!open}
          aria-label="Mobile menu"
        >
          <button
            onClick={() => setOpen(false)}
            className={`self-end text-2xl mb-6 p-2 rounded-full transition-all duration-300 hover:scale-105 ${isLight ? 'text-slate-700 hover:bg-slate-100 border border-slate-300/50' : 'text-white hover:bg-white/10'}`}
            aria-label="Close menu"
          >
            <HiX />
          </button>

          {/* Enhanced mobile navigation */}
          <nav className="flex flex-col gap-6 text-sm font-semibold uppercase tracking-wide">
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className={`hover:shadow-lg px-3 py-2 rounded-lg transition-all duration-300 ${isLight ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 hover:shadow-[0_0_20px_rgba(15,23,42,0.1)]' : 'text-white hover:text-blue-200 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]'}`}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="my-6 border-t border-slate-200/50" />

          {/* Enhanced mobile action buttons */}
          <div className="flex flex-col gap-4">
            <a
              href="/shop"
              onClick={() => setOpen(false)}
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 hover:bg-amber-300 transition-all duration-300 text-center inline-flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(251,169,58,0.3)] hover:shadow-[0_6px_20px_rgba(251,169,58,0.4)] hover:scale-105"
            >
              <FaShoppingBag /> Shop
            </a>

            <a
              href="/subscribe"
              onClick={() => setOpen(false)}
              className={`rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 text-center shadow-lg hover:scale-105 ${isLight ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)]' : 'bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-[0_6px_20px_rgba(59,130,246,0.3)]'}`}
            >
              Subscribe
            </a>

            {hasAdminToken && (
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className={`rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 text-center shadow-lg hover:scale-105 border ${isLight ? 'border-slate-300/50 bg-white text-slate-700 hover:bg-slate-50 hover:shadow-[0_0_20px_rgba(15,23,42,0.2)]' : 'border-white/20 bg-white/10 text-white hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'}`}
              >
                Log out
              </button>
            )}

            <button
              onClick={() => {
                toggleTheme();
                setOpen(false);
              }}
              className={`mt-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide transition-all duration-300 text-center shadow-lg hover:scale-105 ${isLight ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300/50' : 'bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700'}`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </aside>
      </div>
    </header>
  );
}
