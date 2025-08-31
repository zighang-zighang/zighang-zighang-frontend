"use client";

import { useEffect, useRef } from "react";
import type { FilterSection } from "@/app/hooks/useFilterDialog";

type RefKeys =
  | "jobGroup"
  | "jobRole"
  | "industry"
  | "region"
  | "companySize"
  | "type"
  | "education"
  | "career"
  | "deadline";

function isRefKey(s: FilterSection): s is RefKeys {
  return s !== "all" && s !== "platform";
}

export default function useFilterScroll(open: boolean, section: FilterSection) {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const jobGroup = useRef<HTMLDivElement | null>(null);
  const jobRole = useRef<HTMLDivElement | null>(null);
  const industry = useRef<HTMLDivElement | null>(null);
  const region = useRef<HTMLDivElement | null>(null);
  const companySize = useRef<HTMLDivElement | null>(null);
  const type = useRef<HTMLDivElement | null>(null);
  const education = useRef<HTMLDivElement | null>(null);
  const career = useRef<HTMLDivElement | null>(null);
  const deadline = useRef<HTMLDivElement | null>(null);

  const refs = useRef({
    jobGroup,
    jobRole,
    industry,
    region,
    companySize,
    type,
    education,
    career,
    deadline,
  }).current;

  useEffect(() => {
    if (!open) return;
    const c = scrollRef.current;
    if (!c) return;

    if (!isRefKey(section)) {
      c.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const t = refs[section]?.current;
    if (!t) return;

    const header = 72;
    const top =
      t.getBoundingClientRect().top -
      c.getBoundingClientRect().top +
      c.scrollTop -
      header;

    c.scrollTo({ top, behavior: "smooth" });
  }, [open, section, refs]);

  return { scrollRef, refs };
}
