import { Router ,Request,Response} from "express";
import { isAdmin } from "../middelware";
import { email } from "cast.ts";
import { knex } from "../app";


export const adminRouter = Router();

async function register(req: Request, res: Response){
  console.log(req.body.email);
  if (req.body.email == undefined || req.body.email == "") {
    res.status(400).json({ message: "email can not be null" });
  } else if (req.body.password == undefined || req.body.password == "") {
    res.status(400).json({ message: " password can not be null" });
  } else if (req.body.username == undefined || req.body.username == ""){
    res.status(400).json({ message: "username can not be null."})
  }
  {
    let queryResult = await knex.select('email').from('users').where('email')

    console.log(queryResult)
    
    
  }
};
