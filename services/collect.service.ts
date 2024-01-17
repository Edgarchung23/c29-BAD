export interface CollectService {
  convertBookNameToId(bookName: string): Promise<string>;

  saveBook( book_id: number, user_id: number): Promise<void>;

  getCollectedBookByUserId(user_id: number): Promise<any[]>;

  disCollection( book_id: number, user_id: number): Promise<number>;

  isBookCollected(book_id: number, user_id: number): Promise<boolean>
}
