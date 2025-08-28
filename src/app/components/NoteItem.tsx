"use client";

import { useRef, useState } from "react";
import HoverIcon from "./HoverIcon";

type NoteItemProps = {
  id?: number;
  title: string;
  active?: boolean;
  onClick?: () => void;
  editMode?: boolean;
  onToggleEdit?: () => void;
  onOpenDetail?: (id: number) => void;
};

export default function NoteItem({
  id,
  title,
  active,
  onClick,
  onToggleEdit,
  onOpenDetail,
}: NoteItemProps) {
  const [value, setValue] = useState(title);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(input);

    if (isKorean && input.length > 10) return;
    if (!isKorean && input.length > 16) return;

    setValue(input);
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
          rounded-tl-lg rounded-tr-lg outline outline-1 outline-offset-[-1px] 
          outline-zinc-200 inline-flex justify-between items-center 
          rounded-bl-lg `}
      >
        <input
          type="text"
          value={value}
          className="w-full text-sm outline-none"
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
