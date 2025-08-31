// Server Component
import Card from "./Card";
import { getJobs } from "@/app/constants/jobs";

async function toggleBookmark(id: string, next: boolean) {
  "use server";

  console.log("[server action] toggleBookmark", { id, next });
}

export default async function JobCardList() {
  const jobs = await getJobs();

  return (
    <div className="w-full md:px-4">
      <div className="box-border flex w-full flex-grow flex-col items-start gap-2.5 px-4 pb-10 pt-0 lg:grid lg:grid-cols-2 lg:content-start lg:justify-between lg:gap-4 lg:px-0 lg:pb-12 lg:pt-0 px-2 lg:px-0">
        {jobs.map((job) => (
          <Card
            key={job.id}
            itemId={job.id}
            href={job.href}
            company={job.company}
            title={job.title}
            location={job.location}
            experience={job.experience}
            contractType={job.contractType}
            education={job.education}
            imageUrl={job.imageUrl}
            dday={job.dday}
            views={job.views}
            hot={job.hot}
            bookmarked={job.bookmarked}
            onToggleServer={toggleBookmark}
          />
        ))}
      </div>
    </div>
  );
}
