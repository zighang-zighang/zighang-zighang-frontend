import { UploadIcon } from "../_Icons/UploadIcon";

export default function UploadArea() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-black text-xl font-semibold">업로드한 파일</p>
          <p className="text-zinc-800 text-sm font-medium">
            최적 공고를 위해 민수님이 업로드하신 자기소개서/이력서 내역이에요
          </p>
        </div>

        <button className="hidden md:inline-flex gap-2 px-3 h-9 bg-violet-500 rounded-lg justify-center items-center">
          <UploadIcon className="text-white" />
          <p className="text-white text-sm font-semibold">파일 업로드</p>
        </button>
      </div>

      <button className="md:hidden w-full h-10 bg-violet-500 rounded-lg inline-flex justify-center items-center gap-2">
        <UploadIcon className="text-white" />
        <p className="text-white text-sm font-semibold">파일 업로드</p>
      </button>
    </div>
  );
}
