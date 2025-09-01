import type { GetRecruitmentsResponse } from "@/app/_types/recruitment/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function fetchRecruitments(): Promise<GetRecruitmentsResponse> {
  const res = await fetch(`${BASE_URL}/recruitments`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<GetRecruitmentsResponse>;
}
