import Image from "next/image";

export default function SearchSection() {
  return (
    <section className="flex w-full flex-col items-center pb-0 pt-0 md:pb-0 md:pt-[40px]">
      <div className="flex w-full flex-col items-center gap-5 pt-5 md:pt-0">
        <div className="flex flex-col items-center gap-1 text-[18px] font-bold md:flex-row md:text-[22px]">
          <span>대기업 및 유니콘 채용 공고를</span>
          <div className="flex items-center">
            <span className="text-[#6F00B6]">빠짐없이 모두</span>
            <span>&nbsp;모았어요.</span>
          </div>
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
  );
}
