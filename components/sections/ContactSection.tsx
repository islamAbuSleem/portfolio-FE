"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { isValidEmail } from "@/lib/validation";

const EMAIL = "islam.abusleem@gmail.com";
const GITHUB_URL = "https://github.com/islamAbuSleem";
const LINKEDIN_URL = "https://www.linkedin.com/in/islamabusleem";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

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
    const body = `${formState.message.trim()}\n\nâ€” ${formState.name.trim()}\n${formState.email.trim()}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" data-accent="mint" className="relative scroll-mt-24">
      <div className="shell">
        <ScrollReveal>
          <div className="rule section-rule pt-16 md:pt-24 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-x-10">
            <div className="lg:col-span-3">
              <p className="text-label-xs section-index">05</p>
              <h2 className="mt-3 text-headline-lg text-text">Get in touch</h2>
              <p className="mt-4 text-body-sm text-text-secondary measure-tight">
                A project in mind, or an opportunity to discuss? Send a
                message and I&apos;ll reply personally.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="rule grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12 py-10">
          <div className="lg:col-span-7">
            {sent ? (
              <div className="max-w-lg">
                <p className="text-headline-md text-text">Your mail app should be open.</p>
                <p className="mt-3 text-body-md text-text-secondary measure">
                  If nothing happened, write to{" "}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-primary underline underline-offset-4"
                  >
                    {EMAIL}
                  </a>{" "}
                  directly.
                </p>
                <Button
                  variant="ghost"
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
              <form onSubmit={handleSubmit} noValidate className="max-w-lg space-y-6">
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
                  rows={6}
                  error={errors.message}
                  placeholder="What are you building?"
                />
                <Button type="submit" variant="primary" size="lg" className="mt-2">
                  Send message
                </Button>
              </form>
            )}
          </div>

          <dl className="lg:col-span-4 lg:col-start-9">
            <div className="rule pt-5 pb-5">
              <dt className="text-label-xs text-text-faint">Email</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-body-md text-text hover:text-primary transition-colors duration-200 break-all"
                >
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div className="rule pt-5 pb-5">
              <dt className="text-label-xs text-text-faint">Location</dt>
              <dd className="mt-2 text-body-md text-text">Remote â€” worldwide</dd>
            </div>
            <div className="rule pt-5 pb-5">
              <dt className="text-label-xs text-text-faint">Elsewhere</dt>
              <dd className="mt-3 flex flex-col gap-3">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-body-sm text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  <GithubIcon className="w-4 h-4 shrink-0" />
                  <span>github.com/islamAbuSleem</span>
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-body-sm text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  <LinkedinIcon className="w-4 h-4 shrink-0" />
                  <span>linkedin.com/in/islamabusleem</span>
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
