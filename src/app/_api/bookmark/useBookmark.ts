"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addBookmark, removeBookmark } from "./client";

export function useBookmark(recruitmentId: string | number, initial: boolean) {
  const queryClient = useQueryClient();

  // 1) 현재 상태 구독
  const { data: isBookmarked = initial } = useQuery({
    queryKey: ["bookmark", recruitmentId],
    queryFn: async () => initial,
    initialData: initial,
    staleTime: Infinity,
  });

  const mutation = useMutation({
    mutationFn: async (next: boolean) => {
      if (next) return addBookmark(recruitmentId);
      return removeBookmark(recruitmentId);
    },
    onMutate: async (next) => {
      await queryClient.cancelQueries({
        queryKey: ["bookmark", recruitmentId],
      });
      const prev = queryClient.getQueryData<boolean>([
        "bookmark",
        recruitmentId,
      ]);
      queryClient.setQueryData(["bookmark", recruitmentId], next);
      return { prev };
    },
    onError: (_err, _next, ctx) => {
      if (ctx?.prev !== undefined) {
        queryClient.setQueryData(["bookmark", recruitmentId], ctx.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks:infinite"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarks:ids"] });
      queryClient.invalidateQueries({ queryKey: ["bookmarks:infinite"] });
    },
  });
  return { isBookmarked, ...mutation };
}
