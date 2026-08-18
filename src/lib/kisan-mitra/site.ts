/**
 * Canonical origin for absolute URLs (sitemap, robots, Open Graph).
 * Overridable per environment so preview deploys don't advertise production.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://exam.kalakar.tv"
).replace(/\/$/, "");
