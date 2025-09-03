import {
  DesignChip,
  GameChip,
  AiChip,
  ITChip,
  StrategyChip,
  ServiceChip,
  EduChip,
  TMChip,
  MediaChip,
  MedicalChip,
  FoodChip,
  WelfareChip,
  MarketingChip,
  ProductChip,
  SalesChip,
  BankingChip,
  ConstructionChip,
  FinanceChip,
  HRChip,
  LegalChip,
  LogisticsChip,
  ManufacturingChip,
  RNDChip,
  SecuritiesChip,
  TradeChip,
} from "../../jobChip";

export function JobStep({
  jobGroup,
  onNext,
  onBack,
}: {
  jobGroup: string;
  onNext: (직무: string) => void;
  onBack: () => void;
}) {
  const chips = [
    { Component: DesignChip, name: "디자인" },
    { Component: GameChip, name: "게임" },
    { Component: AiChip, name: "AI" },
    { Component: ITChip, name: "IT" },
    { Component: StrategyChip, name: "기획전략" },
    { Component: ServiceChip, name: "서비스" },
    { Component: EduChip, name: "교육" },
    { Component: TMChip, name: "TM" },
    { Component: MediaChip, name: "미디어" },
    { Component: MedicalChip, name: "의료" },
    { Component: FoodChip, name: "식품" },
    { Component: WelfareChip, name: "공공복지" },
    { Component: MarketingChip, name: "마케팅" },
    { Component: ProductChip, name: "상품기획" },
    { Component: SalesChip, name: "영업" },
    { Component: BankingChip, name: "은행" },
    { Component: ConstructionChip, name: "건설" },
    { Component: FinanceChip, name: "회계재무" },
    { Component: HRChip, name: "HR" },
    { Component: LegalChip, name: "법률법무" },
    { Component: LogisticsChip, name: "운송배송" },
    { Component: ManufacturingChip, name: "생산" },
    { Component: RNDChip, name: "R&D" },
    { Component: SecuritiesChip, name: "증권" },
    { Component: TradeChip, name: "무역" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">직무 선택 (직군: {jobGroup})</h2>

      <div className="grid grid-cols-5 gap-4 mb-8">
        {chips.map(({ Component, name }, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="text-sm font-medium text-gray-700">{name}</div>
            <div className="flex space-x-2">
              <Component isSelected={false} width={32} height={32} />
              <Component isSelected={true} width={32} height={32} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          이전
        </button>
        <button
          onClick={() => onNext("프론트엔드")}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          다음
        </button>
      </div>
    </div>
  );
}
