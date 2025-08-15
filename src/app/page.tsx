import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Header */}
      <header className="relative w-full md:px-10">
        <div className="relative z-10 box-border flex w-full flex-row items-center justify-between py-5 md:py-3">
          <div className="ml-3 flex items-center gap-5">
            <Link href="/" className="mr-4 flex-shrink-0 md:flex-shrink">
              <Image
                alt="logo"
                width={76}
                height={40}
                className="h-[24px] w-[60.5px] md:h-[40px] md:w-[76px]"
                src="https://zighang.com/header_logo_new.svg"
              />
            </Link>
            <div className="flex items-center gap-8">
              <div
                className="relative hidden hbp:block"
                style={{ display: "hidden" }}
              >
                <Link href="/" className="pointer-events-auto relative">
                  <div className="text-[#353535] ds-web-navi">채용 공고</div>
                </Link>
                <div className="absolute w-full border border-primary/80"></div>
              </div>
              <div
                className="relative hidden hbp:block"
                style={{ display: "hidden" }}
              >
                <Link href="/company" className="pointer-events-auto relative">
                  <div className="text-[#353535] ds-web-navi">기업별</div>
                </Link>
              </div>
              <div className="relative hidden sm:block">
                <Link
                  href="/pages/jobs/today"
                  className="pointer-events-auto relative"
                >
                  <div className="text-[#353535] ds-web-navi">실시간 공고</div>
                </Link>
              </div>
              <div
                className="relative hidden hbp:block"
                style={{ display: "hidden" }}
              >
                <Link
                  href="https://tally.so/r/nPYly5"
                  className="pointer-events-auto relative"
                  target="_blank"
                >
                  <div className="text-[#353535] ds-web-navi">공고 제보</div>
                </Link>
              </div>
              <div
                className="relative hidden hbp:block"
                style={{ display: "hidden" }}
              >
                <Link
                  href="https://linktr.ee/zighang_chat"
                  className="pointer-events-auto relative"
                  target="_blank"
                >
                  <div className="text-[#353535] ds-web-navi">오픈 채팅</div>
                </Link>
              </div>
            </div>
          </div>
          <section className="flex flex-1 items-center justify-end gap-3 md:gap-6">
            <div>
              <div className="relative hidden sm:block">
                <Link href="/hiring" className="pointer-events-auto relative">
                  <div className="text-[#353535] ds-web-navi">기업회원</div>
                </Link>
              </div>
            </div>
            <Link href="/join" rel="nofollow">
              <div className="flex min-h-8 items-center justify-center px-2 text-[#6F00B6] md:min-h-10 md:rounded-lg md:border md:border-line md:px-4 md:py-[0px] ds-Button2-16sb">
                로그인 / 회원가입
              </div>
            </Link>
          </section>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative w-full md:px-10 md:max-w-screen-xl overflow-visible md:mx-auto">
        <section className="flex w-full flex-col items-center pb-0 pt-0 md:pb-0 md:pt-[40px]">
          <div className="flex w-full flex-col items-center gap-5 pt-5 md:pt-0">
            <div className="flex flex-col items-center gap-1 text-[18px] font-bold md:flex-row md:text-[22px]">
              <span>대기업 및 유니콘 채용 공고를</span>
              <span className="text-[#6F00B6]">빠짐없이 모두</span>
              <span> 모았어요.</span>
            </div>
            <section className="flex w-full flex-1 items-center justify-center px-4 md:px-0">
              <div className="relative flex items-center justify-between h-14 rounded-2xl border-2 border-[#EDEDED] bg-[#F7F7F7] p-5 w-full text-[#999999] md:max-w-[640px]">
                <input
                  type="text"
                  placeholder="검색어를 입력해 주세요"
                  className="w-full text-zighangtext-60 tracking-[0][font-family:'Pretendard-Medium',Helvetica] relative h-5 whitespace-nowrap bg-[#F7F7F7] text-sm font-medium leading-5 md:text-lg outline-none"
                />
                <div className="flex cursor-pointer items-center">
                  <Image
                    alt="검색 아이콘"
                    width={28}
                    height={28}
                    className="relative mb-[-6.00px] mt-[-6.00px] h-7 w-7"
                    src="https://zighang.com/icon/search_gray.svg"
                  />
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* Stats */}
        <div className="flex w-full items-center justify-center py-5 md:py-6">
          <div className="relative inline-flex items-center gap-2 md:gap-4">
            <Link
              className="relative inline-flex flex-[0_0_auto] cursor-pointer items-center gap-1"
              href="/company"
            >
              <p className="relative w-fit whitespace-nowrap text-sm font-semibold leading-[normal] tracking-[0] md:text-base">
                <span className="text-[#6F00B6]">33764개 기업</span>
                <span className="text-[#646464]"> 전체 보기</span>
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right text-[#646464]"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </Link>
            <Link
              className="relative inline-flex flex-[0_0_auto] cursor-pointer items-center gap-1"
              href="/all"
            >
              <p className="relative w-fit whitespace-nowrap text-sm font-semibold leading-[normal] tracking-[0] md:text-base">
                <span className="text-[#6F00B6]">94184개 공고</span>
                <span className="text-[#646464]"> 전체 보기</span>
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right text-[#646464]"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Job Categories */}
        <div className="flex flex-col px-5 py-0 md:gap-9 md:px-[60px] md:pb-9">
          <div className="relative flex w-full flex-col items-center gap-4 px-0 py-0 md:gap-9 md:py-8 lg:py-0">
            <div className="mx-auto grid w-full max-w-[900px] grid-cols-3 gap-[1px] overflow-hidden rounded-[20px] md:grid-cols-4 lg:grid-cols-5">
              {jobCategories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="relative flex h-[44px] w-full items-center gap-2 bg-[#f7f7f7] px-2 py-0 md:h-[68px] md:px-4"
                >
                  <Image
                    alt={category.name}
                    width={20}
                    height={20}
                    className="h-3.5 w-3.5 flex-shrink-0 md:h-5 md:w-5"
                    src={category.icon}
                  />
                  <p className="w-fit whitespace-nowrap text-xs font-normal leading-normal text-black md:text-base md:font-medium">
                    <span className="tracking-[0.05px]">{category.name}</span>
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Banner Carousel - 임시로 제거됨 */}
          <div className="relative w-full overflow-visible px-0 md:mx-auto">
            <div className="flex w-full flex-col items-center justify-center py-8 md:py-0">
              <div className="relative mx-auto w-full max-w-[900px]">
                <div className="relative w-full px-0 sm:px-2 md:px-0">
                  <div className="relative flex w-full cursor-pointer items-center justify-center bg-gray-100 rounded-lg h-[100px] sm:h-[120px] md:h-[136px]">
                    <p className="text-gray-500">
                      배너 이미지가 여기에 표시됩니다
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex w-full flex-1 flex-col justify-end">
        <div className="h-[400px] w-full bg-[#F6F6FA] md:h-[300px]">
          <div className="relative w-full md:px-10 md:max-w-screen-xl overflow-visible md:mx-auto">
            <div className="flex w-full flex-col gap-5 px-5 py-6 md:gap-5 md:px-[60px] md:py-12">
              <div className="relative h-[24px] w-[65px] md:h-[24px] md:w-[65px]">
                <Image
                  alt="logo"
                  fill
                  className="object-cover"
                  src="https://zighang.com/header_logo_new.svg"
                />
              </div>
              <div className="text-xs text-[#71717A]">
                <div className="flex flex-wrap items-center gap-2 font-medium">
                  <span>주식회사 직행</span>
                  <div className="h-3 w-[1px] bg-[#B3B3BA]"></div>
                  <span>서울특별시 성동구 왕십리로 222</span>
                  <div className="h-3 w-[1px] bg-[#B3B3BA]"></div>
                  <span>대표 : 이재헌</span>
                  <div className="h-3 w-[1px] bg-[#B3B3BA]"></div>
                  <a href="mailto:paca@zighang.com">
                    이메일 : paca@zighang.com
                  </a>
                  <div className="h-3 w-[1px] bg-[#B3B3BA]"></div>
                  <a href="tel:010-9862-5855">연락처 : 010-9862-5855</a>
                  <div className="h-3 w-[1px] bg-[#B3B3BA]"></div>
                  <span>사업자등록 : 684-81-03629</span>
                  <div className="h-3 w-[1px] bg-[#B3B3BA]"></div>
                  <span>직업정보제공사업 신고번호: J1202020240011</span>
                  <div className="h-3 w-[1px] bg-[#B3B3BA]"></div>
                  <span>
                    <a
                      className="hover:underline"
                      target="_blank"
                      href="https://quasar-guava-e9f.notion.site/1f5144e6653280fe9217f4a46a343de0"
                    >
                      이용약관
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const jobCategories = [
  {
    name: "IT·개발",
    href: "/it",
    icon: "https://zighang.com/depth1-renew/computer.svg",
  },
  {
    name: "AI·데이터",
    href: "/ai",
    icon: "https://zighang.com/depth1-renew/memory.svg",
  },
  {
    name: "게임",
    href: "/game",
    icon: "https://zighang.com/depth1-renew/sports-esports.svg",
  },
  {
    name: "디자인",
    href: "/design",
    icon: "https://zighang.com/depth1-renew/design-services.svg",
  },
  {
    name: "기획·전략",
    href: "/strategy",
    icon: "https://zighang.com/depth1-renew/assignment-purple.svg",
  },
  {
    name: "마케팅·광고",
    href: "/marketing",
    icon: "https://zighang.com/depth1-renew/storefront.svg",
  },
  {
    name: "상품기획·MD",
    href: "/md",
    icon: "https://zighang.com/depth1-renew/sell.svg",
  },
  {
    name: "영업",
    href: "/sales",
    icon: "https://zighang.com/depth1-renew/point-of-sale-blue.svg",
  },
  {
    name: "무역·물류",
    href: "/logistics",
    icon: "https://zighang.com/depth1-renew/warehouse.svg",
  },
  {
    name: "운송·배송",
    href: "/driver",
    icon: "https://zighang.com/depth1-renew/storefront.svg",
  },
  {
    name: "법률·법무",
    href: "/legal",
    icon: "https://zighang.com/depth1-renew/balance.svg",
  },
  {
    name: "HR·총무",
    href: "/hr",
    icon: "https://zighang.com/depth1-renew/people.svg",
  },
  {
    name: "회계·재무·세무",
    href: "/accounting",
    icon: "https://zighang.com/depth1-renew/table-view.svg",
  },
  {
    name: "증권·운용",
    href: "/finance",
    icon: "https://zighang.com/depth1-renew/query-stats.svg",
  },
  {
    name: "은행·카드·보험",
    href: "/bank",
    icon: "https://zighang.com/depth1-renew/account-balance.svg",
  },
  {
    name: "엔지니어링·R&D",
    href: "/research",
    icon: "https://zighang.com/depth1-renew/architecture.svg",
  },
  {
    name: "건설·건축",
    href: "/construction",
    icon: "https://zighang.com/depth1-renew/apartment.svg",
  },
  {
    name: "생산·기능직",
    href: "/production",
    icon: "https://zighang.com/depth1-renew/assignment.svg",
  },
  {
    name: "의료·보건",
    href: "/medical",
    icon: "https://zighang.com/depth1-renew/vaccines.svg",
  },
  {
    name: "공공·복지",
    href: "/public",
    icon: "https://zighang.com/depth1-renew/volunteer-activism.svg",
  },
  {
    name: "교육",
    href: "/education",
    icon: "https://zighang.com/depth1-renew/school.svg",
  },
  {
    name: "미디어·엔터",
    href: "/media",
    icon: "https://zighang.com/depth1-renew/ondemand-video.svg",
  },
  {
    name: "고객상담·TM",
    href: "/customer",
    icon: "https://zighang.com/depth1-renew/point-of-sale.svg",
  },
  {
    name: "서비스",
    href: "/service",
    icon: "https://zighang.com/depth1-renew/handshake.svg",
  },
  {
    name: "식음료",
    href: "/food",
    icon: "https://zighang.com/depth1-renew/restaurant-menu.svg",
  },
];
