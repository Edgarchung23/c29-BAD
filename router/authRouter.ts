
import { email } from "cast.ts";
import { Router, Request, Response} from "express";
import { knex } from "../server";


export const authRouter = Router();

authRouter.post("/login", login);

async function login(req: Request, res: Response){
    let queryResult = await knex.raw(`SELECT username FROM users where username = ?`, [req.body.username]);

    
    console.log(queryResult)
}