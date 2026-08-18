import { Fragment } from "react";

/**
 * Renders `**word**` markers in content strings as <b>. Splits into React nodes
 * rather than injecting HTML, so a stray `<` in copy can never become markup —
 * the string-rendering version had to escape by hand to get the same guarantee.
 */
export function BoldMarks({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>
      )}
    </>
  );
}
