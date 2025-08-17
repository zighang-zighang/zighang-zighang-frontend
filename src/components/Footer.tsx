import Image from "next/image";

export default function Footer() {
  return (
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
  );
}
