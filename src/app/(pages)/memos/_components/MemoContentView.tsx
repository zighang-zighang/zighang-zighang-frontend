import SingleMemoView from "./SingleMemoView";
import SplitMemoView from "./SplitMemoView";
import { MemoGroup } from "../_types/memoTypes";

interface MemoContentViewProps {
  viewMode: "single" | "split";
  selectedMemo?: string | null;
  memoGroups?: MemoGroup[];
}

export default function MemoContentView({
  viewMode,
  selectedMemo,
  memoGroups,
}: MemoContentViewProps) {
  return (
    <div className="h-full w-full">
      {viewMode === "single" ? (
        <SingleMemoView selectedMemo={selectedMemo} memoGroups={memoGroups} />
      ) : (
        <SplitMemoView />
      )}
    </div>
  );
}
