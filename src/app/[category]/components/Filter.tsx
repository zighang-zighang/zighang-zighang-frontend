type FilterProps = {
  activated?: boolean;
  onClick?: () => void;
};

export default function Filter({ activated = false, onClick }: FilterProps) {
  return (
    <button
      onClick={onClick}
      aria-label={activated ? "필터 임시 해제" : "필터 적용"}
      className={`flex h-10 w-10 items-center justify-center rounded-lg md:h-11 md:w-11 active:bg-[#E4DAFF] md:hover:bg-gray-100
        ${
          activated
            ? " bg-violet-100"
            : "  bg-white hover:bg-gray-100 active:bg-gray-200 text-[#71717A]"
        }`}
    >
      <img
        alt="필터 아이콘"
        loading="lazy"
        width="0"
        height="0"
        decoding="async"
        data-nimg="1"
        className="h-5 w-5"
        style={{
          color: "transparent",
          filter: activated ? "none" : "grayscale(100%)",
        }}
        src="https://zighang.com/icon/filter.svg"
      />
    </button>
  );
}
