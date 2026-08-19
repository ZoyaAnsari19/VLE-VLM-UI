"use client";

import { useState } from "react";
import { EXAMS, type ExamSample } from "@/lib/kisan-mitra/data";
import { useLang } from "@/components/LangProvider";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Modal } from "@/components/Modal";
import { routes } from "@/lib/kisan-mitra/routes";
import { tr } from "@/lib/kisan-mitra/localized";

type Exam = (typeof EXAMS)[number];

/** How many exam cards the home page shows before linking out to /exams. */
export const EXAMS_VISIBLE_COUNT = 4;

function SampleQuestions({ exam }: { exam: Exam }) {
  const { t, lang } = useLang();
  return (
    <>
      {tr(exam, "samples", lang).map((q: ExamSample, i: number) => (
        <div className="sample-q" key={q.q}>
          <div className="qt">
            Q{i + 1}. {q.q}
          </div>
          {q.descriptive ? (
            <span className="desc-tag">{t.exam_descriptive}</span>
          ) : (
            <ul>
              {q.opts.map((o, oi) => (
                <li className={oi === q.correct ? "correct" : ""} key={o}>
                  {o}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
}

interface ExamsProps {
  /** /exams renders every exam; the home page shows the first few plus a link. */
  showAll?: boolean;
  /** Off when the page already has its own <h1> above this section. */
  heading?: boolean;
}

export function Exams({ showAll = false, heading = true }: ExamsProps) {
  const { t, lang } = useLang();
  const [selected, setSelected] = useState<Exam | null>(null);
  const visible = showAll ? EXAMS : EXAMS.slice(0, EXAMS_VISIBLE_COUNT);

  const forText = (e: Exam) => (tr(e, "for", lang));

  return (
    <section id="exams" className="bg-paper">
      <div className="container">
        {heading && (
          <Reveal className="section-head">
            <span className="eyebrow">
              <Icon name="cap" /> Exams
            </span>
            <h2 className="h2">{t.exams_title}</h2>
            <p>{t.exams_sub}</p>
          </Reveal>
        )}

        <div className="exams-grid">
          {visible.map((e) => (
            <Reveal as="article" className="card exam-card" id={`exam-${e.id}`} key={e.id}>
              <div className="exam-head">
                <div>
                  <span className="eyebrow">{forText(e)}</span>
                </div>
                <span className="exam-fee">₹{e.fee}</span>
              </div>
              <h3 className="h3">{tr(e, "name", lang)}</h3>
              <p className="exam-for">
                {t.exam_for}: {forText(e)}
              </p>
              <div className="exam-rows">
                <div className="exam-row">
                  <span className="k">{t.exam_duration}</span>
                  <span className="v">{tr(e, "duration", lang)}</span>
                </div>
                <div className="exam-row">
                  <span className="k">{t.exam_questions}</span>
                  <span className="v">{tr(e, "questions", lang)}</span>
                </div>
                <div className="exam-row">
                  <span className="k">{t.exam_sections}</span>
                  <span className="v">
                    <ul className="exam-sections">
                      {tr(e, "sections", lang).map((s: string) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </span>
                </div>
                <div className="exam-row">
                  <span className="k">{t.exam_negative}</span>
                  <span className="v">{tr(e, "negative", lang)}</span>
                </div>
                <div className="exam-row">
                  <span className="k">{t.exam_qualifying}</span>
                  <span className="v">{e.qualifying}</span>
                </div>
              </div>
              <div className="samples">
                <button
                  type="button"
                  className="btn btn-ghost sample-toggle"
                  aria-haspopup="dialog"
                  onClick={() => setSelected(e)}
                >
                  {t.exam_samples} <Icon name="chev" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {!showAll && EXAMS.length > EXAMS_VISIBLE_COUNT && (
          <div className="rec-view-all">
            <a href={routes.exams()} className="btn btn-outline">
              {t.exams_view_all} ({EXAMS.length})
            </a>
          </div>
        )}

        <Reveal className="card" style={{ marginTop: 22 }}>
          <h3 className="h3" style={{ marginTop: 0, color: "var(--green-forest)" }}>
            {t.reschedule_title}
          </h3>
          <p style={{ margin: "8px 0 0" }}>• {t.reschedule_1}</p>
          <p style={{ margin: "6px 0 0" }}>• {t.reschedule_2}</p>
        </Reveal>
      </div>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        ariaLabel={t.exam_samples}
        // `t.role_close` never existed — the old markup rendered aria-label="undefined" here.
        closeLabel={t.card_close}
      >
        {selected && (
          <>
            <div className="km-modal-head">
              <span className="eyebrow">{forText(selected)}</span>
              <div>
                <h3 className="km-modal-title">{tr(selected, "name", lang)}</h3>
                <div className="km-modal-sub">
                  {t.exam_for}: {forText(selected)}
                </div>
              </div>
            </div>
            <div className="km-modal-body km-exam-samples-body">
              <SampleQuestions exam={selected} />
            </div>
            <div className="km-modal-foot">
              <a
                href={routes.apply()}
                className="btn btn-primary km-modal-apply"
                onClick={() => setSelected(null)}
              >
                {t.nav_apply} <Icon name="arrowRight" />
              </a>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}
