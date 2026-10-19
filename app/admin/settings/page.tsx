"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/ui/Toast";
import { getAbout, updateAbout } from "@/lib/api";

const EMPTY_ABOUT = { bio: "", avatarUrl: "", resumeUrl: "" };

export default function AdminSettingsPage() {
  const [formData, setFormData] = useState(EMPTY_ABOUT);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    let active = true;
    getAbout()
      .then((about) => {
        if (!active || !about) return;
        setFormData({
          bio: about.bio,
          avatarUrl: about.avatarUrl ?? "",
          resumeUrl: about.resumeUrl ?? "",
        });
      })
      .catch(() => {
        if (active) addToast({ type: "error", title: "Failed to load profile" });
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [addToast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateAbout({
        bio: formData.bio,
        avatarUrl: formData.avatarUrl || undefined,
        resumeUrl: formData.resumeUrl || undefined,
      });
      addToast({ type: "success", title: "Settings saved" });
    } catch (err) {
      addToast({
        type: "error",
        title: "Save failed",
        message: err instanceof Error ? err.message : "An unexpected error occurred",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-headline-lg font-semibold text-text mb-2">Settings</h1>
        <p className="text-body-md text-text-secondary">Manage your about section and profile.</p>
      </div>

      <GlassCard className="p-8">
        {isLoading ? (
          <p className="text-body-md text-text-secondary">Loading profile…</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <Textarea
              label="Bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={6}
            />

            <Input label="Avatar URL" value={formData.avatarUrl} onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })} placeholder="https://..." />
            <Input label="Resume URL" value={formData.resumeUrl} onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })} placeholder="https://..." />

            <div className="flex justify-end pt-4">
              <Button variant="primary" type="submit" isLoading={isSaving}>
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </GlassCard>
    </div>
  );
}