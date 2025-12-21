"use client";

import { useEffect, useRef, useState } from "react";
import { FiStar } from "react-icons/fi";
import { TbLeaf } from "react-icons/tb";
import { MdBrush } from "react-icons/md";
import { GiDragonHead } from "react-icons/gi";
import { RiEarthLine } from "react-icons/ri";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaRecycle, FaShoppingBag } from "react-icons/fa";
import Spline from "@splinetool/react-spline";

interface HeroProps {
  onLoadComplete?: () => void;
}

const useSplineScene = (timeoutMs = 4000) => {
  const [useFallback, setUseFallback] = useState(false);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setUseFallback(true), timeoutMs);
    return () => clearTimer();
  }, [timeoutMs]);

  return {
    useFallback,
    splineVisible: visible,
    markLoaded: () => {
      clearTimer();
      setUseFallback(false);
      setVisible(true);
    },
    markError: () => {
      clearTimer();
      setUseFallback(true);
    },
  };
};

const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const getTheme = () =>
      (typeof document !== "undefined" && (document.documentElement.getAttribute("data-theme") as "light" | "dark" | null)) ||
      "dark";

    setTheme(getTheme());

    if (typeof MutationObserver !== "undefined") {
      const observer = new MutationObserver(() => setTheme(getTheme()));
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      return () => observer.disconnect();
    }
  }, []);

  return theme;
};

export default function Hero({ onLoadComplete }: HeroProps) {
  const [visible, setVisible] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef(null);
  const { useFallback, splineVisible, markLoaded, markError } = useSplineScene();
  const theme = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.3 });
    if (widgetRef.current) observer.observe(widgetRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSplineLoad = () => {
    setSplineLoaded(true);
    markLoaded();
    onLoadComplete?.();
  };

  const showPreloader = !splineLoaded && !useFallback && !isLight;

  return (
    <section id="homepage" className="relative min-h-[100dvh] md:min-h-[100svh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-20 flex items-center justify-center">
        {!isLight && !useFallback && (
          <div className={`w-full h-full transition-opacity duration-700 flex items-center justify-center ${splineVisible ? "opacity-100" : "opacity-0"}`}>
            <div className="w-full max-w-[1600px] h-full max-h-[900px]">
              <Spline className="spline-scene" scene="/scene.splinecode" onLoad={handleSplineLoad} onError={markError} />
            </div>
          </div>
        )}
        {isLight && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-[1600px] h-full max-h-[900px] relative">
              <video
                className="absolute inset-0 h-full w-full object-cover object-left sm:object-center rounded-[2rem]"
                src="/whitebg.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-white/30 rounded-[2rem]" />
            </div>
          </div>
        )}
      </div>

      {/* Ambient lighting */}
      {!isLight && (
        <div className="hidden lg:block absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-[10%] h-64 w-64 bg-blue-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-[10%] h-72 w-72 bg-indigo-400/20 rounded-full blur-[140px]" />
          <div className="absolute top-0 left-1/2 h-40 w-40 bg-fuchsia-500/10 rounded-full blur-[100px]" />
        </div>
      )}

      {/* Preloader */}
      {showPreloader && (
        <div className="absolute inset-0 bg-[#0b0b0e] flex flex-col items-center justify-center z-50">
          <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-blue-500/20" />
            <div className="absolute inset-0 rounded-full border-t-4 border-blue-400 animate-spin-smooth" />
            <div className="absolute inset-[8px] rounded-full bg-blue-400/10 animate-pulse-soft" />
            <div className="relative z-10">
              <img
                src="/notitlefrwatermark.png"
                alt="ForgeRealm Watermark"
                width={72}
                height={72}
                className="opacity-90 animate-fade-glow"
                loading="lazy"
              />
            </div>
          </div>
          <p className="mt-6 text-sm tracking-widest text-blue-300/80 font-medium animate-fade-glow">
            Loading ForgeRealm Experience...
          </p>
          <div className="mt-4 h-1.5 w-40 bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-500 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-white/50 animate-shimmer" />
          </div>
        </div>
      )}

      {/* Main Hero */}
      <div
        className={`relative grid grid-cols-1 lg:grid-cols-2 items-center max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32 gap-16 lg:gap-36 xl:gap-40 transition-opacity duration-700 ${splineLoaded || isLight ? "opacity-100" : "opacity-0"
          }`}
      >
        {/* Left side */}
        <div className={`${isLight ? "bg-white/90 border border-slate-200 text-slate-900 shadow-lg rounded-3xl p-6 sm:p-8 backdrop-blur w-full overflow-hidden" : ""}`}>
          <div className="flex items-center gap-6 mb-2 justify-center lg:justify-start">
            <img
              src="/notitlefrwatermark.png"
              alt="ForgeRealm Logo"
              width={90}
              height={90}
              className={`object-contain ${isLight ? "bg-slate-900 rounded-full p-2" : "drop-shadow-[0_0_40px_rgba(59,130,246,0.55)]"} hidden sm:block`}
              loading="lazy"
            />
            <div className="relative inline-block max-w-full">
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 blur-xl opacity-40 rounded-lg block" />
              <h1 className={`relative font-display ${isLight ? "text-5xl sm:text-6xl lg:text-6xl" : "text-5xl sm:text-6xl lg:text-7xl"} font-extrabold tracking-tight break-words ${isLight ? "text-slate-900" : "text-white"}`}>
                Forge<span className="text-blue-400">Realm</span>
              </h1>
            </div>
          </div>

          <p className={`mt-4 text-2xl ${isLight ? "text-slate-800" : "text-blue-200"} text-center lg:text-left`}>
            Your vision, printed with purpose.
          </p>

          <p className={`mt-6 text-lg sm:text-lg lg:text-xl ${isLight ? "text-slate-700" : "text-gray-300"} max-w-lg leading-relaxed text-center lg:text-left mx-auto lg:mx-0`}>
            Slick sculptures, modular accents, and daily essentials engineered with planet-first materials.
          </p>

          {/* Buttons */}
          <div
            ref={buttonsRef}
            className="mt-10 flex flex-wrap justify-center text-center lg:justify-start gap-3"
          >
            <a
              href="/shop"
              className="items-center px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg sm:text-xl uppercase tracking-wide hover:scale-105 hover:shadow-[0_0_20px_rgba(96,165,250,0.7)] transition-all duration-200 inline-flex gap-2"
            >
              <FaShoppingBag className="text-base sm:text-lg" />
              <span>Shop</span>
            </a>
            <a
              href="/subscribe"
              className="items-center px-6 py-2 rounded-full border border-blue-400 text-blue-300 font-semibold text-lg sm:text-xl uppercase tracking-wide hover:bg-blue-500 hover:text-white hover:shadow-[0_0_20px_rgba(96,165,250,0.5)] transition-all duration-200"
            >
              Join Us!
            </a>
          </div>

          {/* Tags */}
          <div className="hidden lg:flex gap-2 mt-10">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors border ${isLight ? "bg-white/80 border-green-300/70 hover:border-green-500" : "bg-white/5 border-white/10 hover:bg-white/10"}`}>
              <TbLeaf className="text-green-400 text-xl" />
              <span className={`text-base ${isLight ? "text-slate-700" : "text-gray-300"}`}>Eco-Friendly</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors border ${isLight ? "bg-white/80 border-pink-300/70 hover:border-pink-500" : "bg-white/5 border-white/10 hover:bg-white/10"}`}>
              <MdBrush className="text-pink-400 text-xl" />
              <span className={`text-base ${isLight ? "text-slate-700" : "text-gray-300"}`}>Paint Ready</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors border ${isLight ? "bg-white/80 border-indigo-300/70 hover:border-indigo-500" : "bg-white/5 border-white/10 hover:bg-white/10"}`}>
              <GiDragonHead className="text-indigo-400 text-xl" />
              <span className={`text-base ${isLight ? "text-slate-700" : "text-gray-300"}`}>Fantasy Figurines</span>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div
          ref={widgetRef}
          className={`hidden lg:flex flex-col gap-12 transition-all duration-700 ease-out ${visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
            } ${isLight ? "bg-white/90 border border-slate-200 text-slate-900 rounded-3xl p-6 sm:p-8 backdrop-blur" : "text-white bg-transparent border-0"}`}
        >
          <div className="flex items-start gap-4">
            <HiOutlineLightBulb className="text-blue-400 text-4xl shrink-0" />
            <div>
              <h3 className={`text-xl font-semibold mb-1 ${isLight ? "text-slate-900" : "text-white"}`}>
                Designed for Creativity
              </h3>
              <p className={`leading-relaxed max-w-sm text-sm ${isLight ? "text-slate-700" : "text-gray-400"}`}>
                A solid base for your ideas, built to be clean, minimal, and ready for customization.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FiStar className="text-blue-300 text-3xl shrink-0" />
            <div>
              <h3 className={`text-xl font-semibold mb-1 ${isLight ? "text-slate-900" : "text-white"}`}>
                Built to Inspire
              </h3>
              <p className={`leading-relaxed max-w-sm text-sm ${isLight ? "text-slate-700" : "text-gray-400"}`}>
                From bold figurines to fine details, every piece is designed to spark imagination.
              </p>
            </div>
          </div>

          {/* Floating Feature Cards */}
          <div className="hidden lg:grid grid-cols-3 gap-4 mt-6">
            <div className={`p-4 rounded-2xl backdrop-blur-xl flex flex-col items-center text-center transition-all ${isLight ? "bg-white/80 border border-blue-300/70 hover:border-blue-500" : "bg-white/10 border border-white/10 hover:border-blue-400"}`}>
              <RiEarthLine className="text-2xl text-blue-300 mb-2" />
              <p className={`text-base font-medium ${isLight ? "text-slate-800" : "text-white/80"}`}>UK Based</p>
            </div>
            <div className={`p-4 rounded-2xl backdrop-blur-xl flex flex-col items-center text-center transition-all ${isLight ? "bg-white/80 border border-indigo-300/70 hover:border-indigo-500" : "bg-white/10 border border-white/10 hover:border-indigo-400"}`}>
              <HiOutlineLightBulb className="text-2xl text-indigo-300 mb-2" />
              <p className={`text-base font-medium ${isLight ? "text-slate-800" : "text-white/80"}`}>3D Innovation</p>
            </div>
            <div className={`p-4 rounded-2xl backdrop-blur-xl flex flex-col items-center text-center transition-all ${isLight ? "bg-white/80 border border-green-300/70 hover:border-green-500" : "bg-white/10 border border-white/10 hover:border-green-400"}`}>
              <FaRecycle className="text-2xl text-green-300 mb-2" />
              <p className={`text-base font-medium ${isLight ? "text-slate-800" : "text-white/80"}`}>Sustainable</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase hidden sm:block ${isLight ? "text-slate-900" : "text-white/70"}`}>
        <a href="#services" className={`flex items-center gap-2 transition-colors ${isLight ? "hover:text-slate-700" : "hover:text-white"}`}>
          <span>Scroll</span>
          <span className="inline-block animate-bounce">▾</span>
        </a>
      </div>
    </section>
  );
}
