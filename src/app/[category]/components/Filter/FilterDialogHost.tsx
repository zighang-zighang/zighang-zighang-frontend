"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useFilterDialog } from "@/app/hooks/useFilterDialog";

export default function FilterDialogHost() {
  const { open, closeDialog, section, openDialog } = useFilterDialog();

  return (
    <Dialog.Root open={open} onOpenChange={(v) => (!v ? closeDialog() : null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <Dialog.Content
          className="fixed z-50 grid bg-white p-0 shadow-lg outline-none duration-200
    data-[state=open]:animate-in data-[state=open]:zoom-in-95
    /* 모바일: 전체 덮기 */
    inset-0 h-[100dvh] w-screen overflow-x-hidden
    /* 데스크톱(md↑): 카드형 중앙 정렬 */
    md:left-1/2 md:top-1/2 md:inset-auto md:translate-x-[-50%] md:translate-y-[-50%]
    md:h-auto md:w-full md:max-h-[660px] md:max-w-[617px] md:rounded-lg"
        >
          <div className="sticky top-0 z-50 flex w-full flex-col items-center justify-center gap-3 border-b border-[#EDEDED] bg-white py-4 text-center">
            <Dialog.Title className="ds-web-filter text-lg font-semibold">
              필터
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="absolute right-5 top-2 flex h-7 w-7 items-center justify-center rounded-full hover:bg-zinc-100 active:bg-zinc-200">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M18 6 6 18" stroke="currentColor" strokeWidth="2" />
                  <path d="m6 6 12 12" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </Dialog.Close>
          </div>

          <div className="flex w-full flex-col gap-10 overflow-y-auto px-5 py-5">
            {section === "all" && (
              <>
                <PlatformSection />
                <JobGroupSection />
                <JobRoleSection />
                <TypeSection />
                <EducationSection />
                <CareerSection />
                <RegionSection />
                <DeadlineSection />
              </>
            )}
            <div className="h-[200px]" />
          </div>

          <div className="bottom-0 z-50 flex h-[84px] w-full items-center justify-center bg-white">
            <section className="flex h-full w-full items-center justify-center gap-5 rounded-b-xl border border-[#EDEDED] px-5 py-4 text-base font-bold">
              <button className="flex items-center gap-2 rounded-lg border-2 border-[#EDEDED] px-5 py-4 text-[#363636] hover:bg-zinc-100 active:bg-zinc-200">
                초기화
              </button>
              <button className="flex-1 rounded-lg bg-primary px-5 py-4 text-white active:bg-primary/85">
                1개 공고 보기
              </button>
            </section>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Block({ title, sub }: { title: string; sub?: string }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-[18px] font-bold">{title}</span>
        {sub && (
          <span className="text-xs font-normal text-[#999999]">{sub}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-[6px]">
        <button className="flex min-w-14 items-center justify-center rounded-lg border px-4 py-3 text-sm">
          전체
        </button>
      </div>
    </section>
  );
}
const PlatformSection = () => <Block title="플랫폼" sub="중복 선택 가능" />;
const JobGroupSection = () => <Block title="직군" />;
const JobRoleSection = () => (
  <section className="flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <span className="text-[18px] font-bold">직무</span>
      <span className="text-xs font-normal text-[#999999]">중복 선택 가능</span>
    </div>
    <div className="flex flex-col items-center justify-center gap-0.5 text-sm font-medium text-[#999999]">
      <span>직군을 먼저 선택하면</span>
      <span>구체적인 직무도 선택할 수 있어요.</span>
    </div>
  </section>
);
const TypeSection = () => <Block title="채용 유형" sub="중복 선택 가능" />;
const EducationSection = () => <Block title="학력 조건" sub="중복 선택 가능" />;
const CareerSection = () => <Block title="경력 조건" sub="중복 선택 가능" />;
const RegionSection = () => <Block title="지역" sub="중복 선택 가능" />;
const DeadlineSection = () => <Block title="마감 유형" sub="중복 선택 가능" />;
