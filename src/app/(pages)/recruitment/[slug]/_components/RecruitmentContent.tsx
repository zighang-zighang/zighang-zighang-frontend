import Image from "next/image";
import { Job } from "@/app/_types/jobs";

interface RecruitmentContentProps {
  job: Job;
}

export default function RecruitmentContent({ job }: RecruitmentContentProps) {
  return (
    <div className="w-full">
      {job.imageUrl ? (
        <div className="relative aspect-[2/6]">
          <Image
            alt="채용 공고 이미지"
            src={job.imageUrl}
            fill
            className="object-cover rounded-lg"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 960px"
          />
        </div>
      ) : (
        <div className="w-full px-4 text-center text-gray-500 py-20">
          공고 이미지가 없습니다.
        </div>
      )}
      <div className="h-20"></div>
    </div>
  );
}
