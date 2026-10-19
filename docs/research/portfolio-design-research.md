# Portfolio design research: what excellent engineer portfolios do (2025-2026)

**For:** Islam Abusleem's portfolio (`C:\workspace\islam\client`, Next.js).
**Written:** 20 Oct 2026. **Method:** desk research on Awwwards/Webby/CSS-Nectar winners plus hiring-side sources; palettes/fonts additionally *measured* from live sites' HTML/CSS where possible (marked "measured"). The repo had no `docs/` folder, so `docs/research/` was created as requested.

> Caveat up front: award juries reward creative-development spectacle; hiring panels reward clarity and proof. Treat award winners as *typographic and chromatic reference*, not as a template for a full-stack engineer with live products.

---

## 1. Diagnosis of the current build (why "not good enough" is correct)

The current system (`app/globals.css`): dark default `#0a0d18`, single mint accent `#5af5c0`, light `#fafafc`; display in Archivo (width axis 118), labels in Geist Mono; hairlines, one solid mint "field", giant numerals at 5% opacity.

Five problems, ranked:

1. **The palette is the single most-replicated dev-portfolio family.** Brittany Chiang's v4 (`#0a192f` navy + `#64ffda` mint) is the most-forked dev-portfolio repo on GitHub (**8k+ stars, 4k+ forks**) and cloned since 2019 ([bchiang7/v4](https://github.com/bchiang7/v4), [jobroadmaps](https://jobroadmaps.com/portfolios/brittany-chiang)). `#0a0d18` + `#5af5c0` is the same idea with the hue nudged; green-family accents appear on **16.7%** of dev portfolios ([createtoday](https://createtoday.io/examples?category=web-developer-portfolio)).
2. **Geist Mono reads "Next.js starter", not personality.** It is Vercel's face; [Falcon's typeface library](https://falcon.so/resources/fonts) literally files Geist under "developer products". A portfolio cannot borrow its only voice from the framework's default kit.
3. **The mint is decorative, not semantic.** "One solid field of the accent" spends the most saturated colour on a background, so it can no longer *signal* anything (live, available, new).
4. **Two copied moves with no job.** The 5%-opacity giant numeral is the most-imitated trick in current editorial portfolios (Huy Phan, [Dokle](https://dokle.design/awards/huy-phan-portfolio-typography-one-red-serif)), and `--tertiary: #ffc15e` / `--secondary: #8fa3d9` (dark) look unused. Prune unused tokens; incoherence at token level is visible ([toimi.pro](https://toimi.pro/blog/web-design-trends-what-works/)).

---

## 2. What praised portfolios actually use (decoded examples)

| Site | Palette (hex) | Type | Structure | Motion | Evidence |
|---|---|---|---|---|---|
| **Huy Phan Vol.2** (Awwwards SOTD 14 Oct 2026, Dev Award) | `#FF4949` red + `#181818` + near-white; measured also `#1E1E1E`/`#ECECEC` | One flared red serif (type credited to [Displaay](https://huyml.co/works.html), i.e. Reckless-family) + small grey grotesk | Name-only loader; projects named in red; vertical wordmark rail; live HCMC clock; works indexed by year with counts | Loader as brand; restrained chrome | [Awwwards](https://www.awwwards.com/sites/huy-phan-vol-2), [Dokle](https://dokle.design/awards/huy-phan-portfolio-typography-one-red-serif) |
| **Antoine Wodniack** (Webby 2025 winner, Best Home Page) | `#F21A4E` red, `#000000`, `#FFF` ([Fudge](https://fudge.design/share/wodniack.dev-design)); measured `#F40C3F` on `#160000` | Bigger Display + PP Editorial New + PP Fraktion Mono ([Colophon](https://thecolophon.com/websites/antoine-wodniack/)) | Full-bleed typographic wallpaper; project cards float on it; "WORK" as environmental texture | GSAP + Lenis, custom intro | [Webby](https://winners.webbyawards.com/2025/websites-and-mobile-sites/features-design/best-home-page/332383/aw-portfolio) |
| **Brittany Chiang** (current site) | `#0f172a` background, Tailwind slate greys (`#9ca3af`, `#e5e7eb`) (measured from live CSS), Inter | Inter (tuned) + mono labels | Sticky left identity/section nav; long right column; **work history before personal projects** | Scroll reveals, immediate reading | [csscreme](https://csscreme.com/showcase/brittany-chiang), [jobroadmaps](https://jobroadmaps.com/portfolios/brittany-chiang) |
| **Berke Sasa** (CSS Nectar SOTD 26 Jun 2026) | measured `#222831` bg, `#393E46`, `#F96D00` orange accent, `#EEEEEE` | Geist + Sansation (measured from live CSS) | Dated project list (month-year ranges on every entry); sections for projects/experience/technologies | Framer Motion shared-layout transitions, custom intro | [CSS Nectar](https://cssnectar.com/css-gallery-inspiration/berke-sasa-frontend-developer/), [projects](https://berkesasa.com/projects) |
| **Rauno Freiberg** | `#FFFF02` electric yellow accent, `#000`/`#EDEDED` ([OpenDesign](https://opendesign.cc/en/sites/rauno)) | Grotesque + mono; type at extreme scale, mostly weight 400 | Asymmetric card layout, giant statements, horizontal scroll | Restrained, prototype-like | [OpenDesign](https://opendesign.cc/en/sites/rauno) |
| **Paco Coursey** | Strict monochrome: `#3A3A3A` on `#FFFFFF`, no accent ([OpenDesign](https://opendesign.cc/en/sites/paco)) | Inter + Söhne + Newsreader ([learn-ui](https://learn-ui.com/chapters/people)) | Single 720px reading column, zero cards, serif italics for emphasis | ~240ms underline transitions only | [paco.me](https://paco.me/) |

Two patterns: the studio style leans on a **single saturated "ink"** (red for Huy/Wodniack, yellow for Rauno) with **one loud display face and one invisible text face**; the calm-counter style (Paco) wins on **type discipline and whitespace, not effects**.

---

## 3. Colour: what works vs what is cliché

**Measured reality of the category** (32 dev portfolios, [createtoday](https://createtoday.io/examples?category=web-developer-portfolio)): 53.1% near-black backgrounds (vs 18.1% gallery-wide); monochrome 53.1%, muted 40.6%, vivid only 6.3%. Accent families: black/white/grey 23.3%, blue 16.7%, green 16.7%, amber/orange 16.7%, red 13.3%, purple 6.7%, **lime 3.3%**, **teal/cyan 3.3%**. So dark + one accent is the norm; differentiation must come from hue choice, typography, and one signature behaviour — not from being dark.

**Working strategies**

- One primary + neutrals + a semantic status set, 60/30/10; dark mode must be designed, not inverted ([Velvetum](https://velvetum.com/en/journal/website-color-schemes)).
- Warm near-black beats cool navy if you want to escape the Chiang echo (measured: `#160000`-family in Wodniack, `#181818` in Huy Phan).
- Editorial counter-aesthetic (cream + serif + clay) differentiates in saturated technical categories — but "warm minimalism without content beneath it reads as thin", and beige/clay is itself becoming the convention ([toimi.pro](https://toimi.pro/blog/web-design-trends-what-works/); palette example `#FAF9F5`/`#141413`/`#D97757` from [ClaudeDesignSystem](https://github.com/viewer12/ClaudeDesignSystem)).

**Clichés to avoid, with hex**

| Cliché | Hex signature | Why it fails |
|---|---|---|
| Navy + neon mint/teal | `#0a192f` + `#64ffda` (and its cousins `#0a0d18` + `#5af5c0`) | The most-cloned dev-portfolio palette; teal/cyan = 3.3% of measured accents yet ~100% of template traffic |
| Terminal green on black | `#0d1117` + `#39ff14` | The "AI slop" answer to the same problem; a palette, not a position ([WomenDefiningAI skill](https://github.com/WomenDefiningAI/claude-code-skills/blob/main/skills/frontend-ui/SKILL.md)) |
| Purple/blue gradient hero, gradient text | — | Flagged red flags in every anti-slop source ([vibechecked](https://vibechecked.doruk.ch/)) |
| White + purple + black "modern" | [example sets sold as "modern"](https://reallygooddesigns.com/developer-portfolio-examples/) | Reads 2022; sold by listicles, not by portfolios that get hired |
| Glassmorphism cards, "trusted by" bars, badge/confetti credibility | — | Explicit red flags; replace with real proof ([vibechecked](https://vibechecked.doruk.ch/), [anti-slop doctrine](https://github.com/lukey662/agentsandskills/blob/main/templates/next-supabase/DESIGN.md)) |

Also avoid the *default* faces: [fontduet](https://fontduet.com/use/portfolio) calls Space Grotesk + Inter "the default for design and dev portfolios alike" — that is a warning, not a recommendation.

---

## 4. Typography: current, characterful, not training-data defaults

**Drop:** Inter, Space Grotesk, DM Sans, Roboto as *the* voice (repeatedly named as AI defaults in anti-slop guidance and by [Automattic's design-system skill](https://claudeskills.info/skills/Automattic/wordpress-agent-skills/design-systems/)). If Inter stays anywhere, it must be tuned (Brittany's readable trick is Inter's single-storey `a` via `ss07`/`cv` features, [dev.to](https://dev.to/heygauravshukla/why-the-same-font-can-look-so-different-and-how-to-fix-it-2kfg)). Geist Mono is Vercel's kit; fine for code blocks, weak as identity.

**Current serif display revival (evidence: [Envato font trends 2026](https://elements.envato.com/learn/font-trends), [madegooddesigns](https://madegooddesigns.com/web-typography-trends-2026/))** — expressive display up top, quiet body below, with the caveat that the *body* must be boring on purpose ([fontduet](https://fontduet.com/use/portfolio)).

| Face | Used by / role | Licence |
|---|---|---|
| **Reckless** (Displaay) | Huy Phan, Shed, Studio RHE; raised x-height old-style serif with swagger ([Displaay](https://displaay.net/typeface/reckless/), [Fonts In Use](https://fontsinuse.com/typefaces/75407/reckless)) | Paid |
| **PP Editorial New** | Wodniack's body/light-display serif ([Fudge](https://fudge.design/share/wodniack.dev-design)) | Paid (Pangram Pangram) |
| **Instrument Serif** | Free equivalent energy: "elegant, oversized statement headlines" paired against a quiet sans ([fontduet](https://fontduet.com/use/portfolio)) | Free (Google) |
| **Newsreader** | Reading-optimised serif for long case studies ([Falcon](https://falcon.so/resources/fonts)) | Free (Google) |
| **Berkeley Mono** | Terminals and *technical brands*; the current status mono among engineers ([Falcon](https://falcon.so/resources/fonts), [mrlaude](https://mrlaude.com/articles/tx-02/)) | Paid |
| **Commit Mono / Martian Mono / JetBrains Mono** | Editor-grade free monos; Martian Mono is explicitly built for "dense terminal, log and dashboard UI" ([Falcon](https://falcon.so/resources/fonts)) | Free |
| **Instrument Sans** | Editorial-leaning neutral sans that is not Inter ([fontduet pairings](https://fontduet.com/use/portfolio)) | Free (Google) |

Pairing strategies that hold up in 2026: (1) historical contrast (expressive face + neutral), (2) variation within one family, (3) controlled chaos — only with a bulletproof system ([no panic design](https://www.nopanicdesign.com/blog/web-design-trends-2026-colors-fonts/)).

---

## 5. Structure: evidence-backed vs trend noise

**Evidence-backed (do these)**

- **Work in the first viewport.** Reviewers categorise you within ~5 seconds; a recruiter's whole visit can be 90 seconds ([PortfolioOS](https://www.portfolios.chat/blog/best-developer-portfolio-examples-2025), [linkFolio](https://linkfolio.cv/blog/github-profile-vs-portfolio-website-2025)).
- **3-5 curated projects, not 15.** The reviewer deep-reads 2-3 and judges you on whichever they land on; broken demo links are an instant negative ([PortfolioOS](https://www.portfolios.chat/blog/best-developer-portfolio-examples-2025), [whennotesfly](https://whennotesfly.com/technology/tech-careers-roles-skills/portfolio-building-explained)).
- **Problem → approach → result, with one metric.** "Reduced page load by 60%" beats a screenshot plus a tech list ([PortfolioOS](https://www.portfolios.chat/blog/best-developer-portfolio-examples-2025), [Dice STAR README](https://www.dice.com/career-advice/how-to-create-a-project-portfolio-that-will-actually-land-you-a-job), [index.dev](https://www.index.dev/blog/evaluate-freelance-developer-portfolio)).
- **Deployed demos are not optional.** Evaluators will not clone and run your repo ([whennotesfly](https://whennotesfly.com/technology/tech-careers-roles-skills/portfolio-building-explained)).
- **Live + source links per project** are the "technical proof" reviewers look for, and **senior signals** (architecture decisions, trade-offs, mentoring, business impact) are what stop you reading mid-level ([PortfolioOS](https://www.portfolios.chat/blog/best-developer-portfolio-examples-2025), [tech-lead guide](https://www.portfolios.chat/blog/tech-lead-portfolio-examples)).
- **Employment context early** if employers are recognisable: Chiang puts work history *before* side projects, "the part worth copying"; keep the bio brief, one idea per paragraph ([jobroadmaps](https://jobroadmaps.com/portfolios/brittany-chiang)).
- **Do not** use skill meters or bury experience behind full-screen transitions ([Swipefile's Brittany decode](https://swipefile.design/ref/personal-brittany-chiang/)); link skills to evidence instead ([jobriver](https://jobriver.de/en/career-advice/developer-portfolio-2025-structure-content-examples-from-de)).
- **Fast + accessible:** sub-2.5s loads; keyboard/focus/reduced-motion get flagged by reviewers ([PortfolioOS](https://www.portfolios.chat/blog/best-developer-portfolio-examples-2025), [Swipefile](https://swipefile.design/ref/personal-brittany-chiang/)).

**Trend surface (fine as a single signature, weak as a system)**

- Project **index rails / row lists** with hover thumbnails: Huy Phan's works-by-year index, kin's hover-swap gallery ([huyml.co/works](https://huyml.co/works.html), [Dokle](https://dokle.design/websites), [Maria Vasilyeva's score-like index](https://dokle.design/awards/maria-vasilyeva-portfolio-laid-out-like-a-score)). These beat card grids for an 8-project catalogue because title + stack + links stay visible.
- **Live local clock** (Huy Phan shows HCMC time; the current build already has `LocalClock`). Keep only if it earns its space.
- **Giant numerals, loaders, custom introductions, 3D.** Award-winner vocabulary, not hiring evidence (Stas Bondar's own case study took *a year*, [Awwwards](https://www.awwwards.com/case-study-stas-bondar-25.html)). Budget one such moment, never at the cost of content access.

---

## 6. Three materially different directions

### A. "Ledger" — published dossier
- **Palette.** Light: bg `#F6F3EC`, surface `#FFFDF8`, ink `#171512`, muted `#6A655C`, rule `#E3DED2`, accent `#C2450F` (vermilion). Dark: bg `#14120E`, surface `#1C1913`, text `#EFEAE0`, muted `#9C948A`, accent `#FF6A3D`, rule `rgba(239,234,224,0.14)`.
- **Type.** Display: Tobias or Reckless (paid) / Instrument Serif (free). Body: **serif body** (Newsreader or Source Serif 4) — rare in dev portfolios and reads "author". Metadata: one mono (Commit Mono).
- **Layout.** Print-spread case studies: two-column, numbered folios, footnotes, a résumé page that looks typeset. Landing = name, one paragraph, then the ledger of work.
- **Signature.** Each project is a numbered "folio" with a printed status line: `SHIPPED 2025 · LIVE · SOURCE`.
- **Motion.** Rules draw in; cross-document View Transitions between index and case study (Baseline since Oct 2025, [Chrome blog](https://developer.chrome.com/blog/view-transitions-in-2025)). Nothing else.
- **Risk.** Warm minimalism reads thin without real writing; and cream+serif+clay is drifting toward an AI-brand convention ([toimi.pro](https://toimi.pro/blog/web-design-trends-what-works/)).

### B. "Instrument" — control room
- **Palette.** Dark: bg `#0E100C`, surface `#151812`, raised `#1C2018`, text `#ECEFE3`, muted `#A7AD9B`, rule `rgba(236,239,227,0.12)`, accent `#CDFF3D` (lime). Semantic: live `#6FE49A`, warn `#F6B84A`, down `#E5484D`. Light "document" mode: bg `#FAF9F4`, surface `#FFFFFF`, text `#15170F`, muted `#5A5F51`, rule `#E2E1D6`, accent-ink `#43590A`.
- **Type.** Display/status: **Martian Mono** (built for dense log/dashboard UI). Reading: Instrument Sans. Case-study pull quotes: Newsreader. All free; paid upgrade path Berkeley Mono + Söhne.
- **Layout.** Work-first index of instrumented project rows (`● LIVE`, stack, `SOURCE`), then experience as a deployment-style timeline, skills attached to the projects that prove them, contact with GMT+3 and a real availability line.
- **Signature.** A live **status board**: each project's live URL checked server-side with last-deploy date and local clock — a real uptime/health signal, not decoration.
- **Motion.** Status dot pulses, tabular counters, one rule-draw per section; everything under 300ms and gated on `prefers-reduced-motion` ([Kowalski](https://emilkowal.ski/ui/you-dont-need-animations)). Scroll-driven reveals only as progressive enhancement (Chrome 115+/Safari 26; Firefox still unsupported — [web-features](https://web-platform-dx.github.io/web-features-explorer/features/scroll-driven-animations/), [WebKit](https://webkit.org/blog/17818/announcing-interop-2026/)).
- **Risk.** "Dark + neon accent" is a flagged cliché ([vibechecked](https://vibechecked.doruk.ch/)); mitigated by warm near-black (not navy), a desaturated lime used at ≤8% coverage as *signal*, and full-bleed light document surfaces for case studies.

### C. "Broadside" — poster index
- **Palette.** Light: bg `#FAFAF7`, ink `#0B0B0C`, muted `#6E6E70`, accent `#1B34FF` (electric blue). Dark: bg `#0B0B0C`, text `#F2F1EC`, accent `#7C8CFF`.
- **Type.** Display: a compressed heavy grotesk (Archivo width-axis or Darker Grotesque) set at poster scale; body: one neutral sans; mono only for numbers.
- **Layout.** No cards at all: a single-column typographic index where each row *is* the project (title set huge, stack in small caps, live/source as inline links), with thumbnails swapping on hover.
- **Signature.** A giant, always-visible project counter and year rail; hover reveals a preview.
- **Motion.** Hover swaps and a velocity marquee; nothing scroll-coupled.
- **Risk.** Closest to "creative dev" territory (Huy Phan, Wodniack); blue accent is the category's second-most-common hue (16.7%).

---

## 7. Recommendation: **B, "Instrument"**, with A's document mode folded in

**Why B wins**

1. **It matches the positioning.** The site claims "distributed systems, backend services, interfaces that hold up in production". A live status board *demonstrates* that claim instead of asserting it — which is precisely what hiring-side sources reward ("technical proof"; deployed, working demos) ([PortfolioOS](https://www.portfolios.chat/blog/best-developer-portfolio-examples-2025), [whennotesfly](https://whennotesfly.com/technology/tech-careers-roles-skills/portfolio-building-explained)).
2. **It converts the required links into grammar.** Live demo + source stop being buttons under cards and become the page's structure (`● LIVE`, `SOURCE`), making liveness visible and auditable ([PortfolioOS](https://www.portfolios.chat/blog/best-developer-portfolio-examples-2025)).
3. **It is measurably rare in its hue while staying inside the category norm.** 53.1% of dev portfolios are near-black, so dark is not the differentiator; lime is (3.3% of measured accents) ([createtoday](https://createtoday.io/examples?category=web-developer-portfolio)). Warm near-black (`#0E100C`) also breaks the Chiang navy lineage.
4. **It resolves the diagnoses above.** Mint deleted, Geist Mono demoted to code blocks, accent made semantic (status + emphasis, ≤8% coverage), giant numeral replaced by a telemetry layer that carries information.
5. **The motion system is defensible.** Every animation answers Kowalski's gate (state indication, spatial continuity, rare delight) and stays under 300ms; scroll effects degrade gracefully given Firefox's missing support ([web-features](https://web-platform-dx.github.io/web-features-explorer/features/scroll-driven-animations/)).
6. **Dual surface.** Dark instrument shell for scanning; light paper documents (`#FAF9F4`) for case studies — quiet chrome, loud work, as Huy Phan and Wodniack do ([Dokle](https://dokle.design/awards/huy-phan-portfolio-typography-one-red-serif), [Fudge](https://fudge.design/share/wodniack.dev-design)).

**Concrete build notes.** Token names stay as-is (`--bg`, `--surface`, `--primary` → lime, `--primary-ink`); add `--status-live/--status-warn/--status-down`. Keep `--radius-*` at 2-4px. Contrast: `#CDFF3D` on `#0E100C` and `#43590A` on `#FAF9F4` both clear AA; accent text ≥14px in light mode. Cap animation at one authored moment per viewport.

**Runner-up.** For a more "author" register, choose **A** — most differentiating against the field — but only if case-study writing time is budgeted, or it will read thin ([toimi.pro](https://toimi.pro/blog/web-design-trends-what-works/)).

---

## Sources

**Awarded/praised portfolios (fetched or decoded):** [bchiang7/v4 GitHub palette](https://github.com/bchiang7/v4) · [Brittany Chiang decode (csscreme)](https://csscreme.com/showcase/brittany-chiang) · [Brittany Chiang hiring analysis](https://jobroadmaps.com/portfolios/brittany-chiang) · [Swipefile Brittany decode](https://swipefile.design/ref/personal-brittany-chiang/) · [Huy Phan Vol.2 (Awwwards)](https://www.awwwards.com/sites/huy-phan-vol-2) · [Huy Phan typography analysis (Dokle)](https://dokle.design/awards/huy-phan-portfolio-typography-one-red-serif) · [huyml.co works index](https://huyml.co/works.html) · [AW Portfolio Webby 2025](https://winners.webbyawards.com/2025/websites-and-mobile-sites/features-design/best-home-page/332383/aw-portfolio) · [The Colophon: Wodniack fonts](https://thecolophon.com/websites/antoine-wodniack/) · [Fudge: wodniack.dev system](https://fudge.design/share/wodniack.dev-design) · [Rauno (OpenDesign)](https://opendesign.cc/en/sites/rauno) · [Paco (OpenDesign)](https://opendesign.cc/en/sites/paco) · [learn-ui people](https://learn-ui.com/chapters/people) · [Berke Sasa (CSS Nectar)](https://cssnectar.com/css-gallery-inspiration/berke-sasa-frontend-developer/) · [berkesasa.com/projects](https://berkesasa.com/projects) · [Stas Bondar case study](https://www.awwwards.com/case-study-stas-bondar-25.html) · [Maria Vasilyeva (Dokle)](https://dokle.design/awards/maria-vasilyeva-portfolio-laid-out-like-a-score) · [Dokle websites](https://dokle.design/websites)

**Category data & hiring evidence:** [createtoday 32-portfolio measured study](https://createtoday.io/examples?category=web-developer-portfolio) · [PortfolioOS best examples 2025](https://www.portfolios.chat/blog/best-developer-portfolio-examples-2025) · [PortfolioOS tech-lead guide](https://www.portfolios.chat/blog/tech-lead-portfolio-examples) · [Dice project portfolios](https://www.dice.com/career-advice/how-to-create-a-project-portfolio-that-will-actually-land-you-a-job) · [whennotesfly portfolio building](https://whennotesfly.com/technology/tech-careers-roles-skills/portfolio-building-explained) · [linkFolio recruiters](https://linkfolio.cv/blog/github-profile-vs-portfolio-website-2025) · [jobriver DE structure](https://jobriver.de/en/career-advice/developer-portfolio-2025-structure-content-examples-from-de) · [index.dev portfolio evaluation](https://www.index.dev/blog/evaluate-freelance-developer-portfolio) · [Really Good Designs examples](https://reallygooddesigns.com/developer-portfolio-examples/)

**Colour & trend analysis:** [Figma web design trends](https://www.figma.com/resource-library/web-design-trends/) · [toimi.pro counter-aesthetic](https://toimi.pro/blog/web-design-trends-what-works/) · [Velvetum palette method](https://velvetum.com/en/journal/website-color-schemes) · [vibechecked cliché detector](https://vibechecked.doruk.ch/) · [anti-slop design rules](https://github.com/lukey662/agentsandskills/blob/main/templates/next-supabase/DESIGN.md) · [Automattic design-systems skill](https://claudeskills.info/skills/Automattic/wordpress-agent-skills/design-systems/) · [WomenDefiningAI frontend-ui skill](https://github.com/WomenDefiningAI/claude-code-skills/blob/main/skills/frontend-ui/SKILL.md) · [Claude design system tokens](https://github.com/viewer12/ClaudeDesignSystem)

**Typography:** [fontduet portfolios](https://fontduet.com/use/portfolio) · [Falcon typeface library](https://falcon.so/resources/fonts) · [Envato font trends](https://elements.envato.com/learn/font-trends) · [madegooddesigns web typography 2026](https://madegooddesigns.com/web-typography-trends-2026/) · [no panic design pairings](https://www.nopanicdesign.com/blog/web-design-trends-2026-colors-fonts/) · [Displaay Reckless](https://displaay.net/typeface/reckless/) · [Reckless in use](https://fontsinuse.com/typefaces/75407/reckless) · [Inter ss07 glyph tuning](https://dev.to/heygauravshukla/why-the-same-font-can-look-so-different-and-how-to-fix-it-2kfg) · [Berkeley Mono note](https://mrlaude.com/articles/tx-02/)

**Motion & platform:** [Kowalski, You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations) · [scroll-driven animations support](https://web-platform-dx.github.io/web-features-explorer/features/scroll-driven-animations/) · [caniuse scroll-driven animations](https://caniuse.com/wf-scroll-driven-animations) · [Interop 2026 (WebKit)](https://webkit.org/blog/17818/announcing-interop-2026/) · [View Transitions 2025 update (Chrome)](https://developer.chrome.com/blog/view-transitions-in-2025)

*Live-site palettes and fonts marked "measured" were extracted from each site's shipped CSS/HTML on 20 Oct 2026 and may change.*
