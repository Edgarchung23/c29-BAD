import { Request, Response } from "express";
import { BookService } from "../services/book.service";
import { UserService } from "../services/user.service";
import { checkPassword, hashedPassword } from "../hash";
import { email } from "cast.ts";
const inputFilePath = "./private/原子習慣.epub";
const outputFilePath = "./private/output.txt";

export class AuthController {
  constructor(private userService: UserService) {}

  register = async (req: Request, res: Response) => {
    try {
        if (!req.body.email) {
          return res.status(400).json({ message: "Email cannot be empty" });
        } else if (!req.body.password) {
          return res.status(400).json({ message: "Password cannot be empty" });
        } else if (!req.body.username) {
          return res.status(400).json({ message: "Username cannot be empty" });
        }
      
        let queryResult= await this.userService.getUserByEmail(req.body.email)
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
        await this.userService.saveUser({
            email: req.body.email,
            username: req.body.username,
            hashed: hashed,
            is_admin: false
          })
       
        res.json({ message: "register success" });
      } catch (e: any) {
        return res.status(400).json({ message: e.message });
          
      }
  }

  login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        let queryResult = await this.userService.getUserByEmail(email)
    
        console.log(queryResult)
        const userCount = queryResult.rowCount;
    
        if (userCount != 0) {
          const userData = queryResult.rows[0];
    
          console.log(password);
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

  logout = async (req: Request, res: Response) => {
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
}
