import React from "react";
import dynamic from "next/dynamic";
import { onboardingJobCategories } from "@/app/constants/onboardingJobCategories";

const LoadingChip = () => (
  <div className="w-[28px] h-[28px] rounded-full bg-gray-200 animate-pulse" />
);

const chipMap = {
  DesignChip: dynamic(
    () => import("../../jobChip/DesignChip").then((m) => m.DesignChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  GameChip: dynamic(
    () => import("../../jobChip/GameChip").then((m) => m.GameChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  AiChip: dynamic(() => import("../../jobChip/AiChip").then((m) => m.AiChip), {
    loading: () => <LoadingChip />,
    ssr: false,
  }),
  ITChip: dynamic(() => import("../../jobChip/ITChip").then((m) => m.ITChip), {
    loading: () => <LoadingChip />,
    ssr: false,
  }),
  StrategyChip: dynamic(
    () => import("../../jobChip/StrategyChip").then((m) => m.StrategyChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  ServiceChip: dynamic(
    () => import("../../jobChip/ServiceChip").then((m) => m.ServiceChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  EduChip: dynamic(
    () => import("../../jobChip/EduChip").then((m) => m.EduChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  TMChip: dynamic(() => import("../../jobChip/TMChip").then((m) => m.TMChip), {
    loading: () => <LoadingChip />,
    ssr: false,
  }),
  MediaChip: dynamic(
    () => import("../../jobChip/MediaChip").then((m) => m.MediaChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  MedicalChip: dynamic(
    () => import("../../jobChip/MedicalChip").then((m) => m.MedicalChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  FoodChip: dynamic(
    () => import("../../jobChip/FoodChip").then((m) => m.FoodChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  WelfareChip: dynamic(
    () => import("../../jobChip/WelfareChip").then((m) => m.WelfareChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  MarketingChip: dynamic(
    () => import("../../jobChip/MarketingChip").then((m) => m.MarketingChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  ProductChip: dynamic(
    () => import("../../jobChip/ProductChip").then((m) => m.ProductChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  SalesChip: dynamic(
    () => import("../../jobChip/SalesChip").then((m) => m.SalesChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  BankingChip: dynamic(
    () => import("../../jobChip/BankingChip").then((m) => m.BankingChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  ConstructionChip: dynamic(
    () =>
      import("../../jobChip/ConstructionChip").then((m) => m.ConstructionChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  FinanceChip: dynamic(
    () => import("../../jobChip/FinanceChip").then((m) => m.FinanceChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  HRChip: dynamic(() => import("../../jobChip/HRChip").then((m) => m.HRChip), {
    loading: () => <LoadingChip />,
    ssr: false,
  }),
  LegalChip: dynamic(
    () => import("../../jobChip/LegalChip").then((m) => m.LegalChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  LogisticsChip: dynamic(
    () => import("../../jobChip/LogisticsChip").then((m) => m.LogisticsChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  ManufacturingChip: dynamic(
    () =>
      import("../../jobChip/ManufacturingChip").then(
        (m) => m.ManufacturingChip
      ),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  RNDChip: dynamic(
    () => import("../../jobChip/RNDChip").then((m) => m.RNDChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  SecuritiesChip: dynamic(
    () => import("../../jobChip/SecuritiesChip").then((m) => m.SecuritiesChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
  TradeChip: dynamic(
    () => import("../../jobChip/TradeChip").then((m) => m.TradeChip),
    { loading: () => <LoadingChip />, ssr: false }
  ),
} as const;

function SelectedJobGroupChipsComponent({
  selectedJobGroups,
  active,
  onSelect,
}: {
  selectedJobGroups: string[];
  active?: string;
  onSelect?: (name: string) => void;
}) {
  const chips = selectedJobGroups
    .map((name) => onboardingJobCategories.find((c) => c.name === name))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((c) => ({
      key: c.name,
      Chip: chipMap[c.chip as keyof typeof chipMap],
    }))
    .filter((x) => Boolean(x.Chip));

  if (chips.length === 0) return null;

  return (
    <div className="flex items-center mb-6">
      {chips.map(({ key, Chip }, index) => {
        const isLast = index === chips.length - 1;
        const content = (
          <>
            <Chip isSelected={active === key} />
            {!isLast && (
              <div className="w-[6px] h-[2px] bg-[#AAAAAD]"></div>
            )}
          </>
        );
        return (
          <div key={key} className="flex items-center">
            {content}
          </div>
          
        );
      })}
    </div>
  );
}

export const SelectedJobGroupChips = React.memo(SelectedJobGroupChipsComponent);
