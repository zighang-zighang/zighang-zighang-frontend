"use client";

import HoverIcon from "./HoverIcon";
import KebabMenu from "./KebabMenu";

type Props = {
  selected: { id: number; content: string; date: string } | null;
  onClose: () => void;
  onDelete: () => void;
  onChangeContent: (value: string) => void;
};

export default function NotePadLarge({
  selected,
  onClose,
  onChangeContent,
}: Props) {
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="absolute left-1/2 top-16 -translate-x-1/2 w-[720px] max-w-[92vw] rounded-xl bg-white shadow-2xl border border-zinc-200">
        <div className="h-12 px-3.5 py-2.5 flex items-center justify-between rounded-t-xl border-b">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="h-6 w-6" title="닫기">
              <HoverIcon variant="right" className="rotate-180" />
            </button>
            <div className="text-sm font-semibold">메모장</div>
          </div>
          <KebabMenu />
        </div>

        <div className="p-4">
          <div className="h-[480px] rounded-lg">
            <textarea
              className="w-full h-full p-3 text-sm font-medium resize-none outline-none"
              placeholder={"첫 줄이 제목이 됩니다.\n내용을 입력하세요…"}
              value={selected?.content ?? ""}
              onChange={(e) => onChangeContent(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between border-t mt-3 pt-2 border-neutral-400">
            <p className="text-[11px] text-neutral-400">
              {selected?.date ?? new Date().toISOString().slice(0, 10)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
