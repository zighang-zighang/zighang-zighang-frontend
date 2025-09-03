export function JobStep({
  jobGroup,
  onNext,
  onBack,
}: {
  jobGroup: string;
  onNext: (직무: string) => void;
  onBack: () => void;
}) {
  return (
    <div>
      직무 선택 (직군: {jobGroup})
      <button onClick={onBack}>이전</button>
      <button onClick={() => onNext("프론트엔드")}>다음</button>
    </div>
  );
}


