"use client";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { Option } from "./FilterTag";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import FilterOptionList from "../../components/Filter/FilterOptionList";
export function PopoverPanel({
  open,
  label,
  onClose,
  anchorEl, // 데스크톱에서 바깥 클릭 판별용
  id,
  value,
  onChange,
  options,
}: {
  open: boolean;
  label: string;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  id: string;
  value: string[];
  onChange: (next: string[]) => void;
  options: Option[];
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // 훅으로 생성 따로 분기
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const path = (e.composedPath?.() ?? []) as EventTarget[];
      const inPanel = panelRef.current
        ? path.includes(panelRef.current)
        : false;
      if (isDesktop) {
        const inAnchor = anchorEl ? path.includes(anchorEl) : false;
        if (!inPanel && !inAnchor) onClose();
      } else {
        if (!inPanel) onClose();
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("pointerdown", onDown, { capture: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown, {
        capture: true,
      });
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, anchorEl, isDesktop]);

  useEffect(() => {
    if (!open || isDesktop) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, isDesktop]);

  if (!open) return null;

  const ALL_ID = options?.[0]?.id ?? "ALL";
  const isAll = value.includes(ALL_ID);
  const toggle = (id: string) => {
    if (id === ALL_ID) return onChange([ALL_ID]);
    const set = new Set(value.filter((v) => v !== ALL_ID));
    set.has(id) ? set.delete(id) : set.add(id);
    onChange(set.size === 0 ? [ALL_ID] : [...set]);
  };

  // 데스크톱
  if (isDesktop) {
    return (
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="absolute left-0 top-[calc(100%+8px)] z-50 w-[min(32rem,calc(100vw-2rem))] rounded-2xl border border-[#EDEDED] bg-white shadow-[0_12px_40px_0_rgba(0,0,0,0.12)]"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="px-4 pt-4 pb-1">
          <div className="text-[15px] font-bold text-[#111]">{label}</div>
          <div className="mt-1 text-[12px] text-neutral-500">
            중복 선택 가능
          </div>
        </div>
        <FilterOptionList
          options={options}
          value={value}
          isAll={isAll}
          onToggle={toggle}
          isDesktop={isDesktop}
          allId={ALL_ID}
        />
        <div className="sticky bottom-0 z-10 bg-white p-4">
          <button
            type="button"
            onClick={onClose}
            className="h-12 w-full rounded-2xl bg-[#6F3FF5] text-[16px] font-bold text-white"
          >
            완료
          </button>
        </div>
      </div>
    );
  }

  // 모바일
  return createPortal(
    <>
      <div
        className="fixed bottom-0 left-0 h-screen w-screen inset-0 z-[9998] bg-black/30"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={[
          "fixed inset-x-0 bottom-0 z-[9999] w-full rounded-t-2xl border border-[#EDEDED] bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.12)]",
          "translate-y-0 transition-transform duration-300 ease-out",
        ].join(" ")}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="px-4 pt-4 pb-1">
          <div className="text-[15px] font-bold text-[#111]">{label}</div>
          <div className="mt-1 text-[12px] text-neutral-500">
            중복 선택 가능
          </div>
        </div>
        <FilterOptionList
          options={options}
          value={value}
          isAll={isAll}
          onToggle={toggle}
          isDesktop={isDesktop}
          allId={ALL_ID}
        />
        <div className="sticky bottom-0 z-10 bg-white p-4">
          <button
            type="button"
            onClick={onClose}
            className="h-12 w-full rounded-2xl bg-[#6F3FF5] text-[16px] font-bold text-white"
          >
            완료
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
