"use client";

import React from "react";
import { FileUploadItem } from "./FileUploadItem";
import { UploadedFileProps } from "./types/type";

export default function FileUploadList(props: UploadedFileProps) {
  const { file, onRemove } = props;

  return !file ? (
    <div className="flex h-20 w-full max-w-[526px] items-center justify-center rounded-xl border border-dashed border-zinc-300">
      <p className="text-center text-sm text-zinc-500">파일이 없습니다.</p>
    </div>
  ) : (
    <FileUploadItem key={file.id} file={file} onRemove={onRemove} {...props} />
  );
}
