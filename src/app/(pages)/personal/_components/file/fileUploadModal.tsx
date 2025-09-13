"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import FileUploadCard from "@/app/(pages)/onboarding/_components/FileUpload/FileUploadCard";
import CheckIcon from "@/app/(pages)/onboarding/_components/FileUpload/icons/checkIcon";
import { UploadIcon } from "../../_Icons/UploadIcon";

type FileUploadModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function FileUploadModal({
  open,
  onClose,
}: FileUploadModalProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFiles = (files: File[]) => {
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleError = (message: string) => {
    console.error("File upload error:", message);
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 ">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          aria-labelledby="file-upload-title"
          className="mx-auto w-full max-w-4xl rounded-xl bg-white p-6 shadow-lg"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="hidden md:block">
              <FileUploadCard />
            </div>

            <div>
              <div className="flex justify-between">
                <p className="font-semibold text-sm">업로드된 파일</p>
                <button className="w-20 h-6 flex items-center justify-center gap-1 bg-violet-50 rounded-md md:hidden text-violet-500 text-[9.66px] font-semibold">
                  <UploadIcon className="text-violet-500"></UploadIcon>
                  파일업로드
                </button>
                <button
                  onClick={onClose}
                  aria-label="닫기"
                  className="hidden md:block rounded p-1 text-gray-500 hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
              <div className="h-48 md:h-54 mt-3 flex justify-center items-center border border-neutral-200 rounded-lg">
                <p className="mt-1 text-stone-300 text-sm font-medium text-center">
                  아직 비어있네요. <br />
                  파일을 업로드하세요!
                </p>
              </div>

              <div className="mt-3 mb-4 flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <p className="text-[10px] font-medium text-zinc-400 md:text-xs md:text-stone-300">
                    파일 형식은 PDF, DOC, HWP, HWPX로 올려주세요
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <CheckIcon />
                  <p className="text-[10px] font-medium text-zinc-400 md:text-xs md:text-stone-300">
                    파일 최대 용량은 15mb까지입니다
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="flex-1 text-sm font-semibold h-9 px-7 py-2 bg-white rounded-lg border border-neutral-200 hover:bg-neutral-100">
                  나가기
                </button>
                <button className="flex-1 text-white text-sm font-semibold h-9 px-7 py-2 bg-neutral-400 rounded-lg border-neutral-500">
                  완료
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
