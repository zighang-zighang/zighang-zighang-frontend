export default function PersonalBanner() {
  return (
    <div className="max-w-[786px] md:w-[786px] h-64 bg-gradient-to-br from-violet-500 via-violet-500/70 to-violet-500 rounded-lg">
      <div className="h-14 relative">
        <p className="w-46 md:w-full left-0 top-[5px] absolute justify-start text-purple-300 text-sm md:text-lg font-semibold leading-normal [text-shadow:_0px_4px_9px_rgb(111_0_182_/_0.51)]">
          내 자소서로 찾는 0.001% 미만의 최적 공고! <br />
          자소서 3초 업로드하고 숨은 공고를 확인하세요
        </p>
        <p className="w-1 h-1 left-[129.55px] top-0 absolute bg-white rounded-full"></p>
        <p className="w-1 h-1 left-[140.66px] top-0 absolute bg-white rounded-full"></p>
      </div>
    </div>
  );
}
