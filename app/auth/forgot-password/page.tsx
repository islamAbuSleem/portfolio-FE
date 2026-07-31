"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

export default function ForgotPasswordPage() {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState<{ email?: string }>({});

  const validate = () => {
    const newErrors: { email?: string } = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send magic link");

      setIsSent(true);
      addToast({ type: "success", title: "Check your inbox", message: "Magic link sent to your email" });
    } catch (err) {
      addToast({ type: "error", title: "Failed", message: err instanceof Error ? err.message : "Unknown error" });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="text-center space-y-5">
        <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-headline-sm font-semibold text-text">Magic Link Sent</h2>
        <p className="text-text-secondary">We&apos;ve sent a sign-in link to <strong>{email}</strong>. The link expires in 15 minutes.</p>
        <p className="text-sm text-text-secondary">Didn&apos;t receive it? Check your spam folder or try again.</p>
        <div className="flex flex-col gap-3 pt-2">
          <Button variant="ghost" onClick={() => setIsSent(false)} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" /> Try Another Email
          </Button>
          <Link href="/auth/login">
            <Button variant="primary" className="w-full">Back to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center mb-2">
        <h1 className="text-headline-md font-semibold text-text">Forgot Password</h1>
        <p className="text-text-secondary text-sm mt-1">Enter your email to receive a magic sign-in link</p>
      </div>

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        placeholder="admin@example.com"
        disabled={isLoading}
        icon={<Mail className="w-5 h-5" />}
      />

      <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
        Send Magic Link
      </Button>

      <p className="text-center text-sm text-text-secondary">
        <Link href="/auth/login" className="text-primary hover:underline">
          <ArrowLeft className="w-4 h-4 inline mr-1" /> Back to Login
        </Link>
      </p>
    </form>
  );
}