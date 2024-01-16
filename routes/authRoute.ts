import { NextFunction, Request, Response, Router } from "express";
import { checkPassword, hashedPassword } from "../hash";
import { knex } from "../server";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.post("/register", register);

async function register(req: Request, res: Response) {
  try {
    if (!req.body.email) {
      return res.status(400).json({ message: "Email cannot be empty" });
    } else if (!req.body.password) {
      return res.status(400).json({ message: "Password cannot be empty" });
    } else if (!req.body.username) {
      return res.status(400).json({ message: "Username cannot be empty" });
    }
  
    let queryResult = await knex.raw(`SELECT email FROM users WHERE email = ? `, [req.body.email]);
    console.log("result:", queryResult.rows);
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
    res.json({ message: "register success" });
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
      
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    let queryResult = await knex.raw(`SELECT * FROM users where email = ?`, [
      email,
    ]);

    const userCount = queryResult.rowCount;

    if (userCount != 0) {
      const userData = queryResult.rows[0];

      console.log(password);
      console.log(hashedPassword);
      let compareResult = await checkPassword({
        plainPassword: password,
        hashedPassword: userData.password,
      });
      if (!compareResult) {
        res.status(400).json({ message: "password is incorrect" });
        return;
      }
      req.session.email = userData.email;
      const isAdmin = userData.is_admin;
      req.session.is_admin = isAdmin;
      req.session.username = userData.username;
      req.session.user_id = userData.id;

      

      console.log("Login email: ", req.session.email);
      console.log("Login is_admin: ", req.session.is_admin);
      
      res.json({ message: "login success", is_admin: isAdmin });
      return;
    } else {
      const username = req.body.username;
      res
        .status(400)
        .json({ message: `email_address is incorrect ${username}` });
      return
    }
  } catch (error: any) {
    res.status(400).json({ massage: error.message });
  }
}

async function logout(req: Request, res: Response) {
  if (!req.session.email) {
    res.status(401).json({ message: "your are not logged in" });
  } else {
    req.session.destroy((error) => {
      if (error) {
        res.status(500).json({ message: "logout failed" });
      } else {
        res.json({ message: "logout success" });
      }
    });
  }
}
