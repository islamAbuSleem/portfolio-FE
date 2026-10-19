# Deploying portfolio-FE (Cloudflare Workers)

Next.js 16 on Cloudflare Workers, using [vinext](https://vinext.dev) — the
official Cloudflare adapter for Next.js.

> The full setup guide (Neon, Render, checklist, troubleshooting, free-tier
> limits) is in [`docs/FREE-TIER-HOSTING.md`](../../docs/FREE-TIER-HOSTING.md).

---

## How it works

The app is **server-rendered** (the home page and `/projects` read live data
from the API), so a static export is not an option. vinext re-implements the
Next.js App Router on Vite and emits a standard Workers bundle.

`next.config.ts` rewrites `/api/*` to the API origin. The browser then only
ever calls its own origin, which is what keeps the `SameSite=Lax` auth cookie
working across `*.workers.dev` → `*.onrender.com`. **Do not set
`NEXT_PUBLIC_API_URL` in production.**

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Next.js dev server (unchanged — your normal workflow) |
| `npm run build` | Next.js production build (unchanged) |
| `npm run dev:vinext` | Vite-based dev server on port 3001 (matches the Workers runtime) |
| `npm run build:vinext` | Builds the Cloudflare Workers bundle into `.cloudflare/output` |
| `npm run start:vinext` | Serves the built bundle locally |
| `npm run deploy:vinext` | Builds and deploys to Cloudflare |
| `npm run check:vinext` | Compatibility report for this codebase |
| `npm run cf:types` | Regenerate Cloudflare binding types |

## Deploying

1. **Cloudflare dashboard → Workers & Pages → Create → Import a project**,
   connect `islamAbuSleem/portfolio-FE`.
2. Build settings:
   - Build command: `npm run build:vinext`
   - Build output directory: *(leave empty)*
   - Node version: `22`
3. **Settings → Variables and Secrets → Add**:
   - `API_URL` = `https://portfolio-be.onrender.com`
     → **mark it as a build variable** (the rewrite destination is resolved
     at build time)
   - `NODE_ENV` = `production`
4. Save and deploy.

Your URL: `https://portfolio-fe.<your-subdomain>.workers.dev`

### Verify

```bash
# 1. The rewrite is wired up — the build log prints this:
#    [vinext] Found 1 external rewrite that proxy requests to external origins:
#      /api/:path* → https://portfolio-be.onrender.com/:path*
#
# 2. The proxy works:
curl -i https://portfolio-fe.<sub>.workers.dev/api/projects
#    -> 200 with a JSON array
#
# 3. Auth round-trips (this is the one that matters):
#    sign in at https://portfolio-fe.<sub>.workers.dev/admin/login
```

## Local development

```bash
cp .env.example .env.local     # API_URL=http://localhost:4000
npm run dev                    # Next.js, proxies /api to localhost:4000
```

The API must be running for the data-driven sections to render; without it
the pages still render using the static project catalogue in
`data/projects.ts`.

## Files added for deployment

| File | Purpose |
|---|---|
| `vite.config.ts` | vinext + Cloudflare Vite plugin |
| `cloudflare.config.ts` | Worker name, entrypoint, `nodejs_compat` |
| `.env.example` | `API_URL` and the CORS notes |
| `data/projects.ts` | Static project catalogue (fallback + seed data) |
| `lib/projects.ts` | Merges catalogue + admin-managed projects |
| `.github/workflows/ci.yml` | Lint, typecheck, Next build, vinext check, Worker build |
