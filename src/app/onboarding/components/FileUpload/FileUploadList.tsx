"use client";

import React from "react";
import { FileUploadItem, type UploadedFile } from "./FileUploadItem";

export default function UploadedFileList({
  file,
  onRemove,
  emptyText = "업로드된 파일이 없습니다.",
}: {
  file: UploadedFile;
  onRemove?: (id: string) => void;
  emptyText?: string;
}) {
  if (!file) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500">
        {emptyText}
      </div>
    );
  }

  return (
    <div role="list" className="flex flex-col gap-3">
      <FileUploadItem key={file.id} file={file} onRemove={onRemove} />
    </div>
  );
}
