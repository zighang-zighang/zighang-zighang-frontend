"use client";

type DeleteMemoProps = {
  isOpen: () => void;
  onDelete: () => void;
};

export default function DeleteMemo({ isOpen, onDelete }: DeleteMemoProps) {
  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[92vw] p-10 bg-white rounded-xl  outline-offset-[-1px] outline-zinc-200 inline-flex flex-col justify-start items-center gap-10">
        <div className="w-96 h-12 flex flex-col justify-start items-center gap-1">
          <div className="self-stretch text-center justify-start text-gray-900 text-lg font-bold font-['Pretendard'] leading-7">
            메모를 삭제하시겠습니까?
          </div>
          <div className="self-stretch text-center justify-start text-gray-600 text-sm font-normal font-['Pretendard'] leading-tight">
            ‘제목을 입력해주세요...’ 메모가 영구적으로 삭제됩니다
          </div>
        </div>
        <div className="w-96 flex flex-col justify-start items-start gap-3">
          <div className="self-stretch inline-flex justify-center items-start gap-3">
            <div className="cursor-pointer w-28 px-6 py-2 rounded-lg outline-offset-[-1px] outline outline-neutral-500 flex justify-center items-center gap-2 overflow-hidden">
              <button
                onClick={isOpen}
                className=" justify-start text-neutral-500 text-base font-bold "
              >
                취소
              </button>
            </div>
            <div className="cursor-pointer flex-1 px-4 py-2 bg-red-600 rounded-lg flex justify-center items-center gap-2 overflow-hidden">
              <button
                onClick={onDelete}
                className="justify-start text-white text-base font-bold "
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
