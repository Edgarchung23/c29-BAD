import { Knex } from "knex";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {
          username: "Sexy",
          password: await hashPassword("123456"),
          email: "sexy@email.com",
          is_admin: "true",
          status: "true",
        },
      ])

    
};
