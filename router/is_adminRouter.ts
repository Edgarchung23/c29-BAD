import { Router, Request, Response } from "express";
import { isAdmin } from "../middelware";

import { hashedPassword } from "../hash";
import { knex } from "../server";

export const adminRouter = Router();
adminRouter.post("/action_register", register);

async function register(req: Request, res: Response) {
  if (!req.body.email) {
    return res.status(400).json({ message: "Email cannot be empty" });
  } else if (!req.body.password) {
    return res.status(400).json({ message: "Password cannot be empty" });
  } else if (!req.body.username) {
    return res.status(400).json({ message: "Username cannot be empty" });
  }

  let queryResult = await knex.raw(`SELECT email FROM users WHERE email = ? `, [req.body.email]);
  // console.log("queryResult_2:", queryResult_2.rows);

  // let queryResult = await knex.raw(`SELECT * FROM users WHERE true `);
  console.log("result:", queryResult);
  if (queryResult.rowCount > 0) {
    return res.status(400).json({ message: "Account exists" });
  }

  let hashed = await hashedPassword(req.body.password);
  console.log({
    email: req.body.email,
    username: req.body.username,
    password: hashed,
  })
  await knex
    .insert({
      email: req.body.email,
      username: req.body.username,
      password: hashed,
      is_admin: false
    })
    .into("users");

  // await knex.raw(
  //   ` insert into "users" ("email", "password", "username",is_admin,status) values ($1, $2, $3,$4,$5)  `,
  //   [req.body.email, req.body.username, hashed, true, true]
  // );

  res.json({ message: "register success" });

  // Insert a record into database

  // if (result)
}
