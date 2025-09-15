import { MemoGroup } from "../_types/memoTypes";
import { calculateDDay } from "../_utils/dateUtils";

interface MemoListProps {
  memoGroups: MemoGroup[];
  selectedMemoId?: string | null;
  onMemoSelect: (memoId: string) => void;
}

export default function MemoList({
  memoGroups,
  selectedMemoId,
  onMemoSelect,
}: MemoListProps) {
  return (
    <div className="w-1/3 flex flex-col border border-[#E1E1E4] rounded-l-[8px] h-[600px]">
      <div className="h-[58px] flex justify-between px-4 py-[14px] text-Heading3-18sb border-b border-[#E1E1E4] flex-shrink-0">
        <div>메모장</div>
        <button className="text-Button3-14sb text-[#303030] border border-[#E1E1E4] rounded-[8px] px-[14px] py-1">
          편집
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {memoGroups.map((group) => {
          const dDate = calculateDDay(group.recruitment.endDate);
          const isExpired = dDate.startsWith("D+");

          return (
            <div
              key={group.recruitment.id}
              className={`h-[98px] px-4 pt-[14px] pb-[18px] border-b border-[#E1E1E4] cursor-pointer transition-colors ${
                selectedMemoId === group.memos[0]?.id
                  ? "bg-[#F7F1FB]"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => onMemoSelect(group.memos[0]?.id || "")}
            >
              <div
                className={`text-Badge3-10m px-2 py-[6px] rounded-[4px] inline-block mb-[6px] ${
                  isExpired
                    ? "text-black bg-[#F1F1F5]"
                    : "text-[#FF5151] bg-[#FF5151]/10"
                }`}
              >
                {dDate}
              </div>
              <div className="text-Heading5-14sb mb-[2px]">
                {group.recruitment.title}
              </div>
              <div className="text-Body1-14r text-[#5E5E5F]">
                {group.recruitment.companyName}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
