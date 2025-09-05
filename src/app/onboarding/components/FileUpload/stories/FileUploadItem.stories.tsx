import type { Meta, StoryObj } from "@storybook/nextjs";
import UploadedFileList from "../FileUploadList";
import { FileUploadItem } from "../FileUploadItem";

const meta = {
  title: "Onboarding/FileUpload/FileUploadItem",
  component: UploadedFileList,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "white",
      values: [
        { name: "white", value: "#ffffff" },
        { name: "gray", value: "#f6f6f7" },
        { name: "dark", value: "#222222" },
      ],
    },
  },
  argTypes: {
    onRemove: { action: "remove" },
  },
} satisfies Meta<typeof UploadedFileList>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ---------- 공통 더미 데이터 ---------- */
const now = Date.now();

const file = {
  id: "2",
  name: "portfolio.pdf",
  size: 219_384,
  uploadedAt: new Date(now - 1000 * 60 * 30).toISOString(),
};

/* ---------- 리스트 스토리 ---------- */
export const List_Empty: Story = {
  name: "Default",
  args: { file },
};

export const List_Default: Story = {
  name: "Success",
  args: { file },
};
