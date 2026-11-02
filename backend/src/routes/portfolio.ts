import { Router } from "express";
import type { PortfolioRepository } from "../repositories/portfolioRepository";

export function portfolioRouter(repo: PortfolioRepository): Router {
  const router = Router();

  router.get("/profile", async (_req, res, next) => {
    try {
      res.json(await repo.getProfile());
    } catch (err) {
      next(err);
    }
  });

  router.get("/activities", async (_req, res, next) => {
    try {
      res.json(await repo.listActivities());
    } catch (err) {
      next(err);
    }
  });

  router.get("/awards", async (_req, res, next) => {
    try {
      res.json(await repo.listAwards());
    } catch (err) {
      next(err);
    }
  });

  return router;
}
