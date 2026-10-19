/**
 * Static project catalogue.
 *
 * This is the fallback / seed list of work shown on the portfolio. Projects
 * managed through the admin panel (stored in PostgreSQL) are authoritative:
 * anything in this file that shares a title with a database project is
 * ignored, so you can edit the copy here without breaking the admin panel.
 *
 * To add a project:
 *   1. Append an entry to `staticProjects` below.
 *   2. Drop a screenshot at `public/projects/<slug>.png` and point
 *      `imageUrl` at `/projects/<slug>.png` (a branded `.svg` placeholder
 *      already exists for every entry).
 *   3. Fill in `liveUrl` (or the host in `PROJECT_LIVE_URLS`).
 *
 * Alternatively, skip this file entirely and add the project from the
 * admin panel at /admin/projects.
 */

/**
 * Live URLs of the deployed apps.
 *
 * Cloudflare Workers and Render assign the hostnames during deployment, so
 * these are filled in once, after the first deploy. An empty string means
 * "not deployed yet" — the card then renders the GitHub link only, with no
 * broken "Live Demo" link.
 */
export const PROJECT_LIVE_URLS = {
  // The portfolio's own main link is the canonical domain.
  portfolio: "https://islamabusleem.eu.org",
  productSearch: "",
  jobPilot: "",
  booking: "",
  ecommerce: "",
  school: "",
  learnHub: "",
  engineerDocs: "",
} as const;

export interface PortfolioProject {
  /** Stable slug. Also used for the screenshot filename. */
  slug: string;
  title: string;
  description: string;
  /** Tech stack badges. */
  techs: string[];
  /** Screenshot path, relative to `public/`. */
  imageUrl?: string;
  /** Deployed URL, if the project is live. */
  liveUrl?: string;
  /** GitHub repository URL. */
  githubUrl?: string;
  /** Show in the "Featured Projects" strip on the home page. */
  featured: boolean;
  /** Display order (lower first). */
  order: number;
}

const GITHUB = "https://github.com/islamAbuSleem";

export const staticProjects: PortfolioProject[] = [
  {
    slug: "portfolio",
    title: "Kinetic Syntax Portfolio",
    description:
      "A full-stack portfolio platform with an admin panel for managing profile content, skills, experience and projects. Server-rendered on Cloudflare Workers with a NestJS API on Render and PostgreSQL on Neon.",
    techs: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "NestJS", "Prisma", "PostgreSQL", "Cloudflare Workers"],
    imageUrl: "/projects/portfolio.svg",
    liveUrl: PROJECT_LIVE_URLS.portfolio || undefined,
    githubUrl: `${GITHUB}/portfolio-FE`,
    featured: true,
    order: 0,
  },
  {
    slug: "product-search",
    title: "Product Search & Mining",
    description:
      "A product intelligence platform that ingests catalogue data, mines it with AI agents and surfaces deals, merchant insights and product analytics.",
    techs: ["Next.js", "React", "TypeScript", "Sanity CMS", "AI SDK", "Clerk", "PostHog", "Tailwind CSS"],
    imageUrl: "/projects/product-search.svg",
    liveUrl: PROJECT_LIVE_URLS.productSearch || undefined,
    githubUrl: `${GITHUB}/product-search`,
    featured: true,
    order: 1,
  },
  {
    slug: "job-pilot",
    title: "Job Pilot",
    description:
      "An agentic job-search assistant that scrapes listings, matches them against a profile, and generates tailored CVs and application reports.",
    techs: ["Next.js", "React", "TypeScript", "OpenAI", "Browserbase Stagehand", "Recharts", "React-PDF", "Tailwind CSS"],
    imageUrl: "/projects/job-pilot.svg",
    liveUrl: PROJECT_LIVE_URLS.jobPilot || undefined,
    githubUrl: `${GITHUB}/job-pilot`,
    featured: true,
    order: 2,
  },
  {
    slug: "booking",
    title: "Booking Platform",
    description:
      "A real-time booking system with live availability, socket.io updates, Stripe payments and OAuth social login.",
    techs: ["Nuxt", "Vue", "NestJS", "Prisma", "Neon", "Socket.io", "Stripe", "Passport"],
    imageUrl: "/projects/booking.svg",
    liveUrl: PROJECT_LIVE_URLS.booking || undefined,
    githubUrl: `${GITHUB}/Booking`,
    featured: false,
    order: 3,
  },
  {
    slug: "ecommerce",
    title: "E-Commerce Platform",
    description:
      "A full-stack storefront and admin dashboard for managing products, orders and customers, with OAuth sign-in and a Prisma-backed catalogue.",
    techs: ["Next.js", "React", "NestJS", "Prisma", "PostgreSQL", "Passport", "Swagger"],
    imageUrl: "/projects/ecommerce.svg",
    liveUrl: PROJECT_LIVE_URLS.ecommerce || undefined,
    githubUrl: `${GITHUB}/Ecommerce`,
    featured: false,
    order: 4,
  },
  {
    slug: "school",
    title: "School Management System",
    description:
      "A school platform with role-based dashboards, realtime messaging over STOMP, and reporting dashboards.",
    techs: ["Vue 3", "Vuetify", "Vuex", "Spring Boot", "PostgreSQL", "Chart.js", "WebSocket"],
    imageUrl: "/projects/school.svg",
    liveUrl: PROJECT_LIVE_URLS.school || undefined,
    githubUrl: `${GITHUB}/school`,
    featured: false,
    order: 5,
  },
  {
    slug: "learn-hub",
    title: "Learn Hub",
    description:
      "A personal knowledge hub of deep, ground-up notes organised by topic, built as a fast client-rendered Nuxt app.",
    techs: ["Nuxt 4", "Vue", "TypeScript", "Cloudflare Workers"],
    imageUrl: "/projects/learn-hub.svg",
    liveUrl: PROJECT_LIVE_URLS.learnHub || undefined,
    githubUrl: `${GITHUB}/islamAbuSleem`,
    featured: false,
    order: 6,
  },
  {
    slug: "engineer-docs",
    title: "Software Engineer Docs",
    description:
      "A guided, deep-dive knowledge base covering backend, frontend, databases, DevOps, system design and testing fundamentals.",
    techs: ["Nuxt", "Nuxt Content", "Vue", "Markdown", "TypeScript"],
    imageUrl: "/projects/engineer-docs.svg",
    liveUrl: PROJECT_LIVE_URLS.engineerDocs || undefined,
    githubUrl: `${GITHUB}/islamAbuSleem`,
    featured: false,
    order: 7,
  },
];
