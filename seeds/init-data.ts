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
        book_cover: "./原子習慣.jpg",
        content_url: "./books/原子習慣.html",
       },
       {
        user_id: id,
        name: "蘇菲的世界",
        book_cover: "./蘇菲的世界.jpg",
        content_url: "./books/蘇菲的世界.html",
       },
       {
        user_id: id,
        name: "富爸爸窮爸爸",
        book_cover: "./富爸爸窮爸爸.jpeg",
        content_url: "./books/富爸爸窮爸爸.html",
       },
    ])
    .into("books");
}
