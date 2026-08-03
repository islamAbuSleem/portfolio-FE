"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { useToast } from "@/components/ui/Toast";
import { useCrudResource } from "@/hooks/useCrudResource";
import { Validators } from "@/lib/validation";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Skill } from "@/lib/api";

const CATEGORIES = ["Frontend", "Backend", "DevOps", "Tools", "Other"];

const EMPTY_FORM = {
  name: "",
  category: CATEGORIES[0],
  proficiency: 50,
};

type FormData = typeof EMPTY_FORM;

export default function AdminSkillsPage() {
  const {
    items: skills,
    isModalOpen,
    editingItem,
    openCreateModal,
    openEditModal,
    closeModal,
    createItem,
    updateItem,
    deleteItem,
  } = useCrudResource<Skill>(MOCK_SKILLS);

  const [formData, setFormData] = useState<FormData>({ ...EMPTY_FORM });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingSkill, setDeletingSkill] = useState<Skill | null>(null);
  const { addToast } = useToast();

  const openCreate = () => {
    setFormData({ ...EMPTY_FORM });
    setFormErrors({});
    openCreateModal();
  };

  const openEdit = (skill: Skill) => {
    setFormData({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
    });
    setFormErrors({});
    openEditModal(skill);
  };

  const validate = (data: FormData): Partial<Record<keyof FormData, string>> => {
    const errors: Partial<Record<keyof FormData, string>> = {};

    const nameError = Validators.required(data.name) || Validators.maxLength(50)(data.name);
    if (nameError) errors.name = nameError;

    const proficiencyError = Validators.numberRange(0, 100)(data.proficiency);
    if (proficiencyError) errors.proficiency = proficiencyError;

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      if (editingItem) {
        await updateItem(editingItem.id, formData, {
          onSuccess: () => addToast({ type: "success", title: "Skill updated" }),
          onError: (err) => addToast({ type: "error", title: "Update failed", message: err.message }),
        });
      } else {
        await createItem(formData, {
          onSuccess: () => addToast({ type: "success", title: "Skill created" }),
          onError: (err) => addToast({ type: "error", title: "Create failed", message: err.message }),
        });
      }
      closeModal();
    } catch {
      // Error already surfaced via onError callback
    }
  };

  const handleDeleteClick = (skill: Skill) => {
    setDeletingSkill(skill);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingSkill) return;
    deleteItem(deletingSkill.id, {
      onSuccess: () => addToast({ type: "success", title: "Skill deleted" }),
      onError: (err) => addToast({ type: "error", title: "Delete failed", message: err.message }),
    });
    setIsDeleteDialogOpen(false);
    setDeletingSkill(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-headline-lg font-semibold text-text mb-2">Skills</h1>
          <p className="text-body-md text-text-secondary">Manage your skills and expertise.</p>
        </div>
        <Button variant="primary" size="sm" className="gap-2" onClick={openCreate}>
          <Plus className="w-4 h-4" />
          Add Skill
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((category) => {
          const categorySkills = skills.filter((s) => s.category === category);
          if (categorySkills.length === 0) return null;
          return (
            <GlassCard key={category} className="p-6">
              <h3 className="text-headline-sm font-semibold text-text mb-4">{category}</h3>
              <div className="space-y-3">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-body-sm text-text">{skill.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(skill)}
                        className="p-1 rounded hover:bg-surface-elevated text-text-secondary hover:text-primary transition-colors"
                        aria-label={`Edit ${skill.name}`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(skill)}
                        className="p-1 rounded hover:bg-surface-elevated text-text-secondary hover:text-error transition-colors"
                        aria-label={`Delete ${skill.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingItem ? "Edit Skill" : "New Skill"} size="md">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label="Skill Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., React, TypeScript, Node.js"
            error={formErrors.name}
            required
          />
          <div>
            <label className="block text-label-md text-text-secondary mb-1.5">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-surface-container-lowest border border-border rounded-lg px-3 py-2 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-label-md text-text-secondary mb-1.5">
              Proficiency: {formData.proficiency}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={formData.proficiency}
              onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value, 10) })}
              className="w-full accent-primary"
              aria-label="Proficiency"
            />
            {formErrors.proficiency && <p className="text-error text-sm mt-1">{formErrors.proficiency}</p>}
          </div>
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
        message={`Are you sure you want to delete the skill "${deletingSkill?.name ?? ""}"? This action cannot be undone.`}
        danger={true}
      />
    </div>
  );
}

const MOCK_SKILLS: Skill[] = [
  { id: "1", name: "React", category: "Frontend", proficiency: 95, order: 1, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "2", name: "Next.js", category: "Frontend", proficiency: 90, order: 2, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "3", name: "TypeScript", category: "Frontend", proficiency: 90, order: 3, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "4", name: "Node.js", category: "Backend", proficiency: 88, order: 4, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "5", name: "PostgreSQL", category: "Backend", proficiency: 85, order: 5, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "6", name: "Docker", category: "DevOps", proficiency: 82, order: 6, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
];
