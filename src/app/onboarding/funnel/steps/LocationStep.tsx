export function LocationStep({
  onSubmit,
  onBack,
}: {
  onSubmit: (지역: string) => void;
  onBack: () => void;
}) {
  return (
    <div>
      지역 선택
      <button onClick={onBack}>이전</button>
      <button onClick={() => onSubmit("서울")}>완료</button>
    </div>
  );
}


