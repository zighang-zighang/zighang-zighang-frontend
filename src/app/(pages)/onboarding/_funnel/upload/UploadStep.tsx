"use client";

import { useEffect, useRef, useState } from "react";
import { StepContainer } from "../../_components";
import FileUploadCard from "../../_components/FileUpload/FileUploadCard";
import FileUploadList from "../../_components/FileUpload/FileUploadList";
import {
  UploadStatus,
  UploadedFile,
} from "../../_components/FileUpload/types/type";

export function UploadStep({ onNext }: { onNext: () => void }) {
  const [file, setFile] = useState<UploadedFile | undefined>(undefined);
  const [status, setStatus] = useState<UploadStatus>("loading");
  const [progress, setProgress] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  const handleFiles = (files: File[]) => {
    const f = files[0];
    if (!f) return;

    const uploaded: UploadedFile = {
      id: crypto.randomUUID(),
      name: f.name,
      size: f.size,
      uploadedAt: new Date().toISOString(),
      // 업로드 후 서버가 URL 주면 여기에 set
    };

    setFile(uploaded);
    setStatus("loading");
    setProgress(0);

    // 실제 업로드 API 호출 위치
    // await fetch("/api/upload", { method: "POST", body: form });

    // 진행률 시뮬레이션
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 30);
        if (next >= 100) {
          window.clearInterval(timerRef.current!);
          timerRef.current = null;
          setStatus("success");
        }
        return next;
      });
    }, 200);
  };

  const handleError = (msg: string) => {
    console.error(msg);
    setStatus("error");
  };

  const handleRemove = (id: string) => {
    if (file?.id !== id) return;
    setFile(undefined);
    setStatus("loading");
    setProgress(0);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  return (
    <StepContainer>
      <div className="flex flex-col justify-center items-center py-7.5">
        <div className="px-3.5 py-1.5 bg-violet-50 rounded-lg inline-flex justify-center items-center gap-2.5">
          <p className="justify-start text-violet-500 text-sm font-semibold">
            기본 정보 입력이 완료됐어요!
          </p>
        </div>

        <div className="mt-3 mb-3 text-black text-lg font-semibold">
          자기소개서 혹은 이력서를 등록하면 더욱 핏한 공고를 받을 확률이
          높아져요!
        </div>

        <div className="flex flex-col gap-1.5">
          {/* 업로드 카드: 이벤트만 올려줌 */}

          <FileUploadCard
            onFiles={handleFiles}
            onError={handleError}
            multiple={false} // 단일 파일
            accept=".pdf,.doc,.hwp,.hwpx"
            maxSizeMB={15}
          />

          {/* 업로드 리스트: 현재 상태 표시 */}

          <FileUploadList
            file={file}
            status={status}
            progress={progress}
            note={
              status === "loading"
                ? "3seconds lefts"
                : status === "success"
                ? "Success"
                : "Error"
            }
            onRemove={handleRemove}
          />
        </div>

        <button
          onClick={onNext}
          className="mt-6 rounded-lg px-12 py-2 font-semibold border-1 border-neutral-300 "
        >
          넘어가기
        </button>
      </div>
    </StepContainer>
  );
}
