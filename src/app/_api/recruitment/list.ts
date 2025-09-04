import type {
  GetRecruitmentsParams,
  GetRecruitmentsResponse,
} from "@/app/_types/recruitment/types";

// SSR 에서도 쿼리 실행되도록 함
// Suspense를 켰더니 쿼리가 SSR 단계에서도 실행돼서 상대경로 못씀
function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.NEXT_PUBLIC_API_BASE_URL)
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export async function fetchRecruitmentsClient({
  page = 0,
  size = 20,
  jobs,
  jobCategories,
  employmentTypes,
  educations,
  locations,
  deadlineTypes,
  minExperience,
  maxExperience,
}: GetRecruitmentsParams = {}): Promise<GetRecruitmentsResponse> {
  const qs = new URLSearchParams({ page: String(page), size: String(size) });

  const appendArr = (qs: URLSearchParams, k: string, v?: string[]) =>
    v?.forEach((x) => qs.append(k, x));

  appendArr(qs, "jobs", jobs);
  appendArr(qs, "jobCategories", jobCategories);
  appendArr(qs, "employmentTypes", employmentTypes);
  appendArr(qs, "educations", educations);
  appendArr(qs, "locations", locations);
  appendArr(qs, "deadlineTypes", deadlineTypes);
  if (minExperience != null) qs.set("minExperience", String(minExperience));
  if (maxExperience != null) qs.set("maxExperience", String(maxExperience));

  const url = `${getBaseUrl()}/api/recruitments?${qs.toString()}`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
