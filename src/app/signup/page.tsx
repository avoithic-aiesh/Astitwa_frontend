import type { Metadata } from "next";
import AuthShell from "../../Components/auth/AuthShell";
import SignupForm from "../../Components/auth/SignupForm";

export const metadata: Metadata = { title: "Sign up | Eventra" };

export default function SignupPage() {
  return (
    <AuthShell title="Create your account" subtitle="Join Eventra and start organizing events.">
      <SignupForm />
    </AuthShell>
  );
}