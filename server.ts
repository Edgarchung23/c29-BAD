// import express, { ErrorRequestHandler } from 'express'
import { print } from "listening-on";
import { createKnex } from "./db";
export const knex = createKnex();
import { RequestLog } from "./types";
import { env } from "./env";
import express, { NextFunction } from "express";
import { is_admin } from "./middelware";
import expressSession from "express-session";
import { UserController } from "./controllers/user.controller";
import { UserServiceImpl } from "./services/user.service.impl";
import { router } from "./routes/routes";
import { CollectController } from "./controllers/collect.controller";
import { CollectServiceImpl } from "./services/collect.service.impl";
import cors from "cors";

declare module "express-session" {
  interface SessionData {
    email?: string;
    is_admin?: boolean;
    username?: string;
    user_id: number;
  }
}

// 
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "gyukj%^&*(*UYTGYHUJYT&*YHIUGYGYI",
    resave: true,
    saveUninitialized: true,
  })
);

// Routes
app.use(router);

let userService = new UserServiceImpl(knex);
let collectService = new CollectServiceImpl(knex);

app.use(new UserController(userService).router);
app.use(new CollectController(collectService).router);

// 
app.use(express.static("public"));
app.use(express.static("public/html"));
app.use(express.static("public/images"));
app.use(express.static("books"));
app.use(express.static("voice"));
app.use("/admin", is_admin, express.static("private"));

let port = env.PORT;
app.listen(port, async () => {
  print(port);
})
