import React from "react";
import {
  StepContainer,
  StepHeader,
  StepActions,
  SecondaryButton,
  ActionButton,
} from "../../components";

export function JobCategoryStep({
  onNext,
}: {
  onNext: (직군: string) => void;
}) {
  const jobCategories = [
    "IT·개발",
    "AI·데이터",
    "디자인",
    "생산·기능직",
    "기획·전략",
    "의료·보건",
    "영업",
    "은행·카드·보험",
    "건설",
    "무역",
    "운송",
    "증권·운용",
    "엔지니어링",
    "미디어·엔터",
    "고객상담·TM",
    "상품기획·MD",
    "서비스",
    "법률",
    "식음료",
    "회계·재무·세무",
    "마케팅·광고",
    "HR·총무",
    "공공·복지",
    "교육",
    "게임",
  ];

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

      <div className="grid grid-cols-6 gap-3 mb-6">
        {jobCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`p-3 text-sm rounded-lg border-2 transition-all ${
              selectedCategories.includes(category)
                ? "border-purple-500 bg-purple-50 text-purple-700"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <StepActions>
        <SecondaryButton onClick={() => {}}>잘 모르겠어요</SecondaryButton>
        <ActionButton onClick={handleNext}>다음</ActionButton>
      </StepActions>
    </StepContainer>
  );
}
