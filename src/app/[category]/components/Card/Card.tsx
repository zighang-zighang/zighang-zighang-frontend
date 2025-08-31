"use client";

import { useState, useTransition, MouseEvent } from "react";
import View from "./View";
import Bookmark from "./BookMark";
import { toggleBookmark } from "./toggleBookmark";
export interface CardProps {
  itemId: string;
  href: string;
  company: string;
  title: string;
  location: string;
  experience: string;
  contractType: string;
  education: string;
  imageUrl: string;
  dday: string;
  views: number;
  hot?: boolean;
  bookmarked?: boolean;
}

export default function Card({
  itemId,
  href,
  company,
  title,
  location,
  experience,
  contractType,
  education,
  imageUrl,
  dday,
  views,
  hot = false,
  bookmarked: initialBookmarked = false,
}: CardProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isPending, startTransition] = useTransition();

  const onToggle = () => {
    setIsBookmarked((b) => !b);
    startTransition(async () => {
      try {
        await toggleBookmark(itemId, !isBookmarked);
      } catch {
        setIsBookmarked(initialBookmarked);
      }
    });
  };

  return (
    <div className="relative w-full md:flex-1 md:flex-grow md:self-stretch min-w-full">
      <a
        target="_blank"
        href={href}
        className="flex flex-[1_0_0] items-center gap-2 rounded-[24px] border border-[#EDEDED] h-[120px] shadow-[0px_4px_30px_0px_#00000008] transition-shadow hover:shadow-[0px_6px_16px_rgba(0,0,0,0.08)] md:mx-0 md:h-[164px] md:pl-[20px]"
        rel="noreferrer"
      >
        <div className="flex flex-1 flex-row items-center gap-2.5 md:gap-6">
          <section className="relative flex aspect-[1/1] flex-shrink-0 items-center justify-center rounded-xl md:rounded-2xl ml-2 w-[60px] md:ml-0 md:w-[80px] overflow-hidden">
            <img
              alt={`${company} 채용 이미지`}
              src={imageUrl}
              className="aspect-[1/1] rounded-xl object-cover md:rounded-2xl w-[60px] md:w-[80px] border border-black/10"
            />
          </section>

          <div className="flex flex-col gap-[6px] md:gap-3">
            <div className="flex flex-wrap items-center gap-[0px] text-[#71717A] ds-mobile-summary">
              <span className="break-keep">{company}</span>
            </div>

            <div className="flex items-center gap-2 break-all font-bold text-black">
              <p className="max-w-[240px] md:max-w-[356px] ds-mobile-title2 leading-[140%]">
                {title}
              </p>
            </div>

            <div className="flex flex-col gap-1 text-[12px] text-[#71717A] md:text-sm">
              <div className="flex flex-wrap items-center gap-[1px] md:gap-1 ds-mobile-summary">
                <span>{experience}</span>
                <span>·</span>
                <span>{contractType}</span>
                <span>·</span>
                <span>{education}</span>
                <span>·</span>
                <span className="break-keep">{location}</span>

                <span>
                  <div
                    data-orientation="vertical"
                    role="none"
                    className="shrink-0 mx-[6px] h-2 w-[1px] bg-line"
                  />
                </span>

                <span>
                  <View count={views} hot={false} />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex h-full flex-row items-center justify-center border-l border-[#EDEDED] pl-0"
          style={{ width: "48px" }}
        >
          <div className="flex h-full w-full flex-col">
            <Bookmark active={isBookmarked} disabled={isPending} />

            <div className="h-[1px] w-full bg-[#EDEDED]" />

            <div className="flex h-1/2 items-center justify-center">
              <div className="text-[13px] font-medium leading-[20px] text-[#71717A]">
                <div className="break-keep text-center ds-mobile-subtitle1">
                  {dday}
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
