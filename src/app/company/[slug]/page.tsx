import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JobCardList from "@/app/components/Card/JobCardList";
import Refresh from "@/app/components/Refresh";
import FilterTagSelect from "@/app/company/components/FilterTag";
import Filter from "@/app/components/Filter";
import FilterBar from "@/app/company/components/FilterBar";
import ClientFilterProviders from "@/app/components/Filter/ClientFilterProviders";
import {
  INDUSTRY,
  REGION,
  COMPANY_SIZE,
  TYPE,
  EDUCATION,
  CAREER,
  DEADLINE,
} from "@/app/constants/filterOptions";
export default function CompanyDetail() {
  return (
    <div>
      <Header />
      <div className="w-full px-5">
        <div className="h-9 md:h-12"></div>
        <div className="w-full max-w-screen-lg pl-5 md:max-w-screen-xl">
          <div className="flex w-full flex-row items-center gap-3.5 md:gap-5">
            <div className="flex gap-2 text-xl font-bold md:text-3xl md:font-extrabold">
              <span className="text-[#7a52ff]">베이글코드</span>
              <span className="text-black">기업 정보</span>
            </div>
          </div>
        </div>
        <div className="h-9 md:h-12"></div>
        <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:gap-3">
          <div className="relative flex w-full flex-col items-start justify-center md:flex-1">
            <div className="relative flex w-full items-center justify-center">
              <img
                alt="채용 이미지"
                loading="lazy"
                width={0}
                height={0}
                decoding="async"
                className="aspect-[1/1] w-full min-w-0 max-w-[500px] rounded-2xl bg-neutral-100 object-cover shadow-md md:flex-1"
                style={{ color: "transparent" }}
                src="https://d2juy7qzamcf56.cloudfront.net/2024-10-06/f7d2267d-f249-476e-8c30-ba51a99b3199.png"
              />
              <div className="absolute bottom-1.5 left-1.5 md:bottom-2 md:left-3">
                <div
                  className="flex flex-row items-center gap-1 rounded-full px-3 py-1.5"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-sm text-white"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <div className="text-xs font-normal text-white">5665</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 md:flex-[2] md:gap-[13px]">
            {/* 상단 정보 */}
            <div className="flex w-full flex-col gap-6 rounded-2xl bg-neutral-100 p-5 md:h-[214px] md:justify-center">
              <div className="flex w-full flex-col gap-3.5">
                {/* 업종 */}
                <div className="flex flex-row items-center gap-2">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="text-sm text-neutral-700"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 5.9a2.1 2.1 0 110 4.2 2.1 2.1 0 010-4.2m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <div className="break-keep text-sm text-neutral-700">
                    IT·웹·통신
                  </div>
                </div>

                {/* 기업 형태 */}
                <div className="flex flex-row items-center gap-2">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="text-sm text-neutral-700"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 2H9c-1.103 0-2 .897-2 2v6H5c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2zM5 12h6v8H5v-8zm14 8h-6v-8c0-1.103-.897-2-2-2H9V4h10v16z" />
                    <path d="M11 6h2v2h-2zm4 0h2v2h-2zm0 4.031h2V12h-2zM15 14h2v2h-2zm-8 .001h2v2H7z" />
                  </svg>
                  <div className="break-keep text-sm text-neutral-700">
                    스타트업
                  </div>
                </div>

                {/* 주소 */}
                <div className="flex flex-row items-center gap-2">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="text-sm text-neutral-700"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                  </svg>
                  <div className="break-keep text-sm text-neutral-700">
                    서울특별시 강남구 테헤란로 328 (역삼동, 동우빌딩) 16층
                  </div>
                </div>

                {/* 채용 상태 */}
                <div className="text-primary">
                  <div className="flex flex-row items-center gap-1.5">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-sm text-primary"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                    </svg>
                    <div className="break-keep text-sm">채용 중</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 회사명 */}
            <div className="flex w-full flex-row rounded-2xl bg-neutral-100 p-5 md:h-[66px] md:items-center">
              <div className="flex flex-row items-center gap-2">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="text-sm text-neutral-700"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 2H9c-1.103 0-2 .897-2 2v6H5c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2zM5 12h6v8H5v-8zm14 8h-6v-8c0-1.103-.897-2-2-2H9V4h10v16z" />
                  <path d="M11 6h2v2h-2zm4 0h2v2h-2zm0 4.031h2V12h-2zM15 14h2v2h-2zm-8 .001h2v2H7z" />
                </svg>
                <div className="break-keep text-sm text-neutral-700">
                  베이글코드
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex h-12 w-full flex-row gap-2  md:h-14 ">
              <button
                className="flex h-full flex-[5] flex-row items-center justify-center gap-2.5 rounded-2xl bg-[#7a52ff] hover:bg-[#7a52ff]/80 active:bg-[#7a52ff]/90 md:gap-3.5"
                type="button"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="text-lg text-white"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                </svg>
                <div className="text-center text-sm font-medium text-white md:text-base">
                  기업 홈페이지 방문하기
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-11 flex justify-center rounded-3xl bg-neutral-100 px-4 py-9 text-lg font-medium md:px-16">
          <span>
            베이글코드는 혁신적인 웹 솔루션과 모바일 애플리케이션을 개발하는
            스타트업입니다.
          </span>
        </div>
      </div>

      <div className="flex w-full justify-between px-4 pt-0 md:px-0 md:pt-6">
        <div className="flex items-center text-gray-700"></div>
      </div>

      <div className="flex w-full flex-col justify-between gap-2 md:max-w-screen-xl md:flex-row md:gap-0">
        <section className="mt-4 flex flex-shrink-0 items-center gap-2 pl-6 text-[17px] font-bold md:mt-7 md:px-5 md:text-2xl">
          <div className="text-primary">LG전자</div>
          <div>채용 중인 공고</div>
        </section>
        <div className="flex flex-col justify-end">
          <section className="flex flex-row items-center gap-px pl-4 pr-5 md:pl-0"></section>
        </div>
      </div>
      <section className="sticky top-0 z-10 flex flex-row items-start w-full pt-5 gap-3 bg-white px-4 pb-2 md:flex-row md:items-end md:px-0">
        <div className="flex flex-col flex-shrink-0 items-center pt-4 md:pt-5 gap-2 px-4">
          <div className="z-10 flex gap-2 overflow-x-auto md:gap-3">
            <ClientFilterProviders>
              <div className="z-10 flex gap-2 overflow-x-auto md:gap-3">
                <FilterBar />
              </div>
            </ClientFilterProviders>
          </div>
        </div>
      </section>
      <JobCardList></JobCardList>
      <Footer />
    </div>
  );
}
