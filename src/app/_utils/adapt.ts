import type { Job } from "../constants/jobs";
import type { Recruitment } from "@/app/_types/recruitment/types";

export function adaptRecruitmentToJob(r: Recruitment): Job {
  const exp =
    r.minExperience === 0 && r.maxExperience === 0
      ? "무관"
      : `${r.minExperience}–${r.maxExperience}년`;

  return {
    id: r.id,
    href: r.recruitmentUrl,
    company: r.companyName,
    title: r.title,
    location: r.locations.join(", "),
    experience: exp,
    contractType: r.employmentTypes.join(", "),
    education: r.educations.join(", "),
    imageUrl: r.imageUrl ?? "/logo.png",
    dday: r.deadlineType,
    views: 0,
    jobGroup: r.jobs[0] ?? "기타",
    bookmarked: false,
  };
}
