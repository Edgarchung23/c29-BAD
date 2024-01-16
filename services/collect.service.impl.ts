import { Knex } from "knex";
import { CollectService } from "./collect.service";

export class CollectServiceImpl implements CollectService {
  constructor(private knex: Knex) {}
  async convertBookNameToId(bookName: string): Promise<string> {
    let bookNames = await this.knex("books")
      .select("id","name")
      .where('name', bookName)
      .first();
    console.log("answer:", bookNames);
    
    
    return bookNames.id
  }
  saveBook(input: { book_id: number }): Promise<void> {

    
    throw new Error("Method not implemented.");
  }
  getCollectedBookByUserId(user_id: number): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
}
