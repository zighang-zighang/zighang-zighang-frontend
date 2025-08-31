"use client";

import { useMemo } from "react";
import { EXPERIENCE_MIN, EXPERIENCE_MAX } from "@/app/constants/filterOptions";

type Props = {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
};

export default function FilterRange({ min, max, onChange }: Props) {
  const clampMin = (v: number) => Math.min(Math.max(EXPERIENCE_MIN, v), max);
  const clampMax = (v: number) => Math.max(Math.min(EXPERIENCE_MAX, v), min);

  const leftPct = useMemo(
    () => ((min - EXPERIENCE_MIN) / (EXPERIENCE_MAX - EXPERIENCE_MIN)) * 100,
    [min]
  );
  const rightPct = useMemo(
    () =>
      (1 - (max - EXPERIENCE_MIN) / (EXPERIENCE_MAX - EXPERIENCE_MIN)) * 100,
    [max]
  );

  return (
    <div className="px-1">
      <div className="relative h-10 flex items-center">
        <div className="absolute left-0 right-0 h-[3px] bg-zinc-200 rounded" />
        <div
          className="absolute h-[3px] bg-violet-500 rounded"
          style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
        />
        <input
          type="range"
          min={EXPERIENCE_MIN}
          max={EXPERIENCE_MAX}
          step={1}
          value={min}
          onChange={(e) => onChange(clampMin(+e.target.value), max)}
          className="range-thumb absolute w-full appearance-none bg-transparent pointer-events-auto"
        />
        <input
          type="range"
          min={EXPERIENCE_MIN}
          max={EXPERIENCE_MAX}
          step={1}
          value={max}
          onChange={(e) => onChange(min, clampMax(+e.target.value))}
          className="range-thumb absolute w-full appearance-none bg-transparent pointer-events-auto"
        />
      </div>
      <div className="mt-1 flex justify-between text-sm text-zinc-600">
        <span>신입</span>
        <span>10년+</span>
      </div>

      <style jsx>{`
        .range-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: white;
          border: 2px solid rgb(139 92 246); /* violet-500 */
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        .range-thumb::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: white;
          border: 2px solid rgb(139 92 246);
        }
      `}</style>
    </div>
  );
}
