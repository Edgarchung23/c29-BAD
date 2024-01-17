import { Knex } from "knex";
import { CollectService } from "./collect.service";

export class CollectServiceImpl implements CollectService {
  constructor(private knex: Knex) {}
  async disCollection(
    book_id: number,
    user_id: number
  ): Promise<number> {
    // Sql : Delete from collection where book_id = book_id and user_id = user_id
    let delCollection = await this.knex("collections").where(
      {
        book_id,
      user_id
      }
    ).del();
    console.log(delCollection)
    return delCollection
  }
  async isBookCollected(book_id: number, user_id: number): Promise<boolean> {
    // sql: select * from collection where book_id = book_id and user_id = user_id , if result.length > 0 ? true : false
    return false;
  }
  async convertBookNameToId(bookName: string): Promise<string> {
    let bookNames = await this.knex("books")
      .select("id", "name")
      .where("name", bookName)
      .first();
    console.log("answer:", bookNames);

    return bookNames.id;
  }
  async saveBook(book_id: number, user_id: number): Promise<void> {
    const books = await this.knex("collections").where({
      book_id,
      user_id,
    });

    if (books.length === 0) {
      await this.knex("collections").insert({
        book_id,
        user_id,
      });
    }
  }
  async getCollectedBookByUserId(user_id: number): Promise<any[]> {
    let result = await this.knex("collections")
      .join("books", "collections.book_id", "books.id")
      .select(
        "collections.book_id",
        "collections.user_id",
        "books.name",
        "books.book_cover"
      )
      .where("collections.user_id", user_id);
    // console.log("i also is superman:", result);
    return result;
  }
}
