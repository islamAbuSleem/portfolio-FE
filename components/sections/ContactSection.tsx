"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { isValidEmail } from "@/lib/validation";
import { Mail, MapPin } from "lucide-react";

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
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; tx: number; ty: number }[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sparkleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (sparkleTimerRef.current) clearTimeout(sparkleTimerRef.current);
    };
  }, []);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(formState.email)) newErrors.email = "Invalid email";
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
    const newSparkles = Array.from({ length: 12 }).map((_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const distance = 30 + Math.random() * 20;
      return {
        id: i,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
      };
    });
    setSparkles(newSparkles);
    sparkleTimerRef.current = setTimeout(() => setSparkles([]), 800);
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
        <p className="text-body-md text-text-secondary mb-16">
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
                <Textarea
                  label="Message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={5}
                  error={errors.message}
                />

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

                  {sparkles.map((s) => (
                    <span
                      key={s.id}
                      className="fixed w-1.5 h-1.5 rounded-full bg-primary pointer-events-none z-50"
                      style={{
                        left: s.x,
                        top: s.y,
                        "--tx": `${s.tx}px`,
                        "--ty": `${s.ty}px`,
                        animation: "sparkle 0.6s ease-out forwards",
                      } as React.CSSProperties}
                    />
                  ))}
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