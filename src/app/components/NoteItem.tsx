"use client";

import { useRef, useState } from "react";
import HoverIcon from "./HoverIcon";

type NoteItemProps = {
  id: number;
  title: string;
  onClick?: () => void;
  editMode?: boolean;
  onToggleEdit?: () => void;
  onOpenDetail?: (id: number) => void;
  onTitleChange?: (id: number, next: string) => void;
};

export default function NoteItem({
  id,
  title,
  onClick,
  onToggleEdit,
  onOpenDetail,
  onTitleChange,
}: NoteItemProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(input);

    if (isKorean && input.length > 10) return;
    if (!isKorean && input.length > 16) return;

    onTitleChange?.(id, input);
  };

  const goDetail = () => {
    if (id != null && onOpenDetail) {
      onOpenDetail(id);
      return;
    }

    if (onClick) onClick();
    else onToggleEdit?.();
  };

  return (
    <div className="self-stretch inline-flex flex-col items-start">
      <div
        className={`self-stretch h-11 pl-3.5 pr-2.5 py-2.5 bg-white 
          rounded-lg  outline outline-1 outline-offset-[-1px] 
          outline-zinc-200 inline-flex justify-between items-center 
           `}
      >
        <input
          type="text"
          value={title}
          className="w-full min-w-0 truncate text-sm outline-none"
          onChange={handleChange}
          placeholder="제목을 입력해주세요"
        />
        <button
          onClick={goDetail}
          className="group relative inline-block h-6 w-6"
        >
          <HoverIcon
            variant="right"
            className="transition-transform text-gray-400 group-hover:text-black"
          />
        </button>
      </div>
    </div>
  );
}
