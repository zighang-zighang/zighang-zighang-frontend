"use client";

import PersonalizedRecruitmentCard from "./recruitment/PersonalizedRecruitmentCard";
import PersonalizedRecruitmentList from "./recruitment/PersonalizedRecruitmentList";
import { useState, useEffect } from "react";
import { fetchRecommendedRecruitments } from "@/app/_api/recruitment/recommend/recommend";
import type { RecommendedRecruitment } from "@/app/_types/jobs";
import PersonalizedRecruitmentBanner from "./recruitment/PersonalizedRecruitmentBanner";

// 임시 목업 데이터 (파일이 없을 때 사용)
const mockRecruitments = [
  {
    id: "1",
    logo: "/logos/google.png",
    title: "Frontend Engineer",
    company: "Google",
    bookmarked: false,
    reason: "프론트엔드 개발 경험과 React 기술 스택이 일치합니다.",
  },
  {
    id: "1",
    logo: "/logos/naver.png",
    title: "Product Manager",
    company: "Naver",
    bookmarked: true,
    reason: "제품 기획 및 사용자 경험 개선 경험이 요구사항과 부합합니다.",
  },
  {
    id: "2",
    logo: "/logos/samsung.png",
    title: "Backend Developer",
    company: "Samsung Electronics",
    bookmarked: true,
    reason: "백엔드 개발 및 시스템 아키텍처 설계 경험이 적합합니다.",
  },
];

// API 응답을 PersonalizedRecruitmentList가 기대하는 형태로 변환
const transformRecommendedData = (data: RecommendedRecruitment[]) => {
  return data.map((item) => ({
    id: item.id,
    logo: item.companyImageUrl || "/logos/google.png", // 기본 로고 설정
    title: item.title,
    company: item.companyName,
    bookmarked: item.isBookmarked,
    reason: item.reason,
  }));
};

interface RecommendAreaProps {
  hasFiles?: boolean;
  isAnalysisModalOpen?: boolean;
  onFileUpload?: () => void;
}

export default function RecommendArea({
  hasFiles = false,
  isAnalysisModalOpen = false,
}: RecommendAreaProps) {
  const [recruitmentCount, setRecruitmentCount] = useState(0);
  const [recommendedData, setRecommendedData] = useState<
    RecommendedRecruitment[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (hasFiles && !isAnalysisModalOpen) {
      // 파일이 있고 분석 모달이 열려있지 않을 때만 API 호출
      fetchRecommendedData();
    } else if (!hasFiles) {
      // 파일이 없을 때는 목업 데이터 사용
      setRecruitmentCount(mockRecruitments.length);
      setRecommendedData([]);
      setError(null);
    }
  }, [hasFiles, isAnalysisModalOpen]);

  const fetchRecommendedData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchRecommendedRecruitments();

      if (response.success && response.data) {
        setRecommendedData(response.data);
        setRecruitmentCount(response.data.length);
      } else {
        throw new Error(
          response.message || "추천 데이터를 가져오는데 실패했습니다."
        );
      }
    } catch (err) {
      console.error("추천 데이터 로딩 실패:", err);
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
      // 에러 발생 시 목업 데이터 사용
      setRecommendedData([]);
      setRecruitmentCount(mockRecruitments.length);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-5 ">
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
      <PersonalizedRecruitmentBanner userName="민수" />
      {hasFiles && !isAnalysisModalOpen ? (
        // 파일이 있고 분석 모달이 열려있지 않을 때
        isLoading ? (
          // 로딩 상태
          <div className="flex items-center justify-center flex-col min-w-64 md:w-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto mb-2 "></div>
            <p className="text-gray-600 text-sm">
              추천 공고를 불러오고 있습니다...
            </p>
          </div>
        ) : error ? (
          // 에러 상태 - 에러 메시지만 표시
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                추천 공고를 불러올 수 없습니다.
              </p>
            </div>
          </div>
        ) : recommendedData.length > 0 ? (
          // API 데이터가 있을 때
          <PersonalizedRecruitmentList
            items={transformRecommendedData(recommendedData)}
          />
        ) : (
          // API 데이터가 없을 때 - 목업 데이터 표시
          <PersonalizedRecruitmentList items={mockRecruitments} />
        )
      ) : hasFiles && isAnalysisModalOpen ? (
        // 파일이 있고 분석 모달이 열려있을 때: 로딩 상태 표시
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">공고를 분석하고 있습니다...</p>
          </div>
        </div>
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
