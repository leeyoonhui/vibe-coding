import cors from "cors";
import express, { type ErrorRequestHandler } from "express";
import { createInMemoryContactRepository, type ContactRepository } from "./repositories/contactRepository";
import { staticPortfolioRepository, type PortfolioRepository } from "./repositories/portfolioRepository";
import { contactRouter } from "./routes/contact";
import { portfolioRouter } from "./routes/portfolio";

interface AppDeps {
  portfolioRepo?: PortfolioRepository;
  contactRepo?: ContactRepository;
  corsOrigin?: string;
}

export function createApp({
  portfolioRepo = staticPortfolioRepository,
  contactRepo = createInMemoryContactRepository(),
  corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:3000",
}: AppDeps = {}) {
  const app = express();
  app.disable("x-powered-by");

  const allowedOrigins = corsOrigin.split(",").map((o) => o.trim()).filter(Boolean);
  app.use(cors({ origin: allowedOrigins }));
  app.use(express.json({ limit: "10kb" }));

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });
  app.use("/api", portfolioRouter(portfolioRepo));
  app.use("/api", contactRouter(contactRepo));

  app.use((_req, res) => {
    res.status(404).json({ error: "Not Found" });
  });

  const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    // express.json() 의 잘못된 JSON 본문
    if (err?.type === "entity.parse.failed" || err?.type === "entity.too.large") {
      res.status(400).json({ error: "요청 본문이 올바르지 않습니다." });
      return;
    }
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  };
  app.use(errorHandler);

  return app;
}
