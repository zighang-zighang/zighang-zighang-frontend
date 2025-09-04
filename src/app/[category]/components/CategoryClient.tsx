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
import Adapt from "@/app/_utils/adapt";
import { Job } from "@/app/_types/recruitment/jobs";
import { LoadingFallback, ErrorFallback } from "./ErrorBoundary";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

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
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<LoadingFallback />}>
            <Inner />
          </Suspense>
        </ErrorBoundary>
        <FilterModal />
      </FilterDialogProvider>
    </div>
  );
}

function Inner() {
  const { filters } = useFilterDialog();
  const params = useMemo(() => mapFiltersToParams(filters), [filters]);

  const { data } = useRecruitments({
    page: 0,
    size: 20,
    ...params,
  });

  const content = data?.content ?? [];
  const jobs: Job[] = content.map(Adapt);

  return (
    <main className="p-4 space-y-4">
      <FilterBar />
      <JobCardList jobs={jobs} />
    </main>
  );
}
