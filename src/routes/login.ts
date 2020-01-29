import { Router, Request, Response } from "express";

const router = Router();

router.get("/signup", (req: Request, res: Response) => {
  res.json("smoketest");
});

// router.post("/login", (req: Request, res: Response) => {

// });

export default router;
