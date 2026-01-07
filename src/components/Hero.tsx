"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { FiStar } from "react-icons/fi";
import { RiLeafFill } from "react-icons/ri";
import { MdBrush } from "react-icons/md";
import { GiDragonHead } from "react-icons/gi";
import { RiEarthLine } from "react-icons/ri";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaRecycle, FaShoppingBag } from "react-icons/fa";

interface HeroProps {
  onLoadComplete?: () => void;
}

type SplineComponent = ComponentType<{
  scene: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}>;

const useSaveDataPreference = () => {
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const connection = typeof navigator !== "undefined" ? (navigator as any).connection : null;
    const update = () => setSaveData(Boolean(connection?.saveData));

    update();
    connection?.addEventListener?.("change", update);
    return () => connection?.removeEventListener?.("change", update);
  }, []);

  return saveData;
};

const useIdle = (timeoutMs = 800) => {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const idleCallback = (window as any).requestIdleCallback;

    if (typeof idleCallback === "function") {
      const handle = idleCallback(() => setIdle(true), { timeout: timeoutMs });
      return () => (window as any).cancelIdleCallback?.(handle);
    }

    const handle = window.setTimeout(() => setIdle(true), timeoutMs);
    return () => clearTimeout(handle);
  }, [timeoutMs]);

  return idle;
};

const useFirstInteraction = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const trigger = () => setReady(true);
    const events: (keyof WindowEventMap)[] = ["pointerdown", "touchstart", "keydown", "scroll"];
    events.forEach((evt) => window.addEventListener(evt, trigger, { passive: true }));
    return () => events.forEach((evt) => window.removeEventListener(evt, trigger));
  }, []);

  return ready;
};

const useIntersectionOnce = (rootMargin = "200px") => {
  const targetRef = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!targetRef.current) return;
    if (typeof IntersectionObserver === "undefined") {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { targetRef, isIntersecting };
};

const useSplineScene = (timeoutMs = 4000, enabled = true) => {
  const [useFallback, setUseFallback] = useState(false);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setUseFallback(false);
      setVisible(false);
      clearTimer();
      return;
    }

    const effectiveTimeout = Math.min(timeoutMs, 2500);
    timeoutRef.current = setTimeout(() => setUseFallback(true), effectiveTimeout);
    return () => clearTimer();
  }, [timeoutMs, enabled]);

  return {
    useFallback,
    splineVisible: visible,
    markLoaded: useCallback(() => {
      clearTimer();
      setUseFallback(false);
      setVisible(true);
    }, [clearTimer]),
    markError: useCallback(() => {
      clearTimer();
      setUseFallback(true);
    }, [clearTimer]),
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
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineEverLoaded, setSplineEverLoaded] = useState(false);
  const [lightVideoStarted, setLightVideoStarted] = useState(false);
  const buttonsRef = useRef(null);
  const saveData = useSaveDataPreference();
  const idleReady = useIdle();
  const interactionReady = useFirstInteraction();
  const { targetRef: heroRef, isIntersecting } = useIntersectionOnce();
  const isLighthouse =
    typeof navigator !== "undefined" &&
    /Lighthouse|Chrome-Lighthouse|Page Speed Insights/i.test(navigator.userAgent || "");
  const [SplineComponent, setSplineComponent] = useState<SplineComponent | null>(null);
  const allowHeavy = !isLighthouse;
  const shouldLoadHeavy = allowHeavy && isIntersecting;
  const { useFallback, splineVisible, markLoaded, markError } = useSplineScene(4000, shouldLoadHeavy);
  const theme = useTheme();
  const isLight = theme === "light";
  const lightPanelStyle = isLight
    ? {
        background: "linear-gradient(45deg, #fff -25%, transparent)",
        boxShadow:
          "inset -5px 5px 5px -5px #fff8, inset 5px -5px 5px -5px #fff8, var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow), 2px -1px 14px -10px #0004",
      }
    : undefined;

  const handleSplineLoad = () => {
    setSplineLoaded(true);
    setSplineEverLoaded(true);
    markLoaded();
    onLoadComplete?.();
  };

  // const heroVisible = isLight || !shouldLoadHeavy || splineLoaded || useFallback;

  // Keep hero content visible on all devices; we only swap backgrounds when heavy assets are ready.
  const heroVisible = true;
  const showDarkSpline = !isLight && SplineComponent && (splineEverLoaded || (shouldLoadHeavy && !useFallback));
  const showLightVideo = isLight && (lightVideoStarted || shouldLoadHeavy);

  useEffect(() => {
    if (!shouldLoadHeavy || SplineComponent) return;

    let cancelled = false;
    import("@splinetool/react-spline")
      .then((mod) => {
        if (!cancelled) {
          setSplineComponent(() => mod.default);
        }
      })
      .catch(() => {
        if (!cancelled) {
          markError();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [shouldLoadHeavy, SplineComponent, markError]);

  return (
    <section
      id="homepage"
      ref={heroRef}
      className="relative min-h-[100svh] lg:min-h-[100vh] overflow-hidden z-0"
    >
      {/* Background fixed to viewport to avoid iOS visual viewport resizes */}
      <div
        className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none w-full h-full overflow-hidden"
      >
        {showDarkSpline ? (
          <div className={`w-full h-full transition-opacity duration-700 ${splineVisible ? "opacity-100" : "opacity-0"}`}>
            <SplineComponent className="spline-scene" scene="/scene.splinecode" onLoad={handleSplineLoad} onError={markError} />
          </div>
        ) : (
          !isLight && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.12),transparent_32%),radial-gradient(circle_at_60%_70%,rgba(14,165,233,0.18),transparent_45%)]" />
          )
        )}
        {isLight &&
          (showLightVideo ? (
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <video
                className="absolute inset-0 h-full w-full object-cover object-left sm:object-center will-change-transform"
                src="/whitebg.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                onLoadedData={() => setLightVideoStarted(true)}
                style={{ transform: "translateZ(0)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-white/30" />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-100/70 to-slate-200/70" />
          ))}
      </div>

      {/* Ambient lighting */}
      {!isLight && (
        <div className="hidden lg:block absolute inset-0 -z-10">
          <div className="absolute top-1/3 left-[10%] h-64 w-64 bg-blue-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-[10%] h-72 w-72 bg-indigo-400/20 rounded-full blur-[140px]" />
          <div className="absolute top-0 left-1/2 h-40 w-40 bg-fuchsia-500/10 rounded-full blur-[100px]" />
        </div>
      )}

      {/* Main Hero */}
      <div
        className={`relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32 gap-16 lg:gap-36 xl:gap-40 transition-opacity duration-700 ${heroVisible ? "opacity-100" : "opacity-0"
          }`}
      >
        {/* Left side */}
        <div
          className={`${isLight ? "bg-white/90 border border-slate-200 text-slate-900 shadow-lg rounded-3xl p-6 sm:p-8 backdrop-blur w-full overflow-hidden" : ""}`}
          style={lightPanelStyle}
        >
          <div className="flex items-center gap-6 mb-2 justify-center lg:justify-start">
            <img
              src="/notitlefrwatermark.webp"
              alt="ForgeRealm Logo"
              width={90}
              height={90}
              className={`object-contain ${isLight ? "bg-slate-900 rounded-full p-2" : "drop-shadow-[0_0_40px_rgba(59,130,246,0.55)]"} hidden sm:block`}
              loading="lazy"
            />
            <div className="relative inline-block max-w-full">
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 blur-xl opacity-40 rounded-lg block" />
              <h1
                className={`relative max-w-full font-display leading-[0.95] ${isLight ? "text-5xl sm:text-6xl lg:text-6xl" : "text-5xl sm:text-6xl lg:text-7xl"} font-bold tracking-tight break-words ${isLight ? "text-slate-900" : "text-white"}`}
              >
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
              <RiLeafFill className="text-green-400 text-xl" />
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
          className={`hidden lg:grid gap-4 transition-all duration-700 ease-out translate-x-0 opacity-100 ${isLight ? "bg-white/90 border border-slate-200 text-slate-900 rounded-3xl p-6 sm:p-8 backdrop-blur" : "text-white bg-transparent border-0"}`}
          style={lightPanelStyle}
        >
          <div className={`rounded-3xl border ${isLight ? "border-slate-200 bg-white/80" : "border-white/10 bg-white/5"} p-6`}>
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
          </div>

          <div className={`rounded-3xl border ${isLight ? "border-slate-200 bg-white/80" : "border-white/10 bg-white/5"} p-6`}>
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
          </div>

          <div className="grid grid-cols-6 gap-4 auto-rows-fr">
            <div className={`p-4 rounded-2xl backdrop-blur-xl flex flex-col items-center text-center transition-all ${isLight ? "bg-white/80 border border-blue-300/70 hover:border-blue-500" : "bg-white/10 border border-white/10 hover:border-blue-400"}`}>
              <RiEarthLine className="text-2xl text-blue-300 mb-2" />
              <p className={`text-base font-medium ${isLight ? "text-slate-800" : "text-white/80"}`}>UK Based</p>
            </div>
            <div className={`p-4 rounded-2xl backdrop-blur-xl flex flex-col items-center text-center transition-all lg:col-span-3 ${isLight ? "bg-white/80 border border-indigo-300/70 hover:border-indigo-500" : "bg-white/10 border border-white/10 hover:border-indigo-400"}`}>
              <HiOutlineLightBulb className="text-2xl text-indigo-300 mb-2" />
              <p className={`text-base font-medium ${isLight ? "text-slate-800" : "text-white/80"}`}>3D Innovation</p>
            </div>
            <div className={`p-4 rounded-2xl backdrop-blur-xl flex flex-col items-center text-center transition-all lg:col-span-2 ${isLight ? "bg-white/80 border border-green-300/70 hover:border-green-500" : "bg-white/10 border border-white/10 hover:border-green-400"}`}>
              <FaRecycle className="text-2xl text-green-300 mb-2" />
              <p className={`text-base font-medium ${isLight ? "text-slate-800" : "text-white/80"}`}>Sustainable</p>
            </div>
            <div className={`p-4 rounded-2xl backdrop-blur-xl flex flex-col items-center text-center transition-all lg:col-span-2 ${isLight ? "bg-white/80 border border-emerald-300/70 hover:border-emerald-500" : "bg-white/10 border border-white/10 hover:border-emerald-400"}`}>
              <RiLeafFill className="text-2xl text-emerald-300 mb-2" />
              <p className={`text-base font-medium ${isLight ? "text-slate-800" : "text-white/80"}`}>Eco Friendly</p>
            </div>
            <div className={`p-4 rounded-2xl backdrop-blur-xl flex flex-col items-center text-center transition-all lg:col-span-2 ${isLight ? "bg-white/80 border border-pink-300/70 hover:border-pink-500" : "bg-white/10 border border-white/10 hover:border-pink-400"}`}>
              <MdBrush className="text-2xl text-pink-300 mb-2" />
              <p className={`text-base font-medium ${isLight ? "text-slate-800" : "text-white/80"}`}>Paint Ready</p>
            </div>
            <div className={`p-4 rounded-2xl backdrop-blur-xl flex flex-col items-center text-center transition-all lg:col-span-2 ${isLight ? "bg-white/80 border border-indigo-300/70 hover:border-indigo-500" : "bg-white/10 border border-white/10 hover:border-indigo-400"}`}>
              <GiDragonHead className="text-2xl text-indigo-300 mb-2" />
              <p className={`text-base font-medium ${isLight ? "text-slate-800" : "text-white/80"}`}>Fantasy Figurines</p>
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
