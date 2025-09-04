"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchRecruitmentsClient } from "@/app/_api/recruitment/list";
import type {
  GetRecruitmentsResponse,
  RecruitmentPageData,
  GetRecruitmentsParams,
} from "@/app/_types/recruitment/types";

export function useRecruitments(params: GetRecruitmentsParams = {}) {
  return useSuspenseQuery<GetRecruitmentsResponse, Error, RecruitmentPageData>({
    queryKey: ["recruitments:single", params],
    queryFn: () => fetchRecruitmentsClient(params),
    select: (res) => res.data,
  });
}
