import { Knex } from "knex";
import { comparePassword } from "../hash";
import { HttpError } from "../http.error";
import { UserService } from "./user.service";

export class UserServiceImpl implements UserService {
  constructor(private knex: Knex) {}
  async saveUser(output: { email: string; username: string; hashed: string; is_admin: boolean; }): Promise<void> {
    await this.knex
    .insert({
      email: output.email,
      username: output.username,
      password: output.hashed,
      is_admin: false
    })
    .into("users");
  }

  async getUserByEmail(email: string): Promise<any> {
    let queryResult = await this.knex.raw(`SELECT * FROM users where email = ?`, [
      email,
    ]);
    return queryResult
  }



  async loginUser(output: {
    username: string;
    password: string;
  }): Promise<{ username: string }> {
    let user = await this.knex('users')
      .select('id', 'email')
      .where({ username: output.username})
      .first()
    console.log('user:',user)
    if (!user) throw new Error("Method not implemented.");
    let is_match = await comparePassword ({
      password: output.password,
      password_hash: user.password_hash
    })
    if (!is_match) throw new HttpError(401, 'wrong username or password')
    return {username: user.username}
  }


}
