const knex = require("../knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

  private checkToken = (token: string) => {
    console.log(token);
  };

  //issues a 30 day token
  private issueToken = (user_id: number) => {
    const token = jwt.sign(
      { user_id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 },
      process.env.SECRET
    );
    console.log(token);
    return token;
  };
}
