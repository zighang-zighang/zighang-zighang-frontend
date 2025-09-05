import { useFunnel } from "@use-funnel/browser";
import { UploadStep } from "./UploadStep";

export function UploadFunnel() {
  const funnel = useFunnel<{
    업로드: Record<string, never>;
    완료: Record<string, never>;
  }>({
    id: "upload-funnel",
    initial: { step: "업로드", context: {} },
  });

  return (
    <funnel.Render
      업로드={({ history }) => (
        <UploadStep onNext={() => history.push("완료", {})} />
      )}
      완료={() => (
        <div className="p-6 text-center">
          <h2 className="text-lg font-semibold text-emerald-600">
            🎉 모든 과정이 완료되었습니다!
          </h2>
        </div>
      )}
    />
  );
}
