import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "../src/app";
import type { ContactInput, ContactMessage } from "../src/types";

function makeApp() {
  const saved: ContactInput[] = [];
  const app = createApp({
    corsOrigin: "http://localhost:3000",
    contactRepo: {
      async save(input): Promise<ContactMessage> {
        saved.push(input);
        return { ...input, id: "test", createdAt: new Date(0).toISOString() };
      },
    },
  });
  return { app, saved };
}

describe("GET endpoints", () => {
  it("returns health", async () => {
    const res = await request(makeApp().app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  });

  it("returns profile", async () => {
    const res = await request(makeApp().app).get("/api/profile");
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("임재정");
    expect(res.body.email).toBe("limjj157@naver.com");
  });

  it("returns 4 activities", async () => {
    const res = await request(makeApp().app).get("/api/activities");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(4);
  });

  it("returns awards sorted by start date", async () => {
    const res = await request(makeApp().app).get("/api/awards");
    expect(res.status).toBe(200);
    expect(res.body.map((a: { startDate: string }) => a.startDate)).toEqual(["2025.01", "2025.08", "2026.07", "2026.09"]);
  });

  it("returns 404 json for unknown routes", async () => {
    const res = await request(makeApp().app).get("/api/nope");
    expect(res.status).toBe(404);
  });
});

describe("POST /api/contact", () => {
  it("saves a valid message", async () => {
    const { app, saved } = makeApp();
    const res = await request(app)
      .post("/api/contact")
      .send({ name: " 홍길동 ", email: "hong@example.com", message: "안녕하세요" });
    expect(res.status).toBe(201);
    expect(saved).toEqual([{ name: "홍길동", email: "hong@example.com", message: "안녕하세요" }]);
  });

  it("rejects invalid input with field errors", async () => {
    const { app, saved } = makeApp();
    const res = await request(app).post("/api/contact").send({ name: "", email: "bad", message: "" });
    expect(res.status).toBe(400);
    expect(Object.keys(res.body.fieldErrors).sort()).toEqual(["email", "message", "name"]);
    expect(saved).toHaveLength(0);
  });

  it("rejects malformed JSON", async () => {
    const res = await request(makeApp().app)
      .post("/api/contact")
      .set("Content-Type", "application/json")
      .send("{bad");
    expect(res.status).toBe(400);
  });
});

describe("CORS", () => {
  it("allows the configured origin only", async () => {
    const app = makeApp().app;
    const ok = await request(app).get("/api/health").set("Origin", "http://localhost:3000");
    expect(ok.headers["access-control-allow-origin"]).toBe("http://localhost:3000");
    const other = await request(app).get("/api/health").set("Origin", "https://evil.example");
    expect(other.headers["access-control-allow-origin"]).toBeUndefined();
  });
});
