export type Job = {
  id: string;
  href: string;
  company: string;
  title: string;
  location: string;
  experience: string;
  contractType: string;
  education: string;
  imageUrl: string;
  dday: string;
  views: number;
  hot?: boolean;
  bookmarked?: boolean;
};

export const JOBS: readonly Job[] = [
  {
    id: "98bdc575-9cba-4d86-9601-ebf9c15c0496",
    href: "/recruitment/98bdc575-9cba-4d86-9601-ebf9c15c0496",
    company: "카카오뱅크",
    title: "보안 기술 개발 및 침해 대응 담당자 (채용 연계형 인턴)",
    location: "경기",
    experience: "신입",
    contractType: "전환형 인턴정규직",
    education: "학사",
    imageUrl:
      "https://d2juy7qzamcf56.cloudfront.net/2024-08-02/f7caf020-feec-4641-b093-cb5ce8ff402e.png",
    dday: "D-1",
    views: 3582,
    hot: true,
    bookmarked: false,
  },
  {
    id: "98bdc575-9cba-4d86",
    href: "/recruitment/98bdc575-9cba-4d86-9601-ebf9c15c0496",
    company: "카카오뱅크",
    title: "보안 기술 개발 및 침해 대응 담당자 (채용 연계형 인턴)",
    location: "경기",
    experience: "신입",
    contractType: "전환형 인턴정규직",
    education: "학사",
    imageUrl:
      "https://d2juy7qzamcf56.cloudfront.net/2024-08-02/f7caf020-feec-4641-b093-cb5ce8ff402e.png",
    dday: "D-1",
    views: 3582,
    hot: true,
    bookmarked: false,
  },
] as const;

export async function getJobs(): Promise<Job[]> {
  return JOBS as Job[];
}
