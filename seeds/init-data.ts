import { Knex } from "knex";
import { hashPassword } from "../hash";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();
    await knex("books").del();

    // Inserts seed entries
    const [{ id }]: Array<{ id: number }> = await knex
      .insert({
          username: "Sexy",
          password: await hashPassword("123456"),
          email: "sexy@email.com",
          is_admin: "true",
          status: "true",
      })
      .into("users")
      .returning("id");

    return await knex
      .insert([
       {
        user_id: id,
        name: "原子習慣",
        book_cover: "./private/原子習慣.jpg",
        content_url: "./private/原子習慣.epub",
       },
       {
        user_id: id,
        name: "蘇菲的世界",
        book_cover: "./private/蘇菲的世界.jpg",
        content_url: "./private/蘇菲的世界.epub",
       },
       {
        user_id: id,
        name: "富爸爸窮爸爸",
        book_cover: "./private/富爸爸窮爸爸.jpg",
        content_url: "./private/富爸爸窮爸爸.epub",
       },
    ])
    .into("books");
}
