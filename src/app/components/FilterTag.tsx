"use client";

import { useId, useMemo, useRef, useState } from "react";
import { PopoverPanel } from "./PopOver";

export type Option = { id: string; label: string };

type BaseProps = {
  id?: string;
  label: string;
  options: Option[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (next: string[]) => void;
};

type PopoverModeProps = BaseProps & {
  openWithModal?: false | undefined;
};

export default function FilterTagSelect(props: PopoverModeProps) {
  const { id, label, options, value, defaultValue, onChange } = props;

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
          aria-haspopup="menu"
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

      {/* 팝오버 패널 그대로 유지 */}
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

export function FilterTagSelectModalTrigger({
  id,
  label,
  options,
  section,
  value,
  defaultValue,
}: BaseProps & {
  section: import("@/app/hooks/useFilterDialog").FilterSection;
}) {
  const { useFilterDialog } =
    require("@/app/hooks/useFilterDialog") as typeof import("@/app/hooks/useFilterDialog");
  const { openDialog } = useFilterDialog();

  const autoId = useId();
  const resolvedId = id ?? `filter-${autoId}`;
  const ALL_ID = options?.[0]?.id ?? "ALL";
  const computed = (Array.isArray(value) ? value : defaultValue) ?? [ALL_ID];

  const isAll = computed.includes(ALL_ID);
  const isActive = !isAll;

  const displayText = isAll
    ? label
    : computed.length === 1
    ? options.find((o) => o.id === computed[0])?.label ?? label
    : `${label} · ${computed.length}개 선택`;

  return (
    <div className="relative inline-block">
      <button
        type="button"
        id={resolvedId}
        aria-haspopup="dialog"
        onClick={() => openDialog(section)}
        className={[
          "flex h-10 items-center gap-1 rounded-[10px] py-2.5 pl-3 pr-2 md:h-11 md:pl-4 md:pr-3 border bg-white active:bg-zinc-100",
          isActive
            ? "border-[#7951FF] bg-[#F2EEFF] text-[#7951FF]"
            : "border-gray-300 text-[#353535]",
        ].join(" ")}
      >
        <span
          className={`ds-web-filter ${isActive ? "font-bold" : "font-normal"}`}
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
  );
}
