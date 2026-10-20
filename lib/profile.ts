/**
 * The profile, transcribed from the CV.
 *
 * This is the source of truth for the copy that describes *who this is* —
 * the title, the statement, the facts in the panels. It lives here rather
 * than in the components so that the description on the page is one
 * document, not a dozen scattered strings that drift apart.
 *
 * The CV is `Islam_Abusleem.pdf`. When the CV changes, this changes with
 * it, and nothing on the site may say more than it does.
 */

export interface ProfileDomain {
  label: string;
  detail: string;
}

export interface ProfileLanguage {
  label: string;
  level: string;
}

export const PROFILE = {
  name: "Islam Abusleem",

  /** The title, exactly as the CV puts it. */
  title: "Senior Software Engineer",
  titleSecondary: "Frontend & Backend",

  /** The one-paragraph summary, from the CV. */
  statement:
    "Senior Software Engineer with 8+ years of experience building scalable web applications, frontend platforms, backend services, and APIs across fintech, government, healthcare, transportation, e-commerce, and media. Skilled in Vue.js, React, JavaScript, Node.js, Express.js, NestJS, Java, Spring Boot, PostgreSQL, HTML, CSS, and responsive UI development. Experienced in delivering payment workflows, government service platforms, operational tools, and customer-facing products. Strong collaborator who translates business requirements into reliable, maintainable, and user-focused software.",

  /** The short form, for the first screen. */
  headline:
    "Senior Software Engineer with 8+ years of experience building scalable web applications, frontend platforms, backend services and APIs across fintech, government, healthcare, transportation, e-commerce and media.",

  /** The short form, for the panels and the terminal. */
  summary:
    "Scalable web applications, frontend platforms, backend services and APIs.",

  focus: "Frontend platforms, backend services and APIs",

  /** Years of professional experience, per the CV. */
  yearsExperience: 8,

  stack: [
    "Vue.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express.js",
    "NestJS",
    "Java",
    "Spring Boot",
    "PostgreSQL",
  ],

  /**
   * The rest of the CV's technical skills, beyond the ones the admin panel
   * already tracks with proficiency scores.
   */
  additionalStack: [
    "Vuex",
    "Pinia",
    "Vue Router",
    "Redux",
    "React Router",
    "Material UI",
    "Vuetify",
    "Quasar",
    "Figma",
    "REST APIs",
    "MongoDB",
    "Mongoose",
    "MySQL",
    "Sequelize",
    "HTML5",
    "CSS3",
    "jQuery",
    "Web Performance Optimization",
    "Cross-Browser Development",
  ],

  location: "Saudi Arabia",
  timezone: "GMT+3",
  phone: "0507715406",
  email: "islam.abusleem@gmail.com",
  github: "https://github.com/islamAbuSleem",
  linkedin: "https://www.linkedin.com/in/islamabusleem",

  /** Where the work has been. */
  domains: [
    {
      label: "Fintech & payments",
      detail:
        "Foodics Pay merchant workflows and secure payment-related user journeys.",
    },
    {
      label: "Government services",
      detail:
        "Saudi Ministry of Defence and Ministry of Justice web applications and digital services.",
    },
    {
      label: "Healthcare",
      detail:
        "Online doctor sessions, appointment booking, e-learning, e-commerce, and bank-integrated payments.",
    },
    {
      label: "Transportation & operations",
      detail:
        "Railway reservation systems, smart parking, and operational weather reporting.",
    },
    {
      label: "Consumer platforms",
      detail:
        "Diving discovery and booking experiences, plus large-scale news website modernization.",
    },
  ] satisfies ProfileDomain[],

  /** What the work is actually like. */
  coreStrengths: [
    "Translating business requirements into responsive, maintainable frontend experiences.",
    "Collaborating with product, backend, and design teams from discovery through production delivery.",
    "Building user-focused interfaces with reusable components, API integrations, and cross-browser support.",
  ],

  education: {
    degree: "Bachelor's Degree in Computer Science",
    school: "Faculty of Computers and Informatics, Zagazig University",
    period: "2011 — 2015",
  },

  training: "Google Africa Web and Mobile Developer Bootcamp — Pluralsight, 2021 — 2022",

  languages: [
    { label: "Arabic", level: "Native" },
    { label: "English", level: "Professional" },
    { label: "Spanish", level: "Elementary" },
  ] satisfies ProfileLanguage[],
} as const;

/**
 * The placeholder bio that shipped with the admin panel. It describes a
 * generic full-stack developer and is not this person's CV, so it is
 * treated as "not yet edited" — until the admin panel has a bio of its
 * own, the CV summary is what the page shows.
 */
export const PLACEHOLDER_BIO =
  "Full-Stack Developer passionate about building beautiful, performant web applications. Experienced with React, Next.js, Vue, Nuxt, Node.js, NestJS, Java, Spring Boot, and modern cloud infrastructure.";

/**
 * Resolve the About bio: the admin panel's text wins when it has been
 * edited, otherwise the CV summary is used.
 */
export function resolveBio(adminBio?: string | null): string {
  const trimmed = adminBio?.trim();
  if (!trimmed || trimmed === PLACEHOLDER_BIO) return PROFILE.statement;
  return trimmed;
}
