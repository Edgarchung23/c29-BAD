// import express from "express";
// import { isAdmin } from "./middelware";
// import { adminRouter } from "./router/is_adminRouter";
// import { createKnex } from "./db";
// import { authRouter } from "./router/authRouter";



// export const knex = createKnex()
// const app = express();


// declare module "express-session"{
//     interface SessionData {
//         email?: string;
//         isAdmin?: boolean;
//         name?:string;
//     }
// }

// app.use(express.static("public"));
// app.use("/admin", isAdmin, express.static("private"));
// app.use(express.urlencoded({ extended:true }));
// app.use(express.json());



// app.use(adminRouter);
// app.use(authRouter);


