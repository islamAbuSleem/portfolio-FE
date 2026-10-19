import { bindings, defineConfig, defineWorker, type TextBinding } from "cf/config";

/**
 * The portfolio's API origin.
 *
 * This has to be a *runtime* Worker variable, not just a build-time value:
 * `lib/api.ts` reads `process.env.API_URL` when the server component
 * renders, and inside a Worker `process.env` is populated from the
 * Worker's vars and secrets. Without it the SSR fetch falls back to
 * http://localhost:4000 and every data-driven section renders empty.
 */
const API_URL = process.env.API_URL ?? "https://portfolio-usca.onrender.com";

const apiUrl: TextBinding<string> = { type: "text", value: API_URL };

export default defineConfig({
  worker: defineWorker({
    name: "portfolio-fe",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-19",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      API_URL: apiUrl,
      ASSETS: bindings.assets(),
    },
  }),
});
