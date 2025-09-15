import MemoList from "./MemoList";
import MemoView from "./MemoView";

export default function MemoBoard() {
  return (
    <div className="w-full h-[522px] flex">
      <MemoList />
      <MemoView />
    </div>
  );
}
