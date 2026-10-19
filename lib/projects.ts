import type { Project } from "@/lib/api";
import { staticProjects, type PortfolioProject } from "@/data/projects";

/**
 * Converts a static catalogue entry into the same shape the API returns, so
 * both sources can be rendered by the same components.
 */
function toProject(entry: PortfolioProject): Project {
  const now = new Date().toISOString();

  return {
    id: `static-${entry.slug}`,
    title: entry.title,
    description: entry.description,
    imageUrl: entry.imageUrl,
    techs: entry.techs,
    liveUrl: entry.liveUrl,
    githubUrl: entry.githubUrl,
    featured: entry.featured,
    order: entry.order,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Combines the admin-managed projects from the API with the static catalogue
 * in `data/projects.ts`.
 *
 * The API is authoritative: a database project wins over a static entry with
 * the same title, so editing a project in the admin panel always shows up.
 * Static entries that are not in the database are appended, which keeps the
 * portfolio populated even before the API or database is reachable.
 */
export function mergeProjects(dbProjects: Project[]): Project[] {
  const titles = new Set(
    dbProjects.map((project) => project.title.trim().toLowerCase()),
  );

  const extras = staticProjects
    .filter((entry) => !titles.has(entry.title.trim().toLowerCase()))
    .map(toProject);

  return [...dbProjects, ...extras];
}
