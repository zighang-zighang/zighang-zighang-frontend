"use client";

import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type { ExploreJobKey } from "@/app/_constants/exploreJobCard";
import { EXPLORE_JOBS_WITH_ICON } from "@/app/_utils/exploreJobs";
import ExploreJobCard from "./ExploreJobCard";

interface Props {
  value?: ExploreJobKey | null;
  onChange?: (key: ExploreJobKey | null) => void;
  maxJobs?: number;
  className?: string;
}

export default function ExploreJobCarousel({
  value,
  onChange,
  maxJobs = 3,
  className,
}: Props) {
  const [selectedKey, setSelectedKey] = React.useState<ExploreJobKey | null>(
    value ?? null
  );

  React.useEffect(() => {
    if (value !== undefined) setSelectedKey(value);
    console.log(value);
  }, [value]);

  const set = (next: ExploreJobKey | null) =>
    onChange ? onChange(next) : setSelectedKey(next);

  return (
    <div className={["relative w-full", className || ""].join(" ")}>
      <Swiper
        modules={[Navigation, A11y]}
        navigation
        loop
        spaceBetween={16}
        slidesPerView={4.5}
        className="!pb-8 overflow-visible"
      >
        {EXPLORE_JOBS_WITH_ICON.map(({ key, category, jobs, Icon }) => {
          const selected = selectedKey === key;
          return (
            <SwiperSlide key={key} className="!h-auto overflow-visible">
              <div className="flex justify-center overflow-visible">
                <ExploreJobCard
                  jobKey={key}
                  category={category}
                  jobs={jobs as unknown as string[]}
                  Icon={Icon}
                  selected={selected}
                  maxJobs={maxJobs}
                  onSelect={(k, next) => set(next ? k : null)}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
