"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TagPill } from "@/components/ui/TagPill";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { useToast } from "@/components/ui/Toast";
import { useCrudResource } from "@/hooks/useCrudResource";
import { Validators, parseCommaSeparated } from "@/lib/validation";
import { Plus, Edit2, Trash2, Star } from "lucide-react";
import { Project } from "@/lib/api";

const EMPTY_FORM = {
  title: "",
  description: "",
  techs: "",
  liveUrl: "",
  githubUrl: "",
  featured: false,
};

type FormData = typeof EMPTY_FORM;

export default function AdminProjectsPage() {
  const {
    items: projects,
    isModalOpen,
    editingItem,
    openCreateModal,
    openEditModal,
    closeModal,
    createItem,
    updateItem,
    deleteItem,
  } = useCrudResource<Project>(MOCK_PROJECTS);

  const [formData, setFormData] = useState<FormData>({ ...EMPTY_FORM });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const { addToast } = useToast();

  const openCreate = () => {
    setFormData({ ...EMPTY_FORM });
    setFormErrors({});
    openCreateModal();
  };

  const openEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      techs: project.techs.join(", "),
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      featured: project.featured,
    });
    setFormErrors({});
    openEditModal(project);
  };

  const validate = (data: FormData): Partial<Record<keyof FormData, string>> => {
    const errors: Partial<Record<keyof FormData, string>> = {};

    const titleError =
      Validators.required(data.title) ||
      Validators.minLength(2)(data.title) ||
      Validators.maxLength(100)(data.title);
    if (titleError) errors.title = titleError;

    const descError = Validators.required(data.description);
    if (descError) errors.description = descError;

    const techs = parseCommaSeparated(data.techs);
    if (techs.length > 10) {
      errors.techs = "Maximum 10 technologies allowed";
    }

    if (data.liveUrl && !/^https?:\/\/.+/i.test(data.liveUrl)) {
      errors.liveUrl = "Please enter a valid URL (must start with http:// or https://)";
    }

    if (data.githubUrl && !/^https?:\/\/github\.com\/.+/i.test(data.githubUrl)) {
      errors.githubUrl = "Please enter a valid GitHub URL";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const techs = parseCommaSeparated(formData.techs);
    const payload = {
      title: formData.title,
      description: formData.description,
      techs,
      liveUrl: formData.liveUrl || undefined,
      githubUrl: formData.githubUrl || undefined,
      featured: formData.featured,
    };

    try {
      if (editingItem) {
        await updateItem(editingItem.id, payload, {
          onSuccess: () => addToast({ type: "success", title: "Project updated" }),
          onError: (err) => addToast({ type: "error", title: "Update failed", message: err.message }),
        });
      } else {
        await createItem(payload, {
          onSuccess: () => addToast({ type: "success", title: "Project created" }),
          onError: (err) => addToast({ type: "error", title: "Create failed", message: err.message }),
        });
      }
      closeModal();
    } catch {
      // Error already surfaced via onError callback
    }
  };

  const handleDeleteClick = (project: Project) => {
    setDeletingProject(project);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingProject) return;
    deleteItem(deletingProject.id, {
      onSuccess: () => addToast({ type: "success", title: "Project deleted" }),
      onError: (err) => addToast({ type: "error", title: "Delete failed", message: err.message }),
    });
    setIsDeleteDialogOpen(false);
    setDeletingProject(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-headline-lg font-semibold text-text mb-2">Projects</h1>
          <p className="text-body-md text-text-secondary">Manage your portfolio projects.</p>
        </div>
        <Button variant="primary" size="sm" className="gap-2" onClick={openCreate}>
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
                        <TagPill key={tech} variant="outline" size="sm">
                          {tech}
                        </TagPill>
                      ))}
                      {project.techs.length > 3 && (
                        <TagPill variant="outline" size="sm">
                          +{project.techs.length - 3}
                        </TagPill>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {project.featured ? (
                      <Star className="w-4 h-4 text-primary fill-primary" />
                    ) : (
                      <span className="text-label-sm text-text-secondary">—</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(project)}
                        className="p-1.5 rounded-lg hover:bg-surface-elevated text-text-secondary hover:text-primary transition-colors"
                        aria-label={`Edit ${project.title}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(project)}
                        className="p-1.5 rounded-lg hover:bg-surface-elevated text-text-secondary hover:text-error transition-colors"
                        aria-label={`Delete ${project.title}`}
                      >
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

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingItem ? "Edit Project" : "New Project"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter project title"
            error={formErrors.title}
            required
          />
          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the project..."
            rows={3}
            error={formErrors.description}
          />
          <Input
            label="Tech Stack (comma-separated)"
            value={formData.techs}
            onChange={(e) => setFormData({ ...formData, techs: e.target.value })}
            placeholder="React, TypeScript, Node.js"
            error={formErrors.techs}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Live URL"
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              placeholder="https://..."
              error={formErrors.liveUrl}
            />
            <Input
              label="GitHub URL"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/..."
              error={formErrors.githubUrl}
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded border-border bg-surface-elevated text-primary focus:ring-primary"
            />
            <span className="text-sm text-text-secondary">Featured project</span>
          </label>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" type="button" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingItem ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        message={`Are you sure you want to delete the project "${deletingProject?.title ?? ""}"? This action cannot be undone.`}
        danger={true}
      />
    </div>
  );
}

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
