"use client";

import { useRef, useState } from "react";
import FilterTag from "@/app/components/FilterTag";

export default function FilterTagInteractive() {
  const [open, setOpen] = useState(false);
  const id = "area-popover";

  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className="shrink-0"
      aria-expanded={open}
      aria-controls={id}
    >
      <FilterTag label="산업" selected="전체" expanded={open} id={id} />
      {/*pop over*/}
    </button>
  );
}
