/**
 * The canonical public origin of the portfolio.
 *
 * This is the "main link" of the site: it appears in the canonical tag, the
 * Open Graph URL and the project card that links to the portfolio itself.
 *
 * Cloudflare's `workers.dev` hostname is free, permanent and never expires
 * or needs renewing, which keeps the whole stack at $0/month.
 *
 * To move to a custom domain later, change this one line (and the matching
 * APP_URL / FRONTEND_URL on Render), then add the domain as a Worker custom
 * domain in Cloudflare. Nothing else needs to change.
 */
export const SITE_URL = "https://portfolio-fe.islamabusleem.workers.dev";

/**
 * The generated hostname. This is the site's public address.
 */
export const FALLBACK_SITE_URL = SITE_URL;

/** Absolute URL for a path on the portfolio. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
