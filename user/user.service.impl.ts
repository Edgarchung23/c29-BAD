// import { Client } from "pg";
// import { UserService } from "./user.service";
// import { HttpError } from "../http.error";

// export class UserServiceImpl implements UserService {
//   constructor(private client: Client) {}

//   login(input: {
//     username: string;
//     password: string;
//   }): Promise<{ id: number }> {
//     throw new HttpError(501, "Method not implemented.");
//   }

//   register(input: {
//     username: string;
//     password: string;
//     avatar: string | null;
//     email: string;
//     tel: string;
//   }): Promise<{ id: number }> {
//     throw new HttpError(501, 'Method not implemented.')
//   }
// }
