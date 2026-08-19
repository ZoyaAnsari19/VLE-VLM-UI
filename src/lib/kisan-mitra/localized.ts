// ============================================================
// LOCALIZED FIELD ACCESS
//
// Entity data carries one field per language, suffixed with the language code
// (`title_hi`, `title_en`, `title_mr`). Reading those with a ternary only ever
// works for two languages, so every read goes through `tr` instead: it builds
// the key from the active language and falls back to English when a
// translation has not been written yet.
//
// Adding a language is therefore a data change — no call site moves.
// ============================================================
import type { Lang } from "./recruitment/types";

/**
 * The `<base>_en` field's own type, or `never` when the object has no such
 * field — so a typo in `base` fails to compile instead of returning undefined.
 */
type Value<T, B extends string> = T[`${B}_en` & keyof T];

export function tr<T, B extends string>(obj: T, base: B, lang: Lang): Value<T, B> {
  const rec = obj as Record<string, unknown>;
  return (rec[`${base}_${lang}`] ?? rec[`${base}_en`]) as Value<T, B>;
}
