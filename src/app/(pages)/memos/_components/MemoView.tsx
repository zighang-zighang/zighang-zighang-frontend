"use client";

import { useState } from "react";
import MemoViewHeader from "./MemoViewHeader";
import MemoContentView from "./MemoContentView";
import { MemoGroup } from "../_types/memoTypes";

interface MemoViewProps {
  selectedMemo?: string | null;
  memoGroups?: MemoGroup[];
}

export default function MemoView({ selectedMemo, memoGroups }: MemoViewProps) {
  const [selectedView, setSelectedView] = useState<"single" | "split">(
    "single"
  );

  return (
    <div className="w-2/3 flex flex-col border border-[#E1E1E4] rounded-r-[8px] h-[600px]">
      <MemoViewHeader
        selectedView={selectedView}
        onViewChange={setSelectedView}
      />

      <div className="flex-1 bg-[#F1F1F5] rounded-br-[8px]">
        <MemoContentView 
          viewMode={selectedView} 
          selectedMemo={selectedMemo} 
          memoGroups={memoGroups}
        />
      </div>
    </div>
  );
}
