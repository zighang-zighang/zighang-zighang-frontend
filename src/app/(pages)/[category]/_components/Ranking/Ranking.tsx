import { jobCategories } from "@/app/_constants/jobCategories";
import { usePopularRecruitments } from "@/app/_api/recruitment/usePopular";

interface RankingProps {
  slug: string;
}

export function Ranking({ slug }: RankingProps) {
  // slug를 API용 job 파라미터로 변환
  const getJobParam = (categorySlug: string) => {
    const categoryMap: { [key: string]: string } = {
      it: "IT_개발",
      ai: "AI_데이터",
      game: "게임",
      design: "디자인",
      strategy: "기획_전략",
      marketing: "마케팅_광고",
      md: "상품기획_MD",
      sales: "영업",
      logistics: "무역_물류",
      driver: "운송_배송",
      legal: "법률_법무",
      hr: "HR_총무",
      accounting: "회계_재무_세무",
      finance: "증권_운용",
      bank: "은행_카드_보험",
      research: "엔지니어링_RND",
      construction: "건설_건축",
      production: "생산_기능직",
      medical: "의료_보건",
      public: "공공_복지",
      education: "교육",
      media: "미디어_엔터",
      customer: "고객상담_TM",
      service: "서비스",
      food: "식음료",
    };
    return categoryMap[categorySlug] || "IT_개발";
  };

  // 카테고리별 제목 매핑
  const getCategoryTitle = (categorySlug: string) => {
    const category = jobCategories.find(
      (c) => c.href.slice(1) === categorySlug
    );
    return category?.name || "전체";
  };

  const jobParam = getJobParam(slug);
  const { data, isLoading, error } = usePopularRecruitments(jobParam);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex w-full border px-7 py-4 border-neutral-200 rounded-lg items-center gap-5">
        <div className="w-45">
          <h3 className="text-purple-800 text-sm font-semibold">
            {getCategoryTitle(slug)} 실시간 공고
          </h3>
          <p className="text-neutral-400 text-[10px] font-medium">로딩 중...</p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-neutral-400 text-sm">
            데이터를 불러오는 중입니다...
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="flex w-full border px-7 py-4 border-neutral-200 rounded-lg items-center gap-5">
        <div className="w-45">
          <h3 className="text-purple-800 text-sm font-semibold">
            {getCategoryTitle(slug)} 실시간 공고
          </h3>
          <p className="text-neutral-400 text-[10px] font-medium">오류 발생</p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-red-500 text-sm">
            데이터를 불러올 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

  // 데이터가 없을 때
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="flex w-full border px-7 py-4 border-neutral-200 rounded-lg items-center gap-5">
        <div className="w-45">
          <h3 className="text-purple-800 text-sm font-semibold">
            {getCategoryTitle(slug)} 실시간 공고
          </h3>
          <p className="text-neutral-400 text-[10px] font-medium">
            {new Date().toLocaleString("ko-KR")}
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-neutral-400 text-sm">인기 공고가 없습니다.</div>
        </div>
      </div>
    );
  }

  // 상위 3개만 표시
  const topItems = data.data.slice(0, 3);

  return (
    <div className="flex w-full border px-7 py-4 border-neutral-200 rounded-lg items-center gap-5">
      <div className="w-45">
        <h3 className="text-purple-800 text-sm font-semibold">
          {getCategoryTitle(slug)} 실시간 공고
        </h3>
        <p className="text-neutral-400 text-[10px] font-medium">
          {new Date().toLocaleString("ko-KR")}
        </p>
      </div>

      <div className="w-0 h-11 border border-dashed border-zinc-200"></div>

      <div className="flex gap-6 w-full justify-between">
        {topItems.map((item, index) => (
          <section key={item.id} className="flex">
            <div className="flex gap-2 items-center">
              <p className="text-purple-800 text-lg font-medium pb-3">
                {index + 1}
              </p>
              <div className="flex flex-col">
                <p className="text-zinc-800 text-Subheading3-14m truncate max-w-[250px]">
                  {item.title}
                </p>
                <p className="text-zinc-600 text-Subheading4-12m">
                  {item.companyName}
                </p>
              </div>
              <p className="text-red-500 text-xs font-medium pb-4">
                {item.views}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
