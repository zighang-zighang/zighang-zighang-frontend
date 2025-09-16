"use client";

import { useState } from "react";
import MemoList from "./MemoList";
import MemoView from "./MemoView";
import { MemoGroup } from "../_types/memoTypes";
import { useMemoGroups } from "../../../_api/memos/useMemoGroups";

export default function MemoBoard() {
  const [selectedMemoId, setSelectedMemoId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"single" | "split">("single");
  const [leftSelectedMemo, setLeftSelectedMemo] = useState<string | null>(null);
  const [rightSelectedMemo, setRightSelectedMemo] = useState<string | null>(
    null
  );

  const { data: memoGroups = [], isLoading, error } = useMemoGroups();

  const handleMemoSelect = (memoId: string) => {
    if (viewMode === "split") {
      // 스플릿뷰에서는 중복 방지 및 토글 기능
      if (leftSelectedMemo === memoId) {
        // 왼쪽에 선택된 메모를 다시 클릭하면 취소
        setLeftSelectedMemo(null);
      } else if (rightSelectedMemo === memoId) {
        // 오른쪽에 선택된 메모를 다시 클릭하면 취소
        setRightSelectedMemo(null);
      } else if (!leftSelectedMemo) {
        // 왼쪽이 비어있으면 왼쪽에 배치
        setLeftSelectedMemo(memoId);
      } else if (!rightSelectedMemo) {
        // 오른쪽이 비어있으면 오른쪽에 배치
        setRightSelectedMemo(memoId);
      } else {
        // 둘 다 채워져 있으면 왼쪽을 새로운 메모로 교체
        setLeftSelectedMemo(memoId);
      }
    } else {
      // 단일뷰에서는 기존 방식
      setSelectedMemoId(memoId);
    }
  };

  const handleViewChange = (mode: "single" | "split") => {
    setViewMode(mode);
    if (mode === "single") {
      // 단일뷰로 전환할 때 왼쪽 선택된 메모를 메인으로
      if (leftSelectedMemo) {
        setSelectedMemoId(leftSelectedMemo);
      }
      setLeftSelectedMemo(null);
      setRightSelectedMemo(null);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[522px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-gray-600">메모를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[522px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-2">오류가 발생했습니다</p>
          <p className="text-gray-600 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[522px] flex">
      <MemoList
        memoGroups={memoGroups}
        selectedMemoId={selectedMemoId}
        onMemoSelect={handleMemoSelect}
        viewMode={viewMode}
        leftSelectedMemo={leftSelectedMemo}
        rightSelectedMemo={rightSelectedMemo}
      />
      <MemoView
        selectedMemo={selectedMemoId}
        memoGroups={memoGroups}
        viewMode={viewMode}
        onViewChange={handleViewChange}
        leftSelectedMemo={leftSelectedMemo}
        rightSelectedMemo={rightSelectedMemo}
        onLeftMemoChange={setLeftSelectedMemo}
        onRightMemoChange={setRightSelectedMemo}
      />
    </div>
  );
}
