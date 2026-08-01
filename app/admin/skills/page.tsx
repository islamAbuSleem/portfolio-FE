"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TagPill } from "@/components/ui/TagPill";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Skill } from "@/lib/api";

const MOCK_SKILLS: Skill[] = [
  { id: "1", name: "React", category: "Frontend", proficiency: 95, order: 1, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "2", name: "Next.js", category: "Frontend", proficiency: 90, order: 2, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "3", name: "TypeScript", category: "Frontend", proficiency: 90, order: 3, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "4", name: "Node.js", category: "Backend", proficiency: 88, order: 4, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "5", name: "PostgreSQL", category: "Backend", proficiency: 85, order: 5, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "6", name: "Docker", category: "DevOps", proficiency: 82, order: 6, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
];

const CATEGORIES = ["Frontend", "Backend", "DevOps", "Tools", "Other"];

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(MOCK_SKILLS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [formData, setFormData] = useState({ name: "", category: "Frontend", proficiency: 50 });
  const { addToast } = useToast();

  const openCreateModal = () => {
    setEditingSkill(null);
    setFormData({ name: "", category: "Frontend", proficiency: 50 });
    setIsModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({ name: skill.name, category: skill.category, proficiency: skill.proficiency });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSkill) {
      setSkills(skills.map(s => s.id === editingSkill.id ? { ...s, ...formData } : s));
      addToast({ type: "success", title: "Skill updated" });
    } else {
      const newSkill: Skill = { id: Date.now().toString(), ...formData, order: skills.length + 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      setSkills([...skills, newSkill]);
      addToast({ type: "success", title: "Skill created" });
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setSkills(skills.filter(s => s.id !== id));
    addToast({ type: "success", title: "Skill deleted" });
  };

  return (
    <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-headline-lg font-semibold text-text mb-2">Skills</h1>
            <p className="text-body-md text-text-secondary">Manage your skills and expertise.</p>
          </div>
          <Button variant="primary" size="sm" className="gap-2" onClick={openCreateModal}>
            <Plus className="w-4 h-4" />
            Add Skill
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => {
            const categorySkills = skills.filter(s => s.category === category);
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
                        <button onClick={() => openEditModal(skill)} className="p-1 rounded hover:bg-surface-elevated text-text-secondary hover:text-primary transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(skill.id)} className="p-1 rounded hover:bg-surface-elevated text-text-secondary hover:text-error transition-colors">
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

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSkill ? "Edit Skill" : "New Skill"} size="md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <div>
              <label className="block text-label-md text-text-secondary mb-1.5">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-surface-container-lowest border border-border rounded-lg px-3 py-2 text-text focus:border-primary focus:outline-none">
                {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-label-md text-text-secondary mb-1.5">Proficiency: {formData.proficiency}%</label>
              <input type="range" min="0" max="100" value={formData.proficiency} onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })} className="w-full accent-primary" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" type="submit">{editingSkill ? "Update" : "Create"}</Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }