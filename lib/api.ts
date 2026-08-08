export interface User {
  id: string;
  email: string;
  name: string;
}

export type SkillCategory = "Frontend" | "Backend" | "DevOps" | "Tools" | "Other";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  techs: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface About {
  id: string;
  bio: string;
  avatarUrl?: string;
  resumeUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSkillInput {
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon?: string;
}

export interface CreateExperienceInput {
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface CreateProjectInput {
  title: string;
  description: string;
  imageUrl?: string;
  techs: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface ReorderInput {
  id: string;
  order: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

async function handleEmptyResponse(res: Response): Promise<void> {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
}

export async function getMe(): Promise<User & { skills: Skill[]; experience: Experience[]; projects: Project[]; about: About }> {
  const res = await fetch(`${API_BASE}/auth/me`, { credentials: "include" });
  return handleResponse(res);
}

export async function getAbout(): Promise<About | null> {
  const res = await fetch(`${API_BASE}/about`, { cache: "no-store" });
  return handleResponse(res);
}

export async function getSkills(): Promise<Skill[]> {
  const res = await fetch(`${API_BASE}/skills`, { cache: "no-store" });
  return handleResponse(res);
}

export async function getExperience(): Promise<Experience[]> {
  const res = await fetch(`${API_BASE}/experience`, { cache: "no-store" });
  return handleResponse(res);
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/projects`, { cache: "no-store" });
  return handleResponse(res);
}

export async function updateAbout(data: { bio: string; avatarUrl?: string; resumeUrl?: string }): Promise<About> {
  const res = await fetch(`${API_BASE}/about`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function createSkill(data: CreateSkillInput): Promise<Skill> {
  const res = await fetch(`${API_BASE}/skills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateSkill(id: string, data: Partial<Skill>): Promise<Skill> {
  const res = await fetch(`${API_BASE}/skills/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteSkill(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/skills/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleEmptyResponse(res);
}

export async function reorderSkills(items: ReorderInput[]): Promise<void> {
  const res = await fetch(`${API_BASE}/skills/reorder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ items }),
  });
  return handleEmptyResponse(res);
}

export async function createExperience(data: CreateExperienceInput): Promise<Experience> {
  const res = await fetch(`${API_BASE}/experience`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateExperience(id: string, data: Partial<Experience>): Promise<Experience> {
  const res = await fetch(`${API_BASE}/experience/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteExperience(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/experience/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleEmptyResponse(res);
}

export async function reorderExperience(items: ReorderInput[]): Promise<void> {
  const res = await fetch(`${API_BASE}/experience/reorder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ items }),
  });
  return handleEmptyResponse(res);
}

export async function createProject(data: CreateProjectInput): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updateProject(id: string, data: Partial<Project>): Promise<Project> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteProject(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleEmptyResponse(res);
}

export async function reorderProjects(items: ReorderInput[]): Promise<void> {
  const res = await fetch(`${API_BASE}/projects/reorder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ items }),
  });
  return handleEmptyResponse(res);
}