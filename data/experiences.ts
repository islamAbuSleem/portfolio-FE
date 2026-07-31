export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  current?: boolean;
}

export const experiences: Experience[] = [
  {
    id: "senior-engineer",
    role: "Senior Full-Stack Engineer",
    company: "TechCorp Inc.",
    period: "2022 — Present",
    description: "Leading architecture decisions for a distributed platform serving 2M+ users. Built real-time analytics, designed microservices infrastructure, and mentored a team of 6 engineers.",
    current: true,
  },
  {
    id: "mid-engineer",
    role: "Full-Stack Engineer",
    company: "StartupXYZ",
    period: "2019 — 2022",
    description: "Shipped the core product from 0 to 50K users. Built the frontend in React, designed the GraphQL API, and set up CI/CD pipelines.",
  },
  {
    id: "junior-engineer",
    role: "Software Engineer",
    company: "Digital Agency",
    period: "2017 — 2019",
    description: "Developed client-facing web applications and internal tooling. Introduced TypeScript and automated testing to the team.",
  },
];