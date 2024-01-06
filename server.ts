import express from "express";
import { sessionMiddleware } from "./session";
import { HttpError } from "./http.error";
import { FormidableParser } from "./multipartFormParser";
import { UserServiceImpl } from "./user/user.service.impl";
import { client } from "./db";

let app = express()

app.use(sessionMiddleware)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let userService = new UserServiceImpl(client)

app.use(
    new UserController(
        userService,
        new FormidableParser(UserController.registerFormOptions),
    ).router,
)

app.use((req,res,next)=>next(
    new HttpError(
        404,
        `route not found, method: ${req.method}, url: ${req.url}`,
)))


let port = 8100
app.listen(port,()=>{
    console.log(port)
})