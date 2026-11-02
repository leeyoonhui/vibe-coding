import type { Activity, Award, ContactInput, Profile } from "@/types";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000").replace(/\/$/, "");

export interface PortfolioData {
  profile: Profile;
  activities: Activity[];
  awards: Award[];
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error(`GET ${path} failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

/** 페이지에 필요한 콘텐츠를 한 번에 가져온다. 실패하면 null 을 돌려준다. */
export async function getPortfolio(): Promise<PortfolioData | null> {
  try {
    const [profile, activities, awards] = await Promise.all([
      getJson<Profile>("/api/profile"),
      getJson<Activity[]>("/api/activities"),
      getJson<Award[]>("/api/awards"),
    ]);
    return { profile, activities, awards };
  } catch (err) {
    console.error("[api] failed to load portfolio", err);
    return null;
  }
}

export type FieldErrors = Partial<Record<keyof ContactInput, string[]>>;

export type SendContactResult = { ok: true } | { ok: false; error: string; fieldErrors?: FieldErrors };

export async function sendContact(input: ContactInput): Promise<SendContactResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (res.ok) {
      return { ok: true };
    }
    const body = (await res.json().catch(() => ({}))) as { error?: string; fieldErrors?: FieldErrors };
    return { ok: false, error: body.error ?? "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.", fieldErrors: body.fieldErrors };
  } catch {
    return { ok: false, error: "서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요." };
  }
}
