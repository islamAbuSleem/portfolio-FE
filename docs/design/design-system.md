# Design system — Obsidian Kinetic

The portfolio's visual system. Deep obsidian surfaces, glass planes, hairline
micro-borders, and three accents that each mean exactly one thing.

This document is the source of truth for the tokens in `app/globals.css`. If
the CSS and this file disagree, the CSS wins and this file is wrong.

---

## Brand & style

The system expresses the caliber of a senior full-stack engineer: deep,
precise and technical, with a small number of very bright accents used as
signals rather than decoration.

- **Atmosphere:** obsidian and slate foundations layered with translucent glass
  planes, ambient colour fields, and laser-fine micro-borders.
- **Accents:** indigo for action, cyan for live state, violet for depth. Never
  decorative noise.
- **Tone:** calculated and modern. No toy gradients, no skeuomorphism.

## Colours

### Surfaces (dark, the default)

| Token | Value | Used for |
| --- | --- | --- |
| `bg` | `#0f131c` | the page ground |
| `surface-container-lowest` | `#0a0e17` | inset fields, consoles |
| `surface` | `#181b25` | cards |
| `surface-elevated` | `#1c1f29` | raised cards |
| `surface-container` | `#262a34` | headers, toolbars |
| `surface-container-high` | `#31353f` | chips, inline code |
| `surface-container-highest` | `#3a3f4a` | nested chips |

### Ink

| Token | Value | Used for |
| --- | --- | --- |
| `text` | `#dfe2ef` | headlines, body |
| `text-secondary` | `#c7c4d7` | supporting copy |
| `text-faint` | `#908fa0` | metadata, labels |

### Accents

| Token | Value | Means |
| --- | --- | --- |
| `primary` | `#c0c1ff` | action: links, active state, key CTAs |
| `primary-dim` | `#8083ff` | the solid button fill, hover |
| `on-primary` | `#1000a9` | text on a primary fill |
| `secondary` | `#4cd7f6` | live state: beacons, data, status |
| `tertiary` | `#ddb7ff` | depth: the third accent in a gradient |
| `error` | `#ffb4ab` | validation failures |

### Lines

| Token | Value |
| --- | --- |
| `border` | `rgba(255, 255, 255, 0.09)` |
| `border-strong` | `rgba(255, 255, 255, 0.20)` |

### Light theme

The light theme is a **twin, not an inversion** — the same hue structure with
the values re-tuned so every accent keeps its contrast on paper.

| Token | Value |
| --- | --- |
| `bg` | `#f2f3f9` |
| `surface` | `#ffffff` |
| `surface-container` | `#e9ebf5` |
| `text` | `#191d2c` |
| `text-secondary` | `#4b5163` |
| `text-faint` | `#838a9e` |
| `primary` | `#4f46e5` |
| `secondary` | `#0e7490` |
| `tertiary` | `#7c3aed` |
| `border` | `rgba(16, 20, 40, 0.10)` |

---

## Typography

**Geist** for display and body, **JetBrains Mono** for anything that is data.

| Role | Face | Size / line-height | Weight | Tracking |
| --- | --- | --- | --- | --- |
| Display | Geist | 36–56 / 1.14 | 700 | -0.03em |
| Headline large | Geist | 28–40 / 1.2 | 600 | -0.025em |
| Headline medium | Geist | 28 / 1.28 | 600 | -0.02em |
| Headline small | Geist | 20 / 1.4 | 600 | -0.015em |
| Body large | Geist | 18 / 1.55 | 400 | -0.01em |
| Body medium | Geist | 15 / 1.6 | 400 | -0.005em |
| Body small | Geist | 13 / 1.54 | 400 | 0 |
| Label large | JetBrains Mono | 14 / 1.43 | 500 | -0.01em |
| Label medium | JetBrains Mono | 12 / 1.33 | 500 | 0.02em |
| Label small | JetBrains Mono | 11 / 1.27 | 600 | 0.08em, uppercase |

The label utilities in `globals.css` (`text-display-xl`, `text-headline-lg`,
`text-label-xs`, …) are the implementation of this table.

---

## Layout & spacing

A 12-column fluid grid inside a `1280px` (`80rem`) container.

- **Desktop (≥1024px):** 12 columns, `1.5rem` gutter, `2rem` canvas margin.
- **Tablet (768–1023px):** 8 columns, `1.25rem` gutter.
- **Mobile (<768px):** single column, `1.5rem` canvas margin.

The spacing scale is `space-xs` 0.25 · `space-sm` 0.5 · `space-md` 1 ·
`space-lg` 1.5 · `space-xl` 2.5 rem. Sections are separated by `space-xl`.

---

## Elevation & depth

Depth comes from layered translucency, hairline edges and diffused light —
never from a heavy drop shadow.

- **Ground:** `--bg` plus three blurred radial colour fields (`.ambient`).
- **Card:** `rgba(24,27,37,0.62)` with `backdrop-filter: blur(14px)` and a
  `1px` edge of `rgba(255,255,255,0.09)`.
- **Overlay:** `rgba(28,31,41,0.85)` with `blur(24px)`.
- **Luminescence:** only on focus and hover — `0 0 20px rgba(99,102,241,0.4)`.

## Shapes

Soft level 1. `sm` 0.125 · `md` 0.25 · `lg` 0.375 · `xl` 0.5 · `2xl` 0.75 rem.

- **0.5rem** for buttons, interactive modules, timeline nodes.
- **0.75rem** for glass cards, the terminal, and section containers.
- **Full circle** for status beacons and timeline cores.

---

## Components

### Buttons

- **Primary** — `background: #8083ff`, `1px solid rgba(255,255,255,0.2)`,
  white text. On hover the fill becomes `#c0c1ff` and an indigo aura appears.
- **Secondary (glass)** — `rgba(24,27,37,0.62)`, hairline edge, `--text`.
- **Ghost** — borderless, monospaced, `--text-secondary`, turning cyan on
  hover.

### Glass cards

Translucent plane, `0.75rem` radius, `blur(14px)`, `1px` micro-border.
Interactive cards lift `2px` and their border warms to indigo on hover.

### Badges & chips

Monospaced tags on `surface-container`, `0.25rem` radius, hairline edge, with
an optional 6px beacon that marks a live service or a selected state.

### Terminal

An obsidian bar carrying three traffic dots and a monospaced title, over a
`surface-container-lowest` console surface. Used for anything that is a
process, a log or a payload.

### Timeline

A `1px` vertical rail. Each node is two rings: a 15px outer ring in
`rgba(192,193,255,0.45)` around a 6px glowing cyan core.

### Inputs

Inset on `surface-container-lowest` with a `0.5rem` radius. On focus the border
becomes `--primary` and a soft indigo field glow appears.

---

## Rules of the system

1. **Data is data.** Every number, count and status on the page is computed
   from the site's own content. Nothing is decorative telemetry.
2. **One accent per role.** Indigo acts, cyan is live, violet is depth. A
   surface never uses all three at full strength.
3. **Monospace means data.** Labels, metrics, timestamps, manifests and
   commands are monospaced. Prose is not.
4. **The only motion is the reveal.** Content eases up once. The beacon
   breathes. Nothing loops for decoration.
5. **Respect `prefers-reduced-motion`.** All animation is disabled for
   visitors who ask for it.
