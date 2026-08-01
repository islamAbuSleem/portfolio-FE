"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Experience } from "@/lib/api";

const MOCK_EXPERIENCE: Experience[] = [
  { id: "1", company: "TechCorp Inc.", role: "Senior Full-Stack Engineer", startDate: "2022-01-01", description: "Leading architecture decisions for a distributed platform.", order: 1, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "2", company: "StartupXYZ", role: "Full-Stack Engineer", startDate: "2019-06-01", endDate: "2022-01-01", description: "Shipped core product from 0 to 50K users.", order: 2, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "3", company: "Digital Agency", role: "Software Engineer", startDate: "2017-09-01", endDate: "2019-06-01", description: "Developed client-facing web applications.", order: 3, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
];

export default function AdminExperiencePage() {
  const [experience, setExperience] = useState<Experience[]>(MOCK_EXPERIENCE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({ company: "", role: "", startDate: "", endDate: "", description: "" });
  const { addToast } = useToast();

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({ company: "", role: "", startDate: "", endDate: "", description: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Experience) => {
    setEditingItem(item);
    setFormData({ company: item.company, role: item.role, startDate: item.startDate.split("T")[0], endDate: item.endDate?.split("T")[0] || "", description: item.description });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setExperience(experience.map(exp => exp.id === editingItem.id ? { ...exp, ...formData } : exp));
      addToast({ type: "success", title: "Experience updated" });
    } else {
      const newItem: Experience = { id: Date.now().toString(), ...formData, order: experience.length + 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      setExperience([...experience, newItem]);
      addToast({ type: "success", title: "Experience added" });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setExperience(experience.filter(exp => exp.id !== id));
    addToast({ type: "success", title: "Experience deleted" });
  };

  return (
    <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-headline-lg font-semibold text-text mb-2">Experience</h1>
            <p className="text-body-md text-text-secondary">Manage your work experience.</p>
          </div>
          <Button variant="primary" size="sm" className="gap-2" onClick={openCreateModal}>
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
                  <button onClick={() => openEditModal(item)} className="p-1.5 rounded-lg hover:bg-surface-elevated text-text-secondary hover:text-primary transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-surface-elevated text-text-secondary hover:text-error transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? "Edit Experience" : "New Experience"} size="lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required />
            <Input label="Role" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Start Date" type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
              <Input label="End Date" type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
            </div>
            <div className="w-full">
              <label className="block text-label-md text-text-secondary mb-1.5">Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full bg-surface-container-lowest border-0 border-b border-border text-text placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-0 transition-colors py-3 px-0 rounded-t-lg resize-none" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" type="submit">{editingItem ? "Update" : "Create"}</Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }