"use client";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type FilterSection =
  | "all"
  | "industry"
  | "region"
  | "companySize"
  | "type"
  | "education"
  | "career"
  | "deadline"
  | "platform"
  | "jobGroup"
  | "jobRole";

type Ctx = {
  open: boolean;
  section: FilterSection;
  openDialog: (s?: FilterSection) => void;
  closeDialog: () => void;
};

const Ctx = createContext<Ctx | null>(null);

export function FilterDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<FilterSection>("all");

  const value = useMemo(
    () => ({
      open,
      section,
      openDialog: (s?: FilterSection) => {
        setSection(s ?? "all");
        setOpen(true);
      },
      closeDialog: () => setOpen(false),
    }),
    [open, section]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFilterDialog() {
  const v = useContext(Ctx);
  if (!v)
    throw new Error("useFilterDialog must be used within FilterDialogProvider");
  return v;
}
