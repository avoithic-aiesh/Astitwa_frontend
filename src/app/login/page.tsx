import type { Metadata } from "next";
import AuthShell from "@/Components/auth/AuthShell";
import LoginForm from "@/Components/auth/LoginForm";

export const metadata: Metadata = { title: "Log in | Eventra" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to manage your events and registrations."
    >
      <LoginForm />
    </AuthShell>
  );
}
