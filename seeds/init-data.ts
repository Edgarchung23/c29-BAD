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
        category: "心理學",
        book_cover: "/原子習慣.jpg",
        content_url: "./books/原子習慣.epub",
       },
       {
        user_id: id,
        name: "蘇菲的世界",
        category: "文學",
        book_cover: "/蘇菲的世界.jpg",
        content_url: "./books/蘇菲的世界.epub",
       },
       {
        user_id: id,
        name: "富爸爸窮爸爸",
        category: "心理學",
        book_cover: "/富爸爸窮爸爸.jpeg",
        content_url: "./books/富爸爸窮爸爸.epub",
       },
       {
        user_id: id,
        name: "哈利波特1神秘的魔法石",
        category: "小說",
        book_cover: "/哈利波特1神秘的魔法石.jpg",
        content_url: "./books/哈利波特1神秘的魔法石.epub",
       },
       {
        user_id: id,
        name: "哈利波特2消失的密室",
        category: "小說",
        book_cover: "/哈利波特2消失的密室.jpg",
        content_url: "./books/哈利波特2消失的密室.epub",
       },
       {
        user_id: id,
        name: "哈利波特3阿茲卡班的逃犯",
        category: "小說",
        book_cover: "/哈利波特3阿茲卡班的逃犯.jpg",
        content_url: "./books/哈利波特3阿茲卡班的逃犯.epub",
       },
       {
        user_id: id,
        name: "哈利波特4火盃的考驗",
        category: "小說",
        book_cover: "/哈利波特4火盃的考驗.jpg",
        content_url: "./books/哈利波特4火盃的考驗.epub",
       },
       {
        user_id: id,
        name: "哈利波特5鳳凰會的密令",
        category: "小說",
        book_cover: "/哈利波特5鳳凰會的密令.jpg",
        content_url: "./books/哈利波特5鳳凰會的密令.epub",
       },
       {
        user_id: id,
        name: "哈利波特6混血王子的背叛",
        category: "小說",
        book_cover: "/哈利波特6混血王子的背叛.jpg",
        content_url: "./books/哈利波特6混血王子的背叛.epub",
       },
       {
        user_id: id,
        name: "哈利波特7死神的聖物",
        category: "小說",
        book_cover: "/哈利波特7死神的聖物.jpg",
        content_url: "./books/哈利波特7死神的聖物.epub",
       },
       {
        user_id: id,
        name: "安妮日記",
        category: "文學",
        book_cover: "/安妮日記.jpg",
        content_url: "./books/安妮日記.epub",
       },
       {
        user_id: id,
        name: "人性的弱點",
        category: "心理學",
        book_cover: "/人性的弱點.jpg",
        content_url: "./books/人性的弱點.epub",
       },
       {
        user_id: id,
        name: "大師的殘忍",
        category: "文學",
        book_cover: "/大師的殘忍.jpg",
        content_url: "./books/大師的殘忍.epub",
       },
       {
        user_id: id,
        name: "睇色，戒",
        category: "文學",
        book_cover: "/睇色，戒.jpg",
        content_url: "./books/睇色，戒.epub",
       },
       {
        user_id: id,
        name: "自卑與超越",
        category: "心理學",
        book_cover: "/自卑與超越.jpg",
        content_url: "./books/自卑與超越.epub",
       },
    ])
    .into("books");
}
