"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import HoverIcon from "./HoverIcon";

type NoteItemProps = {
  title?: string;
  content?: string;
  editable?: boolean;
  date?: string;
  defaultOpen?: boolean;
  onDelete?: () => void;
};

export default function NoteItem({
  title,
  content,
  editable = false,
  date,
  defaultOpen = false,
  onDelete,
}: NoteItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [value, setValue] = useState(title);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 제목 글자 수 제한
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(input);

    if (isKorean && input.length > 10) return;
    if (!isKorean && input.length > 16) return;

    setValue(input);
  };

  //본문 칸만큼 공간 늘어나게하는 함수
  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
  return (
    <div className="self-stretch inline-flex flex-col items-start">
      <div
        className={`self-stretch h-11 pl-3.5 pr-2.5 py-2.5 bg-white 
          rounded-tl-lg rounded-tr-lg outline outline-1 outline-offset-[-1px] 
          outline-zinc-200 inline-flex justify-between items-center 
          ${!open ? "rounded-bl-lg rounded-br-lg" : ""}`}
      >
        <input
          type="text"
          value={value}
          className="w-full text-sm outline-noned"
          onChange={handleChange}
          placeholder="제목"
        />
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="group relative inline-block h-6 w-6"
        >
          <HoverIcon
            variant="right"
            className={`transition-transform ${
              open ? "rotate-270" : "rotate-90"
            } 
              text-gray-400 group-hover:text-black`}
          />
        </button>
      </div>

      {open && (
        <div className="self-stretch p-3.5 bg-white rounded-bl-lg rounded-br-lg border-l border-r border-b border-zinc-300 flex flex-col gap-2.5">
          {editable ? (
            <textarea
              ref={textareaRef}
              defaultValue={content}
              placeholder="본문을 입력하세요"
              className="w-full resize-none text-sm placeholder:text-zinc-400 outline-none"
              onInput={handleInput}
              rows={2}
            />
          ) : (
            <div className="w-full text-sm text-zinc-700 whitespace-pre-wrap">
              {content}
            </div>
          )}
          <div className="flex w-full justify-between items-end">
            <p className="w-32 justify-start text-neutral-400 text-xs font-normal font-['Pretendard'] leading-none">
              {date}
            </p>
            <button
              onClick={() => onDelete?.()}
              className="group relative inline-block h-6 w-6"
            >
              <HoverIcon
                variant="trash"
                className="text-gray-400 hover:text-black"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
