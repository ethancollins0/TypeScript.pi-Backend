import { Router, Request, Response } from "express";
import { Authenticate } from "../knex/queries/Authenticate";
const auth = new Authenticate();

const router = Router();

router.get("/signup", (req: Request, res: Response) => {
  res.json("smoketest");
});

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  auth
    .login(email, password)
    .then((result: any) => {
      if (result) {
        console.log(result);
        res
          .writeHead(200, {
            "Set-Cookie": `token=${result}`
          })
          .end();
      } else {
        res.status(401).send();
      }
    })
    .catch(() => res.status(500).send());
});

export default router;
