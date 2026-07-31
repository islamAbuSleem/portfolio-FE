export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  featured?: boolean;
  links?: {
    github?: string;
    live?: string;
  };
}

export const projects: Project[] = [
  {
    id: "distributed-cache",
    title: "Distributed Cache System",
    description: "High-performance caching layer with consistent hashing, TTL eviction, and real-time invalidation across multiple nodes.",
    tech: ["Node.js", "Redis", "Docker", "AWS"],
    featured: true,
    links: { github: "#", live: "#" },
  },
  {
    id: "realtime-dashboard",
    title: "Realtime Analytics Dashboard",
    description: "Live metrics dashboard with WebSocket streaming, aggregations, and alerting for engineering teams.",
    tech: ["React", "Next.js", "GraphQL", "PostgreSQL"],
    featured: true,
    links: { github: "#", live: "#" },
  },
  {
    id: "api-gateway",
    title: "API Gateway & Rate Limiter",
    description: "Edge gateway handling auth, rate limiting, and request routing for 50+ microservices.",
    tech: ["Node.js", "Kubernetes", "Redis", "CI/CD"],
    featured: false,
    links: { github: "#" },
  },
  {
    id: "design-system",
    title: "Enterprise Design System",
    description: "Component library and token system used across 12 product teams with full accessibility compliance.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Figma"],
    featured: true,
    links: { github: "#", live: "#" },
  },
  {
    id: "ml-pipeline",
    title: "ML Feature Pipeline",
    description: "End-to-end feature engineering pipeline with automated validation and model monitoring.",
    tech: ["Python", "AWS", "Docker", "PostgreSQL"],
    featured: false,
    links: { github: "#" },
  },
  {
    id: "monorepo-tooling",
    title: "Monorepo Build Tooling",
    description: "Custom build orchestration and dependency graph visualization for a 200+ package monorepo.",
    tech: ["TypeScript", "Git", "CI/CD", "Node.js"],
    featured: false,
    links: { github: "#" },
  },
];