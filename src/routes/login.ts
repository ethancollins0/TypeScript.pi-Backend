import { Router, Request, Response } from "express";
import { Authenticate } from "../knex/queries/Authenticate";
const auth = new Authenticate();

const router = Router();

router.post("/signup", (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) res.status(401).send();

  auth
    .signup(email, name, password)
    .then((result: any) => {
      if (!result) res.status(401).send();
      const token = `token=${result}`;
      res
        .writeHead(200, {
          "Set-Cookie": token,
          "Access-Control-Allow-Credentials": "true"
        })
        .send();
    })
    .catch(() => res.status(500).send);

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
