import { Memo } from "../_types/memoTypes";
import HoverIcon from "@/app/(pages)/recruitment/[slug]/_components/Icons/HoverIcon";

interface MemoSectionProps {
  memo: Memo;
  onDelete?: (memoId: string) => void;
}

export default function MemoSection({ memo, onDelete }: MemoSectionProps) {
  return (
    <div className=" bg-white rounded-lg px-5 py-4 border border-[#E1E1E4]">
      <div className="flex justify-between items-center mb-[10px]">
        <h3 className="text-Heading4-16sb">{memo.title}</h3>
        <button
          className="text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={() => onDelete?.(memo.id)}
        >
          <HoverIcon variant="trash" className="text-[#919193]" />
        </button>
      </div>

      <div className="text-Badge1-14m whitespace-pre-wrap">{memo.content}</div>
    </div>
  );
}
