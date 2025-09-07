interface PeopleOrgGrowthIconProps extends React.SVGProps<SVGSVGElement> {
  isSelected?: boolean;
}

export function PeopleOrgGrowthIcon({
  isSelected = false,
  ...props
}: PeopleOrgGrowthIconProps) {
  return (
    <svg
      viewBox="0 0 51 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        style={
          isSelected
            ? {
                // 흰색 + 보라빛 글로우
                filter:
                  "drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 0 8px rgba(159,85,206,0.55))",
              }
            : undefined
        }
      >
        <rect x="0.226318" width="50" height="50" rx="8.33333" fill="#ECD5FF" />
        <rect
          x="9.35522"
          y="31.1182"
          width="8.47056"
          height="9.88232"
          rx="1"
          fill="#9F55CE"
        />
        <rect
          x="20.8257"
          y="23.353"
          width="8.47056"
          height="17.647"
          rx="1"
          fill="#9F55CE"
        />
        <rect
          x="32.2964"
          y="18.4121"
          width="8.47056"
          height="22.5882"
          rx="1"
          fill="#9F55CE"
        />
        <path
          d="M8.99976 26.1762H14.7274C15.3446 26.1762 15.9272 25.8913 16.3062 25.4041L20.0462 20.5954C20.4252 20.1082 21.0078 19.8233 21.6249 19.8233H26.8772C27.4076 19.8233 27.9163 19.6126 28.2914 19.2375L35.4703 12.0586"
          stroke="#4B007C"
          strokeWidth={2.11764}
          strokeLinecap="round"
        />
        <path
          d="M38.2856 8.12182C38.8006 7.94868 39.31 8.39803 39.2024 8.93066L38.2703 13.5456C38.1627 14.0782 37.5189 14.2947 37.1114 13.9352L33.5808 10.8205C33.1733 10.461 33.3078 9.7952 33.8229 9.62205L38.2856 8.12182Z"
          fill="#4B007C"
        />
      </g>
    </svg>
  );
}
