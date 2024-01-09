// import { UserService } from "./user.service";
// import { HttpError } from "../http.error";
// import { Knex } from "knex";

// export class UserServiceImpl implements UserService {
//   constructor(private knex: Knex) {}

//   async login(input: {
//     username: string;
//     password: string;
//   }): Promise<{ id: number }> {
//     let user = await this.knex("user")
//       .select("id", "password__pash")
//       .where({ username: input.username })
//       .first();
//     if(!user)
//   }

//   register(input: {
//     username: string;
//     password: string;
//     avatar: string | null;
//     email: string;
//     tel: string;
//   }): Promise<{ id: number }> {
//     throw new HttpError(501, "Method not implemented.");
//   }
// }
