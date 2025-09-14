"use client";

import { Profile } from "@/components/Icons/Profile";
import KeywordButton from "./keywordButton";
import { useState, useEffect } from "react";
import { fetchKeywords } from "@/app/_api/resume/keyword/keywordApi";

interface PersonalizedRecruitmentBannerProps {
  userName?: string;
  onKeywordClick?: (keyword: string) => void;
}

export default function PersonalizedRecruitmentBanner({
  userName = "민수",
  onKeywordClick,
}: PersonalizedRecruitmentBannerProps) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadKeywords = async () => {
      try {
        setLoading(true);
        const fetchedKeywords = await fetchKeywords();
        setKeywords(fetchedKeywords);
      } catch (error) {
        console.error("키워드를 가져오는데 실패했습니다:", error);
        setKeywords([]);
      } finally {
        setLoading(false);
      }
    };

    loadKeywords();
  }, []);

  return (
    <div className="p-4 flex flex-col items-center justify-center min-w-64 min-h-36 md:w-full md:min-h-18 md:flex-row md:gap-7 bg-violet-50 rounded-lg mb-3.5">
      <div className="flex items-center gap-2">
        <Profile></Profile>
        <p className="text-lg font-semibold">{userName}님의 공고 키워드</p>
      </div>
      <div className="flex items-center justify-center w-64 md:w-auto flex-wrap gap-2 mt-6 md:mt-0 md:flex-nowrap">
        {loading ? (
          <p className="text-gray-500 text-sm">키워드를 불러오는 중...</p>
        ) : keywords.length > 0 ? (
          keywords.map((keyword, index) => (
            <KeywordButton
              key={`${keyword}-${index}`}
              keyword={keyword}
              onClick={() => onKeywordClick?.(keyword)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm">키워드가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
