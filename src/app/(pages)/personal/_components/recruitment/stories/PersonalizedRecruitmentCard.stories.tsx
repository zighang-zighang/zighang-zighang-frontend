import type { Meta, StoryObj } from "@storybook/nextjs";
import PersonalizedRecruitmentCard from "../PersonalizedRecruitmentCard";

const meta: Meta<typeof PersonalizedRecruitmentCard> = {
  title: "Personal/PersonalizedRecruitmentCard",
  component: PersonalizedRecruitmentCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "채용 공고 ID",
    },
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
    bookmarked: {
      control: "boolean",
      description: "북마크 상태",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "1",
    experience: "신입",
    logo: "https://via.placeholder.com/48x48/4F46E5/FFFFFF?text=LOGO",
    company: "테크스타트업",
    title: "프론트엔드 개발자",
    location: "서울시 강남구",
    bookmarked: false,
  },
};
