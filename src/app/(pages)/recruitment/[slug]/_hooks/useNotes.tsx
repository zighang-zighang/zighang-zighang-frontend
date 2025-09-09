"use client";

import { useCallback, useMemo, useState, useEffect, useRef } from "react";
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

const AUTOSAVE_DEBOUNCE_MS = 600;

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

  const [draft, setDraft] = useState<string>("");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");

  // 선택 변경 시 draft 동기화
  useEffect(() => {
    const next = selected?.content ?? "";
    setDraft(next);
    lastSentRef.current = next;
    setSaveStatus("idle");
  }, [selected?.id, selected?.content]);

  // 최신/중복 전송 방지
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSentRef = useRef<string>("");

  // 제목 디바운스용 레퍼런스
  const titleTimersRef = useRef<
    Record<string, ReturnType<typeof setTimeout> | undefined>
  >({});
  const lastSentTitleRef = useRef<Record<string, string>>({});

  const pickNewest = (list: Memo[]) => {
    if (!list.length) return null;
    const ts = (m: Memo) => new Date(m.updatedAt ?? m.createdAt ?? 0).getTime();
    return [...list].sort((a, b) => ts(b) - ts(a))[0];
  };

  // 메모추가
  const addNote = useCallback(async () => {
    try {
      await createMemoMutation.mutateAsync({
        title: "제목",
        content: "내용",
        ...(recruitmentId ? { recruitmentId } : {}),
      });

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

  // 메모 삭제
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

  /** draft만 갱신 , 저장은 디바운스 이펙트에서 처리 */
  const updateContent = useCallback((value: string) => {
    setDraft(value);
  }, []);

  // 디바운스
  useEffect(() => {
    if (!selected) return;
    const serverContent = selected.content ?? "";

    if (draft === serverContent || draft === lastSentRef.current) {
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);

    setSaveStatus("saving");

    debounceRef.current = setTimeout(() => {
      if (draft === serverContent || draft === lastSentRef.current) {
        setSaveStatus("idle");
        return;
      }

      const [firstLine, ...rest] = draft.replace(/\r\n/g, "\n").split("\n");
      const newTitle = (firstLine ?? "").trim();
      const newContent = [firstLine, ...rest].join("\n");

      updateMemoMutation.mutate(
        { memoId: selected.id, data: { title: newTitle, content: newContent } },
        {
          onSuccess: () => {
            lastSentRef.current = draft;
            setSaveStatus("success");
          },
          onError: () => {
            setSaveStatus("error");
          },
        }
      );
    }, AUTOSAVE_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [draft, selected?.id, updateMemoMutation]);

  //본문 즉시 저장
  const flushDraft = useCallback(async () => {
    if (!selected) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    const serverContent = selected.content ?? "";

    if (draft === lastSentRef.current || draft === serverContent) {
      return;
    }

    const [firstLine, ...rest] = draft.replace(/\r\n/g, "\n").split("\n");
    const newTitle = (firstLine ?? "").trim();
    const newContent = [firstLine, ...rest].join("\n");

    try {
      await updateMemoMutation.mutateAsync({
        memoId: selected.id,
        data: { title: newTitle, content: newContent },
      });

      lastSentRef.current = draft;
      setSaveStatus("success");
    } catch (err) {
      setSaveStatus("error");
    }
  }, [draft, selected?.id, updateMemoMutation]);

  // 본문 편집
  const openDetail = useCallback((id: string) => {
    setSelectedId(id);
    setEditMode(true);
  }, []);

  //제목 수정
  const updateTitle = useCallback(
    (id: string, title: string) => {
      // 타이머 초기화
      const t = titleTimersRef.current[id];
      if (t) clearTimeout(t);

      // 디바운스 타이머 설정
      titleTimersRef.current[id] = setTimeout(() => {
        const note = notes.find((n) => n.id === id);
        if (!note) return;

        // 중복 전송 방지
        if (lastSentTitleRef.current[id] === title) return;

        updateMemoMutation.mutate(
          { memoId: id, data: { title, content: note.content } },
          {
            onSuccess: () => {
              lastSentTitleRef.current[id] = title;
            },
            onError: (err) => {
              console.error("updateTitle(디바운스) 실패!", err);
            },
          }
        );
      }, 300);
    },
    [notes, updateMemoMutation]
  );

  // 제목 즉시 저장
  const flushTitle = useCallback(
    (id: string, title: string) => {
      // 타이머 제거
      const t = titleTimersRef.current[id];
      if (t) clearTimeout(t);

      const note = notes.find((n) => n.id === id);
      if (!note) return;

      if (lastSentTitleRef.current[id] === title) return;

      updateMemoMutation.mutate(
        { memoId: id, data: { title, content: note.content } },
        {
          onSuccess: () => {
            lastSentTitleRef.current[id] = title;
          },
          onError: (err) => {
            console.error("flushTitle 실패!", err);
          },
        }
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
    flushDraft,
    updateTitle,
    flushTitle,
    setSelectedId,
    draft,
    saveStatus,
  };
}
