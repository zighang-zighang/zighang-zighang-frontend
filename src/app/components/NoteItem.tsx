"use client";

import { useState } from "react";
import Image from "next/image";

type NoteItemProps = {
  title?: string;
  content?: string;
  editable?: boolean;
  date?: string;
  defaultOpen?: boolean;
};

export default function NoteItem({
  title,
  content,
  editable = false,
  date,
  defaultOpen = false,
}: NoteItemProps) {
  const [open, setOpen] = useState(defaultOpen);

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
          className="w-full text-sm outline-none"
          defaultValue={title}
          placeholder="제목"
        />
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="group relative inline-block h-6 w-6"
        >
          <Image
            src="/icons/right/right.svg"
            alt=""
            fill
            sizes="24px"
            className={`opacity-100 transition-all group-hover:opacity-0 ${
              open ? "rotate-270" : "rotate-90"
            }`}
          />
          <Image
            src="/icons/right/right-hover.svg"
            alt=""
            fill
            sizes="24px"
            className={`opacity-0 transition-all group-hover:opacity-100 ${
              open ? "rotate-270" : "rotate-90"
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="self-stretch p-3.5 bg-white rounded-bl-lg rounded-br-lg border-l border-r border-b border-zinc-300 flex flex-col gap-2.5">
          {editable ? (
            <textarea
              defaultValue={content}
              placeholder="본문을 입력하세요"
              className="w-full resize-none text-sm placeholder:text-zinc-400 outline-none"
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
            <button className="group relative inline-block h-6 w-6">
              <Image
                src="/icons/trash/trash.svg"
                alt=""
                fill
                sizes="24px"
                className="opacity-100 transition-opacity group-hover:opacity-0"
              />
              <Image
                src="/icons/trash/trash-hover.svg"
                alt=""
                fill
                sizes="24px"
                className="opacity-0 transition-opacity group-hover:opacity-100"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
