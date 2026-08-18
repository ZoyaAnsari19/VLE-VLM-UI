import { ICON } from "@/lib/kisan-mitra/icons";

const ICONS = ICON as Record<string, string>;

interface IconProps {
  /** Key into the ICON map, e.g. "leaf" | "rupee". Unknown keys render nothing. */
  name: string;
  className?: string;
  /**
   * Element that carries the SVG. Pass "div" where the original markup put the
   * raw SVG straight inside a block wrapper, so the DOM shape stays the same.
   */
  as?: "span" | "div";
  "aria-hidden"?: boolean;
  style?: React.CSSProperties;
}

/**
 * Renders one of the inline SVGs from `icons.ts`. The SVG markup is authored in
 * this repo (never user input), so injecting it is safe; the wrapper element
 * exists because React can't emit raw markup without one.
 */
export function Icon({ name, className, as: Tag = "span", "aria-hidden": ariaHidden, style }: IconProps) {
  const svg = ICONS[name];
  if (!svg) return null;
  // An unclassed wrapper is one this component introduces where the markup
  // previously had a bare SVG, so it gets `km-ico` (display:inline-flex) to
  // avoid adding baseline descender space that wasn't there before. A classed
  // wrapper reproduces an element the markup already had, so it is left alone
  // and keeps whatever display its own class defines.
  return (
    <Tag
      className={className ?? "km-ico"}
      aria-hidden={ariaHidden}
      style={style}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
