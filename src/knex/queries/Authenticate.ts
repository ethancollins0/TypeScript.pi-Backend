const knex = require("../knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

export class Authenticate {
  //handles post request to '/login', returns a token on success
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

  //handles post request to '/signup', returns user id
  signup = (email: string, name: string, password: string) => {
    if (!email || !name || !password) return false;
    const hashedPass = bcrypt.hashSync(password, 10);
    return knex("users")
      .insert({ email, name, password: hashedPass })
      .returning("id")
      .then((id: number) => {
        return this.issueToken(id);
      })
      .catch(() => {
        return null;
      });
  };

  // middleware, checks for valid token
  checkToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).send();
      return;
    }
    jwt.verify(token, process.env.SECRET, (err: any, decoded: any) => {
      if (err || !decoded) {
        res.status(401).send();
      } else {
        next();
      }
    });
  };

  // returns decoded token or throws error
  decryptToken = (token: string) => {
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
