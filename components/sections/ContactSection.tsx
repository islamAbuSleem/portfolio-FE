"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Mail, MapPin } from "lucide-react";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) newErrors.email = "Invalid email";
    if (!formState.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const newSparkles = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 100,
        y: rect.top + rect.height / 2 + (Math.random() - 0.5) * 40,
      }));
      setSparkles(newSparkles);
      setTimeout(() => setSparkles([]), 800);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormState({ name: "", email: "", message: "" });
    setErrors({});
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(to right, var(--primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="text-headline-md md:text-headline-lg font-semibold text-text mb-4 text-center">
            Get in Touch
          </h2>
          <p className="text-body-md text-text-secondary text-center max-w-2xl mx-auto mb-16">
            Have a project in mind or want to discuss an opportunity? I&apos;d love to hear from you.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ScrollReveal>
            {isSubmitted ? (
              <div className="glass rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[400px] animate-in">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-6">
                  <CheckIcon />
                </div>
                <h3 className="text-headline-md font-semibold text-text mb-2">Message sent</h3>
                <p className="text-body-md text-text-secondary mb-6 max-w-sm">
                  Thanks for reaching out. I review every message personally and will get back to you within 24 hours.
                </p>
                <Button variant="ghost" onClick={resetForm} className="gap-2">
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
                <Input
                  label="Name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  error={errors.name}
                  placeholder="Your name"
                />
                <Input
                  label="Email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  error={errors.email}
                  placeholder="you@example.com"
                />
                <div className="w-full">
                  <label className="block text-label-md text-text-secondary mb-1.5">Message</label>
                  <textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={5}
                    className={`w-full bg-surface-container-lowest border-0 border-b-2 border-border text-text placeholder:text-text-secondary/50 focus:border-primary focus:outline-none focus:ring-0 transition-colors py-3 px-0 rounded-t-lg resize-none ${errors.message ? "border-error" : ""}`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-error" role="alert">{errors.message}</p>
                  )}
                </div>

                <div className="relative">
                  <Button
                    ref={buttonRef}
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                  >
                    Send Message
                  </Button>

                  {sparkles.map((s) => {
                    const angle = (s.id / 12) * Math.PI * 2;
                    const distance = 30 + Math.random() * 20;
                    const tx = Math.cos(angle) * distance;
                    const ty = Math.sin(angle) * distance;
                    return (
                      <span
                        key={s.id}
                        className="fixed w-1.5 h-1.5 rounded-full bg-primary pointer-events-none z-50"
                        style={{
                          left: s.x,
                          top: s.y,
                          "--tx": `${tx}px`,
                          "--ty": `${ty}px`,
                          animation: "sparkle 0.6s ease-out forwards",
                        } as React.CSSProperties}
                      />
                    );
                  })}
                </div>
              </form>
            )}
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="glass rounded-2xl p-8 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-headline-sm font-semibold text-text mb-6">Contact Info</h3>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-label-md text-text-secondary">Email</p>
                      <p className="text-body-sm text-text">hello@kineticsyntax.dev</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-label-md text-text-secondary">Location</p>
                      <p className="text-body-sm text-text">Remote — Worldwide</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50">
                <h3 className="text-headline-sm font-semibold text-text mb-4">Connect</h3>
                <div className="flex flex-col gap-3">
                  <a href="#" className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors group">
                    <GithubIcon />
                    <span className="text-body-sm group-hover:text-text transition-colors">github.com/kineticsyntax</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors group">
                    <LinkedinIcon />
                    <span className="text-body-sm group-hover:text-text transition-colors">linkedin.com/in/kineticsyntax</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}