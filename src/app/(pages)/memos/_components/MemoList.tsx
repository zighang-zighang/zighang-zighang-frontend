const memos = [
  {
    id: "1",
    dDate: "D-9",
    title: "메모장 1",
    company: "원티드",
  },
  {
    id: "2",
    dDate: "D-10",
    title: "메모장 2",
    company: "원티드",
  },
  {
    id: "3",
    dDate: "D-11",
    title: "메모장 3",
    company: "원티드",
  },
  {
    id: "3",
    dDate: "D-11",
    title: "메모장 3",
    company: "원티드",
  },
  {
    id: "3",
    dDate: "D-11",
    title: "메모장 3",
    company: "원티드",
  },
  {
    id: "3",
    dDate: "D-11",
    title: "메모장 3",
    company: "원티드",
  },
  {
    id: "3",
    dDate: "D-11",
    title: "메모장 3",
    company: "원티드",
  },
];

export default function MemoList() {
  return (
    <div className="w-1/3 flex flex-col border border-[#E1E1E4] rounded-l-[8px] h-[600px]">
      <div className="h-[58px] flex justify-between px-4 py-[14px] text-Heading3-18sb border-b border-[#E1E1E4] flex-shrink-0">
        <div>메모장</div>
        <button className="text-Button3-14sb text-[#303030] border border-[#E1E1E4] rounded-[8px] px-[14px] py-1">
          편집
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {memos.map((memo) => (
          <div
            key={memo.id}
            className="h-[98px] px-4 pt-[14px] pb-[18px] border-b border-[#E1E1E4]"
          >
            <div className="text-Badge3-10m text-[#FF5151] px-2 py-[6px] rounded-[4px] bg-[#FF5151]/10 inline-block mb-[6px]">
              {memo.dDate}
            </div>
            <div className="text-Heading5-14sb mb-[2px]">{memo.title}</div>
            <div className="text-Body1-14r text-[#5E5E5F]">{memo.company}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
