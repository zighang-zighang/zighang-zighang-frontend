"use client";
import { useEffect, useMemo, useRef, useState, useId } from "react";
import { PopoverPanel } from "./PopOver";
export type Option = { id: string; label: string };

type Props = {
  id?: string; // ← 선택적으로 바꿔도 됩니다
  label: string;
  options: Option[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (next: string[]) => void;
};

export default function FilterTagSelect({
  id,
  label,
  options,
  value,
  defaultValue,
  onChange,
}: Props) {
  const autoId = useId();
  const resolvedId = id ?? `filter-${autoId}`;

  const ALL_ID = options?.[0]?.id ?? "ALL";
  const initial = defaultValue ?? [ALL_ID];

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const controlled = Array.isArray(value);
  const [inner, setInner] = useState<string[]>(initial);
  const selected = controlled ? (value as string[]) : inner;

  const isAll = selected.includes(ALL_ID);
  const isActive = open || !isAll;

  const displayText = isAll
    ? label
    : selected.length === 1
    ? options.find((o) => o.id === selected[0])?.label ?? label
    : `${label} · ${selected.length}개 선택`;

  const setSelected = (next: string[]) => {
    if (!controlled) setInner(next);
    onChange?.(next);
  };

  return (
    <div>
      <div className="relative inline-block">
        <button
          ref={anchorRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={resolvedId}
          className={[
            "flex h-10 items-center gap-1 rounded-[10px] py-2.5 pl-3 pr-2 md:h-11 md:pl-4 md:pr-3 border bg-white active:bg-zinc-100",
            isActive
              ? "border-[#7951FF] bg-[#F2EEFF] text-[#7951FF]"
              : "border-gray-300 text-[#353535]",
          ].join(" ")}
        >
          <span
            className={`ds-web-filter ${
              isActive ? "font-bold" : "font-normal"
            }`}
          >
            {displayText}
          </span>
          <img
            alt="드롭다운 아이콘"
            src="https://zighang.com/icon/chevron_right.svg"
            className="h-5 w-5 rotate-90"
          />
        </button>
      </div>

      <PopoverPanel
        open={open}
        label={label}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
        id={resolvedId}
        value={selected}
        onChange={setSelected}
        options={options}
      />
    </div>
  );
}
