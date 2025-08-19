// constants/filterOptions.ts

export type Option = { id: string; label: string };

export const INDUSTRY: Option[] = [
  { id: "ALL", label: "전체" },
  { id: "MEDICAL", label: "의료·제약·복지" },
  { id: "MANUFACTURE", label: "제조·화학" },
  { id: "DISTRIBUTION", label: "판매·유통·운송" },
  { id: "IT", label: "IT·웹·통신" },
  { id: "CONSTRUCTION", label: "건설업" },
  { id: "EDUCATION", label: "교육업" },
  { id: "MEDIA", label: "미디어·디자인" },
  { id: "FINANCE", label: "은행·금융업" },
  { id: "ORGANIZATION", label: "기관·협회" },
  { id: "SERVICE", label: "서비스업" },
  { id: "AGRICULTURE", label: "농업" },
  { id: "MINING", label: "광업" },
  { id: "OTHER", label: "기타" },
];

export const REGION: Option[] = [
  { id: "ALL", label: "전체" },
  { id: "SEOUL", label: "서울" },
  { id: "GYEONGGI", label: "경기" },
  { id: "BUSAN", label: "부산" },
];

export const COMPANY_SIZE: Option[] = [
  { id: "ALL", label: "전체" },
  { id: "STARTUP", label: "스타트업" },
  { id: "SMB", label: "중소" },
  { id: "MID", label: "중견" },
  { id: "ENTERPRISE", label: "대기업" },
];

export const TYPE: Option[] = [
  { id: "ALL", label: "전체" },
  { id: "FULLTIME", label: "정규직" },
  { id: "CONTRACT", label: "계약직" },
  { id: "INTERN_CONVERT", label: "전환형 인턴" },
  { id: "INTERN", label: "체험형 인턴" },
  { id: "PARTTIME", label: "아르바이트" },
  { id: "FREELANCE", label: "프리랜서" },
  { id: "MILITARY", label: "병역특례" },
];

export const EDUCATION: Option[] = [
  { id: "ALL", label: "전체" },
  { id: "NONE", label: "학력 무관" },
  { id: "HIGH", label: "고졸" },
  { id: "ASSOCIATE", label: "초대졸" },
  { id: "BACHELOR", label: "학사" },
  { id: "MASTER", label: "석사" },
  { id: "DOCTOR", label: "박사" },
];

export const CAREER: Option[] = [
  { id: "ALL", label: "전체" },
  { id: "NEW", label: "신입" },
  { id: "1_3", label: "1~3년" },
  { id: "3_5", label: "3~5년" },
  { id: "5_10", label: "5~10년" },
  { id: "10_PLUS", label: "10년 이상" },
];

export const DEADLINE: Option[] = [
  { id: "ALL", label: "전체" },
  { id: "ALWAYS", label: "상시 채용" },
  { id: "UNTIL_FILLED", label: "채용 시 마감" },
  { id: "FIXED", label: "기한 설정" },
];
