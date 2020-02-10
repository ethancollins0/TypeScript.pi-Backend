const knex = require("../knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

export class Authenticate {
  login = (email: string, password: string) => {
    return knex("users")
      .where({ email })
      .first()
      .then((res: any) => {
        if (!res) return false;
        const result = bcrypt.compareSync(
          password,
          res.password,
          (err: any, result: boolean) => {
            if (err) return err;
            return result;
          }
        );
        return result ? this.issueToken(res.id) : result;
      });
  };

  signup = (email: string, name: string, password: string) => {};

  checkToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).send();
      return;
    }
    jwt.verify(token, process.env.SECRET) ? next() : res.status(401).send();
  };

  //issues a 30 day token
  private issueToken = (user_id: number) => {
    const token = jwt.sign(
      { user_id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 },
      process.env.SECRET
    );
    return token;
  };
}
