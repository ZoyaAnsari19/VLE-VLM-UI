"use client";

import { useEffect, useRef, useState } from "react";
import { FAQ } from "@/lib/kisan-mitra/data";
import { useLang } from "@/components/LangProvider";
import { useReveal } from "@/components/useReveal";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const { ref: revealRef, className: revealClass } = useReveal<HTMLDivElement>();
  const answerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  // `.faq-a` animates max-height, which can't be `auto`, so the open height is
  // measured from the content. Re-measured when `answer` changes too, otherwise
  // an open item would keep the previous language's height.
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    const el = answerRef.current;
    if (el) setMaxHeight(open ? el.scrollHeight : 0);
  }, [open, answer]);

  return (
    <div className={`faq-item ${revealClass}${open ? " open" : ""}`} data-faq={index} ref={revealRef}>
      <button type="button" className="faq-q" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span>{question}</span>
        <Icon name="chev" className="chev" />
      </button>
      <div className="faq-a" ref={answerRef} style={{ maxHeight }}>
        <div className="faq-a-inner">{answer}</div>
      </div>
    </div>
  );
}

export function Faq() {
  const { t, lang } = useLang();

  return (
    <section id="faq">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">
            <Icon name="badge" /> FAQ
          </span>
          <h2 className="h2">{t.faq_title}</h2>
          <p>{t.faq_sub}</p>
        </Reveal>
        <div className="faq-list">
          {FAQ.map((f, i) => (
            <FaqItem
              key={f.q_en}
              index={i}
              question={lang === "hi" ? f.q_hi : f.q_en}
              answer={lang === "hi" ? f.a_hi : f.a_en}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
