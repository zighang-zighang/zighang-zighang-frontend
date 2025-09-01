"use client";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { EXPERIENCE_MIN, EXPERIENCE_MAX } from "@/app/constants/filterOptions";

export type FilterState = {
  jobGroup: string;
  jobRoles: string[];
  hireTypes: string[];
  educations: string[];
  regions: string[];
  deadlineTypes: string[];
  experience: { min: number; max: number };
};

export type Section =
  | "all"
  | "jobGroup"
  | "jobRole"
  | "hireType"
  | "education"
  | "experience"
  | "region"
  | "deadline";

type Ctx = {
  open: boolean;
  section: Section;
  filters: FilterState;
  openDialog: (s?: Section) => void;
  closeDialog: () => void;
  setJobGroup: (id: string) => void;
  toggleJobRole: (id: string) => void;
  toggleHireType: (id: string) => void;
  toggleEducation: (id: string) => void;
  toggleRegion: (id: string) => void;
  toggleDeadline: (id: string) => void;
  setExperience: (min: number, max: number) => void;
  resetAll: () => void;
};

const FilterCtx = createContext<Ctx | null>(null);

export const DEFAULT: FilterState = {
  jobGroup: "전체",
  jobRoles: ["전체"],
  hireTypes: ["전체"],
  educations: ["전체"],
  regions: ["전체"],
  deadlineTypes: ["전체"],
  experience: { min: EXPERIENCE_MIN, max: EXPERIENCE_MAX },
};

export function FilterDialogProvider({
  children,
  initial = DEFAULT,
}: {
  children: ReactNode;
  initial?: FilterState;
}) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<Section>("all");
  const [filters, setFilters] = useState<FilterState>(initial);

  const openDialog = (s: Section = "all") => {
    setSection(s);
    setOpen(true);
  };
  const closeDialog = () => setOpen(false);

  const setJobGroup = (id: string) =>
    setFilters((p) => ({ ...p, jobGroup: id }));

  const toggleIn = (list: string[], id: string) => {
    if (id === "전체") return ["전체"];
    const base = list.includes("전체") ? [] : [...list];
    const i = base.indexOf(id);
    if (i >= 0) base.splice(i, 1);
    else base.push(id);
    return base.length ? base : ["전체"];
  };

  const toggleJobRole = (id: string) =>
    setFilters((p) => ({ ...p, jobRoles: toggleIn(p.jobRoles, id) }));
  const toggleHireType = (id: string) =>
    setFilters((p) => ({ ...p, hireTypes: toggleIn(p.hireTypes, id) }));
  const toggleEducation = (id: string) =>
    setFilters((p) => ({ ...p, educations: toggleIn(p.educations, id) }));
  const toggleRegion = (id: string) =>
    setFilters((p) => ({ ...p, regions: toggleIn(p.regions, id) }));
  const toggleDeadline = (id: string) =>
    setFilters((p) => ({ ...p, deadlineTypes: toggleIn(p.deadlineTypes, id) }));
  const setExperience = (min: number, max: number) =>
    setFilters((p) => ({ ...p, experience: { min, max } }));

  const resetAll = () => setFilters(DEFAULT);

  const value: Ctx = useMemo(
    () => ({
      open,
      section,
      filters,
      openDialog,
      closeDialog,
      setJobGroup,
      toggleJobRole,
      toggleHireType,
      toggleEducation,
      toggleRegion,
      toggleDeadline,
      setExperience,
      resetAll,
    }),
    [open, section, filters]
  );

  return <FilterCtx.Provider value={value}>{children}</FilterCtx.Provider>;
}

export function useFilterDialog() {
  const ctx = useContext(FilterCtx);
  if (!ctx) throw new Error("useFilterDialog must be used in provider");
  return ctx;
}
