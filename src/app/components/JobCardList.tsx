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
    <div className="p-4 space-y-4">
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
  );
}
