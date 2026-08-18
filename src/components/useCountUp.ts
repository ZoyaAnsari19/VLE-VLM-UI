"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `target` once `active` turns true, easing out over ~1.4s —
 * the React port of the vanilla `animateCount()`. Honours
 * `prefers-reduced-motion` by jumping straight to the final value.
 */
export function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      raf = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(raf);
    }

    const duration = 1400;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  return value;
}

/**
 * Fires once when the element scrolls into view — pairs with `useCountUp` to
 * start stat counters only when the user can actually see them.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(threshold = 0.5) {
  const ref = useRef<T>(null);
  // Always starts false to match server-rendered output; corrected post-hydration.
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      const raf = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}
