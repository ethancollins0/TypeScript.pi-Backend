import { Router, Request, Response } from "express";
import { Authenticate } from "../knex/queries/Authenticate";
import Pis from "../knex/queries/Pis";

const auth = new Authenticate();
const pis = new Pis();
const router = Router();

router.get("/", (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send();
    return;
  }
  try {
    const decrypted: { user_id: number} = auth.decryptToken(token)
    pis.get(decrypted.user_id)
      .then((systems: any) => {
        systems
          ? res.status(200).json({ systems })
          : res.status(404).send() // no results
      }).catch(() => {
        res.status(500).send()
      })
  }
  
});

export default router;
