"use client";

import { MouseEvent } from "react";

type BookmarkProps = {
  active: boolean;
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function Bookmark({ active, disabled, onClick }: BookmarkProps) {
  return (
    <div
      className="flex h-1/2 items-center justify-center"
      style={{ borderTopRightRadius: "20px" }}
    >
      <button
        type="button"
        aria-pressed={active}
        aria-label={active ? "북마크 해제" : "북마크"}
        className="text-40px flex h-9 w-9 items-center justify-center p-1 md:h-12 md:w-12 disabled:opacity-60"
        onClick={onClick}
        disabled={disabled}
      >
        <img
          alt="북마크 아이콘"
          src={
            active
              ? "/icon/bookmark_on.svg"
              : "	https://zighang.com/icon/bookmark_off.svg"
          }
          className="h-5 w-5 md:h-7 md:w-7"
          style={{ color: "transparent" }}
        />
      </button>
    </div>
  );
}
