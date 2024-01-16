import { Knex } from "knex";
import { CollectService } from "./collect.service";

export class CollectServiceImpl implements CollectService {
  constructor(private knex: Knex) {}
  async disCollection(book_id: number, user_id: number): Promise<void> {
    // Sql : Delete from collection where book_id = book_id and user_id = user_id
    return
  }
  async isBookCollected(book_id: number, user_id: number): Promise<boolean> {
    // sql: select * from collection where book_id = book_id and user_id = user_id , if result.length > 0 ? true : false 
    return false
  }
  async convertBookNameToId(bookName: string): Promise<string> {
    let bookNames = await this.knex("books")
      .select("id","name")
      .where('name', bookName)
      .first();
    console.log("answer:", bookNames);
    
    
    return bookNames.id
  }
  async saveBook( book_id: number, user_id: number): Promise<void> {

    const books = await this.knex('collections').where({
      book_id,
      user_id
    })

    if (books.length === 0) {
      await this.knex('collections').insert({
        book_id,
        user_id
      })
    } 

  }
  getCollectedBookByUserId(user_id: number): Promise<any[]> {
    return this.knex('collections')
  }
}
