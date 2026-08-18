"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ICON } from "@/lib/kisan-mitra/icons";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  ariaLabel: string;
  closeLabel: string;
  children: ReactNode;
}

/** Reuses the existing `.km-modal` CSS so this reads as the same modal already used site-wide. */
export function Modal({ open, onClose, ariaLabel, closeLabel, children }: ModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      if (triggerRef.current instanceof HTMLElement) triggerRef.current.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="km-modal open"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="km-modal-panel" role="document">
        <button
          type="button"
          className="km-modal-close"
          aria-label={closeLabel}
          onClick={onClose}
          ref={closeBtnRef}
        >
          <span dangerouslySetInnerHTML={{ __html: ICON.x }} />
        </button>
        {children}
      </div>
    </div>
  );
}
