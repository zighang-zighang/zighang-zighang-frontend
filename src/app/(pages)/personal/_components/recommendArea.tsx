"use client";

import PersonalizedRecruitmentCard from "./recruitment/PersonalizedRecruitmentCard";
import PersonalizedRecruitmentList from "./recruitment/PersonalizedRecruitmentList";
import { useState, useEffect } from "react";

// 임시 목업 데이터 삭제 예정

const mockRecruitments = [
  {
    id: "1",
    logo: "/logos/google.png",
    title: "Frontend Engineer",
    company: "Google",
    bookmarked: false,
  },
  {
    id: "2",
    logo: "/logos/samsung.png",
    title: "Backend Developer",
    company: "Samsung Electronics",
    bookmarked: true,
  },
  {
    id: "3",
    logo: "/logos/coupang.png",
    title: "Product Manager",
    company: "Coupang",
    bookmarked: false,
  },
];

export default function RecommendArea() {
  const [hasFiles, setHasFiles] = useState(false);
  const [recruitmentCount, setRecruitmentCount] = useState(0);

  // 파일 상태 확인 (실제로는 API나 상태 관리에서 가져와야 함)
  useEffect(() => {
    // 임시로 localStorage에서 파일 상태 확인
    const checkFileStatus = () => {
      const files = localStorage.getItem("uploadedFiles");
      const hasUploadedFiles = !!(files && JSON.parse(files).length > 0);
      setHasFiles(hasUploadedFiles);

      if (hasUploadedFiles) {
        // 파일이 있으면 추천 공고 개수 설정 (실제로는 API에서 가져와야 함)
        setRecruitmentCount(mockRecruitments.length);
      } else {
        setRecruitmentCount(0);
      }
    };

    checkFileStatus();

    // 파일 상태 변경 감지 (storage 이벤트는 다른 탭에서만 발생하므로 polling 추가)
    const handleStorageChange = () => {
      checkFileStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    // 주기적으로 파일 상태 확인 (실제 구현에서는 상태 관리 라이브러리 사용 권장)
    const interval = setInterval(checkFileStatus, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-4">
        <div className="justify-center text-black text-lg md:text-xl font-semibold">
          <span className="text-purple-800 text-lg md:text-xl font-semibold mr-1">
            초개인화
          </span>
          추천 공고
          <span className="text-purple-800 text-lg md:text-xl font-semibold ml-1">
            {hasFiles ? recruitmentCount : "N"}
          </span>
          건
        </div>
      </div>

      {hasFiles ? (
        // 파일이 있을 때: PersonalizedRecruitmentList 표시
        <PersonalizedRecruitmentList items={mockRecruitments} />
      ) : (
        // 파일이 없을 때: 기존 업로드 유도 UI 표시
        <div className="relative w-full max-w-[787px] h-72 md:h-43">
          <div className="absolute inset-0 z-0 flex flex-col md:flex-row items-center justify-center gap-4 px-6">
            {mockRecruitments.slice(0, 2).map((item, idx) => (
              <PersonalizedRecruitmentCard key={idx} item={item} />
            ))}
            {/* PC에서만 보이는 3번째 카드 */}
            <div className="hidden md:block">
              <PersonalizedRecruitmentCard item={mockRecruitments[2]} />
            </div>
          </div>

          <div className="absolute inset-0 z-10 rounded-lg overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-[5px] bg-white/20" />
            <div className="absolute inset-0 outline-2 outline-offset-[-2px] outline-gray-100 pointer-events-none" />
          </div>

          <div
            className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-56 h-20 px-4 py-4 bg-violet-50 rounded-lg
                   outline-1 outline-offset-[-1px] outline-purple-200
                   shadow-[0px_2px_5px_0px_rgba(163,163,163,0.10),0px_9px_9px_0px_rgba(163,163,163,0.09),0px_21px_13px_0px_rgba(163,163,163,0.05)]
                   flex items-center justify-center text-center"
          >
            <div className="leading-snug">
              <span className="text-black text-sm font-semibold">
                자기소개서 업로드하고
                <br />
              </span>
              <span className="text-violet-500 text-sm font-semibold">
                맞춤형 공고 추천
              </span>
              <span className="text-black text-sm font-semibold">
                받아보세요
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
