// 프론트엔드 frontend/src/types/index.ts 와 같은 형태를 유지한다.

export interface Profile {
  name: string;
  school: string;
  major: string;
  studentId: string;
  phone: string;
  email: string;
  /** Hero 영역 한 줄 소개 */
  headline: string;
  /** 자기소개 문단 (줄 단위) */
  intro: string[];
  interests: string[];
  /** 프론트엔드 public 기준 이미지 경로 */
  imageUrl: string;
}

export type ActivityIcon = "chart" | "theater" | "users" | "heart";

export interface Activity {
  id: string;
  title: string;
  role: string;
  icon: ActivityIcon;
  /** 대표 활동 (카드 하단 강조 바 표시) */
  featured: boolean;
}

export type AwardCategory = "intern" | "activity" | "award" | "project";

export interface Award {
  id: string;
  title: string;
  category: AwardCategory;
  /** YYYY.MM */
  startDate: string;
  /** YYYY.MM, 기간이 있는 항목만 */
  endDate?: string;
}

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export interface ContactMessage extends ContactInput {
  id: string;
  createdAt: string;
}
