"use client";

import { useCallback, useMemo, useState } from "react";
import {
  useMemos,
  useCreateMemo,
  useUpdateMemo,
  useDeleteMemo,
} from "@/app/_api/memos/useMemos";
import { useQueryClient } from "@tanstack/react-query";
import { fetchMemos } from "@/app/_api/memos/memoApi";
import type { Memo } from "@/app/_types/memos";

export type Note = Memo;

export function useNotes(recruitmentId?: string) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const { data: memosData, isLoading, error } = useMemos(recruitmentId);
  const createMemoMutation = useCreateMemo(recruitmentId);
  const updateMemoMutation = useUpdateMemo(recruitmentId);
  const deleteMemoMutation = useDeleteMemo(recruitmentId);
  const queryClient = useQueryClient();

  const notes = useMemo(() => memosData?.memos ?? [], [memosData]);
  const selected = useMemo(
    () => (selectedId ? notes.find((n) => n.id === selectedId) ?? null : null),
    [notes, selectedId]
  );

  const pickNewest = (list: Memo[]) => {
    if (!list.length) return null;
    const ts = (m: Memo) => new Date(m.updatedAt ?? m.createdAt ?? 0).getTime();
    return [...list].sort((a, b) => ts(b) - ts(a))[0];
  };

  const addNote = useCallback(async () => {
    try {
      await createMemoMutation.mutateAsync({
        title: "제목",
        content: "내용",
        ...(recruitmentId ? { recruitmentId } : {}),
      });

      // 응답에 id가 있으면 바로 선택
      // const createdId =
      //   (res &&
      //     typeof res === "object" &&
      //     "memo" in (res as any) &&
      //     (res as any).memo?.id) ||
      //   (res && typeof (res as any).id === "string" && (res as any).id) ||
      //   null;

      // if (createdId) {
      //   setSelectedId(createdId);
      //   setEditMode(false);
      //   return;
      // }

      // 없으면 스코프 refetch
      const fresh = await queryClient.fetchQuery({
        queryKey: ["memos", { recruitmentId }],
        queryFn: () => fetchMemos(recruitmentId),
        staleTime: 0,
      });

      const newest = pickNewest(fresh.memos ?? []);
      if (newest) {
        setSelectedId(newest.id);
        setEditMode(false);
      } else {
        console.warn("생성은 성공했지만 최신 메모를 찾지 못했습니다.", fresh);
      }
    } catch (e) {
      console.error("addNote 실패!", e);
    }
  }, [createMemoMutation, queryClient, recruitmentId]);

  const deleteNote = useCallback(
    (id: string) => {
      deleteMemoMutation.mutate(id, {
        onSuccess: () => {
          if (selectedId === id) {
            setSelectedId(null);
            setEditMode(false);
          }
        },
        onError: (err) => console.error("deleteNote 실패!", err),
      });
    },
    [selectedId, deleteMemoMutation]
  );

  const openDetail = useCallback((id: string) => {
    setSelectedId(id);
    setEditMode(true);
  }, []);

  const updateContent = useCallback(
    (value: string) => {
      if (!selected) return;
      const [firstLine, ...rest] = value.replace(/\r\n/g, "\n").split("\n");
      const newTitle = (firstLine ?? "").trim();
      const newContent = [firstLine, ...rest].join("\n");
      updateMemoMutation.mutate(
        { memoId: selected.id, data: { title: newTitle, content: newContent } },
        { onError: (err) => console.error("updateContent 실패!", err) }
      );
    },
    [selected, updateMemoMutation]
  );

  const updateTitle = useCallback(
    (id: string, title: string) => {
      const note = notes.find((n) => n.id === id);
      if (!note) return;
      updateMemoMutation.mutate(
        { memoId: id, data: { title, content: note.content } },
        { onError: (err) => console.error("updateTitle 실패!", err) }
      );
    },
    [notes, updateMemoMutation]
  );

  return {
    notes,
    selectedId,
    selected,
    editMode,
    setEditMode,
    isLoading,
    error,
    addNote,
    deleteNote,
    openDetail,
    updateContent,
    updateTitle,
    setSelectedId,
  };
}
