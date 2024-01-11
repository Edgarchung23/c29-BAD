
import { email } from "cast.ts";
import { Router, Request, Response} from "express";
import { knex } from "../server";
import { checkPassword } from "../hash";
import { is_admin } from "../middelware";


export const authRouter = Router();

authRouter.post("/login",login);

async function login(req: Request, res: Response){
    let queryResult = await knex.raw(`SELECT * FROM users where username = ?`, [req.body.username]);

    console.log(queryResult)

    if (queryResult.rowCount != 0){
        let compareResult = await checkPassword ({
            plainPassword:req.body.password,
            hashedPassword: queryResult.rows[0].password,
        });
        if (compareResult){
            req.session.email = queryResult.rows[0].email;
            if(queryResult.rows[0].is_admin){
                req.session.is_admin = true;
                res.json({message:"login success", is_admin:true})
            }else res.json({ message: "login success",is_admin: false});    
        }
        else{
        res.status(400).json({ message: "password is incorrect" });
        }
     } else{
        res.status(400).json({ message: "email_address is incorrect" });
        }
    }
