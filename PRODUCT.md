# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Hiring decision-makers first** — recruiters, engineering managers, and tech leads evaluating Islam Abusleem for senior full-stack engineering roles. They arrive from a CV, LinkedIn, or GitHub and need evidence of real shipped work: live links, source code, and scope of responsibility.
- **Potential clients second** — people considering Islam for contract or freelance work, browsing the same work with an eye for deliverables, stack fit, and credibility.

The user confirmed the audience is "both, weighted to roles."

## Product Purpose

The personal portfolio of Islam Abusleem, a senior full-stack engineer. It presents his work, skills, and experience as a shareable professional reference whose success is landing interview conversations and opportunities. The user confirmed a work-first emphasis with real live/source links.

## Positioning

The portfolio is itself a work sample: it is a self-built full-stack platform — custom admin panel, own NestJS API, PostgreSQL database — not a template. The engineering depth it claims is demonstrated by the site the visitor is using and by sibling projects that are real deployed apps with public source.

## Operating Context

- Visitors arrive from a CV, LinkedIn, or GitHub and scan on desktop and mobile.
- Content is managed by the owner through the admin panel (`/admin`), not by editing code; the API is authoritative.
- Deployed on Cloudflare Workers; server-rendered through vinext. The site must stay populated even when the API or database is unreachable (static fallback catalogue).
- Real links matter: each project carries a live URL and/or a GitHub repo link; empty live URLs must degrade gracefully, never render broken "Live Demo" links.

## Capabilities and Constraints

- One-page portfolio: hero, featured projects, about, skills, experience, contact, footer; plus a dedicated `/projects` page.
- Data layer: `lib/api.ts` fetches about/skills/experience/projects from the API (`NEXT_PUBLIC_API_URL ?? "/api"`); `lib/projects.ts` `mergeProjects` combines API projects with the static catalogue in `data/projects.ts` — a database project wins over a static entry with the same title, static entries append.
- Skill categories terminology: Frontend, Backend, DevOps, Tools, Other.
- The existing section set is confirmed to stay (Work, About, Skills, Experience, Contact); the admin panel and API-editable content stay.
- Undecided: no custom domain is registered (the canonical origin is the workers.dev hostname); whether to attach one later is open.

## Brand Commitments

- Name: **Islam Abusleem** (GitHub handle `islamAbuSleem`).
- Existing copy is preserved — the user confirmed this is a visual/design pass, not a copy rewrite.
- No logo, trademark, or identity assets beyond the name and the branded per-project SVG plates.

## Evidence on Hand

- Eight projects in `data/projects.ts` with branded SVG plates at `public/projects/<slug>.svg` (portfolio, product-search, job-pilot, booking, ecommerce, school, learn-hub, engineer-docs).
- Real GitHub repositories under `https://github.com/islamAbuSleem`; so far only the portfolio itself has a live URL (`https://portfolio-fe.islamabusleem.workers.dev`).
- Absences that future work must not fabricate: no real project screenshots (the SVGs are branded placeholders), no live URLs for the other projects yet, no testimonials, no usage metrics or benchmarks, no client logos.

## Product Principles

1. The site is itself a work sample — it must hold up to the technical scrutiny of the audience it targets.
2. Work first: real projects and verifiable links carry the site; everything else supports them.
3. Never fabricate: no invented metrics, testimonials, links, or deployment claims; missing data degrades gracefully.
4. Self-managed content: the admin panel stays the way the owner edits content; the API remains authoritative over the static fallback.
5. Weighted to roles: optimize for hiring decision-makers first, clients second.
