import type { NextConfig } from "next";

/**
 * Origin of the portfolio API (the NestJS service on Render).
 *
 * The browser always calls the relative `/api/*` path, which is proxied to
 * this origin by the rewrite below. Keeping the request same-origin is what
 * allows the httpOnly auth cookie (SameSite=Lax) to survive: a direct
 * cross-site call to *.onrender.com from *.workers.dev would be blocked by
 * the browser, silently breaking the admin panel.
 */
const apiOrigin = process.env.API_URL?.trim().replace(/\/+$/, "");

const isProduction = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  async rewrites() {
    // In production the API origin must be provided at build time. If it is
    // missing we deliberately register no proxy, so a misconfigured deploy
    // fails loudly instead of quietly proxying to localhost.
    if (!apiOrigin && isProduction) {
      return [];
    }

    return [
      {
        source: "/api/:path*",
        destination: `${apiOrigin ?? "http://localhost:4000"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
