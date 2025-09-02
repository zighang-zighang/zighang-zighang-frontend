"use client";

import { RegionButton } from "./RegionButton";

export const REGION_OPTIONS = {
  전체: "전체",
  서울: "서울",
  경기: "경기",
  인천: "인천",
  부산: "부산",
  대구: "대구",
  광주: "광주",
  대전: "대전",
  울산: "울산",
  세종: "세종",
  강원: "강원",
  경남: "경남",
  경북: "경북",
  전남: "전남",
  전북: "전북",
  충남: "충남",
  충북: "충북",
  제주: "제주",
  해외: "해외",
} as const;

export type RegionMap = typeof REGION_OPTIONS;
export type RegionValue = keyof RegionMap;
export const REGION_VALUES = Object.values(REGION_OPTIONS) as RegionValue[];

export default function RegionButtonList({
  value,
  onChange,
}: {
  value: RegionValue | null;
  onChange: (next: RegionValue) => void;
}) {
  return (
    <div
      className="w-48 h-80 overflow-y-auto overflow-hidden rounded-2xl border border-zinc-200 bg-white flex flex-col"
      role="listbox"
      aria-label="지역 선택"
    >
      {REGION_VALUES.map((label) => (
        <RegionButton
          key={label}
          label={label}
          active={value === label}
          onClick={() => onChange(label)}
        />
      ))}
    </div>
  );
}
