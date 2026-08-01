"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TagPill } from "@/components/ui/TagPill";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Plus, Edit2, Trash2, GripVertical, Star } from "lucide-react";
import { Project } from "@/lib/api";

const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Distributed Cache System",
    description: "High-performance caching layer with consistent hashing and TTL eviction.",
    techs: ["Node.js", "Redis", "Docker", "AWS"],
    featured: true,
    order: 1,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "2",
    title: "Realtime Analytics Dashboard",
    description: "Live metrics dashboard with WebSocket streaming and alerting.",
    techs: ["React", "Next.js", "GraphQL", "PostgreSQL"],
    featured: true,
    order: 2,
    createdAt: "2024-01-02",
    updatedAt: "2024-01-02",
  },
  {
    id: "3",
    title: "API Gateway & Rate Limiter",
    description: "Edge gateway handling auth and rate limiting for 50+ microservices.",
    techs: ["Node.js", "Kubernetes", "Redis", "CI/CD"],
    featured: false,
    order: 3,
    createdAt: "2024-01-03",
    updatedAt: "2024-01-03",
  },
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "", techs: "", liveUrl: "", githubUrl: "", featured: false });
  const { addToast } = useToast();

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({ title: "", description: "", techs: "", liveUrl: "", githubUrl: "", featured: false });
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({ title: project.title, description: project.description, techs: project.techs.join(", "), liveUrl: project.liveUrl || "", githubUrl: project.githubUrl || "", featured: project.featured });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? { ...p, ...formData, techs: formData.techs.split(",").map(t => t.trim()).filter(Boolean) } : p));
      addToast({ type: "success", title: "Project updated" });
    } else {
      const newProject: Project = { id: Date.now().toString(), ...formData, techs: formData.techs.split(",").map(t => t.trim()).filter(Boolean), order: projects.length + 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      setProjects([...projects, newProject]);
      addToast({ type: "success", title: "Project created" });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
    addToast({ type: "success", title: "Project deleted" });
  };

  return (
    <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-headline-lg font-semibold text-text mb-2">Projects</h1>
            <p className="text-body-md text-text-secondary">Manage your portfolio projects.</p>
          </div>
          <Button variant="primary" size="sm" className="gap-2" onClick={openCreateModal}>
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
        </div>

        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-label-md font-medium text-text-secondary">Title</th>
                  <th className="text-left py-3 px-4 text-label-md font-medium text-text-secondary">Tech</th>
                  <th className="text-left py-3 px-4 text-label-md font-medium text-text-secondary">Featured</th>
                  <th className="text-right py-3 px-4 text-label-md font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-border/50 hover:bg-surface-elevated/50 transition-colors">
                    <td className="py-4 px-4">
                      <p className="text-body-sm font-medium text-text">{project.title}</p>
                      <p className="text-label-sm text-text-secondary line-clamp-1 max-w-xs">{project.description}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {project.techs.slice(0, 3).map((tech) => (
                          <TagPill key={tech} variant="outline" size="sm">{tech}</TagPill>
                        ))}
                        {project.techs.length > 3 && <TagPill variant="outline" size="sm">+{project.techs.length - 3}</TagPill>}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {project.featured ? <Star className="w-4 h-4 text-primary fill-primary" /> : <span className="text-label-sm text-text-secondary">—</span>}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(project)} className="p-1.5 rounded-lg hover:bg-surface-elevated text-text-secondary hover:text-primary transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(project.id)} className="p-1.5 rounded-lg hover:bg-surface-elevated text-text-secondary hover:text-error transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProject ? "Edit Project" : "New Project"} size="lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            <div className="w-full">
              <label className="block text-label-md text-text-secondary mb-1.5">Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full bg-surface-container-lowest border-0 border-b border-border text-text placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-0 transition-colors py-3 px-0 rounded-t-lg resize-none" />
            </div>
            <Input label="Tech Stack (comma-separated)" value={formData.techs} onChange={(e) => setFormData({ ...formData, techs: e.target.value })} placeholder="React, TypeScript, Node.js" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Live URL" value={formData.liveUrl} onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })} placeholder="https://..." />
              <Input label="GitHub URL" value={formData.githubUrl} onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })} placeholder="https://github.com/..." />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4 rounded border-border bg-surface-elevated text-primary focus:ring-primary" />
              <span className="text-sm text-text-secondary">Featured project</span>
            </label>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" type="submit">{editingProject ? "Update" : "Create"}</Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }