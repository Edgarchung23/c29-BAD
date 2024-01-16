export interface CollectService {
  convertBookNameToId(bookName: string): Promise<string>;

  saveBook(input: { book_id: number }): Promise<void>;

  getCollectedBookByUserId(user_id: number): Promise<any[]>;
}
