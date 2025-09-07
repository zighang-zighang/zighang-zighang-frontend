import * as React from "react";
import type { ExploreJobKey } from "@/app/_constants/exploreJobCard";
import type { IconType } from "@/app/_utils/exploreJobs";

export interface ExploreJobCardProps {
  jobKey: ExploreJobKey; // React의 key 예약어 충돌 방지
  category: string;
  jobs: string[];
  Icon: IconType;
  selected?: boolean;
  maxJobs?: number;
  className?: string;
  onSelect?: (key: ExploreJobKey, next: boolean) => void;
}

export default function ExploreJobCard({
  jobKey,
  category,
  jobs,
  Icon,
  selected = false,
  maxJobs = 3,
  className,
  onSelect,
}: ExploreJobCardProps) {
  const shown = jobs.slice(0, maxJobs);
  const more = Math.max(0, jobs.length - shown.length);

  const handleClick = () => onSelect?.(jobKey, !selected);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={selected}
      className={[
        "group w-[168px] h-[228px] text-left rounded-2xl border transition-colors",
        "border-gray-200 bg-white hover:border-gray-300",
        "p-4 cursor-pointer",
        "shadow-[0_0_12px_rgba(0,0,0,0.08)]",
        className || "",
      ].join(" ")}
    >
      <div className="flex items-center gap-4 flex-col">
        <Icon isSelected={selected} className="w-13 h-13 shrink-0" />
        <div className="min-w-0">
          <p className="font-semibold whitespace-pre-line text-gray-900 truncate text-center text-sm">
            {category}
          </p>
        </div>
      </div>
    </button>
  );
}
