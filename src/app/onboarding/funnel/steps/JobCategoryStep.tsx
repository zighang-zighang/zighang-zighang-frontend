import React from "react";
import {
  StepContainer,
  StepHeader,
  StepActions,
  SecondaryButton,
  ActionButton,
} from "../../components";
import { onboardingJobCategories } from "@/app/constants/onboardingJobCategories";
import { JobCategoryItem } from "./JobCategoryItem";

export function JobCategoryStep({
  onNext,
}: {
  onNext: (직군: string) => void;
}) {
 

  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else if (prev.length < 3) {
        return [...prev, category];
      }
      return prev;
    });
  };

  const handleNext = () => {
    if (selectedCategories.length > 0) {
      onNext(selectedCategories[0]); // 현재는 첫 번째 선택된 직군만 전달
    }
  };

  return (
    <StepContainer>
      <StepHeader
        title="원하는 직군을 선택해주세요."
        subTitle="(최대 3개 선택)"
        stepNumber={1}
        totalSteps={5}
      />

      <div className="w-[613px] mt-[80px] mx-auto flex flex-wrap gap-2 mb-[98px] [&>*:nth-child(1)]:ml-3 [&>*:nth-child(20)]:ml-3">
        {onboardingJobCategories.map((category) => (
          <JobCategoryItem
            key={category}
            name={category}
            isSelected={selectedCategories.includes(category)}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>

      <StepActions>
        <SecondaryButton onClick={() => {}}>잘 모르겠어요</SecondaryButton>
        <ActionButton onClick={handleNext}>다음</ActionButton>
      </StepActions>
    </StepContainer>
  );
}
