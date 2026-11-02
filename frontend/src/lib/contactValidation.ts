import type { ContactInput } from "@/types";
import type { FieldErrors } from "./api";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 백엔드 backend/src/routes/contact.ts 의 contactSchema 와 규칙을 맞춘다.
export function validateContact(input: ContactInput): FieldErrors {
  const errors: FieldErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name) errors.name = ["이름을 입력해 주세요."];
  else if (name.length > 50) errors.name = ["이름은 50자 이하로 입력해 주세요."];

  if (!EMAIL_PATTERN.test(email) || email.length > 254) errors.email = ["올바른 이메일 주소를 입력해 주세요."];

  if (!message) errors.message = ["메시지를 입력해 주세요."];
  else if (message.length > 2000) errors.message = ["메시지는 2000자 이하로 입력해 주세요."];

  return errors;
}
