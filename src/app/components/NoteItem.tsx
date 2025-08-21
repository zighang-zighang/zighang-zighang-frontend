"use client";

import Image from "next/image";

export default function NoteItem() {
  return (
    <div className="">
      <div className="flex">
        <input type="text" className="w-full text-sm " placeholder="제목" />
        <button>토글</button>
      </div>

      <div>
        <textarea
          id="content"
          placeholder="본문을 입력하세요"
          className="w-full  resize-none  text-sm
             placeholder:text-zinc-400 outline-none"
        />

        <div className="flex justify-between">
          <p className="text-neutral-400 text-sm">2025.08.16</p>
          <button>휴지통</button>
        </div>
      </div>
    </div>
  );
}
