"use client";

import React, { useMemo, useState, useCallback } from "react";
import {
  StepContainer,
  StepHeader,
  StepActions,
  ActionButton,
} from "../../_components";
import Dropdown from "../../_components/Dropdown/Dropdown";
import { SchoolChip } from "../../_components/Chip/SchoolChip";
import { GraduationChip } from "../../_components/Chip/GraduationChip";

import { EDUCATION_LEVELS } from "@/app/_constants/filterOptions";

export function EducationStep({
  onNext,
  onBack,
}: {
  onNext: (학력: string) => void;
  onBack: () => void;
}) {
  const SCHOOL_OPTIONS = useMemo(
    () => EDUCATION_LEVELS.filter((v) => v !== "전체" && v !== "학력 무관"),
    []
  );
  const GRADUATION_OPTIONS = useMemo(
    () => ["졸업", "재학", "휴학", "수료", "중퇴"],
    []
  );

  const [school, setSchool] = useState<string | null>(null);
  const [graduation, setGraduation] = useState<string | null>(null);

  const isValid = useMemo(() => !!school && !!graduation, [school, graduation]);

  const handleSubmit = useCallback(() => {
    if (!isValid || !school) return;
    onNext(school);
  }, [isValid, school, onNext]);

  return (
    <StepContainer>
      <StepHeader
        title="최종학력이 어떻게 되세요?"
        stepNumber={4}
        totalSteps={5}
        onBack={onBack}
      />

      <div className="w-full flex flex-col items-center h-[calc(500px-55px)]">
        <div className="mt-[58px] flex items-start gap-[16px]">
          {/* 좌측 아이콘 + 진행선 */}
          <div className="flex flex-col items-center gap-[16px]">
            <SchoolChip width={44} height={44} className="my-[1px]" />

            <GraduationChip
              isSelected={!!graduation}
              width={44}
              height={44}
              className="my-[1px]"
            />
          </div>

          {/* 우측 드롭다운 영역 */}
          <div className="flex flex-col gap-[16px]">
            <Dropdown
              placeholder="최종학교를 선택해주세요."
              options={SCHOOL_OPTIONS}
              value={school}
              onChange={setSchool}
            />
            <Dropdown
              placeholder="졸업구분을 선택해주세요"
              options={GRADUATION_OPTIONS}
              value={graduation}
              onChange={setGraduation}
              disabled={!school}
            />
          </div>
        </div>

        <StepActions className="h-full flex items-end pb-[30px]">
          <ActionButton
            onClick={handleSubmit}
            state={isValid ? "abled" : "disabled"}
          >
            다음
          </ActionButton>
        </StepActions>
      </div>
    </StepContainer>
  );
}
