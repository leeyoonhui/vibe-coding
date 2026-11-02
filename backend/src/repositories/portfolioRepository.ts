import { activities } from "../data/activities";
import { awards } from "../data/awards";
import { profile } from "../data/profile";
import type { Activity, Award, Profile } from "../types";

/** 포트폴리오 콘텐츠 조회. DB 연동 시 이 인터페이스의 구현만 교체한다. */
export interface PortfolioRepository {
  getProfile(): Promise<Profile>;
  listActivities(): Promise<Activity[]>;
  listAwards(): Promise<Award[]>;
}

export const staticPortfolioRepository: PortfolioRepository = {
  async getProfile() {
    return profile;
  },
  async listActivities() {
    return activities;
  },
  async listAwards() {
    return [...awards].sort((a, b) => a.startDate.localeCompare(b.startDate));
  },
};
