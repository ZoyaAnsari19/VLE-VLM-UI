"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseCarouselOptions {
  /** Selector for a single card inside the track — drives the per-click scroll distance. */
  cardSelector: string;
  /**
   * Perks-style carousels size their cards to the full viewport on phones so one
   * card fills the screen; the roadmap/panel carousels keep their fixed width and
   * simply scroll. Mirrors the vanilla `fullWidthCardsOnMobile` flag.
   */
  fullWidthCardsOnMobile?: boolean;
}

/**
 * Horizontal scroll-snap carousel with prev/next controls — the React port of
 * the vanilla `bindCarousel()`. Keyed off refs rather than element IDs so the
 * same carousel can appear more than once per page without ID collisions.
 */
export function useCarousel({ cardSelector, fullWidthCardsOnMobile = false }: UseCarouselOptions) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const updateEdges = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const max = viewport.scrollWidth - viewport.clientWidth;
    setAtStart(viewport.scrollLeft <= 4);
    setAtEnd(viewport.scrollLeft >= max - 4);
  }, []);

  const syncCardWidths = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || !fullWidthCardsOnMobile) return;
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    viewport.querySelectorAll<HTMLElement>(cardSelector).forEach((card) => {
      const width = mobile ? `${viewport.clientWidth}px` : "";
      card.style.flexBasis = width;
      card.style.width = width;
      card.style.maxWidth = width;
    });
  }, [cardSelector, fullWidthCardsOnMobile]);

  const scrollStep = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    const card = viewport.querySelector<HTMLElement>(cardSelector);
    if (!card) return viewport.clientWidth * 0.85;
    const gap = trackRef.current ? parseFloat(getComputedStyle(trackRef.current).gap) || 18 : 18;
    return card.offsetWidth + gap;
  }, [cardSelector]);

  const scrollBy = useCallback(
    (direction: 1 | -1) => {
      viewportRef.current?.scrollBy({ left: direction * scrollStep(), behavior: "smooth" });
    },
    [scrollStep]
  );

  const scrollPrev = useCallback(() => scrollBy(-1), [scrollBy]);
  const scrollNext = useCallback(() => scrollBy(1), [scrollBy]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onResize = () => {
      syncCardWidths();
      updateEdges();
    };
    viewport.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", onResize);
    syncCardWidths();
    updateEdges();

    return () => {
      viewport.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", onResize);
    };
  }, [syncCardWidths, updateEdges]);

  return { viewportRef, trackRef, atStart, atEnd, scrollPrev, scrollNext };
}
