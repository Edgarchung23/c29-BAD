// import express from "express";
// import { isAdmin } from "./middelware";
// import { createKnex } from "./db"; 

// export const knex = createKnex()
// const app = express();
// const port = 7777;

// declare module "express-session"{
//     interface SessionData {
//         email?: string;
//         grant?: any;
//         isAdmin?: boolean;
//         name?:string;
//     }
// }

// app.use(express.urlencoded({ extended:true }));
// app.use(express.json());

// app.use(express.static("public"));
// app.use("/admin", isAdmin, express.static("private"));

// app.listen(port, async()=>{
//     console.log(`App running at http://localhost:${port}`);
//     const data = await knex.raw(`Select * from users;`)
//     console.log(data.rows)
// })
