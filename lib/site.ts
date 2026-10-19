/**
 * The canonical public origin of the portfolio.
 *
 * This is the "main link" of the site: it is what appears in canonical
 * tags, Open Graph URLs, and the project card that links to the portfolio
 * itself. Point the domain at a Worker and it is served from there.
 *
 * The deployment currently also answers on the generated
 * `https://portfolio-fe.islamabusleem.workers.dev` hostname, which is kept
 * as a fallback until the custom domain is registered and resolvable.
 */
export const SITE_URL = "https://islamabusleem.dev";

/** The generated fallback hostname, used until the custom domain is live. */
export const FALLBACK_SITE_URL = "https://portfolio-fe.islamabusleem.workers.dev";

/** Absolute URL for a path on the portfolio. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
