"use client";

import React from "react";

export interface UploadedFile {
  id: string;
  name: string;
  size?: number;
  url?: string;
  uploadedAt?: string;
}

export function FileUploadItem({
  file,
  onRemove,
}: {
  file: UploadedFile;
  onRemove?: (id: string) => void;
}) {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const isPdf = ext === "pdf";

  return (
    <div
      className="group relative flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm"
      role="listitem"
      aria-label={`${file.name} 업로드됨`}
    >
      <div
        className={[
          "grid h-8 w-8 shrink-0 place-items-center rounded-md border text-xs font-semibold",
          isPdf
            ? "border-rose-200 bg-rose-50 text-rose-600"
            : "border-indigo-200 bg-indigo-50 text-indigo-600",
        ].join(" ")}
        aria-hidden
      >
        {ext.toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium">{file.name}</span>
        </div>

        <div className="mt-2 h-[3px] w-full rounded bg-violet-200">
          <div className="h-[3px] w-full rounded bg-violet-600" />
        </div>

        <p className="mt-1 text-xs text-emerald-600">100% · Success</p>
      </div>

      <div className="ml-2 flex shrink-0 items-center gap-1">
        <button
          type="button"
          aria-label="파일 삭제"
          className="rounded-md p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
          onClick={() => onRemove?.(file.id)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
