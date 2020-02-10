import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import login from "./routes/login";
import users from "./routes/users";

import { Authenticate } from "./knex/queries/Authenticate";
const auth = new Authenticate();
require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/", login); // unprotected routes

app.use("/users", auth.checkToken, users); //protected routes

app.post(
  "/validate",
  auth.checkToken,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send();
  }
);

const port: string | number = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
