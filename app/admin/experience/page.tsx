"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Textarea";
import { ConfirmationDialog } from "@/components/ui/ConfirmationDialog";
import { useToast } from "@/components/ui/Toast";
import { useCrudResource } from "@/hooks/useCrudResource";
import { Validators } from "@/lib/validation";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Experience } from "@/lib/api";

const EMPTY_FORM = { company: "", role: "", startDate: "", endDate: "", description: "" };

type FormData = typeof EMPTY_FORM;

export default function AdminExperiencePage() {
  const {
    items: experience,
    isModalOpen,
    editingItem,
    openCreateModal,
    openEditModal,
    closeModal,
    createItem,
    updateItem,
    deleteItem,
  } = useCrudResource<Experience>(MOCK_EXPERIENCE);

  const [formData, setFormData] = useState<FormData>({ ...EMPTY_FORM });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<Experience | null>(null);
  const { addToast } = useToast();

  const openCreate = () => {
    setFormData({ ...EMPTY_FORM });
    setFormErrors({});
    openCreateModal();
  };

  const openEdit = (item: Experience) => {
    setFormData({
      company: item.company,
      role: item.role,
      startDate: item.startDate.split("T")[0],
      endDate: item.endDate?.split("T")[0] || "",
      description: item.description,
    });
    setFormErrors({});
    openEditModal(item);
  };

  const validate = (data: FormData): Partial<Record<keyof FormData, string>> => {
    const errors: Partial<Record<keyof FormData, string>> = {};

    const companyError = Validators.required(data.company) || Validators.maxLength(100)(data.company);
    if (companyError) errors.company = companyError;

    const roleError = Validators.required(data.role) || Validators.maxLength(100)(data.role);
    if (roleError) errors.role = roleError;

    const startDateError = Validators.required(data.startDate);
    if (startDateError) errors.startDate = startDateError;

    if (data.startDate && data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
      errors.endDate = "End date must be after start date";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const payload = {
      company: formData.company,
      role: formData.role,
      startDate: formData.startDate,
      endDate: formData.endDate || undefined,
      description: formData.description,
    };

    try {
      if (editingItem) {
        await updateItem(editingItem.id, payload, {
          onSuccess: () => addToast({ type: "success", title: "Experience updated" }),
          onError: (err) => addToast({ type: "error", title: "Update failed", message: err.message }),
        });
      } else {
        await createItem(payload, {
          onSuccess: () => addToast({ type: "success", title: "Experience added" }),
          onError: (err) => addToast({ type: "error", title: "Create failed", message: err.message }),
        });
      }
      closeModal();
    } catch {
      // Error already surfaced via onError callback
    }
  };

  const handleDeleteClick = (item: Experience) => {
    setDeletingItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!deletingItem) return;
    deleteItem(deletingItem.id, {
      onSuccess: () => addToast({ type: "success", title: "Experience deleted" }),
      onError: (err) => addToast({ type: "error", title: "Delete failed", message: err.message }),
    });
    setIsDeleteDialogOpen(false);
    setDeletingItem(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-headline-lg font-semibold text-text mb-2">Experience</h1>
          <p className="text-body-md text-text-secondary">Manage your work experience.</p>
        </div>
        <Button variant="primary" size="sm" className="gap-2" onClick={openCreate}>
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-4">
        {experience.map((item) => (
          <GlassCard key={item.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-headline-sm font-semibold text-text">{item.role}</h3>
                </div>
                <p className="text-primary font-medium mb-1">{item.company}</p>
                <p className="text-label-md text-text-secondary mb-3">
                  {new Date(item.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short" })} — {item.endDate ? new Date(item.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "Present"}
                </p>
                <p className="text-body-sm text-text-secondary">{item.description}</p>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <button
                  type="button"
                  onClick={() => openEdit(item)}
                  className="p-1.5 rounded-lg hover:bg-surface-elevated text-text-secondary hover:text-primary transition-colors"
                  aria-label={`Edit ${item.role} at ${item.company}`}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteClick(item)}
                  className="p-1.5 rounded-lg hover:bg-surface-elevated text-text-secondary hover:text-error transition-colors"
                  aria-label={`Delete ${item.role} at ${item.company}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingItem ? "Edit Experience" : "New Experience"} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            error={formErrors.company}
            required
          />
          <Input
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            error={formErrors.role}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              error={formErrors.startDate}
              required
            />
            <Input
              label="End Date"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              error={formErrors.endDate}
            />
          </div>
          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
          />
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
        message={`Are you sure you want to delete the position "${deletingItem?.role ?? ""}" at ${deletingItem?.company ?? ""}? This action cannot be undone.`}
        danger={true}
      />
    </div>
  );
}

const MOCK_EXPERIENCE: Experience[] = [
  { id: "1", company: "TechCorp Inc.", role: "Senior Full-Stack Engineer", startDate: "2022-01-01", description: "Leading architecture decisions for a distributed platform.", order: 1, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "2", company: "StartupXYZ", role: "Full-Stack Engineer", startDate: "2019-06-01", endDate: "2022-01-01", description: "Shipped core product from 0 to 50K users.", order: 2, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "3", company: "Digital Agency", role: "Software Engineer", startDate: "2017-09-01", endDate: "2019-06-01", description: "Developed client-facing web applications.", order: 3, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
];
