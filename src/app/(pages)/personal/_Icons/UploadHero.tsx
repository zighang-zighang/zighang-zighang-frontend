"use client";

import * as React from "react";

/** UploadHero: 업로드 카드 섹션 */
export default function UploadHero() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl p-6 md:p-10">
      {/* 배경 블러 원 */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full blur-3xl bg-white/20" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl bg-purple-300/20" />
      </div>

      {/* ✅ 아이콘 + 카드 스택 가로 배치 래퍼 */}
      <div className="relative mx-auto h-48 w-80 md:h-56 md:w-[420px]">
        {/* 왼쪽: 아이콘 */}
        <div className="absolute inset-0 grid place-items-center">
          <CloudUploadIcon />
        </div>

        <TagPill className="absolute -left-6 bottom-6">#3초업로드</TagPill>
        <TagPill className="absolute right-0 top-1/3">#이력서 가능</TagPill>
        <TagPill className="absolute right-10 bottom-0">#맞춤공고</TagPill>
      </div>
    </div>
  );
}

/** 말풍선 Pill */
function TagPill({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        "select-none rounded-full px-3 py-1 text-xs font-semibold",
        "bg-white/25 text-white backdrop-blur-[2px]",
        "shadow-[0_6px_14px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.35)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

/** 업로드 아이콘 (SVG) */
function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="173"
      height="204"
      viewBox="0 0 173 204"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_dn_3768_23940)">
        <path
          d="M21.8289 185.24C39.9649 153.774 48.8245 78.6979 51.1939 41.8881C51.2726 40.6654 52.4167 39.8252 53.6164 40.0744C83.4945 46.2804 113.118 47.7506 165.787 40.8927C167.068 40.7259 168.193 41.7777 168.062 43.0634C163.281 90.0333 155.757 158.159 147.8 189.408C147.573 190.301 146.764 190.887 145.843 190.869L23.5587 188.404C21.9824 188.372 21.0417 186.606 21.8289 185.24Z"
          fill="url(#paint0_linear_3768_23940)"
        />
      </g>
      <g filter="url(#filter1_dn_3768_23940)">
        <path
          d="M4.68413 160.955C23.0917 129.91 32.0648 53.9961 34.4517 16.915C34.5304 15.6922 35.6745 14.852 36.8742 15.1012C66.7523 21.3072 96.3757 22.7774 149.044 15.9196C150.326 15.7528 151.451 16.8109 151.319 18.0966C146.483 65.5251 139.383 126.318 123.178 148.341C98.4353 181.966 21.4249 167.325 5.91787 163.975C4.5625 163.682 3.97717 162.148 4.68413 160.955Z"
          fill="url(#paint1_linear_3768_23940)"
        />
      </g>
      <g filter="url(#filter2_n_3768_23940)">
        <path
          d="M109.457 139.58C106.188 156.807 90.1718 163.983 84.1596 168.32C123.992 162.326 129.968 142.348 137.437 112.38C131.845 127.454 126.116 137.107 111.49 137.811C110.489 137.859 109.644 138.596 109.457 139.58Z"
          fill="url(#paint2_linear_3768_23940)"
        />
      </g>
      <g filter="url(#filter3_d_3768_23940)">
        <path
          d="M84.2119 59.9355C94.8915 59.9355 103.55 68.6534 103.55 79.333C103.55 79.7105 103.537 80.0857 103.516 80.458C113.608 81.1413 121.583 89.5438 121.583 99.8096C121.583 110.522 112.898 119.206 102.186 119.206H66.21C55.4972 119.206 46.8127 110.522 46.8125 99.8096C46.8126 89.5343 54.8024 81.1257 64.9082 80.4561C64.8869 80.0844 64.875 79.7099 64.875 79.333C64.8751 68.6535 73.5325 59.9357 84.2119 59.9355ZM84.7676 81.6367C84.3989 81.1707 83.6979 81.1544 83.3076 81.6025L73.041 93.3916C72.5068 94.0058 72.9428 94.9644 73.7568 94.9648H81.1328V106.817H85.8594V94.9648H93.3447C94.1382 94.9648 94.582 94.0482 94.0898 93.4258L84.7676 81.6367Z"
          fill="#EBDCF5"
        />
      </g>
      <defs>
        <filter
          id="filter0_dn_3768_23940"
          x="17.5469"
          y="40.0305"
          width="154.527"
          height="158.839"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.423749 0 0 0 0 0.254 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3768_23940"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="2 2"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="36"
          />
          <feColorMatrix
            in="noise"
            type="luminanceToAlpha"
            result="alphaNoise"
          />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feFlood floodColor="#C1AFFF" result="color1Flood" />
          <feComposite
            operator="in"
            in2="noise1Clipped"
            in="color1Flood"
            result="color1"
          />
          <feMerge result="effect2_noise_3768_23940">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
          <feBlend
            mode="normal"
            in="effect2_noise_3768_23940"
            in2="effect1_dropShadow_3768_23940"
            result="effect2_noise_3768_23940"
          />
        </filter>
        <filter
          id="filter1_dn_3768_23940"
          x="0.382812"
          y="15.0574"
          width="154.945"
          height="162.969"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.423749 0 0 0 0 0.254 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3768_23940"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="2 2"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="36"
          />
          <feColorMatrix
            in="noise"
            type="luminanceToAlpha"
            result="alphaNoise"
          />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feFlood floodColor="#C1AFFF" result="color1Flood" />
          <feComposite
            operator="in"
            in2="noise1Clipped"
            in="color1Flood"
            result="color1"
          />
          <feMerge result="effect2_noise_3768_23940">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
          <feBlend
            mode="normal"
            in="effect2_noise_3768_23940"
            in2="effect1_dropShadow_3768_23940"
            result="effect2_noise_3768_23940"
          />
        </filter>
        <filter
          id="filter2_n_3768_23940"
          x="84.1602"
          y="112.38"
          width="53.2773"
          height="55.9399"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="2 2"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="2798"
          />
          <feColorMatrix
            in="noise"
            type="luminanceToAlpha"
            result="alphaNoise"
          />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA
              type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in2="shape"
            in="coloredNoise1"
            result="noise1Clipped"
          />
          <feFlood floodColor="rgba(169, 67, 237, 0.25)" result="color1Flood" />
          <feComposite
            operator="in"
            in2="noise1Clipped"
            in="color1Flood"
            result="color1"
          />
          <feMerge result="effect1_noise_3768_23940">
            <feMergeNode in="shape" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
        <filter
          id="filter3_d_3768_23940"
          x="44.8125"
          y="59.9355"
          width="82.7695"
          height="67.2705"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="2" dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.482353 0 0 0 0 0.32549 0 0 0 0 1 0 0 0 0.32 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_3768_23940"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_3768_23940"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_3768_23940"
          x1="91.6222"
          y1="77.9164"
          x2="154.874"
          y2="204.262"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EBDCF5" />
          <stop offset="1" stopColor="#CE8AFC" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3768_23940"
          x1="74.88"
          y1="52.9433"
          x2="138.132"
          y2="179.289"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#EBDCF5" />
          <stop offset="1" stopColor="#CE8AFC" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_3768_23940"
          x1="108.789"
          y1="114.511"
          x2="131.745"
          y2="155.273"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.350466" stopColor="#DEADFF" />
          <stop offset="1" stopColor="#7951FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
