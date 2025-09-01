import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryClient from "./components/CategoryClient";
import { jobCategories } from "@/app/constants/jobCategories";
import { fetchRecruitments } from "@/app/_api/recruitment/list";
import type { Recruitment } from "@/app/_types/recruitment/types";
import { toApiJob } from "../_utils/jobFormat";

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
  hot?: boolean;
  bookmarked?: boolean;
}

function adapt(r: Recruitment): Job {
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
    imageUrl: r.imageUrl ?? r.companyImageUrl ?? "",
    dday: "D-3",
    views: 0,
    jobGroup: r.jobs[0] ?? "기타",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;

  const category = jobCategories.find((c) => c.href.slice(1) === slug);

  if (!category) {
    return;
  }

  const res = await fetchRecruitments();
  const jobs = res.data.content
    .filter((item) => item.jobs.includes(toApiJob(category.name)))
    .map(adapt);

  return (
    <div>
      <Header />
      <div className="relative w-full overflow-visible px-0 md:mx-auto md:max-w-screen-xl md:px-10">
        <button
          data-activate="True"
          className="text-lg font-semibold h-16 border-b-[3px] border-neutral-700 inline-flex justify-center items-center gap-2.5 ml-4 mt-1 transition-colors md:ml-0 md:text-2xl"
        >
          전체공고
        </button>
      </div>
      <CategoryClient slug={slug} jobs={jobs} />
      <div className="relative w-full overflow-visible px-0 md:mx-auto md:max-w-screen-xl md:px-10" />
      <Footer />
    </div>
  );
}
