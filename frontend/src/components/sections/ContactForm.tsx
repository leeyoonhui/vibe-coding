"use client";

import { useState, type FormEvent } from "react";
import { sendContact, type FieldErrors } from "@/lib/api";
import { validateContact } from "@/lib/contactValidation";
import type { ContactInput } from "@/types";

type Status = { state: "idle" } | { state: "submitting" } | { state: "success" } | { state: "error"; message: string };

const EMPTY: ContactInput = { name: "", email: "", message: "" };

const labelClass = "flex flex-col gap-2.5 text-sm font-bold text-subtle";
const inputClass = "h-11 border-0 border-b bg-transparent p-0 text-base font-normal text-white placeholder:text-muted focus:outline-2 focus:outline-offset-4 focus:outline-accent";

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const update = (field: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const clientErrors = validateContact(values);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus({ state: "idle" });
      return;
    }

    setStatus({ state: "submitting" });
    const result = await sendContact(values);
    if (result.ok) {
      setValues(EMPTY);
      setErrors({});
      setStatus({ state: "success" });
    } else {
      setErrors(result.fieldErrors ?? {});
      setStatus({ state: "error", message: result.error });
    }
  }

  const fieldError = (field: keyof ContactInput) =>
    errors[field]?.[0] && (
      <span id={`${field}-error`} className="text-sm font-medium text-[#eb5757]">
        {errors[field]?.[0]}
      </span>
    );

  const borderClass = (field: keyof ContactInput) => (errors[field] ? "border-[#eb5757]" : "border-line");

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full max-w-[753px] flex-col gap-10">
      <div className="flex flex-wrap gap-x-[37px] gap-y-10">
        <label className={`${labelClass} flex-[1_1_300px]`}>
          이름
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="홍길동"
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`${inputClass} ${borderClass("name")}`}
          />
          {fieldError("name")}
        </label>
        <label className={`${labelClass} flex-[1_1_300px]`}>
          이메일
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={values.email}
            onChange={update("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${inputClass} ${borderClass("email")}`}
          />
          {fieldError("email")}
        </label>
      </div>
      <label className={labelClass}>
        메시지
        <textarea
          name="message"
          rows={4}
          placeholder="문의 내용을 입력해 주세요"
          value={values.message}
          onChange={update("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`resize-y border bg-transparent p-4 text-base font-normal text-white placeholder:text-muted focus:outline-2 focus:outline-offset-4 focus:outline-accent ${borderClass("message")}`}
        />
        {fieldError("message")}
      </label>

      <div className="flex flex-col items-center gap-4">
        <button
          type="submit"
          disabled={status.state === "submitting"}
          className="h-12 w-full cursor-pointer bg-accent px-7 text-[15px] font-bold text-canvas transition-colors hover:bg-[#2fc56e] disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:min-w-[143px]"
        >
          {status.state === "submitting" ? "보내는 중..." : "보내기"}
        </button>
        <p role="status" aria-live="polite" className="text-sm font-medium">
          {status.state === "success" && <span className="text-accent">메시지를 보냈습니다. 확인 후 연락드리겠습니다.</span>}
          {status.state === "error" && <span className="text-[#eb5757]">{status.message}</span>}
        </p>
      </div>
    </form>
  );
}
