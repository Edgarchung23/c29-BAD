// import { NextFunction, Request,Response } from "express";

// export function isLoggedIn (req:Request, res:Response, next:NextFunction){
//     if (req.session.email){
//         next();
//     }else{
//         res.status(401).json({ message: "access denied .you are not logged in."})
//     }
// }

// export function isAdmin(req: Request, res: Response, next: NextFunction){
//     if (req.session.email){
//         if (req.session.isAdmin){
//             next();
//         }else {
//             res.status(401).json ({ message:"access denied. you are not admin."});
//         }
//     } else {
//         res.status(401).json({ message: "access denied. you are not logged in.å"})
//     }
// }