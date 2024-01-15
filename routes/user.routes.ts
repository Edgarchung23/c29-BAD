// import { Router } from "express";
// import { knex } from "../server";
// import { checkPassword, hashedPassword } from "../hash";
// import { isLoggedIn } from "../middelware";

// export const userRoutes = Router()

// // userRoutes.post('/login',async (req, res, next)=>{
// //     const {email, password} = req.body
// //     let queryResult = await knex.raw(`SELECT * FROM users where email = ?`, [email]);
// //     const userData = queryResult.rows[0]
// //     console.log(userData)


// // })

// // userRoutes.get("/user/session",isLoggedIn, async(req, res)=>{
// //     if(req.session.email){
// //         res.json({message: "success",  data: req.session.email})
// //     }else{
// //         res.status(400).json({message:"you are not login"})
// //     }
   
// // })


export {}