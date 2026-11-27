import type { ReactNode } from "react";
import PagodaLogo from "@/Components/common/PagodaLogo";

type Props = { title: string; subtitle: string; children: ReactNode };

export default function AuthShell({ title, subtitle, children }: Props) {
  return (
    <main className="flex flex-1 items-center justify-center bg-[radial-gradient(circle_at_top,rgba(245,226,228,0.65),transparent_55%)] px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-rose-border bg-surface p-8 shadow-sm">
        <div className="mb-6">
          <PagodaLogo variant="light" size="sm" showText={false} />
        </div>
        <h1 className="font-display text-3xl font-bold text-primary">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}
