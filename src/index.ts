import express from "express";
import bodyParser from "body-parser";
import login from "./routes/login";
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/", login);

const port: string | number = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
