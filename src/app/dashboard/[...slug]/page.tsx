import { Suspense } from "react";

interface SlugPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function SectionContent({ params }: SlugPageProps) {
  const { slug } = await params;
  const currentPath = `/dashboard/${slug.join("/")}`;
  const sectionName = slug
    .map((s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(" › ");

  return (
    <div className="rounded-2xl border border-[#E8E1D7] bg-white p-8 shadow-xs">
      <div className="text-xs font-semibold uppercase tracking-wider text-[#B69252]">
        Navigation Active
      </div>
      <h1 className="mt-1 font-serif text-3xl font-bold text-[#702832]">
        {sectionName}
      </h1>
      <p className="mt-2 text-sm text-[#78716C]">
        Route: <code className="rounded bg-stone-100 px-2 py-0.5 text-stone-800">{currentPath}</code>
      </p>
      <p className="mt-4 text-sm text-[#78716C]">
        The sidebar item corresponding to this route is highlighted on the left with active styling.
      </p>
    </div>
  );
}

export default function DashboardSectionPage(props: SlugPageProps) {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <Suspense
        fallback={
          <div className="rounded-2xl border border-[#E8E1D7] bg-white p-8 shadow-xs animate-pulse">
            <div className="h-4 w-28 bg-stone-200 rounded mb-2" />
            <div className="h-8 w-56 bg-stone-200 rounded mb-4" />
            <div className="h-4 w-64 bg-stone-100 rounded" />
          </div>
        }
      >
        <SectionContent params={props.params} />
      </Suspense>
    </div>
  );
}
