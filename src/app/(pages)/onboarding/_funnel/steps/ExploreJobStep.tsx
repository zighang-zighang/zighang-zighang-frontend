"use client";

import * as React from "react";
import { StepContainer, StepHeader, ActionButton } from "../../_components";
import ExploreJobCarousel from "../../_components/ExploreJobCard/ExploreJobCarousel";
import type { ExploreJobKey } from "@/app/_constants/exploreJobCard";
import { EXPLORE_JOB_BY_KEY } from "@/app/_utils/exploreJobs";

export function ExploreJobStep({
  onNext,
  onBack,
}: {
  onNext: (직군: string[]) => void;
  onBack: () => void;
}) {
  const [selectedKey, setSelectedKey] = React.useState<ExploreJobKey | null>(
    null
  );
  const canNext = !!selectedKey;
  const nextState: "abled" | "disabled" = canNext ? "abled" : "disabled";
  const handleNext = () => {
    if (!selectedKey) return; // 안전장치
    const 직군 = [...EXPLORE_JOB_BY_KEY[selectedKey].jobs]; // readonly → mutable
    onNext(직군);
  };

  return (
    <StepContainer>
      <StepHeader
        title="성향에 맞는 카드를 선택해주세요"
        stepNumber={1}
        totalSteps={4}
        onBack={onBack}
      />

      <div className="mt-6">
        <ExploreJobCarousel
          value={selectedKey}
          onChange={setSelectedKey}
          maxJobs={3}
          className="overflow-visible"
        />
      </div>

      <div className="mt-6">
        <ActionButton onClick={handleNext} state={nextState}>
          다음
        </ActionButton>
      </div>
    </StepContainer>
  );
}
