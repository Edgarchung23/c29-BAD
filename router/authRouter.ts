
import { email } from "cast.ts";
import { Router, Request, Response} from "express";
import { knex } from "../server";
import { checkPassword } from "../hash";
import { is_admin } from "../middelware";


export const authRouter = Router();

authRouter.post("/login",login);

async function login(req: Request, res: Response){
    const {email, password} = req.body
    let queryResult = await knex.raw(`SELECT * FROM users where email = ?`, [email]);
    const userData = queryResult.rows[0]
    console.log(userData)

    if (queryResult.rowCount != 0){
        let compareResult = await checkPassword ({
            plainPassword: password,
            hashedPassword: userData.password,
        });
        if (!compareResult){
            res.status(400).json({ message: "password is incorrect" });
            return
        }
        console.log(req.session)
        req.session.email = userData.email;
        // if(queryResult.rows[0].is_admin){
        //     req.session.is_admin = true;
        //     res.json({message:"login success", is_admin:queryResult.rows[0].is_admi})
        //     return
        // }else {
        //     res.json({ message: "login success",is_admin: false});   
        //     return
        // } 
        const isAdmin = queryResult.rows[0].is_admin
        req.session.is_admin = isAdmin;
        res.json({message:"login success", is_admin:isAdmin})
        return
     } else{
        res.status(400).json({ message: "email_address is incorrect" });
        }
    }
