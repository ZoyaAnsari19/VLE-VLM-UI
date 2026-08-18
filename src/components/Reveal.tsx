"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/components/useReveal";

type RevealTag = "div" | "article" | "section" | "header" | "figure" | "p" | "li" | "ul";

interface RevealProps {
  children?: ReactNode;
  /** Classes placed before the `reveal` class, matching the original markup order. */
  className?: string;
  as?: RevealTag;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Wraps `useReveal` so a scroll-revealed element is a one-liner. Each instance
 * observes itself, which is what lets revealed items inside a filtered/paginated
 * list work — the old global `setupReveal()` pass only saw the DOM once.
 */
export function Reveal({ children, className, as: Tag = "div", id, style }: RevealProps) {
  const { ref, className: revealClass } = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref as React.Ref<never>}
      id={id}
      style={style}
      className={className ? `${className} ${revealClass}` : revealClass}
    >
      {children}
    </Tag>
  );
}
