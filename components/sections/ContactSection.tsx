"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Terminal } from "@/components/ui/Terminal";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { isValidEmail } from "@/lib/validation";
import { PROFILE } from "@/lib/profile";

/**
 * Two halves: the channel, so a reader who already knows what they want can
 * act in one click, and the protocol, for everyone else.
 */
export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [copied, setCopied] = useState<string | null>(null);

  const validate = () => {
    const next: { name?: string; email?: string; message?: string } = {};
    if (!formState.name.trim()) next.name = "Name is required";
    if (!formState.email.trim()) next.email = "Email is required";
    else if (!isValidEmail(formState.email)) next.email = "That email does not look right";
    if (!formState.message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = `Portfolio enquiry from ${formState.name.trim()}`;
    const body = `${formState.message.trim()}\n\n— ${formState.name.trim()}\n${formState.email.trim()}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* clipboard unavailable - the value is on screen anyway */
    }
  };

  return (
    <section id="contact" className="ambient relative scroll-mt-28 border-t border-border">
      <div className="shell flex flex-col gap-space-xl py-space-xl">
        <SectionHeading
          eyebrow="05 // initiate transmission"
          title="Get in touch"
          description="A role, a project, or a team that needs frontend and backend work? Send a message and I will reply personally."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* The channel */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="glass flex flex-col gap-space-md rounded-2xl p-space-lg">
              <span className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
                Direct channel
              </span>

              <div className="flex flex-col gap-1">
                <span className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
                  Email
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-body-md text-text transition-colors duration-200 hover:text-secondary break-all"
                  >
                    {PROFILE.email}
                  </a>
                  <button
                    type="button"
                    onClick={() => copy(PROFILE.email)}
                    className="shrink-0 rounded-md bg-surface-container px-2 py-1 font-mono text-label-xs uppercase tracking-widest text-text-secondary transition-colors duration-200 hover:text-secondary"
                  >
                    {copied === PROFILE.email ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1 border-t border-border pt-space-md">
                <span className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
                  Phone
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
                    className="text-body-md text-text transition-colors duration-200 hover:text-secondary"
                  >
                    {PROFILE.phone}
                  </a>
                  <button
                    type="button"
                    onClick={() => copy(PROFILE.phone)}
                    className="shrink-0 rounded-md bg-surface-container px-2 py-1 font-mono text-label-xs uppercase tracking-widest text-text-secondary transition-colors duration-200 hover:text-secondary"
                  >
                    {copied === PROFILE.phone ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1 border-t border-border pt-space-md">
                <span className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
                  Elsewhere
                </span>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 font-mono text-label-sm text-text-secondary transition-colors duration-200 hover:text-secondary"
                >
                  <GithubIcon className="h-4 w-4 shrink-0" />
                  <span>github.com/islamAbuSleem</span>
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 font-mono text-label-sm text-text-secondary transition-colors duration-200 hover:text-secondary"
                >
                  <LinkedinIcon className="h-4 w-4 shrink-0" />
                  <span>linkedin.com/in/islamabusleem</span>
                </a>
              </div>

              <div className="flex flex-col gap-1 border-t border-border pt-space-md">
                <span className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
                  Location
                </span>
                <span className="text-body-md text-text">
                  {PROFILE.location} · UTC {PROFILE.timezone}
                </span>
              </div>
            </div>

            <Terminal title="quick-connect" status="bash">
              <div className="space-y-1.5">
                <CommandLine label="mail" value={`mailto:${PROFILE.email}`} />
                <CommandLine label="call" value={PROFILE.phone} />
                <CommandLine label="git" value="github.com/islamAbuSleem" />
                <CommandLine label="in" value="linkedin.com/in/islamabusleem" />
              </div>
            </Terminal>
          </div>

          {/* The protocol */}
          <div className="lg:col-span-7">
            <div className="glass overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between gap-3 border-b border-border bg-surface-container px-space-lg py-3">
                <span className="inline-flex items-center gap-2 font-mono text-label-xs uppercase tracking-widest text-secondary">
                  <span className="beacon beacon-secondary" aria-hidden="true" />
                  Enquiry transmission protocol
                </span>
                <span className="font-mono text-label-xs uppercase tracking-widest text-text-faint">
                  Secure channel
                </span>
              </div>

              <div className="p-space-lg">
                {sent ? (
                  <div className="max-w-lg">
                    <p className="text-headline-md text-text">
                      Your mail app should be open.
                    </p>
                    <p className="mt-3 text-body-md text-text-secondary measure">
                      If nothing happened, write to{" "}
                      <a
                        href={`mailto:${PROFILE.email}`}
                        className="text-secondary underline underline-offset-4"
                      >
                        {PROFILE.email}
                      </a>{" "}
                      directly.
                    </p>
                    <Button
                      variant="secondary"
                      className="mt-8"
                      onClick={() => {
                        setSent(false);
                        setFormState({ name: "", email: "", message: "" });
                      }}
                    >
                      Write another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="max-w-lg space-y-5">
                    <Input
                      label="Your name / organization *"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      error={errors.name}
                      placeholder="Your name"
                    />
                    <Input
                      label="Direct email endpoint *"
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      error={errors.email}
                      placeholder="you@example.com"
                    />
                    <Textarea
                      label="What are you building? *"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      rows={6}
                      error={errors.message}
                      placeholder="Brief on the role, the product, or the problem."
                    />
                    <Button type="submit" size="lg" className="mt-1">
                      Transmit message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* The facts, in one line */}
        <ScrollReveal>
          <div className="glass flex flex-wrap items-center justify-between gap-x-8 gap-y-3 rounded-2xl px-space-lg py-space-md">
            <span className="inline-flex items-center gap-2 font-mono text-label-xs uppercase tracking-widest text-secondary">
              <span className="beacon beacon-primary" aria-hidden="true" />
              At a glance
            </span>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-label-sm">
              <Fact label="experience" value={`${PROFILE.yearsExperience}+ years`} />
              <Fact label="timezone" value={PROFILE.timezone} />
              <Fact label="based" value={PROFILE.location} />
              <Fact label="languages" value="AR · EN · ES" />
              <Fact label="role" value={PROFILE.title} />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function CommandLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-secondary">$</span>
      <span className="text-text-faint">{label}</span>
      <span className="text-text break-all">{value}</span>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className="text-text-faint">{label}</span>
      <span className="text-text">{value}</span>
    </span>
  );
}
