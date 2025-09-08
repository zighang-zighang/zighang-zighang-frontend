"use client";

import { useCallback, useMemo, useState } from "react";
import {
  useMemos,
  useCreateMemo,
  useUpdateMemo,
  useDeleteMemo,
} from "@/app/_api/memos/useMemos";
import { Memo } from "@/app/_types/memos";

export type Note = Memo;

export function useNotes() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);

  const { data: memosData, isLoading, error } = useMemos();
  const createMemoMutation = useCreateMemo();
  const updateMemoMutation = useUpdateMemo();
  const deleteMemoMutation = useDeleteMemo();

  const notes = useMemo(() => memosData?.memos ?? [], [memosData]);

  const selected = useMemo(
    () => notes.find((n) => n.id === selectedId) ?? null,
    [notes, selectedId]
  );

  const addNote = useCallback(() => {
    createMemoMutation.mutate(
      { title: "", content: "" },
      {
        onSuccess: (response) => {
          setSelectedId(response.memo.id);
          setEditMode(true);
        },
      }
    );
  }, [createMemoMutation]);

  const deleteNote = useCallback(
    (id: number) => {
      deleteMemoMutation.mutate(id, {
        onSuccess: () => {
          if (selectedId === id) {
            setSelectedId(null);
            setEditMode(false);
          }
        },
      });
    },
    [selectedId, deleteMemoMutation]
  );

  const openDetail = useCallback((id: number) => {
    setSelectedId(id);
    setEditMode(true);
  }, []);

  const updateContent = useCallback(
    (value: string) => {
      if (!selected) return;
      const [firstLine, ...rest] = value.replace(/\r\n/g, "\n").split("\n");
      const newTitle = (firstLine ?? "").trim();
      const newContent = [firstLine, ...rest].join("\n");

      updateMemoMutation.mutate({
        memoId: selected.id,
        data: { title: newTitle, content: newContent },
      });
    },
    [selected, updateMemoMutation]
  );

  const updateTitle = useCallback(
    (id: number, title: string) => {
      const note = notes.find((n) => n.id === id);
      if (!note) return;

      updateMemoMutation.mutate({
        memoId: id,
        data: { title, content: note.content },
      });
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
