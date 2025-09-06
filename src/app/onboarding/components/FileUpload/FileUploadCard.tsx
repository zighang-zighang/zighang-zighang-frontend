"use client";

import { useCallback, useId, useRef, useState } from "react";

type Props = {
  onFiles?: (files: File[]) => void;
  onError?: (message: string) => void;
  multiple?: boolean;
  accept?: string;
  maxSizeMB?: number;
  disabled?: boolean;
};

export default function FileUploadCard({
  onFiles,
  onError,
  multiple = false,
  accept,
  maxSizeMB = 10,
  disabled = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setDragging] = useState(false);
  const [helper, setHelper] = useState<string | null>(null);
  const liveId = useId();

  const emitError = useCallback(
    (msg: string) => {
      setHelper(msg);
      onError?.(msg);
    },
    [onError]
  );

  const validateAndEmit = useCallback(
    (list: FileList | null) => {
      if (!list || list.length === 0) return;
      const files = Array.from(list);

      // accept 검증(브라우저가 대부분 해주지만 수동 체크도 추가)
      if (accept) {
        const acceptParts = accept
          .split(",")
          .map((s) => s.trim().toLowerCase());
        const ok = files.every((f) => {
          const type = f.type.toLowerCase();
          const name = f.name.toLowerCase();
          return acceptParts.some(
            (a) =>
              a.endsWith("/*")
                ? type.startsWith(a.replace("/*", ""))
                : type === a || name.endsWith(a) // .pdf 등 확장자
          );
        });
        if (!ok) return emitError("허용되지 않는 파일 형식입니다.");
      }

      // 용량 검증
      const max = maxSizeMB * 1024 * 1024;
      const tooBig = files.find((f) => f.size > max);
      if (tooBig) {
        return emitError(`파일은 최대 ${maxSizeMB}MB까지 업로드할 수 있어요.`);
      }

      setHelper(null);
      onFiles?.(files);
    },
    [accept, maxSizeMB, onFiles, emitError]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      validateAndEmit(e.dataTransfer.files);
    },
    [disabled, validateAndEmit]
  );

  const handlePick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      validateAndEmit(e.target.files);
      e.currentTarget.value = "";
    },
    [validateAndEmit]
  );

  return (
    <div
      role="group"
      aria-labelledby={`${liveId}-title`}
      aria-describedby={helper ? `${liveId}-desc` : undefined}
      className={[
        "w-full max-w-[526px] min-h-[200px] rounded-2xl border bg-white px-50 py-7.5",
        "shadow-sm transition outline-none",
        disabled
          ? "opacity-60 cursor-not-allowed"
          : isDragging
          ? "border-violet-400 ring-4 ring-violet-100"
          : "border-zinc-200 hover:shadow",
      ].join(" ")}
      onDragEnter={(e) => {
        if (disabled) return;
        e.preventDefault();
        setDragging(true);
      }}
      onDragOver={(e) => {
        if (disabled) return;
        e.preventDefault();
      }}
      onDragLeave={(e) => {
        if (disabled) return;
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setDragging(false);
        }
      }}
      onDrop={handleDrop}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " ") {
          inputRef.current?.click();
        }
      }}
    >
      <div className="flex flex-col items-center justify-center h-full text-center select-none">
        <div
          className={[
            "rounded-xl border-2 border-dashed p-4",
            isDragging ? "border-violet-400" : "border-zinc-300",
          ].join(" ")}
          aria-hidden="true"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            className="opacity-70"
          >
            <path
              d="M7 18h10a4 4 0 0 0 0-8 5 5 0 0 0-9.8-1.5A3.5 3.5 0 0 0 7 18z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M12 9v7m0 0l-3-3m3 3l3-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div id={`${liveId}-title`} className="text-sm font-semibold mt-2.5">
          파일 드롭하기
        </div>
        <div className="text-zinc-400 text-sm mb-1 font-semibold">or</div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className={[
            " h-8 px-4.5 py-1.5 rounded-full text-sm ",
            "font-semibold bg-violet-600 text-white shadow-sm",
            "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200",
            disabled ? "opacity-60 cursor-not-allowed" : "",
          ].join(" ")}
        >
          파일 업로드
        </button>

        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          onChange={handlePick}
        />

        {/* 오류 메시지 */}
        {/* <div
          id={`${liveId}-desc`}
          aria-live="polite"
        className="text-sm text-rose-600 min-h-[1.25rem]"
        >
          {helper}
        </div> */}
      </div>
    </div>
  );
}
