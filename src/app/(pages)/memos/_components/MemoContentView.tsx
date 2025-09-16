import SingleMemoView from "./SingleMemoView";
import SplitMemoView from "./SplitMemoView";
import { MemoGroup } from "../_types/memoTypes";

interface MemoContentViewProps {
  viewMode: "single" | "split";
  selectedMemo?: string | null;
  memoGroups?: MemoGroup[];
  leftSelectedMemo?: string | null;
  rightSelectedMemo?: string | null;
  onLeftMemoChange?: (memoId: string | null) => void;
  onRightMemoChange?: (memoId: string | null) => void;
  onDeleteMemo?: (memoId: string) => void;
  onMemoSelect?: (memoId: string) => void;
}

export default function MemoContentView({
  viewMode,
  selectedMemo,
  memoGroups,
  leftSelectedMemo,
  rightSelectedMemo,
  onLeftMemoChange,
  onRightMemoChange,
  onDeleteMemo,
  onMemoSelect,
}: MemoContentViewProps) {
  return (
    <div className="h-full w-full">
      {viewMode === "single" ? (
        <SingleMemoView 
          selectedMemo={selectedMemo} 
          memoGroups={memoGroups} 
          onDeleteMemo={onDeleteMemo}
          onMemoSelect={onMemoSelect}
        />
      ) : (
        <SplitMemoView 
          memoGroups={memoGroups}
          leftSelectedMemo={leftSelectedMemo}
          rightSelectedMemo={rightSelectedMemo}
          onLeftMemoChange={onLeftMemoChange}
          onRightMemoChange={onRightMemoChange}
          onDeleteMemo={onDeleteMemo}
        />
      )}
    </div>
  );
}
