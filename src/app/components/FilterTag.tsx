type Props = {
  label: string;
  selected?: string;
  expanded?: boolean;
  id?: string;
};
export default function FilterTag({ label, selected, expanded, id }: Props) {
  return (
    <div
      className="shrink-0 inline-flex items-center rounded-[10px] border border-gray-300 bg-white h-10 md:h-11 py-2.5 pl-3 pr-2 md:pl-4 md:pr-3"
      aria-expanded={expanded}
      aria-controls={id}
    >
      <span className="ds-mobile-filter text-[#353535] md:ds-web-filter">
        {label}
      </span>
      <span className="ml-1 flex items-center">
        <span className="ds-web-filter font-normal">{selected}</span>
        <img
          className={`h-5 w-5  rotate-90`}
          src="https://zighang.com/icon/chevron_right.svg"
          alt=""
        />
      </span>
    </div>
  );
}
