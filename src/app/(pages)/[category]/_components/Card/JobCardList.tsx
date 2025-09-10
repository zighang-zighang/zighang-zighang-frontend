"use client";

import Card from "./Card";
import { Job } from "@/app/_types/jobs";

export default function JobCardList({ jobs }: { jobs: Job[] }) {
  if (!jobs.length) {
    return (
      <div className="w-full rounded-xl p-10 text-center text-sm text-zinc-500">
        조건에 맞는 공고가 없어요.
      </div>
    );
  }

  return (
    <div className="w-full md:px-4">
      <div
        className="box-border flex w-full flex-grow flex-col items-start gap-2.5 px-4 pb-10 pt-0
                      laptop:grid laptop:grid-cols-2 laptop:content-start laptop:justify-between laptop:gap-4 laptop:px-0 laptop:pb-12 laptop:pt-0"
      >
        {jobs.map((job) => (
          <Card
            key={job.id}
            id={job.id}
            href={job.href}
            company={job.company}
            companyImageUrl={job.companyImageUrl}
            title={job.title}
            location={job.location}
            experience={job.experience}
            contractType={job.contractType}
            education={job.education}
            imageUrl={job.imageUrl}
            views={job.views}
            deadlineType={job.deadlineType}
            hot={job.hot ?? false}
            bookmarked={job.bookmarked}
          />
        ))}
      </div>
    </div>
  );
}
