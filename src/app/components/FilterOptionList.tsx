"use client";

import { useMemo } from "react";

export type FilterOption = { id: string; label: string };

type Props = {
  options: readonly FilterOption[];
  value: readonly string[];
  isAll: boolean;
  onToggle: (id: string) => void;
  isDesktop: boolean;
  allId?: string;
  className?: string;
  maxHeightDesktop?: string;
  maxHeightMobile?: string;
};

export default function FilterOptionList({
  options,
  value,
  isAll,
  onToggle,
  isDesktop,
  allId = "ALL",
  className,
  maxHeightDesktop = "56vh",
  maxHeightMobile = "60vh",
}: Props) {
  const selected = useMemo(() => new Set(value), [value]);

  return (
    <div
      className={[
        isDesktop
          ? `max-h-[${maxHeightDesktop}]`
          : `max-h-[${maxHeightMobile}]`,
        "overflow-y-auto px-4 pb-4 pt-3",
        className ?? "",
      ].join(" ")}
      role="group"
      aria-label="필터 옵션"
    >
      {options?.map((opt) => {
        const checked =
          opt.id === allId ? isAll : selected.has(opt.id) && !isAll;

        return (
          <label
            key={opt.id}
            className={[
              "mb-3 flex items-center gap-3 rounded-2xl border border-[#EDEDED] bg-white px-4 py-3 cursor-pointer",
              checked ? "bg-[#F7F5FF] border-[#E3D9FF]" : "",
            ].join(" ")}
          >
            <input
              type="checkbox"
              className="h-5 w-5 accent-[#6F3FF5]"
              checked={checked}
              onChange={() => onToggle(opt.id)}
              onPointerDown={(e) => e.stopPropagation()}
            />
            <span className="text-[16px] md:text-[17px] font-medium text-[#111]">
              {opt.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
