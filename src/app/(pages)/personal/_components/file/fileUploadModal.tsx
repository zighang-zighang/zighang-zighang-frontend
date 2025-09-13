"use client";

import { Dialog } from "@headlessui/react";
import { useState, useRef } from "react";
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
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: File[]) => {
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleError = (message: string) => {
    setError(message);
    console.error("File upload error:", message);
    // 3초 후 에러 메시지 자동 제거
    setTimeout(() => setError(null), 3000);
  };

  const handleMobileFileUpload = () => {
    fileInputRef.current?.click();
  };

  const validateFiles = (files: File[]) => {
    const maxSizeMB = 15;
    const allowedTypes = [".pdf", ".doc", ".docx", ".hwp", ".hwpx"];

    for (const file of files) {
      // 파일 크기 검증
      if (file.size > maxSizeMB * 1024 * 1024) {
        handleError(`파일은 최대 ${maxSizeMB}MB까지 업로드할 수 있어요.`);
        return false;
      }

      // 파일 형식 검증
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        handleError(
          "허용되지 않는 파일 형식입니다. PDF, DOC, DOCX, HWP, HWPX 파일만 업로드 가능합니다."
        );
        return false;
      }
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      if (validateFiles(files)) {
        handleFiles(files);
      }
    }
    // input 초기화
    e.target.value = "";
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50 ">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          aria-labelledby="file-upload-title"
          className="mx-auto w-full max-w-60 md:max-w-[600px] md:w-[600px] rounded-xl bg-white py-5 shadow-lg"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="hidden px-10 md:block">
              <FileUploadCard
                onFiles={handleFiles}
                onError={handleError}
                multiple={true}
                accept=".pdf,.doc,.docx,.hwp,.hwpx"
                maxSizeMB={15}
                modal={true}
              />
            </div>

            <div className="md:border-l md:border-neutral-200 px-4 flex-1">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-sm">업로드된 파일</p>
                <button
                  onClick={handleMobileFileUpload}
                  className="w-20 h-7 flex items-center justify-center gap-1 bg-violet-50 rounded-md md:hidden text-violet-500 text-[9.66px] font-semibold hover:bg-violet-100 transition-colors"
                >
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
              <div className="h-48 md:h-54 mt-3 border border-neutral-200 rounded-lg overflow-y-auto">
                {uploadedFiles.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-stone-300 text-sm font-medium text-center">
                      아직 비어있네요. <br />
                      파일을 업로드하세요!
                    </p>
                  </div>
                ) : (
                  <div className="p-3 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <UploadIcon className="w-4 h-4 text-violet-500" />
                          <span className="text-sm font-medium text-gray-700 truncate max-w-xs">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({(file.size / 1024 / 1024).toFixed(1)}MB)
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setUploadedFiles((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center">
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
                <button
                  className={`hidden md:block ml-auto text-white text-sm font-semibold h-9 px-7 py-2 rounded-lg ${
                    uploadedFiles.length > 0
                      ? "bg-violet-600 hover:bg-violet-700"
                      : "bg-neutral-400 cursor-not-allowed"
                  }`}
                  disabled={uploadedFiles.length === 0}
                >
                  완료
                </button>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={onClose}
                  className="flex-1 md:hidden text-sm font-semibold h-9 px-7 py-2 bg-white rounded-lg border border-neutral-200 hover:bg-neutral-100 "
                >
                  나가기
                </button>
                <button
                  className={`flex-1 md:hidden  text-white text-sm font-semibold h-9 px-7 py-2 rounded-lg ${
                    uploadedFiles.length > 0
                      ? "bg-violet-600 hover:bg-violet-700"
                      : "bg-neutral-400 cursor-not-allowed"
                  }`}
                  disabled={uploadedFiles.length === 0}
                >
                  완료
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>

      {/* 숨겨진 파일 input (모바일용) */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.hwp,.hwpx"
        onChange={handleFileChange}
        className="hidden"
      />
    </Dialog>
  );
}
