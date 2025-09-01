// app/[category]/components/Card/JobCardList.tsx
"use client";

import { useMemo } from "react";
import { useFilterDialog } from "@/app/hooks/useFilterDialog";
import Card from "./Card";
import { isAll } from "../Filter/FilterBar";

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
  jobGroup?: string;
  jobRoles?: string[];
  regionCode?: string;
  deadlineType?: string;
};

/** 경력 문자열을 대략적인 [min,max]로 변환 (max=10은 10년+) */
function parseYearsRange(exp: string): { min: number; max: number } {
  const s = (exp || "").trim();
  if (!s || /신입|무관/.test(s)) return { min: 0, max: 0 };
  const nums = (s.match(/\d+/g) || []).map(Number);
  if (/이상|~\s*$/.test(s)) {
    const n = nums[0] ?? 0;
    return { min: n, max: 10 };
  }
  if (nums.length >= 2) {
    const [a, b] = nums;
    return { min: Math.min(a, b), max: Math.max(a, b) };
  }
  if (nums.length === 1) {
    const n = nums[0];
    return { min: n, max: n };
  }
  return { min: 0, max: 10 };
}

/** 위치 문자열에서 광역권 키워드 추출 (대략 매칭) */
const REGION_KEYS = [
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "대전",
  "울산",
  "세종",
  "강원",
  "경남",
  "경북",
  "전남",
  "전북",
  "충남",
  "충북",
  "제주",
  "해외",
  "기타",
];
function inferRegion(loc: string): string {
  const L = loc || "";
  const hit = REGION_KEYS.find((r) => L.includes(r));
  return hit ?? "기타";
}

/** 다중 선택 배열 필터: "전체"면 통과, 아니면 교집합 여부로 판단 */
function includesAny(
  targets: string[] | undefined,
  selected: string[]
): boolean {
  if (!selected.length || isAll(selected)) return true;
  if (!targets || !targets.length) return false;
  return selected.some((s) => targets.includes(s));
}

/** 단일 항목 매칭: "전체"면 통과, 아니면 일치 */
function matchOne(target: string | undefined, selected: string[]): boolean {
  if (!selected.length || isAll(selected)) return true;
  return selected.includes(target || "");
}

export default function JobCardList({ jobs }: { jobs: Job[] }) {
  const { filters } = useFilterDialog();

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      if (filters.jobGroup !== "전체") {
        const group = job.jobGroup || "기타";
        if (group !== filters.jobGroup) return false;
      }

      if (!includesAny(job.jobRoles, filters.jobRoles)) return false;

      if (!matchOne(job.contractType, filters.hireTypes)) return false;

      if (!matchOne(job.education, filters.educations)) return false;

      const region = job.regionCode || inferRegion(job.location);
      if (!matchOne(region, filters.regions)) return false;

      const j = parseYearsRange(job.experience);
      const f = filters.experience;
      const overlap = Math.max(j.min, f.min) <= Math.min(j.max, f.max);
      if (!overlap) return false;

      return true;
    });
  }, [jobs, filters]);

  if (!filtered.length) {
    return (
      <div className="w-full rounded-xlp-10 text-center text-sm text-zinc-500">
        조건에 맞는 공고가 없어요.
      </div>
    );
  }

  return (
    <div className="w-full md:px-4">
      <div
        className="box-border flex w-full flex-grow flex-col items-start gap-2.5 px-4 pb-10 pt-0
                      lg:grid lg:grid-cols-2 lg:content-start lg:justify-between lg:gap-4 lg:px-0 lg:pb-12 lg:pt-0"
      >
        {filtered.map((job) => (
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
            hot={job.hot ?? false}
            bookmarked={job.bookmarked ?? false}
          />
        ))}
      </div>
    </div>
  );
}
