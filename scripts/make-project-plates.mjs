import fs from "node:fs";
import path from "node:path";

const dir = path.join("public", "projects");
fs.mkdirSync(dir, { recursive: true });

const projects = [
  { file: "portfolio", title: "Kinetic Syntax", sub: "Next.js / NestJS / Neon", tag: "PORTFOLIO" },
  { file: "product-search", title: "Product Search", sub: "Next.js / Sanity / AI agents", tag: "DATA" },
  { file: "job-pilot", title: "Job Pilot", sub: "Next.js / OpenAI / Stagehand", tag: "AGENT" },
  { file: "booking", title: "Booking", sub: "Nuxt / NestJS / Stripe", tag: "PLATFORM" },
  { file: "ecommerce", title: "E-Commerce", sub: "Next.js / NestJS / Prisma", tag: "PLATFORM" },
  { file: "school", title: "School", sub: "Vue 3 / Spring Boot", tag: "PLATFORM" },
  { file: "learn-hub", title: "Learn Hub", sub: "Nuxt 4 / Cloudflare Workers", tag: "NOTES" },
  { file: "engineer-docs", title: "Engineer Docs", sub: "Nuxt / Nuxt Content", tag: "DOCS" },
];

// Matches the dark theme: ground #0a0a13, ink #f4f3f7, mint #5af5c0, violet #b49bff.
const GROUND = "#0A0A13";
const INK = "#F4F3F7";
const MUTED = "#A9A8BB";
const FAINT = "#6F6E85";
const MINT = "#5AF5C0";
const VIOLET = "#B49BFF";

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

for (const p of projects) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" role="img" aria-label="${esc(p.title)}">
  <defs>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M60 0H0V60" fill="none" stroke="${INK}" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="900" fill="${GROUND}"/>
  <rect width="1200" height="900" fill="url(#grid)"/>
  <rect x="0.5" y="0.5" width="1199" height="899" fill="none" stroke="${INK}" stroke-opacity="0.14"/>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="20" fill="${VIOLET}" letter-spacing="3">
    <text x="80" y="96">${esc(p.tag)}</text>
  </g>
  <rect x="80" y="132" width="72" height="3" fill="${MINT}"/>
  <text x="80" y="470" font-family="Archivo, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" font-size="82" font-weight="700" fill="${INK}" letter-spacing="-2.5">${esc(p.title)}</text>
  <text x="80" y="536" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="24" fill="${MUTED}" letter-spacing="1">${esc(p.sub)}</text>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="18" fill="${FAINT}" letter-spacing="2">
    <text x="80" y="820">PROJECT SCREENSHOT</text>
  </g>
  <g stroke="${INK}" stroke-opacity="0.14" stroke-width="1">
    <line x1="80" y1="700" x2="1120" y2="700"/>
  </g>
</svg>
`;
  fs.writeFileSync(path.join(dir, `${p.file}.svg`), svg, "utf8");
}

console.log(`wrote ${projects.length} plates to ${dir}`);
