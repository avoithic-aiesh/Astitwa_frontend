"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/dashboard/icons/AdminIcons";
import type { ChartDataPoint, DateRange } from "@/types/dashboard-admin";

interface AnalyticsChartsProps {
  data: ChartDataPoint[];
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
}

export function AnalyticsCharts({
  data,
  selectedRange,
  onRangeChange,
}: AnalyticsChartsProps) {
  const [activeSocialMetric, setActiveSocialMetric] = useState<"reach" | "engagement">("reach");
  const [hoveredSocialIndex, setHoveredSocialIndex] = useState<number | null>(null);
  const [hoveredEventIndex, setHoveredEventIndex] = useState<number | null>(null);

  // Calculate scales for Social Chart
  const socialValues = data.map((d) => d[activeSocialMetric]);
  const maxSocial = Math.max(...socialValues) * 1.15 || 100;
  const minSocial = 0;

  // SVG dimensions for responsive chart
  const width = 600;
  const height = 240;
  const padding = { top: 20, right: 20, bottom: 35, left: 45 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;

  // Generate points for Social curve
  const socialPoints = data.map((d, index) => {
    const x = padding.left + (index / (data.length - 1)) * graphWidth;
    const y =
      padding.top +
      graphHeight -
      ((d[activeSocialMetric] - minSocial) / (maxSocial - minSocial)) * graphHeight;
    return { x, y, data: d };
  });

  // Build SVG path
  const socialPathD = socialPoints.reduce((acc, point, i) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = socialPoints[i - 1];
    const cpX = (prev.x + point.x) / 2;
    return `${acc} C ${cpX} ${prev.y}, ${cpX} ${point.y}, ${point.x} ${point.y}`;
  }, "");

  const socialAreaD = `${socialPathD} L ${
    socialPoints[socialPoints.length - 1]?.x
  } ${height - padding.bottom} L ${socialPoints[0]?.x} ${
    height - padding.bottom
  } Z`;

  // Calculate scales for Event Registration Bars
  const maxRegistrations = Math.max(...data.map((d) => d.registrations)) * 1.2 || 100;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Chart 1: Social Media Reach & Engagement */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#E8E1D7] bg-[#FFFFFF] p-6 shadow-xs">
        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#E8E1D7] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-[#702832]">
                  Social Media Performance
                </h3>
                <span className="rounded-full bg-[#B69252]/15 px-2 py-0.5 text-[11px] font-bold text-[#B69252]">
                  Combined
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[#78716C]">
                Total impressions, viral reach, and audience interaction trends.
              </p>
            </div>

            {/* Toggle metric */}
            <div className="flex rounded-lg border border-[#E8E1D7] bg-[#F8F5EE] p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveSocialMetric("reach")}
                className={`rounded-md px-2.5 py-1 transition-colors ${
                  activeSocialMetric === "reach"
                    ? "bg-[#702832] text-white shadow-xs"
                    : "text-[#78716C] hover:text-[#292524]"
                }`}
              >
                Reach
              </button>
              <button
                type="button"
                onClick={() => setActiveSocialMetric("engagement")}
                className={`rounded-md px-2.5 py-1 transition-colors ${
                  activeSocialMetric === "engagement"
                    ? "bg-[#702832] text-white shadow-xs"
                    : "text-[#78716C] hover:text-[#292524]"
                }`}
              >
                Engagement
              </button>
            </div>
          </div>

          {/* SVG Smooth Curve Area Chart */}
          <div className="relative mt-4 w-full">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="h-60 w-full overflow-visible select-none"
            >
              <defs>
                <linearGradient id="maroonGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#702832" stopOpacity="0.35" />
                  <stop offset="85%" stopColor="#702832" stopOpacity="0.02" />
                  <stop offset="100%" stopColor="#702832" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = padding.top + graphHeight * ratio;
                const val = Math.round(maxSocial * (1 - ratio));
                return (
                  <g key={ratio}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={width - padding.right}
                      y2={y}
                      stroke="#E8E1D7"
                      strokeDasharray="3 3"
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 3}
                      fill="#78716C"
                      fontSize="10"
                      textAnchor="end"
                    >
                      {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}
                    </text>
                  </g>
                );
              })}

              {/* Area fill */}
              <path d={socialAreaD} fill="url(#maroonGradient)" />

              {/* Smooth stroke line */}
              <path
                d={socialPathD}
                fill="none"
                stroke="#702832"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points & Interaction */}
              {socialPoints.map((point, index) => {
                const isHovered = hoveredSocialIndex === index;
                return (
                  <g key={point.data.label}>
                    {/* X-axis labels */}
                    <text
                      x={point.x}
                      y={height - 10}
                      fill="#78716C"
                      fontSize="11"
                      textAnchor="middle"
                    >
                      {point.data.label}
                    </text>

                    {/* Target touch hover area */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="12"
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredSocialIndex(index)}
                      onMouseLeave={() => setHoveredSocialIndex(null)}
                    />

                    {/* Point Circle */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isHovered ? "6" : "3.5"}
                      fill="#FFFFFF"
                      stroke="#702832"
                      strokeWidth="2.5"
                      className="transition-all duration-150 pointer-events-none"
                    />

                    {/* Tooltip on hover */}
                    {isHovered && (
                      <g className="pointer-events-none">
                        <rect
                          x={Math.min(point.x - 45, width - 100)}
                          y={point.y - 42}
                          width="90"
                          height="32"
                          rx="6"
                          fill="#702832"
                          className="shadow-lg"
                        />
                        <text
                          x={Math.min(point.x, width - 55)}
                          y={point.y - 28}
                          fill="#FFFFFF"
                          fontSize="9.5"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {point.data.date}
                        </text>
                        <text
                          x={Math.min(point.x, width - 55)}
                          y={point.y - 16}
                          fill="#F5D7B9"
                          fontSize="10"
                          fontWeight="600"
                          textAnchor="middle"
                        >
                          {point.data[activeSocialMetric].toLocaleString()}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#E8E1D7] pt-3 text-xs text-[#78716C]">
          <span>Peak: {Math.max(...socialValues).toLocaleString()} {activeSocialMetric}</span>
          <Link
            href="/dashboard/analytics"
            className="inline-flex items-center gap-1 font-semibold text-[#702832] hover:text-[#B69252]"
          >
            Social Analytics <ChevronRightIcon size={14} />
          </Link>
        </div>
      </div>

      {/* Chart 2: Event Registration & Attendance Trends */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#E8E1D7] bg-[#FFFFFF] p-6 shadow-xs">
        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#E8E1D7] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-bold text-[#702832]">
                  Event Registrations & Attendance
                </h3>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                  +18.4%
                </span>
              </div>
              <p className="mt-0.5 text-xs text-[#78716C]">
                Signups pacing versus confirmed participant turnouts.
              </p>
            </div>

            {/* Range & Legend */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex rounded-lg border border-[#E8E1D7] bg-[#F8F5EE] p-0.5 text-xs font-semibold">
                {(["7d", "30d", "90d"] as DateRange[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => onRangeChange(r)}
                    className={`rounded-md px-2 py-0.5 text-[11px] transition-colors ${
                      selectedRange === r
                        ? "bg-[#702832] text-white shadow-xs"
                        : "text-[#78716C] hover:text-[#292524]"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1.5 text-[#292524] font-medium">
                  <span className="h-3 w-3 rounded-xs bg-[#702832]" />
                  Registrations
                </span>
                <span className="inline-flex items-center gap-1.5 text-[#78716C]">
                  <span className="h-3 w-3 rounded-xs bg-[#B69252]" />
                  Attendance
                </span>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="relative mt-4 w-full">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="h-60 w-full overflow-visible select-none"
            >
              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                const y = padding.top + graphHeight * ratio;
                const val = Math.round(maxRegistrations * (1 - ratio));
                return (
                  <g key={ratio}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={width - padding.right}
                      y2={y}
                      stroke="#E8E1D7"
                      strokeDasharray="3 3"
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 3}
                      fill="#78716C"
                      fontSize="10"
                      textAnchor="end"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Bar Groups */}
              {data.map((item, index) => {
                const groupWidth = graphWidth / data.length;
                const barWidth = Math.min(18, groupWidth * 0.32);
                const centerX = padding.left + index * groupWidth + groupWidth / 2;

                const regHeight = (item.registrations / maxRegistrations) * graphHeight;
                const regY = padding.top + graphHeight - regHeight;

                const attHeight = (item.attendance / maxRegistrations) * graphHeight;
                const attY = padding.top + graphHeight - attHeight;

                const isHovered = hoveredEventIndex === index;

                return (
                  <g
                    key={item.label}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredEventIndex(index)}
                    onMouseLeave={() => setHoveredEventIndex(null)}
                  >
                    {/* Registration bar */}
                    <rect
                      x={centerX - barWidth - 2}
                      y={regY}
                      width={barWidth}
                      height={regHeight}
                      rx="3"
                      fill="#702832"
                      opacity={isHovered ? 1 : 0.88}
                      className="transition-opacity"
                    />

                    {/* Attendance bar */}
                    <rect
                      x={centerX + 2}
                      y={attY}
                      width={barWidth}
                      height={attHeight}
                      rx="3"
                      fill="#B69252"
                      opacity={isHovered ? 1 : 0.85}
                      className="transition-opacity"
                    />

                    {/* X-axis label */}
                    <text
                      x={centerX}
                      y={height - 10}
                      fill="#78716C"
                      fontSize="11"
                      textAnchor="middle"
                    >
                      {item.label}
                    </text>

                    {/* Hover Tooltip */}
                    {isHovered && (
                      <g className="pointer-events-none">
                        <rect
                          x={Math.min(centerX - 50, width - 110)}
                          y={Math.min(regY, attY) - 48}
                          width="100"
                          height="40"
                          rx="6"
                          fill="#292524"
                          className="shadow-xl"
                        />
                        <text
                          x={Math.min(centerX, width - 60)}
                          y={Math.min(regY, attY) - 34}
                          fill="#FFFFFF"
                          fontSize="9.5"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {item.date}
                        </text>
                        <text
                          x={Math.min(centerX, width - 60)}
                          y={Math.min(regY, attY) - 22}
                          fill="#F5D7B9"
                          fontSize="9"
                          textAnchor="middle"
                        >
                          Reg: {item.registrations} | Att: {item.attendance}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#E8E1D7] pt-3 text-xs text-[#78716C]">
          <span>Average Turnout Rate: 91.2%</span>
          <Link
            href="/dashboard/events/results"
            className="inline-flex items-center gap-1 font-semibold text-[#702832] hover:text-[#B69252]"
          >
            Event Reports <ChevronRightIcon size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
