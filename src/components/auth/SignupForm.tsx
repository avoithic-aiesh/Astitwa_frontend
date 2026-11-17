"use client";

import { useAuth } from "@/components/auth/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Field from "./Field";

export default function SignupForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
    const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const confirm = String(data.get("confirm") ?? "");
    const terms = data.get("terms") === "on";

    const next: Record<string, string> = {};
    if (!name) next.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Use at least 8 characters.";
    if (confirm !== password) next.confirm = "Passwords do not match.";
    if (!terms) next.terms = "You need to accept the terms to continue.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    try {
      await signup(name, email, password);
      router.push("/");
} catch (err) {
     setErrors({
        form:
        err instanceof Error 
        ? err.message : "Could not sign up. Please try again.",
    });
 } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Field label="Full name" name="name" autoComplete="name"
        placeholder="Your name" error={errors.name} />
      <Field label="Email" name="email" type="email" autoComplete="email"
        placeholder="you@example.com" error={errors.email} />
      <Field label="Password" name="password" type="password"
        autoComplete="new-password" placeholder="At least 8 characters" error={errors.password} />
      <Field label="Confirm password" name="confirm" type="password"
        autoComplete="new-password" placeholder="Repeat your password" error={errors.confirm} />

      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-2 text-sm text-muted">
          <input type="checkbox" name="terms" className="mt-0.5 accent-primary" />
          I agree to the terms and privacy policy.
        </label>
        {errors.terms && (
          <p role="alert" className="text-sm text-red-600">{errors.terms}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}