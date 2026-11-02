import { Router } from "express";
import { z } from "zod";
import type { ContactRepository } from "../repositories/contactRepository";

// 프론트엔드 ContactForm 의 검증 규칙과 맞춘다.
export const contactSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해 주세요.").max(50, "이름은 50자 이하로 입력해 주세요."),
  email: z.string().trim().email("올바른 이메일 주소를 입력해 주세요.").max(254),
  message: z.string().trim().min(1, "메시지를 입력해 주세요.").max(2000, "메시지는 2000자 이하로 입력해 주세요."),
});

export function contactRouter(repo: ContactRepository): Router {
  const router = Router();

  router.post("/contact", async (req, res, next) => {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "입력값을 확인해 주세요.", fieldErrors: parsed.error.flatten().fieldErrors });
      return;
    }
    try {
      await repo.save(parsed.data);
      res.status(201).json({ ok: true });
    } catch (err) {
      next(err);
    }
  });

  return router;
}
