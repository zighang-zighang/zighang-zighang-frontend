import type { Meta, StoryObj } from "@storybook/nextjs";
import RecruitmentCard from "../recruitmentCard";

const meta: Meta<typeof RecruitmentCard> = {
  title: "Personal/RecruitmentCard",
  component: RecruitmentCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    logo: {
      control: "text",
      description: "회사 로고 이미지 URL",
    },
    company: {
      control: "text",
      description: "회사명",
    },
    title: {
      control: "text",
      description: "채용 공고 제목",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    experience: "신입",
    logo: "https://via.placeholder.com/48x48/4F46E5/FFFFFF?text=LOGO",
    company: "테크스타트업",
    title: "프론트엔드 개발자",
    location: "서울시 강남구",
  },
};
