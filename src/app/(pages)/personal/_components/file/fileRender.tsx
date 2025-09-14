interface FileRenderProps {
  file: {
    id: string;
    name: string;
    type: string;
    size: number;
    url?: string;
    uploadDate?: string;
  };
  index: number;
  onDelete: (id: string) => void;
}

export default function FileRender({ file, index, onDelete }: FileRenderProps) {
  return (
    <div className="grid grid-cols-12 items-center p-3 md:px-7 md:py-2.5 bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* 번호 */}
      <div className="col-span-2">
        <p className="text-sm font-medium text-gray-500 text-start">
          {(index + 1).toString().padStart(2, "0")}
        </p>
      </div>

      {/* 파일명 */}
      <div className="col-span-7">
        <button
          onClick={() => {
            if (file.url) {
              const link = document.createElement("a");
              link.href = file.url;
              link.download = file.name;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }
          }}
          className="text-sm font-medium text-gray-900 hover:text-blue-600 hover:border-b hover:border-blue-600 transition-colors cursor-pointer text-left inline-block"
        >
          {file.name}
        </button>
      </div>

      {/* 업로드일 */}
      <div className="hidden md:block col-span-2">
        {file.uploadDate && (
          <p className="text-xs text-gray-500">{file.uploadDate}</p>
        )}
      </div>

      {/* 삭제 버튼 */}
      <div className="col-span-3 md:col-span-1 text-right">
        <button
          onClick={() => onDelete(file.id)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          title="파일 삭제"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
