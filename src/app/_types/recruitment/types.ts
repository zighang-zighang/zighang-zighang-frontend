export interface Recruitment {
  id: string;
  title: string;
  recruitmentUrl: string;
  imageUrl: string | null;
  locations: string[];
  minExperience: number;
  maxExperience: number;
  educations: string[];
  startDate: string;
  endDate: string;
  deadlineType: string;
  employmentTypes: string[];
  jobs: string[];
  jobCategories: string[];
  companyName: string;
  companyImageUrl: string | null;
  companySize: string;
}

export interface PageMeta {
  size: number;
  page: number;
  totalElements: number;
  totalPage: number;
}

export interface RecruitmentPageData {
  content: Recruitment[];
  page: PageMeta;
}

export interface ApiResponse<T> {
  success: boolean;
  code: string | null;
  message: string | null;
  data: T;
}
export interface GetRecruitmentsResponse
  extends ApiResponse<RecruitmentPageData> {}

export interface GetRecruitmentsParams {
  page?: number;
  size?: number;
  jobs?: string[];
  jobCategories?: string[];
  locations?: string[];
  employmentTypes?: string[];
  educations?: string[];
  companySize?: string;
  minExperience?: number;
  maxExperience?: number;
  deadlineType?: string;
  q?: string;
}
