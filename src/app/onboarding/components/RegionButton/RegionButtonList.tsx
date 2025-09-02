"use client";

import { RegionButton } from "./RegionButton";
import { REGION_OPTIONS, type RegionValue } from "../../context/regionTypes";

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
