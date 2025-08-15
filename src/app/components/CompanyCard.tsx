import Image from "next/image";
import Link from "next/link";
import View from "@/app/components/View";

type CompanyCardProps = {
  slug: string;
  name: string;
  logoSrc: string;
  positionsCount: number;
  companyScaleLabel: string;
  industry: string;
  location: string;
  views?: number;
  hot?: boolean; // HOT 여부
  className?: string;
};

export default function CompanyCard({
  slug,
  name,
  logoSrc,
  positionsCount,
  companyScaleLabel,
  industry,
  location,
  views,
  hot = false,
  className = "",
}: CompanyCardProps) {
  return (
    <Link
      href={`/company/${slug}`}
      className={`block ${className}`}
      aria-label={`${name} 상세 페이지로 이동`}
    >
      <div className="flex w-[1200px] items-center gap-5 border-b border-[#EDEDED] bg-white px-5 py-8 hover:bg-gray-50 transition-colors">
        <div className="relative h-20 w-20 overflow-hidden rounded-[16px] border border-[#DDDDE1] bg-[lightgray]">
          <Image
            src={logoSrc}
            alt={`${name} 로고`}
            fill
            className="object-cover"
          />
        </div>

        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-3 self-stretch">
            <h2 className="text-2xl font-semibold text-black">{name}</h2>
            <p className="text-base font-medium text-[#FF6127]">
              {positionsCount}개 포지션 채용 중
            </p>
          </div>

          <div className="flex items-center gap-3 self-stretch">
            <span className="text-base font-medium text-[#71717A]">
              {companyScaleLabel}
            </span>
            <div className="h-4 w-px bg-[#DDDDE1]" />
            <span className="text-base font-medium text-[#71717A]">
              {industry}
            </span>
            <div className="h-4 w-px bg-[#DDDDE1]" />
            <span className="text-base font-medium text-[#71717A]">
              {location}
            </span>
            {typeof views === "number" && (
              <>
                <div className="h-4 w-px bg-[#DDDDE1]" />
                <View count={views} hot={hot} />
              </>
            )}
          </div>
        </section>
      </div>
    </Link>
  );
}
