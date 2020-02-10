import { Router, Request, Response } from "express";
import { Authenticate } from "../knex/queries/Authenticate";
const auth = new Authenticate();

const router = Router();

router.post("/signup", (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) res.status(401).send();

  // add logic to create user

  res.status(200).send();
});

router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;
  auth
    .login(email, password)
    .then((result: any) => {
      const token = `token=${result}`;
      if (result) {
        res
          .writeHead(200, {
            "Set-Cookie": token,
            "Access-Control-Allow-Credentials": "true"
          })
          .send();
      } else {
        res.status(401).send();
      }
    })
    .catch(() => res.status(500).send());
});

export default router;
