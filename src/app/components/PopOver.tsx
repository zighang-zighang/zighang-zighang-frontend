"use client";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import type { Option } from "./FilterTag";

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

  // md 기준으로 데스크톱/모바일 분기 (훅 없이)
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

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
      } as any);
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

  // 공통 리스트(직행 스타일)
  const List = (
    <div
      className={
        isDesktop
          ? "max-h-[56vh] overflow-y-auto px-4 pb-4 pt-3"
          : "max-h-[60vh] overflow-y-auto px-4 pb-4 pt-3"
      }
    >
      {options?.map((opt) => {
        const checked =
          opt.id === ALL_ID ? isAll : value.includes(opt.id) && !isAll;
        return (
          <label
            key={opt.id}
            className={[
              "mb-3 flex items-center gap-3 rounded-2xl border border-[#EDEDED] bg-white px-4 py-3",
              checked ? "bg-[#F7F5FF] border-[#E3D9FF]" : "",
              "cursor-pointer",
            ].join(" ")}
          >
            <input
              type="checkbox"
              className="h-5 w-5 accent-[#6F3FF5]"
              checked={checked}
              onChange={() => toggle(opt.id)}
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
        {List}
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
        {List}
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
