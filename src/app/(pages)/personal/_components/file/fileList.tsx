"use client";

import { useState, useEffect } from "react";
import { EmptyFileIcon } from "../../_Icons/EmptyFileIcon";
import FileRender from "./fileRender";
import { fetchResumes, deleteResume } from "@/app/_api/resume/resumeApi";

type FileRow = {
  id: string;
  fileName: string;
  fileUrl: string;
  size: number;
  uploadDate: string;
};

type FileListProps = {
  onFilesChange?: (hasFiles: boolean) => void;
  refreshTrigger?: number; // 업로드 완료 시 새로고침을 위한 트리거
};

export default function FileList({
  onFilesChange,
  refreshTrigger,
}: FileListProps) {
  const [files, setFiles] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);
  const isEmpty = files.length === 0;

  // 파일 목록 가져오기
  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);
        const response = await fetchResumes();
        setFiles(response.resumes);
        console.log("API Response:", response);
        if (onFilesChange) {
          onFilesChange(response.resumes.length > 0);
        }
      } catch (error) {
        console.error("파일 목록을 가져오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, [onFilesChange]);

  // refreshTrigger가 변경될 때 파일 목록 새로고침
  useEffect(() => {
    if (refreshTrigger) {
      const loadFiles = async () => {
        try {
          setLoading(true);
          const response = await fetchResumes();
          setFiles(response.resumes);
          if (onFilesChange) {
            onFilesChange(response.resumes.length > 0);
          }
        } catch (error) {
          console.error("파일 목록 새로고침에 실패했습니다:", error);
        } finally {
          setLoading(false);
        }
      };

      loadFiles();
    }
  }, [refreshTrigger, onFilesChange]);

  const handleDelete = async (id: string) => {
    try {
      setDeletingFileId(id);
      await deleteResume(id);
      // 삭제 후 목록에서 제거
      const updatedFiles = files.filter((file) => file.id !== id);
      setFiles(updatedFiles);
      if (onFilesChange) {
        onFilesChange(updatedFiles.length > 0);
      }
      alert("삭제 완료!");
    } catch (error) {
      console.error("파일 삭제에 실패했습니다:", error);
      alert("파일 삭제에 실패했습니다.");
    } finally {
      setDeletingFileId(null);
    }
  };

  return (
    <div className="w-full">
      <div className="">
        <div className="grid grid-cols-12 items-center text-zinc-600 text-xs md:text-sizc-800 md:text-sm font-medium p-3 md:px-7 md:py-2.5 bg-gray-100">
          <div className="col-span-2">번호</div>
          <div className="col-span-7">파일명</div>
          <div className="hidden md:block col-span-2">업로드일</div>
          <div className="col-span-3 md:col-span-1 text-right">삭제</div>
        </div>

        {isEmpty ? (
          <div className="flex flex-col justify-center items-center text-zinc-400 h-62 md:h-64 border-b border-neutral-200">
            <EmptyFileIcon className="w-50 h-30 text-red-500" />
            <p className="text-center">
              아직 비어 있네요. <br />
              파일을 올려 시작해보세요.
            </p>
          </div>
        ) : (
          <ul className="divide-y">
            {files.map((file, idx) => (
              <FileRender
                key={file.id}
                file={{
                  id: file.id,
                  name: file.fileName,
                  type: file.fileName.split(".").pop() || "",
                  size: file.size,
                  url: file.fileUrl,
                  uploadDate: file.uploadDate,
                }}
                index={idx}
                onDelete={handleDelete}
                isDeleting={deletingFileId === file.id}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
