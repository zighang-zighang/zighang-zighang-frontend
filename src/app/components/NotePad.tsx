"use client";

import { useState } from "react";
import Link from "next/link";
import NoteItem from "./NoteItem";

export default function MemoCard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="w-56 inline-flex flex-col justify-start items-start">
      <button
        onClick={() => setIsLoggedIn((v) => !v)}
        className="mb-2 rounded border px-2 py-1 text-xs"
      >
        {isLoggedIn ? "로그아웃" : "로그인"}
      </button>

      <div className="self-stretch h-11 pl-4 pr-3.5 py-2.5 bg-white rounded-tl-lg rounded-tr-lg outline outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex justify-between items-center">
        <div className="flex justify-center items-center gap-2.5">
          <div className="justify-center text-black text-base font-semibold leading-snug">
            메모장
          </div>
        </div>
        <div>추가버튼</div>
      </div>

      <div className="self-stretch h-80 px-3.5 py-3 bg-white rounded-bl-lg rounded-br-lg border-l border-r border-b border-zinc-200 inline-flex justify-center items-start gap-2.5">
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
          <div className="relative">
            <div
              className={[
                "w-48 h-20 px-4 py-4 border-2 border-dotted border-zinc-300 rounded-lg inline-flex justify-center items-center gap-2.5",
                "transition filter",
                isLoggedIn ? "blur-0" : "blur-[2px]",
              ].join(" ")}
              aria-hidden={!isLoggedIn}
            >
              <div className="w-40 text-center text-zinc-400 text-sm font-semibold leading-tight">
                관심 있는 공고의 <br /> 정보를 기록해보세요
              </div>
            </div>
          </div>
          {isLoggedIn && <NoteItem></NoteItem>}
          {!isLoggedIn && (
            <div className="px-3 text-center">
              <Link
                href="/join"
                className="mt-2 inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-white text-sm hover:bg-indigo-500"
              >
                로그인하고 관심 있는 공고에 메모를 기록해보세요!
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
