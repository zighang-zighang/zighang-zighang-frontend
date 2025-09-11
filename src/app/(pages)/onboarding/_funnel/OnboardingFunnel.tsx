import { useFunnel } from "@use-funnel/browser";
import { useRouter } from "next/navigation";
import { useSubmitOnboarding } from "@/app/_api/user/useOnboarding";
import { mapJobGroup, mapJobCategory, mapEducationLevel, mapGraduationStatus } from "../_utils/mapping";
import { saveOnboardingData } from "../_utils/storage";
import { getOnboardingInfo } from "../_utils/onboardingCheck";
import {
  JobCategoryStep,
  JobStep,
  ExperienceStep,
  EducationStep,
  LocationStep,
  ExploreJobStep,
} from "./steps";
import { IntroStep } from "./steps/IntroStep";
import type {
  직군입력,
  직무입력,
  경력입력,
  학력입력,
  지역입력,
  파일업로드,
  완료,
  모르겠어요,
} from "../_types/context";
import { UploadStep } from "./upload/UploadStep";
import SuccessStep from "./steps/SuccessStep";

type ApiOnboardingPayload = {
  interestedJobs: string[];
  interestedJobCategories: string[];
  careerYear: number;
  educationLevel: string;
  graduationStatus: string;
  preferredRegion: string;
};


function toApiPayload(
  context: 지역입력,
  지역: string | null | undefined
): ApiOnboardingPayload {
  return {
    interestedJobs: context.직군.map(mapJobGroup),
    interestedJobCategories: (context.직무 || []).map(mapJobCategory),
    careerYear: context.경력 || 0,
    educationLevel: mapEducationLevel(context.학력 || ""),
    graduationStatus: mapGraduationStatus(context.졸업상태 || "졸업"),
    preferredRegion: 지역 || "",
  };
}

export default function OnboardingFunnel() {
  const router = useRouter();
  const submitOnboardingMutation = useSubmitOnboarding();

  const funnel = useFunnel<{
    인트로: Record<string, never>;
    직군입력: 직군입력;
    직무입력: 직무입력;
    경력입력: 경력입력;
    학력입력: 학력입력;
    지역입력: 지역입력;
    파일업로드: 파일업로드;
    완료: 완료;
    모르겠어요: 모르겠어요;
  }>({
    id: "onboarding-funnel",
    initial: {
      step: "인트로",
      context: {},
    },
  });
  return (
    <funnel.Render
      인트로={({ history }) => (
        <IntroStep
          onNext={(applyRecent) => {
            if (applyRecent) {
              // 최근 필터 적용 시 온보딩 데이터를 가져와서 첫 단계에 미리 설정
              const onboardingInfo = getOnboardingInfo();
              if (onboardingInfo) {
                // 매핑된 값들을 원래 UI 값으로 역변환
                const originalJobGroups = onboardingInfo.data.interestedJobs.map(job => {
                  // API 값에서 UI 값으로 역변환
                  const reverseMap: Record<string, string> = {
                    "IT_개발": "IT ⋅ 개발",
                    "AI_데이터": "AI · 데이터",
                    "게임": "게임",
                    "디자인": "디자인",
                    "기획_전략": "기획 · 전략",
                    "마케팅_광고": "마케팅 · 광고",
                    "상품기획_MD": "상품기획 · MD",
                    "영업": "영업",
                    "무역_물류": "무역 · 물류",
                    "운송_배송": "운송 · 배송",
                    "법률_법무": "법률 · 법무",
                    "HR_총무": "HR · 총무",
                    "회계_재무_세무": "회계 · 재무 · 세무",
                    "증권_운용": "증권 · 운용",
                    "은행_카드_보험": "은행 · 카드 · 보험",
                    "엔지니어링_RND": "엔지니어링 · R&D",
                    "건설_건축": "건설 · 건축",
                    "생산_기능직": "생산 · 기능직",
                    "의료_보건": "의료 · 보건",
                    "공공_복지": "공공 · 복지",
                    "교육": "교육",
                    "미디어_엔터": "미디어 · 엔터",
                    "고객상담_TM": "고객상담 · TM",
                    "서비스": "서비스",
                    "식음료": "식음료",
                  };
                  return reverseMap[job] || job;
                });

                const originalEducation = (() => {
                  const reverseMap: Record<string, string> = {
                    "초등학교": "초등학교",
                    "중학교": "중학교",
                    "고등학교": "고등학교",
                    "대학교_2_3년": "대학교(2,3년)",
                    "대학교_4년": "대학교(4년)",
                    "대학원_석사": "대학원(석사)",
                    "대학원_박사": "대학원(박사)",
                  };
                  return reverseMap[onboardingInfo.data.educationLevel] || onboardingInfo.data.educationLevel;
                })();

                const originalGraduationStatus = (() => {
                  const reverseMap: Record<string, string> = {
                    "재학중": "재학 중",
                    "휴학중": "휴학 중",
                    "졸업유예": "졸업유예",
                    "졸업": "졸업",
                  };
                  return reverseMap[onboardingInfo.data.graduationStatus] || onboardingInfo.data.graduationStatus;
                })();

                history.push("직군입력", (prev) => ({
                  ...prev,
                  최근필터적용: true,
                  직군: originalJobGroups,
                  직무: onboardingInfo.data.interestedJobCategories,
                  경력: onboardingInfo.data.careerYear,
                  학력: originalEducation,
                  졸업상태: originalGraduationStatus,
                  지역: onboardingInfo.data.preferredRegion,
                }));
                return;
              }
            }
            
            // 일반적인 온보딩 진행
            history.push("직군입력", (prev) => ({
              ...prev,
              최근필터적용: applyRecent,
            }));
          }}
        />
      )}
      직군입력={({ context, history }) => (
        <JobCategoryStep
          initialSelected={context.직군 || []}
          onNext={(직군) =>
            history.push("직무입력", (prev) => ({ ...prev, 직군 }))
          }
          onSkip={() =>
            history.push("모르겠어요", () => ({
              직군: ["미정"],
              직무: ["미정"],
            }))
          }
        />
      )}
      모르겠어요={({ history }) => (
        <ExploreJobStep
          onBack={() => history.back()}
          onNext={(직군) =>
            history.push("학력입력", (prev) => ({ ...prev, 직군 }))
          }
        />
      )}
      직무입력={({ context, history }) => (
        <JobStep
          jobGroup={context.직군}
          initialSelected={context.직무 || []}
          onBack={() => history.back()}
          onNext={(직무) => {
            console.log("직무입력 onNext 전달값:", 직무);
            history.push("경력입력", (prev) => ({ ...prev, 직무 }));
          }}
        />
      )}
      경력입력={({ context, history }) => (
        <ExperienceStep
          jobs={context.직무}
          initialExperience={context.경력}
          onBack={() => history.back()}
          onNext={(경력) =>
            history.push("학력입력", (prev) => ({ ...prev, 경력 }))
          }
        />
      )}
      학력입력={({ context, history }) => (
        <EducationStep
          initialEducation={context.학력}
          initialGraduationStatus={context.졸업상태}
          onBack={() => history.back()}
          onNext={(학력, 졸업상태) =>
            history.push("지역입력", { ...context, 학력, 졸업상태 })
          }
        />
      )}
      지역입력={({ context, history }) => (
        <LocationStep
          initialRegion={context.지역 || undefined}
          onBack={() => history.back()}
          onSubmit={(지역) => {
            // 지역 정보를 context에 저장하고 파일업로드 단계로 이동
            history.push("파일업로드", (prev) => ({ ...prev, 지역 }));
          }}
        />
      )}
      파일업로드={({ context, history }) => {
        const apiPayload = toApiPayload(context, context.지역);

        return (
          <UploadStep
            apiPayload={apiPayload}
            isLoading={submitOnboardingMutation.isPending}
            onNext={async (file, payload) => {
              try {
                const responseData = await submitOnboardingMutation.mutateAsync({ payload, file });
                
                // 로컬 스토리지에 온보딩 데이터 저장
                saveOnboardingData({
                  interestedJobs: payload.interestedJobs,
                  interestedJobCategories: payload.interestedJobCategories,
                  careerYear: payload.careerYear,
                  educationLevel: payload.educationLevel,
                  graduationStatus: payload.graduationStatus,
                  preferredRegion: payload.preferredRegion,
                });
                
                // API 응답 데이터를 완료 단계로 전달
                history.push("완료", { 
                  recruitments: [],
                  userData: responseData.data 
                });
              } catch (error) {
                console.error("온보딩 제출 실패:", error);
                // 에러가 발생해도 다음 단계로 진행
                history.push("완료", {});
              }
            }}
          />
        );
      }}
      완료={({ context }) => (
        <SuccessStep 
          name={context.userData?.name || "사용자"} 
          recruitments={context.recruitments}
          onComplete={() => router.push("/")} 
        />
      )}
    />
  );
}
