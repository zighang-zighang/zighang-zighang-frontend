"use client";

import { useMemo } from "react";
import JobCardList from "./Card/JobCardList";
import FilterBar from "./Filter/FilterBar";
import FilterModal from "./Filter/FilterModal";
import { jobCategories } from "@/app/constants/jobCategories";
import {
  FilterDialogProvider,
  DEFAULT,
  type FilterState,
} from "@/app/hooks/useFilterDialog";

type Job = {
  id: string;
  href: string;
  company: string;
  title: string;
  location: string;
  experience: string;
  contractType: string;
  education: string;
  imageUrl: string;
  dday: string;
  views: number;
  hot?: boolean;
  bookmarked?: boolean;
};

export default function CategoryClient({
  slug,
  jobs,
}: {
  slug: string;
  jobs: Job[];
}) {
  const slugToJobGroup = (slug: string): string =>
    jobCategories.find((c) => c.href.slice(1) === slug)?.name ?? "전체";

  const initial = useMemo<FilterState>(
    () => ({ ...DEFAULT, jobGroup: slugToJobGroup(slug) }),
    [slug]
  );

  return (
    <div className="relative w-full overflow-visible px-0 md:mx-auto md:max-w-screen-xl md:px-10">
      <FilterDialogProvider initial={initial}>
        <main className="p-4 space-y-4">
          <FilterBar />
          <JobCardList jobs={jobs} />
        </main>
        <FilterModal />
      </FilterDialogProvider>
    </div>
  );
}
