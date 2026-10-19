/**
 * The canonical public origin of the portfolio.
 *
 * This is the "main link" of the site: it appears in the canonical tag, the
 * Open Graph URL and the project card that links to the portfolio itself.
 *
 * `islamabusleem.eu.org` is a free permanent subdomain from EU.org (free
 * since 1996). The Cloudflare zone for it and the Worker custom domain are
 * already set up, so it starts serving as soon as EU.org approves the
 * request and delegates the nameservers to Cloudflare.
 *
 * To switch to a paid domain instead, change this one line (and the
 * matching FRONTEND_URL on Render).
 */
export const SITE_URL = "https://islamabusleem.eu.org";

/**
 * The generated fallback hostname. The Worker always answers here too, so
 * the site is reachable even before the custom domain is delegated.
 */
export const FALLBACK_SITE_URL = "https://portfolio-fe.islamabusleem.workers.dev";

/** Absolute URL for a path on the portfolio. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
