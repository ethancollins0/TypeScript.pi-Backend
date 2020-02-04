const knex = require("../knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { Request } from "express";

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

  checkToken = (req: Request) => {
    const token = req.cookies.token;
    if (!token) return false;
    return jwt.verify(token, process.env.SECRET);
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
