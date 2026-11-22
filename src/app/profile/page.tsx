
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Components/auth/AuthContext";
import LoadingState from "@/Components/common/LoadingState";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <LoadingState />;
  }

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  const roleLabel = user.role
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <main className="min-h-screen bg-background px-4 py-10 md:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Back to Home
          </Link>

          <h1 className="mt-5 text-3xl font-bold text-foreground">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-muted">
            View your account information.
          </p>
        </div>

        <section className="rounded-xl border border-border bg-surface p-6 shadow-sm md:p-8">
          <div className="mb-8 flex items-center gap-4 border-b border-border pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
              {user.fullName.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {user.fullName}
              </h2>

              <p className="text-sm text-muted">
                {user.email}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted">Full Name</p>
              <p className="mt-1 font-medium text-foreground">
                {user.fullName}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted">Email Address</p>
              <p className="mt-1 font-medium text-foreground">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted">Account Role</p>
              <p className="mt-1 font-medium text-foreground">
                {roleLabel}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted">Joined Date</p>
              <p className="mt-1 font-medium text-foreground">
                {joinedDate}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted">Account Status</p>
              <p className="mt-1 font-medium text-foreground">
                {user.status}
              </p>
            </div>
          </div>
        </section>

        <div className="mt-6">
          <Link
            href="/events"
            className="inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Browse Events
          </Link>
        </div>
      </div>
    </main>
  );
}
