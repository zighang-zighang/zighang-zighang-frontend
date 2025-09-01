export function JobCategoryFunnel({ onNext }: { onNext: (직군: string) => void }) {
  return (
    <div>
      직군 선택
      <button onClick={() => onNext("개발")}>다음</button>
    </div>
  );
}


