import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FolderOpen, Wrench, Briefcase, Plus } from "lucide-react";
import { getExperience, getProjects, getSkills } from "@/lib/api";

export const dynamic = "force-dynamic";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

export default async function AdminDashboard() {
  const [projects, skills, experience] = await Promise.all([
    getProjects().catch(() => []),
    getSkills().catch(() => []),
    getExperience().catch(() => []),
  ]);

  const stats = [
    { label: "Total Projects", value: projects.length.toString(), icon: FolderOpen, color: "text-primary" },
    { label: "Skills", value: skills.length.toString(), icon: Wrench, color: "text-secondary" },
    { label: "Experience", value: experience.length.toString(), icon: Briefcase, color: "text-primary" },
  ];

  const recentProjects = [...projects]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-headline-lg font-semibold text-text mb-2">Dashboard</h1>
        <p className="text-body-md text-text-secondary">Welcome back. Here&apos;s what&apos;s happening with your portfolio.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-3xl font-bold text-text mb-1">{stat.value}</p>
            <p className="text-body-sm text-text-secondary">{stat.label}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-headline-sm font-semibold text-text">Recent Projects</h2>
          <Link href="/admin/projects">
            <Button variant="primary" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </Link>
        </div>
        {recentProjects.length === 0 ? (
          <p className="text-body-md text-text-secondary py-4">
            No projects yet — add your first one.
          </p>
        ) : (
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <div>
                  <p className="text-body-sm font-medium text-text">{project.title}</p>
                  <p className="text-label-sm text-text-secondary">Updated {timeAgo(project.updatedAt)}</p>
                </div>
                <Link href="/admin/projects" className="text-primary hover:text-primary-dim text-sm font-medium">
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}