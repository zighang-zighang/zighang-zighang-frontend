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
  useFilterDialog,
} from "@/app/hooks/useFilterDialog";
import { mapFiltersToParams } from "@/app/_utils/mapFiltersToParams";
import { useRecruitments } from "@/app/_api/recruitment/useRecruitments";
import type { Recruitment } from "@/app/_types/recruitment/types";

interface Job {
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
  jobGroup: string;
  bookmarked?: boolean;
}

function adapt(r: Recruitment): Job {
  const exp =
    r.minExperience === 0 && r.maxExperience === 0
      ? "무관"
      : `${r.minExperience}–${r.maxExperience}년`;

  return {
    id: r.id,
    href: r.recruitmentUrl ?? "#",
    company: r.companyName ?? "",
    title: r.title ?? "",
    location: (r.locations ?? []).join(", "),
    experience: exp,
    contractType: (r.employmentTypes ?? []).join(", "),
    education: (r.educations ?? []).join(", "),
    imageUrl: r.imageUrl ?? r.companyImageUrl ?? "",
    dday: r.deadlineType ?? "",
    views: 0,
    jobGroup: r.jobs?.[0] ?? "기타",
  };
}

export default function CategoryClient({ slug }: { slug: string }) {
  const slugToJobGroup = (s: string) =>
    jobCategories.find((c) => c.href.slice(1) === s)?.name ?? "전체";

  const initial = useMemo<FilterState>(
    () => ({ ...DEFAULT, jobGroup: slugToJobGroup(slug) }),
    [slug]
  );

  return (
    <div className="relative w-full overflow-visible px-0 md:mx-auto md:max-w-screen-xl md:px-10">
      <FilterDialogProvider initial={initial}>
        <Inner />
        <FilterModal />
      </FilterDialogProvider>
    </div>
  );
}

function Inner() {
  const { filters } = useFilterDialog();
  const params = useMemo(() => mapFiltersToParams(filters), [filters]);

  const { data, status, error } = useRecruitments({
    page: 0,
    size: 20,
    ...params,
  });

  if (status === "pending")
    return <div className="p-4 text-center">Loading…</div>;
  if (status === "error")
    return (
      <div className="p-4 text-center text-red-600">
        {String((error as Error)?.message)}
      </div>
    );

  const content = data?.data?.content ?? [];
  const jobs: Job[] = content.map(adapt);

  return (
    <main className="p-4 space-y-4">
      <FilterBar />
      <JobCardList jobs={jobs} />
    </main>
  );
}
