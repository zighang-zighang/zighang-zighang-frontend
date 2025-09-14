import type { Meta, StoryObj } from "@storybook/nextjs";
import RecommendArea from "../recommendArea";

const meta: Meta<typeof RecommendArea> = {
  title: "Personal/RecommendArea",
  component: RecommendArea,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 파일이 없을 때 (기본 상태)
export const WithoutFiles: Story = {
  parameters: {
    // localStorage를 비워서 파일이 없는 상태로 설정
    mockData: [
      {
        url: "localStorage",
        method: "GET",
        status: 200,
        response: null,
      },
    ],
  },
  decorators: [
    (Story) => {
      // localStorage 초기화
      if (typeof window !== "undefined") {
        localStorage.removeItem("uploadedFiles");
      }
      return <Story />;
    },
  ],
};

// 파일이 있을 때
export const WithFiles: Story = {
  parameters: {
    // localStorage에 파일 데이터가 있는 상태로 설정
    mockData: [
      {
        url: "localStorage",
        method: "GET",
        status: 200,
        response: [
          {
            id: "file-1",
            name: "자기소개서.pdf",
            size: 1024000,
            uploadedAt: "2024-01-15T10:30:00Z",
          },
          {
            id: "file-2",
            name: "포트폴리오.pdf",
            size: 2048000,
            uploadedAt: "2024-01-15T10:35:00Z",
          },
        ],
      },
    ],
  },
  decorators: [
    (Story) => {
      // localStorage에 파일 데이터 설정
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "uploadedFiles",
          JSON.stringify([
            {
              id: "file-1",
              name: "자기소개서.pdf",
              size: 1024000,
              uploadedAt: "2024-01-15T10:30:00Z",
            },
            {
              id: "file-2",
              name: "포트폴리오.pdf",
              size: 2048000,
              uploadedAt: "2024-01-15T10:35:00Z",
            },
          ])
        );
      }
      return <Story />;
    },
  ],
};

// 모바일 뷰 - 파일 없음
export const MobileWithoutFiles: Story = {
  ...WithoutFiles,
  parameters: {
    ...WithoutFiles.parameters,
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

// 모바일 뷰 - 파일 있음
export const MobileWithFiles: Story = {
  ...WithFiles,
  parameters: {
    ...WithFiles.parameters,
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

// 데스크톱 뷰 - 파일 없음
export const DesktopWithoutFiles: Story = {
  ...WithoutFiles,
  parameters: {
    ...WithoutFiles.parameters,
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

// 데스크톱 뷰 - 파일 있음
export const DesktopWithFiles: Story = {
  ...WithFiles,
  parameters: {
    ...WithFiles.parameters,
    viewport: {
      defaultViewport: "desktop",
    },
  },
};
