import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterTagSelect, { type Option } from "@/app/components/FilterTag";

// 실제 popover 까지 연동하려니 popover 에도 로직이 있어서 가짜 컴포넌트로 대체
jest.mock("@/app/components/PopOver", () => ({
  PopoverPanel: (props: any) =>
    props.open ? (
      <div data-testid="popover-panel" aria-label={props.label}>
        <button data-testid="a 선택" onClick={() => props.onChange(["a"])}>
          a 선택
        </button>
      </div>
    ) : null,
}));

// 사용할 옵션 더미 데이터
const OPTIONS: Option[] = [
  { id: "ALL", label: "전체" },
  { id: "a", label: "A-라벨" },
  { id: "b", label: "B-라벨" },
];

// 렌더되는 첫 번째 버튼을 가져오기
function getTrigger() {
  return screen.getAllByRole("button")[0];
}

describe("FilterTagSelect - 열림과 버튼 텍스트 변환", () => {
  test("버튼 클릭 시 패널이 열림", () => {
    render(<FilterTagSelect label="산업" options={OPTIONS} />);

    const trigger = getTrigger();
    expect(trigger).toHaveAttribute("aria-expanded", "false"); // 초기 닫힘 상태
    expect(screen.queryByTestId("popover-panel")).toBeNull(); // 버튼 클리했을 때 뜨는 popover 패널이 없는 상태

    fireEvent.click(trigger); // 열림 버튼 누르기

    expect(trigger).toHaveAttribute("aria-expanded", "true"); //열림 상태
    expect(screen.getByTestId("popover-panel")).toBeInTheDocument(); // popover 패널이 있는 상태
  });

  test("옵션 선택 시 버튼 텍스트가 해당 라벨로 변환", () => {
    render(<FilterTagSelect label="산업" options={OPTIONS} />);

    fireEvent.click(getTrigger()); //패널 열기
    fireEvent.click(screen.getByTestId("a 선택")); // a선택하기
    expect(screen.getByText("A-라벨")).toBeInTheDocument(); // 버튼이 a라벨로 변경
  });
});
