"use client";

import { useState } from "react";
import Link from "next/link";
import NoteItem from "./NoteItem";
import HoverIcon from "./HoverIcon";
export default function MemoCard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notes, setNotes] = useState<
    { id: number; title: string; content: string; date: string }[]
  >([]);

  const addNote = () => {
    setNotes((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "",
        content: "",
        date: new Date().toISOString().slice(0, 10),
      },
    ]);
  };

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <>
      <button
        onClick={() => setIsLoggedIn((v) => !v)}
        className="mb-2 rounded border px-2 py-1 text-xs"
      >
        {isLoggedIn ? "로그아웃" : "로그인"}
      </button>
      <div className="w-56 h-96 inline-flex flex-col justify-start items-start">
        <div className="self-stretch h-11 pl-4 pr-3.5 py-2.5 bg-white rounded-tl-lg rounded-tr-lg outline outline-1 outline-offset-[-1px] outline-zinc-200 inline-flex justify-between items-center">
          <div className="flex justify-center items-center gap-2.5">
            <div className="justify-center text-black text-base font-semibold leading-snug">
              메모장
            </div>
          </div>
          <button
            onClick={addNote}
            disabled={!isLoggedIn}
            className="group relative inline-block h-6 w-6"
          >
            <HoverIcon
              variant="plus"
              className="text-gray-400 hover:text-black cursor-pointer"
            />
          </button>
        </div>

        <div className="relative overflow-y-auto overflow-x-hidden self-stretch h-96  px-3.5 py-3 bg-white rounded-bl-lg rounded-br-lg border-l border-r border-b border-zinc-200 inline-flex justify-center items-start gap-2.5">
          {!isLoggedIn && (
            <div
              className="
               absolute inset-0 z-10
            bg-gradient-to-b from-violet-50/20 via-violet-50/60 to-violet-50/80 rounded-bl-lg rounded-br-lg backdrop-blur-[1px]
           "
            />
          )}
          <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
            {isLoggedIn && (
              <div className="flex flex-col gap-2">
                {notes.length === 0 ? (
                  <div
                    className={[
                      "w-48 h-20 px-4 py-4 border-2 border-dotted border-zinc-300 rounded-lg inline-flex justify-center items-center gap-2.5",
                      "transition filter",
                    ].join(" ")}
                    aria-hidden={!isLoggedIn}
                  >
                    <div className="w-40 text-center text-zinc-400 text-sm font-semibold leading-tight">
                      관심 있는 공고의 <br /> 정보를 기록해보세요
                    </div>
                  </div>
                ) : (
                  notes.map((note) => (
                    <NoteItem
                      key={note.id}
                      title={note.title}
                      content={note.content}
                      date={note.date}
                      onDelete={() => deleteNote(note.id)}
                      editable
                    />
                  ))
                )}
              </div>
            )}

            {!isLoggedIn && (
              <div className="relative">
                <div className="space-y-2">
                  <NoteItem
                    title="Toss JD 인재상"
                    defaultOpen={false}
                  ></NoteItem>
                  <NoteItem
                    title="네이버 서비스 조사"
                    defaultOpen={true}
                  ></NoteItem>
                  <NoteItem
                    title="네카라쿠배 특징"
                    defaultOpen={true}
                  ></NoteItem>
                </div>

                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                  <div className="bg-white shadow-md rounded-lg px-2 py-4.5">
                    <div className="text-center font-semibold text-sm">
                      로그인하고 관심있는 공고에{" "}
                      <span className="text-purple-700">메모를 기록</span>
                      해보세요!
                    </div>
                  </div>
                  <Link
                    href="/join"
                    className="mt-2 w-full inline-flex items-center justify-center rounded-md bg-purple-700 px-3 py-1.5 text-white text-sm hover:bg-indigo-500"
                  >
                    로그인
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
