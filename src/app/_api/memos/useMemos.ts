import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchMemos, createMemo, updateMemo, deleteMemo } from "./memoApi";

// 메모 목록 조회
export function useMemos(recruitmentId?: string) {
  return useQuery({
    queryKey: ["memos", { recruitmentId }],
    queryFn: () => fetchMemos(recruitmentId),
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
  });
}

// 메모 생성
export function useCreateMemo(recruitmentId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; content: string }) =>
      createMemo(data, recruitmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memos", { recruitmentId }] });
    },
  });
}

// 메모 수정
export function useUpdateMemo(recruitmentId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memoId,
      data,
    }: {
      memoId: string;
      data: { title: string; content: string };
    }) => updateMemo(memoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memos", { recruitmentId }] });
    },
  });
}

// 메모 삭제
export function useDeleteMemo(recruitmentId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memoId: string) => deleteMemo(memoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memos", { recruitmentId }] });
    },
  });
}
