import { Router, Request, Response } from "express";
import { Authenticate } from "../knex/queries/Authenticate";
const auth = new Authenticate();

const router = Router();

export default router;
