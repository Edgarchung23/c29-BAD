import expressSession from "express-session";
import { env } from "./env";

export let sessionMiddleware = expressSession({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
})

declare module 'express-session'{
    interface SessionDate{
        user:{
            id:number
            username: string
        }
    }
}