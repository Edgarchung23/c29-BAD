import { NextFunction, Router,Response,Request } from "express";
import { UserService } from "../services/user.service";
import { isLoggedIn } from "../middelware";


export class UserController {
    public router = Router()

    wrapMethod ( method: ( res: Response)=> object | Promise<object>){
        method = method.bind(this)
        return async (req:Request, res: Response, next: NextFunction ) =>{
            try{
                let json = await method(res)
                res.json(json)
            } catch (error){
                next(error)
            }
        }
    }
    constructor ( 
        private userService: UserService,
        ){
            this.router.get('/user/session', isLoggedIn, this.getUsername)
        }

    async getSession(req:Request){
        const username = req.session.username
        console.log(username)
        // if(!req.session.username)
        //     throw new HttpError(401, 'this API is onl for authenticated users')
        // return {
        //     user:req.session.username
        // }
    }

    async getUsername( req:Request ,res: Response){
        try{
            if(req.session.email){
                res.json({message: "login success",  data: req.session.username})
                
            }else{
                res.status(400).json({message:"you are not login"})
            }
           
        }catch(error :any){
            res.status(400).json({message: error.message})
        }
    }
    
    
}
