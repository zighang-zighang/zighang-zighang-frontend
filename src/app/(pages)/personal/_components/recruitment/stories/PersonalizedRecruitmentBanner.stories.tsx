import type { Meta, StoryObj } from "@storybook/nextjs";
import PersonalizedRecruitmentBanner from "../PersonalizedRecruitmentBanner";

const meta: Meta<typeof PersonalizedRecruitmentBanner> = {
  title: "Personal/PersonalizedRecruitmentBanner",
  component: PersonalizedRecruitmentBanner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    userName: {
      control: "text",
      description: "사용자 이름",
    },
    onKeywordClick: {
      action: "keywordClicked",
      description: "키워드 클릭 이벤트 핸들러",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: "민수",
  },
};

export const DifferentUser: Story = {
  args: {
    userName: "지영",
  },
};

export const Interactive: Story = {
  args: {
    userName: "테스트",
    onKeywordClick: (keyword) => {
      console.log(`키워드 ${keyword}가 클릭되었습니다.`);
    },
  },
};
