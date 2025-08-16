type ViewProps = {
  count: number;
  hot?: boolean;
};

export default function View({ count, hot = false }: ViewProps) {
  return (
    <div className="flex flex-row items-center gap-1">
      <img
        alt="조회수 아이콘"
        loading="lazy"
        width="0"
        height="0"
        decoding="async"
        data-nimg="1"
        className="h-[14px] w-[14px] flex-shrink-0 md:h-[20px] md:w-[20px]"
        // HOT 여부에 따라 아이콘 변경
        src={
          hot
            ? "https://zighang.com/icon/hot.svg"
            : "https://zighang.com/icon/visibility.svg"
        }
        style={{ color: "transparent" }}
      />
      <div
        className={`ds-mobile-badge-sm md:ds-web-summary`}
        style={{
          color: hot ? "var(--Zighang-Tag-Label-Red, #FF5757)" : "#71717A",
        }}
      >
        {count}
      </div>
    </div>
  );
}
