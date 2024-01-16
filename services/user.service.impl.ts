import { Knex } from "knex";
import { UserService } from "./user.service";
import { HttpError } from "../http.error";
import { comparePassword, hashPassword } from "../hash";
import { error } from "console";

export class UserServiceImpl implements UserService {
  constructor(private knex: Knex) {}
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
