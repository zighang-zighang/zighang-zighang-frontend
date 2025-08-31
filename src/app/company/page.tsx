import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Refresh from "@/app/components/Refresh";
import Toggle from "@/app/components/Toggle";
import CompanyCard from "@/app/components/Card/CompanyCard";
import { INDUSTRY, REGION, COMPANY_SIZE } from "@/app/constants/filterOptions";
import FilterTagSelect from "@/app/company/components/FilterTag";

export default function Company() {
  return (
    <main className=" flex min-h-screen flex-col items-center">
      <Header />

      <div className="relative w-full md:px-10 md:max-w-screen-xl overflow-visible md:mx-auto">
        <section
          className={`flex w-full flex-col items-center justify-center gap-5`}
        >
          <h2 className="font-bold ds-mobile-title2 text-left md:text-[22px] md:leading-[100%]">
            대기업 및 유니콘 기업을{" "}
            <span className="text-[#7a52ff]">빠짐없이 모두</span> 모았어요
          </h2>

          <form
            role="search"
            aria-label="기업 검색"
            className="w-full px-4 md:px-0 lg:px-0"
          >
            <div className="mx-auto flex w-full justify-center md:mx-0">
              <div className="flex h-11 w-full items-center rounded-[12px]  border border-[#7a52ff] bg-white py-2.5 pl-5 md:h-auto md:w-[600px] md:rounded-[16px] md:pl-7 ">
                <input
                  type="search"
                  placeholder="기업 이름을 검색해보세요"
                  aria-label="기업 이름"
                  className="ds-mobile-subtitle1 w-full text-start caret-primary outline-none md:text-[18px] md:font-medium md:tracking-wide "
                  spellCheck={false}
                />
                <button
                  type="submit"
                  className="mr-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-primaryLight/30 active:bg-primaryLight/50 md:mr-5"
                  aria-label="검색"
                  title="검색"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="ml-[-2px]"
                    aria-hidden="true"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M15.5 15.5 L20.5 20.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </section>

        <section className="justify sticky top-0 z-10 flex flex-col items-start w-full pt-5 gap-3 bg-white px-4 pb-2 md:flex-row md:items-end md:px-0">
          <div className="flex flex-shrink-0 items-center pt-4 md:pt-5 gap-2">
            <Refresh></Refresh>
            <div
              data-orientation="vertical"
              role="none"
              className="shrink-0 mx-1 h-7 w-[1.5px] bg-[#DDDDE1] md:mx-2"
            ></div>
            <div className="z-10 flex gap-2 overflow-x-auto md:gap-3">
              <div className="z-10 flex gap-2 overflow-x-auto md:gap-3">
                <FilterTagSelect
                  id="industry"
                  label="산업"
                  options={INDUSTRY}
                />
                <FilterTagSelect id="region" label="지역" options={REGION} />
                <FilterTagSelect
                  id="size"
                  label="기업규모"
                  options={COMPANY_SIZE}
                />
              </div>
            </div>
          </div>
        </section>
        <div className="flex w-full justify-between px-4 pt-0 md:px-0 md:pt-6">
          <div className="flex items-center">
            <div>
              <span className="flex">
                총 <p className="ml-2 text-[#7a52ff]"> 33764</p> 개
              </span>
            </div>
            <div className="mx-2 h-4 w-px border border-[#d4d4d8] md:mx-3 "></div>

            <span>채용중인 기업만</span>
            <Toggle></Toggle>
          </div>
          <div className="flex items-center text-gray-700">
            <button
              className="ds-mobile-listoption ml-auto flex items-center gap-1 rounded-lg py-3 text-sm font-bold text-[#7D7D7D] focus:outline-none active:bg-zinc-100 md:gap-2"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:r4g:"
              data-state="closed"
            >
              <img
                alt="정렬 아이콘"
                loading="lazy"
                width="16"
                height="16"
                decoding="async"
                className="h-5 w-5"
                src="https://zighang.com/icon/sort.svg"
                style={{ color: "transparent" }}
              />
              <span className="mx-1">조회수 높은 순</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="16"
                width="16"
                xmlns="https://zighang.com/icon/sort.svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
              </svg>
            </button>
          </div>
        </div>
        <div
          className="box-border flex w-full flex-col items-start pb-10 pt-0 md:flex-row md:flex-wrap md:content-start md:justify-between md:pb-12 md:pt-8"
          style={{ minHeight: "730px" }}
        >
          <CompanyCard
            slug="bagelcode"
            name="베이글코드"
            logoSrc="https://d2juy7qzamcf56.cloudfront.net/2024-10-06/f7d2267d-f249-476e-8c30-ba51a99b3199.png"
            positionsCount={32}
            companyScaleLabel="대기업"
            industry="IT·웹·통신"
            location="서울특별시 강남구"
            views={5564}
          />
          <CompanyCard
            slug="bagelcode"
            name="베이글코드"
            logoSrc="https://d2juy7qzamcf56.cloudfront.net/2024-10-06/f7d2267d-f249-476e-8c30-ba51a99b3199.png"
            positionsCount={32}
            companyScaleLabel="대기업"
            industry="IT·웹·통신"
            location="서울특별시 강남구"
            views={5564}
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}
