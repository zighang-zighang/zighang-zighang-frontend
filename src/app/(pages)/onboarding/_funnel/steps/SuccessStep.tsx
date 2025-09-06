"use client";
import { useRouter } from "next/navigation";
import { StepContainer } from "../../_components";
import RecruitmentCardList from "../../_components/RecommendCard/RecruitmentCardList";

// 임시 데이터 api 연동시 삭제
const mock = [
  {
    id: "1",
    experience: "1년차 이상",
    logo: "/",
    title: "프론트엔드 엔지니어",
    company: "ACME",
    location: "서울 강남구",
  },
  {
    id: "2",
    experience: "신입 가능",
    logo: "/",
    title: "백엔드 개발자 (Java)",
    company: "BetaSoft",
    location: "서울 마포구",
  },
  {
    id: "3",
    experience: "3년차 이상",
    logo: "/",
    title: "풀스택 엔지니어",
    company: "CyberWorks",
    location: "경기 성남시",
  },
  {
    id: "4",
    experience: "2년차 이상",
    logo: "/",
    title: "데이터 분석가",
    company: "Delta Analytics",
    location: "서울 송파구",
  },
  {
    id: "5",
    experience: "신입 가능",
    logo: "/",
    title: "모바일 앱 개발자 (iOS)",
    company: "Echo Mobile",
    location: "부산 해운대구",
  },
  {
    id: "6",
    experience: "5년차 이상",
    logo: "/",
    title: "DevOps 엔지니어",
    company: "FoxTech",
    location: "서울 용산구",
  },
  {
    id: "7",
    experience: "경력무관",
    logo: "/",
    title: "QA 엔지니어",
    company: "Green Labs",
    location: "대전 유성구",
  },
  {
    id: "8",
    experience: "2년차 이상",
    logo: "/",
    title: "AI 리서처",
    company: "Helios AI",
    location: "서울 강동구",
  },
  {
    id: "9",
    experience: "신입 가능",
    logo: "/",
    title: "UI/UX 디자이너",
    company: "Iris Studio",
    location: "인천 연수구",
  },
  {
    id: "10",
    experience: "4년차 이상",
    logo: "/",
    title: "프로덕트 매니저",
    company: "Jupiter Systems",
    location: "서울 서초구",
  },
];

export default function SuccessStep({ name }: { name: string }) {
  const router = useRouter();
  return (
    <StepContainer>
      <div className="flex flex-col items-center">
        <button
          className="w-9 h-9 bg-neutral-100 rounded-full flex justify-center items-center ml-auto mr-5 mt-4"
          onClick={() => router.push("/")}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0004 13.4L9.08339 16.325C8.89939 16.5084 8.66472 16.6 8.37939 16.6C8.09406 16.6 7.85939 16.5084 7.67539 16.325C7.49206 16.1417 7.40039 15.9084 7.40039 15.625C7.40039 15.3417 7.49206 15.1084 7.67539 14.925L10.6004 12L7.67539 9.10805C7.49206 8.92405 7.40039 8.68938 7.40039 8.40405C7.40039 8.11938 7.49206 7.88472 7.67539 7.70005C7.85872 7.51672 8.09206 7.42505 8.37539 7.42505C8.65872 7.42505 8.89206 7.51672 9.07539 7.70005L12.0004 10.625L14.8924 7.70005C15.0764 7.51672 15.3111 7.42505 15.5964 7.42505C15.8811 7.42505 16.1157 7.51672 16.3004 7.70005C16.5004 7.90005 16.6004 8.13738 16.6004 8.41205C16.6004 8.68672 16.5004 8.91605 16.3004 9.10005L13.3754 12L16.3004 14.917C16.4837 15.101 16.5754 15.3357 16.5754 15.621C16.5754 15.9064 16.4837 16.141 16.3004 16.325C16.1004 16.525 15.8631 16.625 15.5884 16.625C15.3137 16.625 15.0844 16.525 14.9004 16.325L12.0004 13.4Z"
              fill="#4D4D4D"
            />
          </svg>
        </button>
        <div className="bg-violet-500 rounded-full w-20 h-20 mt-8"></div>
        <p className="text-2xl font-semibold mt-3.5">반가워요 {name}님!</p>
        <p className="text-neutral-500 text-lg font-semibold">
          {name.slice(1)}님에게 딱 맞는 공고를 파악 완료했어요!
        </p>

        <section
          className="mx-auto w-full mt-7 relative overflow-hidden
    [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]
    [mask-size:100%_100%] [mask-repeat:no-repeat]"
        >
          <RecruitmentCardList items={mock} />
        </section>
        <button
          className="text-white text-base font-semibold px-16 py-3 bg-violet-500 rounded-lg mt-11"
          onClick={() => router.push("/")}
        >
          맞춤 공고 바로가기
        </button>
      </div>
    </StepContainer>
  );
}
