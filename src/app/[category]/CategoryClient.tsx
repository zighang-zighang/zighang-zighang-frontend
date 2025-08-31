"use client";

import JobCardList from "./components/Card/JobCardList";
import FilterBar from "./components/Filter/FilterBar";
import FilterModal from "./components/Filter/FilterModal";
import {
  FilterDialogProvider,
  useFilterDialog,
} from "../hooks/useFilterDialog";

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

function FilterArea({ jobs }: { jobs: Job[] }) {
  const { filters } = useFilterDialog();

  const handleApply = () => {
    console.log("apply with filters:", filters);
  };

  return (
    <>
      <main className="p-4 space-y-4">
        <FilterBar />
        <JobCardList jobs={jobs} />
      </main>
      <FilterModal onApply={handleApply} />
    </>
  );
}

export default function CategoryClient({
  slug,
  jobs,
}: {
  slug: string;
  jobs: Job[];
}) {
  return (
    <div className="relative w-full overflow-visible px-0 md:mx-auto md:max-w-screen-xl md:px-10">
      <FilterDialogProvider>
        <FilterArea jobs={jobs} />
      </FilterDialogProvider>
    </div>
  );
}
