"use client";

import { FilterDialogProvider } from "@/app/hooks/useFilterDialog";
import FilterDialogHost from "@/app/components/FilterDialogHost";

export default function ClientFilterProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FilterDialogProvider>
      {children}
      <FilterDialogHost />
    </FilterDialogProvider>
  );
}
