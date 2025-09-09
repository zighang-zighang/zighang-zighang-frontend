"use client";

import React from "react";
import Picker from "react-mobile-picker";
import {
  StepContainer,
  StepHeader,
  StepActions,
  SecondaryButton,
  ActionButton,
} from "../../_components";
const MIN_EXPERIENCE_YEARS = 0; // 0=신입
const DEFAULT_EXPERIENCE_YEARS = 1; // 초기 표시 값
const MAX_EXPERIENCE_YEARS = 10; // 10년+
const ITEM_HEIGHT_PX = 40; // 각 아이템 높이
const VIEWPORT_HEIGHT_PX = 160; // 뷰포트 높이(가운데 1개를 선택 영역으로)

export function ExperienceStep({
  onNext,
  onBack,
}: {
  onNext: (경력: number) => void;
  onBack: () => void;
}) {
  const [selectedYears, setSelectedYears] = React.useState<number>(
    DEFAULT_EXPERIENCE_YEARS
  );
  const pickerValue = React.useMemo(
    () => ({ years: String(selectedYears) }),
    [selectedYears]
  );

  // 화면(휠 바깥) 스와이프로 연차 변경을 위한 refs
  const pickerAreaRef = React.useRef<HTMLDivElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const touchStartYRef = React.useRef<number | null>(null);
  const accumDeltaRef = React.useRef(0);
  const lastTickRef = React.useRef<number>(0);
  const SWIPE_STEP_PX = 50; // 1년 변화 기준 거리
  const SWIPE_COOLDOWN_MS = 80; // 연속 변화 쿨다운
  // 마우스 드래그용
  const pointerStartYRef = React.useRef<number | null>(null);
  const pointerActiveRef = React.useRef(false);
  const stopPointerDrag = (e?: React.PointerEvent<HTMLDivElement>) => {
    try {
      (e?.currentTarget as Element & { releasePointerCapture?: any })?.releasePointerCapture?.(
        (e as React.PointerEvent<HTMLDivElement>)?.pointerId
      );
    } catch {}
    pointerActiveRef.current = false;
    pointerStartYRef.current = null;
    accumDeltaRef.current = 0;
  };

  const options = React.useMemo(
    () => Array.from({ length: MAX_EXPERIENCE_YEARS - MIN_EXPERIENCE_YEARS + 1 }, (_, i) => i + MIN_EXPERIENCE_YEARS),
    []
  );

  const handlePickerChange = (next: { years: string }) => {
    const value = Number(next?.years ?? DEFAULT_EXPERIENCE_YEARS);
    setSelectedYears(value);
  };

  const canProceed = true; // 기본값 선택(1년)으로 바로 진행 가능
  const handleNext = () => onNext(selectedYears);

  // 화면 스와이프(휠 바깥에서만 동작)
  const onTouchStartPage: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (pickerAreaRef.current && pickerAreaRef.current.contains(e.target as Node)) return;
    touchStartYRef.current = e.touches[0].clientY;
    accumDeltaRef.current = 0;
    lastTickRef.current = performance.now();
  };
  const onTouchMovePage: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (pickerAreaRef.current && pickerAreaRef.current.contains(e.target as Node)) return;
    if (touchStartYRef.current == null) return;
    const now = performance.now();
    if (now - lastTickRef.current < SWIPE_COOLDOWN_MS) return;
    const currentY = e.touches[0].clientY;
    const dy = currentY - touchStartYRef.current;
    touchStartYRef.current = currentY;
    accumDeltaRef.current += dy;

    // 위로 스와이프(음수): +1년
    while (accumDeltaRef.current <= -SWIPE_STEP_PX && selectedYears < MAX_EXPERIENCE_YEARS) {
      setSelectedYears((y) => Math.min(MAX_EXPERIENCE_YEARS, y + 1));
      accumDeltaRef.current += SWIPE_STEP_PX;
      lastTickRef.current = now;
    }
    // 아래로 스와이프(양수): -1년
    while (accumDeltaRef.current >= SWIPE_STEP_PX && selectedYears > MIN_EXPERIENCE_YEARS) {
      setSelectedYears((y) => Math.max(MIN_EXPERIENCE_YEARS, y - 1));
      accumDeltaRef.current -= SWIPE_STEP_PX;
      lastTickRef.current = now;
    }
  };
  const onTouchEndPage: React.TouchEventHandler<HTMLDivElement> = () => {
    touchStartYRef.current = null;
    accumDeltaRef.current = 0;
  };

  // 마우스 드래그로 연차 변경 (휠 내부 제외)
  const onPointerDownPage: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (e.pointerType === "touch") return; // 터치는 기존 핸들러 사용
    // 마우스 드래그: 휠 영역 포함 전체에서 동작
    try { (e.currentTarget as Element & { setPointerCapture?: any }).setPointerCapture?.(e.pointerId); } catch {}
    e.preventDefault();
    containerRef.current = e.currentTarget;
    pointerActiveRef.current = true;
    pointerStartYRef.current = e.clientY;
    accumDeltaRef.current = 0;
    lastTickRef.current = performance.now();
  };
  const onPointerMovePage: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!pointerActiveRef.current || e.pointerType === "touch") return;
    // 영역 이탈 시 드래그 종료
    const rect = containerRef.current?.getBoundingClientRect();
    if (
      rect &&
      (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)
    ) {
      stopPointerDrag(e);
      return;
    }
    const now = performance.now();
    if (now - lastTickRef.current < SWIPE_COOLDOWN_MS) return;
    const currentY = e.clientY;
    const dy = currentY - (pointerStartYRef.current ?? currentY);
    pointerStartYRef.current = currentY;
    accumDeltaRef.current += dy;

    while (accumDeltaRef.current <= -SWIPE_STEP_PX && selectedYears < MAX_EXPERIENCE_YEARS) {
      setSelectedYears((y) => Math.min(MAX_EXPERIENCE_YEARS, y + 1));
      accumDeltaRef.current += SWIPE_STEP_PX;
      lastTickRef.current = now;
    }
    while (accumDeltaRef.current >= SWIPE_STEP_PX && selectedYears > MIN_EXPERIENCE_YEARS) {
      setSelectedYears((y) => Math.max(MIN_EXPERIENCE_YEARS, y - 1));
      accumDeltaRef.current -= SWIPE_STEP_PX;
      lastTickRef.current = now;
    }
  };
  const onPointerUpPage: React.PointerEventHandler<HTMLDivElement> = (e) => {
    stopPointerDrag(e);
  };
  const onPointerLeavePage: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!pointerActiveRef.current) return;
    stopPointerDrag(e);
  };
  const onPointerCancelPage: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!pointerActiveRef.current) return;
    stopPointerDrag(e);
  };

  return (
    <StepContainer>
      <StepHeader
        title="가고 싶은 직군의 경력이 어떻게 되세요?"
        stepNumber={2}
        totalSteps={4}
        onBack={onBack}
      />

      <div
        className="w-full flex flex-col items-center h-[calc(500px-55px)] select-none"
        onTouchStart={onTouchStartPage}
        onTouchMove={onTouchMovePage}
        onTouchEnd={onTouchEndPage}
        onPointerDown={onPointerDownPage}
        onPointerMove={onPointerMovePage}
        onPointerUp={onPointerUpPage}
        onPointerLeave={onPointerLeavePage}
        onPointerCancel={onPointerCancelPage}
        ref={containerRef}
      >
        {/* 선택 영역 */}
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-Heading3-18sb text-black">내 경력은</span>

            {/* 스와이프 휠 */}
            <div className="relative" ref={pickerAreaRef}>
              {/* 가운데 선택 가이드 라인 */}
              <div
                className="pointer-events-none absolute left-0 right-0 top-1/2 -translate-y-1/2 rounded-[8px] border border-[#7951FF]"
                style={{ height: ITEM_HEIGHT_PX }}
              />

              {/* 상/하단 페이드 마스크 */}
              <div className="pointer-events-none absolute left-0 right-0 top-0 h-[40px]" style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))"
              }} />
              <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-[40px]" style={{
                background: "linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))"
              }} />

              <div className="w-[140px] rounded-[8px] bg-white">
                <Picker
                  value={pickerValue}
                  onChange={handlePickerChange}
                  height={VIEWPORT_HEIGHT_PX}
                  itemHeight={ITEM_HEIGHT_PX}
                  wheelMode="normal"
                >
                  <Picker.Column name="years">
                    {options.map((opt: number) => (
                      <Picker.Item key={opt} value={String(opt)}>
                        {({ selected }: { selected: boolean }) => (
                          <div
                            className={`flex items-center justify-center select-none text-Heading3-18sb ${
                              selected ? "text-[#7951FF]" : "text-[#303030]"
                            }`}
                            style={{ height: ITEM_HEIGHT_PX }}
                          >
                            {opt === 0 ? "신입" : `${opt}년 이상`}
                          </div>
                        )}
                      </Picker.Item>
                    ))}
                  </Picker.Column>
                </Picker>
              </div>
            </div>

            <span className="text-Heading3-18sb text-black">이다.</span>
          </div>

          {/* 안내 배지 */}
          <div className="mt-2 px-4 py-2 rounded-[10px] bg-white border border-[#E5D8FF] shadow-[0_4px_12px_rgba(121,81,255,0.15)] text-[#6B47E6] text-Body2-14m">
            ✨ 경력 {selectedYears === 0 ? 0 : selectedYears}년 이상은 직행에서 <span className="underline">180개 공고</span>를 보유하고 있어요!
          </div>
        </div>

        {/* 하단 액션 */}
        <StepActions className="h-full flex items-end pb-[30px]">
          <SecondaryButton onClick={onBack}>이전</SecondaryButton>
          <ActionButton onClick={handleNext} state={canProceed ? "abled" : "disabled"}>
            다음
          </ActionButton>
        </StepActions>
      </div>
    </StepContainer>
  );
}

