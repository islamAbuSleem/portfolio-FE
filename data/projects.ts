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
  productSearch: "https://product-search.islamabusleem.workers.dev",
  jobPilot: "https://job-pilot.islamabusleem.workers.dev",
  booking: "https://booking.islamabusleem.workers.dev",
  ecommerce: "https://ecommerce.islamabusleem.workers.dev",
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
    slug: "ecommerce",
    title: "E-Commerce Platform",
    description:
      "Marketplace: a curated storefront for independent studios, with escrow-protected payments, OAuth sign-in, seller dashboards and a Prisma-backed catalogue on PostgreSQL.",
    techs: ["Next.js", "React", "NestJS", "Prisma", "PostgreSQL", "Passport", "Swagger"],
    imageUrl: "/projects/ecommerce.png",
    liveUrl: PROJECT_LIVE_URLS.ecommerce || undefined,
    githubUrl: `${GITHUB}/Ecommerce`,
    featured: true,
    order: 0,
  },
  {
    slug: "booking",
    title: "Booking Platform",
    description:
      "The Gazette: a curated lodging platform with live availability, socket.io updates, Stripe payments and OAuth social login.",
    techs: ["Nuxt", "Vue", "NestJS", "Prisma", "Neon", "Socket.io", "Stripe", "Passport"],
    imageUrl: "/projects/booking.png",
    liveUrl: PROJECT_LIVE_URLS.booking || undefined,
    githubUrl: `${GITHUB}/Booking`,
    featured: true,
    order: 1,
  },
  {
    slug: "product-search",
    title: "Product Search & Mining",
    description:
      "A product intelligence platform that ingests catalogue data, mines it with AI agents and surfaces deals, merchant insights and product analytics.",
    techs: ["Next.js", "React", "TypeScript", "Sanity CMS", "AI SDK", "Clerk", "PostHog", "Tailwind CSS"],
    imageUrl: "/projects/product-search.png",
    liveUrl: PROJECT_LIVE_URLS.productSearch || undefined,
    githubUrl: `${GITHUB}/product-search`,
    featured: true,
    order: 2,
  },
  {
    slug: "job-pilot",
    title: "Job Pilot",
    description:
      "An agentic job-search assistant that scrapes listings, matches them against a profile, and generates tailored CVs and application reports.",
    techs: ["Next.js", "React", "TypeScript", "OpenAI", "Browserbase Stagehand", "Recharts", "React-PDF", "Tailwind CSS"],
    imageUrl: "/projects/job-pilot.png",
    liveUrl: PROJECT_LIVE_URLS.jobPilot || undefined,
    githubUrl: `${GITHUB}/job-pilot`,
    featured: true,
    order: 3,
  },
];
