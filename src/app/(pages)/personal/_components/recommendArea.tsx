import RecruitmentCard from "../../onboarding/_components/RecommendCard/RecruitmentCard";

// 임시 목업 데이터 삭제 예정

const mockRecruitments = [
  {
    experience: "신입 · 1년차",
    logo: "/logos/google.png",
    title: "Frontend Engineer",
    company: "Google",
    location: "서울 · 강남구",
  },
  {
    experience: "3년 이상",
    logo: "/logos/samsung.png",
    title: "Backend Developer",
    company: "Samsung Electronics",
    location: "수원 · 본사",
  },
  {
    experience: "경력 무관",
    logo: "/logos/coupang.png",
    title: "Product Manager",
    company: "Coupang",
    location: "서울 · 송파구",
  },
];

export default function RecommendArea() {
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center mb-4">
        <div className="justify-center text-black text-lg md:text-xl font-semibold">
          <span className="text-purple-800 text-lg md:text-xl font-semibold mr-1">
            초개인화
          </span>
          추천 공고
          <span className="text-purple-800 text-lg md:text-xl font-semibold ml-1">
            N
          </span>
          건
        </div>
      </div>

      <div className="relative w-full max-w-[787px] h-[400px] md:h-43">
        <div className="absolute inset-0 z-0 flex flex-col md:flex-row items-center justify-center gap-4 px-6">
          {mockRecruitments.map((item, idx) => (
            <RecruitmentCard key={idx} {...item} />
          ))}
        </div>

        <div className="absolute inset-0 z-10 rounded-lg overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-[5px] bg-white/20" />
          <div className="absolute inset-0 outline outline-2 outline-offset-[-2px] outline-gray-100 pointer-events-none" />
        </div>

        <div
          className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                 w-56 h-20 px-4 py-4 bg-violet-50 rounded-lg
                 outline outline-1 outline-offset-[-1px] outline-purple-200
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
            <span className="text-black text-sm font-semibold">받아보세요</span>
          </div>
        </div>
      </div>
    </div>
  );
}
