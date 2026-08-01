"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

const MOCK_ABOUT = {
  bio: "I'm a senior full-stack engineer with a passion for building high-performance distributed systems and immersive frontend experiences. I thrive on turning complex problems into elegant, scalable solutions.",
  avatarUrl: "",
  resumeUrl: "",
};

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState(MOCK_ABOUT);
  const [isSaving, setIsSaving] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    addToast({ type: "success", title: "Settings saved" });
  };

  return (
    <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-headline-lg font-semibold text-text mb-2">Settings</h1>
          <p className="text-body-md text-text-secondary">Manage your about section and profile.</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-label-md text-text-secondary mb-1.5">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={6}
                className="w-full bg-surface-container-lowest border-0 border-b border-border text-text placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-0 transition-colors py-3 px-0 rounded-t-lg resize-none"
              />
            </div>

            <Input label="Avatar URL" value={formData.avatarUrl} onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })} placeholder="https://..." />
            <Input label="Resume URL" value={formData.resumeUrl} onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })} placeholder="https://..." />

            <div className="flex justify-end pt-4">
              <Button variant="primary" type="submit" isLoading={isSaving}>
                Save Changes
              </Button>
            </div>
          </form>
        </GlassCard>
      </div>
    );
  }