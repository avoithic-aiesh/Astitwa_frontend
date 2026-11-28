import { Suspense } from "react";
import { ContentApprovalSegment } from "@/components/dashboard/segments/ContentApprovalSegment";
import { TaskManagementSegment } from "@/components/dashboard/segments/TaskManagementSegment";
import { EventManagementSegment } from "@/components/dashboard/segments/EventManagementSegment";
import { PostSchedulingSegment } from "@/components/dashboard/segments/PostSchedulingSegment";
import { AnalyticsSegment } from "@/components/dashboard/segments/AnalyticsSegment";
import { GenericSegmentView } from "@/components/dashboard/segments/GenericSegmentView";

interface SlugPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function SectionContent({ params }: SlugPageProps) {
  const { slug } = await params;
  const mainSegment = slug[0] || "";
  const subpath = slug.slice(1).join("/");
  const currentPath = `/dashboard/${slug.join("/")}`;
  const sectionName = slug
    .map((s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(" › ");

  switch (mainSegment) {
    case "content-approval":
      return <ContentApprovalSegment />;
    case "task-management":
      return <TaskManagementSegment />;
    case "events":
      return <EventManagementSegment subpath={subpath} />;
    case "post-scheduling":
      return <PostSchedulingSegment />;
    case "analytics":
      return <AnalyticsSegment />;
    default:
      return (
        <GenericSegmentView
          segmentKey={mainSegment}
          title={sectionName}
          path={currentPath}
        />
      );
  }
}

export default function DashboardSectionPage(props: SlugPageProps) {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-[1600px] mx-auto">
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
