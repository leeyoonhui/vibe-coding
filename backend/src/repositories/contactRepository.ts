import { randomUUID } from "node:crypto";
import type { ContactInput, ContactMessage } from "../types";

/** 문의 저장. DB 연동 시 이 인터페이스의 구현만 교체한다. */
export interface ContactRepository {
  save(input: ContactInput): Promise<ContactMessage>;
}

/**
 * DB 연동 전 임시 구현: 메모리에 보관하고 서버 로그로 남긴다.
 * Vercel Serverless 환경에서는 인스턴스가 재시작되면 사라지므로 영구 저장이 아니다.
 */
export function createInMemoryContactRepository(): ContactRepository {
  const messages: ContactMessage[] = [];
  return {
    async save(input) {
      const message: ContactMessage = { ...input, id: randomUUID(), createdAt: new Date().toISOString() };
      messages.push(message);
      console.log("[contact] new message", { id: message.id, name: message.name, email: message.email });
      return message;
    },
  };
}
