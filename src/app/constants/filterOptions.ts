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
