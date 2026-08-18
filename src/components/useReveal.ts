"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mirrors the vanilla engine's `.reveal`/`.in` scroll-reveal, self-contained per element.
 * `prefers-reduced-motion` is handled by the `.reveal` CSS itself (forces opacity:1 regardless
 * of `.in`), so this hook only needs to track IntersectionObserver-driven visibility.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  // Always starts hidden to match server-rendered output; the no-IntersectionObserver fallback
  // below corrects this post-hydration via a deferred (rAF) setState, never synchronously.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, className: `reveal${visible ? " in" : ""}` };
}
