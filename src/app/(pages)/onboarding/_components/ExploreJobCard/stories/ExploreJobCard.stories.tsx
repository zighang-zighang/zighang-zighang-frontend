import type { Meta, StoryObj } from "@storybook/nextjs";
import ExploreJobCard from "../ExploreJobCard";
import { ProblemSolvingIcon } from "../../../_exploreChip/ProblemSolvingIcon";

const meta: Meta<typeof ExploreJobCard> = {
  title: "Onboarding/ExploreJobCard/ExploreJobCard",
  component: ExploreJobCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: "^on.*" }, // on* props 자동 액션
  },
  args: {
    jobKey: "problem-solving",
    category: "문제를 해결하고\n답을 찾는 활동",
    jobs: ["IT·개발", "AI·데이터", "엔지니어링·연구·R&D", "건설·건축"],
    Icon: ProblemSolvingIcon,
    selected: false,
    maxJobs: 3,
  },
  argTypes: {
    jobKey: {
      control: "select",
      options: [
        "problem-solving",
        "communicate-persuade",
        "creative-content",
        "data-analysis",
        "people-org-growth",
        "field-execution",
        "care-health",
        "law-compliance",
      ],
    },
    category: { control: "text" },
    jobs: { control: "object" },
    Icon: { control: false },
    selected: { control: "boolean" },
    maxJobs: { control: { type: "number", min: 1, max: 8, step: 1 } },
    className: { control: false },
    onSelect: { action: "onSelect" },
  },
};

export default meta;
type Story = StoryObj<typeof ExploreJobCard>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
