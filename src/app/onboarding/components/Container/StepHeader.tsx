import React from "react";
import { ArrowLeft } from "../../../components/Icons";

interface StepHeaderProps {
  title: string;
  subTitle?: string;
  stepNumber: number;
  totalSteps: number;
  onBack?: () => void;
}

export function StepHeader({
  title,
  subTitle,
  stepNumber,
  totalSteps,
  onBack,
}: StepHeaderProps) {
  return (
    <div className="w-full flex items-center justify-between border-b border-gray-200 pl-[16px] pr-[19px] pt-[14px] pb-[15px]">
      <button onClick={onBack} className="text-Button1-18sb flex items-center">
        <ArrowLeft className="text-black mr-[2px]" />
        이전
      </button>

      <h1 className="text-Heading3-18sb flex items-center justify-center gap-[6px] text-black">
        {title}{" "}
        <span className="text-Subheading4-12m text-[#767678]">{subTitle}</span>
      </h1>
      <div className="flex items-center gap-[6px]">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`flex items-center justify-center ${
              i < stepNumber
                ? "w-[18px] h-[18px] bg-[#7951FF] rounded-full"
                : "w-2 h-2 bg-[#C5C5C8] rounded-full"
            }`}
          >
            {i < stepNumber && (
              <span className="text-Button3-14sb text-white">{i + 1}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
