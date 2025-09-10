"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { GetRecruitmentsResponse } from "@/app/(pages)/recruitment/[slug]/_types/types";

const ACCESS_TOKEN_KEY = "zh_access_token";
const API_BASE = "/api/bookmarks";

function getAccessToken(): string | null {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
}

// 북마크 id 목록 응답 타입들
type BookmarkIdsResponse =
  | { data?: { ids?: Array<string | number> } }
  | { ids?: Array<string | number> }
  | Array<string | number>;

async function apiFetch(url: string, init: RequestInit = {}) {
  const token = getAccessToken();
  const headers: HeadersInit = {
    Accept: "application/json",
    ...(init.headers ?? {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    ...init,
    headers,
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) {
    if (res.status === 401) throw new Error("UNAUTHORIZED");
    throw new Error(`HTTP ${res.status}`);
  }
  return res;
}

// 북마크 목록
export async function fetchBookmarksClient({
  page = 0,
  size = 20,
}: { page?: number; size?: number } = {}): Promise<GetRecruitmentsResponse> {
  const qs = new URLSearchParams({ page: String(page), size: String(size) });
  const res = await apiFetch(`${API_BASE}?${qs.toString()}`, { method: "GET" });
  return res.json();
}

// 북마크 무한
export function useInfiniteBookmarks(
  params: { page?: number; size?: number } = {}
) {
  return useInfiniteQuery({
    queryKey: ["bookmarks:infinite", params],
    queryFn: ({ pageParam }) =>
      fetchBookmarksClient({ page: pageParam ?? 0, size: params.size ?? 20 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const current = lastPage?.data?.page?.page ?? 0;
      const totalPage = lastPage?.data?.page?.totalPage ?? 0;
      const hasNext = current + 1 < totalPage;
      return hasNext ? current + 1 : undefined;
    },
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}
function hasIds(v: unknown): v is { ids: Array<string | number> } {
  return isRecord(v) && Array.isArray((v as { ids?: unknown }).ids);
}
function hasDataWithIds(
  v: unknown
): v is { data: { ids: Array<string | number> } } {
  return (
    isRecord(v) &&
    isRecord((v as { data?: unknown }).data) &&
    Array.isArray((v as { data: { ids?: unknown } }).data.ids)
  );
}

// 북마크된 것만 조회
export async function fetchBookmarkIds(): Promise<number[]> {
  const res = await apiFetch(`${API_BASE}/ids`, { method: "GET" });
  const json: BookmarkIdsResponse = await res.json();

  let raw: Array<string | number> = [];

  if (Array.isArray(json)) {
    raw = json;
  } else if (hasDataWithIds(json)) {
    raw = json.data.ids;
  } else if (hasIds(json)) {
    raw = json.ids;
  }

  return raw.map((x) => Number(x));
}

export function useBookmarkIds(enabled = true) {
  return useQuery({
    queryKey: ["bookmarks:ids"],
    queryFn: fetchBookmarkIds,
    enabled, // 로그인 안 된 경우 false로 꺼두기
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });
}
