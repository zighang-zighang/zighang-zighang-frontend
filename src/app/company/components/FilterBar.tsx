"use client";

import Filter from "../../[category]/components/Filter";
import { FilterTagSelectModalTrigger as FilterTagSelect } from "@/app/company/components/FilterTag";
import { useFilterDialog } from "@/app/hooks/useFilterDialog";
import Refresh from "../../[category]/components/Refresh";
import {
  INDUSTRY,
  REGION,
  COMPANY_SIZE,
  TYPE,
  EDUCATION,
  CAREER,
  DEADLINE,
} from "@/app/constants/filterOptions"; // 옵션 상수들

export default function FilterBar() {
  const { openDialog } = useFilterDialog();

  return (
    <div className="flex gap-2 mx-4 py-2.5">
      <div className="flex items-center gap-1 md:gap-2">
        <Refresh></Refresh>
        <div
          data-orientation="vertical"
          role="none"
          className="shrink-0 mx-1 h-7 w-[1.5px] bg-[#DDDDE1] md:mx-2"
        ></div>

        <Filter onClick={() => openDialog("all")} />
      </div>

      <div className="w-full overflow-x-auto overflow-y-hidden">
        <section className="flex gap-2" aria-label="필터 목록">
          <FilterTagSelect
            id="industry"
            label="산업"
            options={INDUSTRY}
            section="industry"
          />
          <FilterTagSelect
            id="region"
            label="지역"
            options={REGION}
            section="region"
          />
          <FilterTagSelect
            id="size"
            label="기업규모"
            options={COMPANY_SIZE}
            section="companySize"
          />
          <FilterTagSelect
            id="type"
            label="채용 유형"
            options={TYPE}
            section="type"
          />
          <FilterTagSelect
            id="education"
            label="학력 조건"
            options={EDUCATION}
            section="education"
          />
          <FilterTagSelect
            id="career"
            label="경력 조건"
            options={CAREER}
            section="career"
          />
          <FilterTagSelect
            id="deadline"
            label="마감 유형"
            options={DEADLINE}
            section="deadline"
          />
        </section>
      </div>
    </div>
  );
}
