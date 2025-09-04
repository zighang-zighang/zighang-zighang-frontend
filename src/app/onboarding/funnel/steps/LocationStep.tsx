"use client";
import { useState, useCallback, useMemo } from "react";
import type { RegionValue } from "@/app/onboarding/context/regionTypes";
import React from "react";
import {
  StepContainer,
  StepHeader,
  StepActions,
  ActionButton,
} from "../../components";
import { Map } from "../../components/Map/Map";
import RegionButtonList from "../../components/RegionButton/RegionButtonList";
import { SIDO_GEO } from "@/app/onboarding/context/map";

export function LocationStep({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: (지역: string) => void;
}) {
  const [region, setRegion] = useState<RegionValue | null>(null);
  const INVALIDS: RegionValue[] = ["전체", "해외"];

  const isValid = useMemo(
    () => !!region && !INVALIDS.includes(region),
    [region]
  );

  const handleSelect = useCallback(
    (next: Exclude<RegionValue, "전체" | "해외">) => {
      setRegion(next);
    },
    []
  );
  const handleChange = useCallback((next: RegionValue) => {
    setRegion(next);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!isValid || !region) return;
    onSubmit(region);
  }, [isValid, region, onSubmit]);

  return (
    <StepContainer>
      <StepHeader
        title="원하는 근무 지역이 어떻게 되세요?"
        stepNumber={5}
        totalSteps={5}
      />
      <div className="flex items-center justify-center mt-6">
        <Map
          geographies={SIDO_GEO}
          value={region}
          onSelect={handleSelect}
        ></Map>
        <div className="flex flex-col gap-2">
          <RegionButtonList
            value={region}
            onChange={(next) => handleChange(next)}
          ></RegionButtonList>
          <StepActions>
            <ActionButton onClick={handleSubmit}>다음</ActionButton>
          </StepActions>
        </div>
      </div>
    </StepContainer>
  );
}
