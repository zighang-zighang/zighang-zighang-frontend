import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
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
  );
}
