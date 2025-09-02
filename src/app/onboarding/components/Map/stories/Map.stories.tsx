// Map.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs";
import { useState } from "react";
import { Map } from "../Map";
import type { RegionValue } from "@/app/onboarding/context/regionTypes";

import sidoGeo from "@/app/onboarding/data/TL_SCCO_CTPRVN.json";

const meta: Meta<typeof Map> = {
  title: "Onboarding/Map/Map",
  component: Map,
  parameters: { layout: "centered" },
  args: {
    geographies: sidoGeo,
    className: "",
  },
  argTypes: {
    geographies: { control: false },
    className: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof Map>;

export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState<RegionValue | null>(null);

    return (
      <div className="flex flex-col items-center gap-4">
        <Map {...args} value={value} onSelect={(r) => setValue(r)} />

        <div className="text-sm text-zinc-700">선택: {value ?? "없음"}</div>

        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border"
            onClick={() => setValue("전체")}
          >
            전체
          </button>
          <button
            className="px-3 py-1 rounded border"
            onClick={() => setValue("해외")}
          >
            해외
          </button>
          <button
            className="px-3 py-1 rounded border"
            onClick={() => setValue(null)}
          >
            초기화
          </button>
        </div>
      </div>
    );
  },
};
