import { Router, Request, Response } from "express";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  console.log(req.cookies);
  res.json("smoketest");
});

export default router;
