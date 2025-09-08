import {
  CreateMemoRequest,
  UpdateMemoRequest,
  MemoListResponse,
  MemoResponse,
} from "@/app/_types/memos";

const API_BASE = "/api/memos";

export async function fetchMemos(): Promise<MemoListResponse> {
  const res = await fetch(API_BASE, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function createMemo(
  data: CreateMemoRequest
): Promise<MemoResponse> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function updateMemo(
  memoId: number,
  data: UpdateMemoRequest
): Promise<MemoResponse> {
  const res = await fetch(`${API_BASE}/${memoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function deleteMemo(memoId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${memoId}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
