"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMemos, createMemo, updateMemo, deleteMemo } from "./memoApi";
import { UpdateMemoRequest } from "@/app/_types/memos";

export function useMemos() {
  return useQuery({
    queryKey: ["memos"],
    queryFn: fetchMemos,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}

export function useCreateMemo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memos"] });
    },
  });
}

export function useUpdateMemo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memoId,
      data,
    }: {
      memoId: number;
      data: UpdateMemoRequest;
    }) => updateMemo(memoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memos"] });
    },
  });
}

export function useDeleteMemo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMemo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memos"] });
    },
  });
}
