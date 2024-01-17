import { parseEpub, parseHTML } from "@gxl/epub-parser";
import { Section } from "@gxl/epub-parser/lib/parseSection";
import { Knex } from "knex";
import { Book } from "../models/book";


export class BookService {
    constructor(private knex: Knex){}

    async getAllBook(): Promise<Book[]> {
      try {
        // Execute a raw SQL query to get information about all books

        console.log(this.knex)
        const queryResult = await this.knex.raw(
          `SELECT id, name, book_cover, category from books`
        );
        // Extract the rows from the query result
        const books: Book[] = queryResult.rows;
  
        // Log the retrieved books (optional)
        // console.log("Array of book", books);
  
        // Return the array of books
        return books;
      } catch (error: any) {
        // Handle any errors that occur during the process
        console.error('Error in getAllBook:', error.message);
        throw error; // Optionally rethrow the error for higher-level error handling
      }
    }



    async getEpubLength(inputFilePath: string): Promise<number> {
    const epubObj = await parseEpub(inputFilePath, {
      
    type: "path",
  });
console.log("input:",inputFilePath)
  if (epubObj?.sections?.length) {
    // console.log("Number of sections:", epubObj.sections.length);
    return epubObj.sections.length
  }
  return 0
}

    async epubToText(
  inputFilePath: string,
  targetSectionIndex: number
): Promise<string> {
  try {
    const epubObj = await parseEpub(inputFilePath, {
      type: "path",
    });

    if (epubObj?.sections?.length) {
      // console.log("Number of sections:", epubObj.sections.length);
      
      if (!epubObj.sections[targetSectionIndex]) {
        throw new Error(`Section at index ${targetSectionIndex} not found.`);
      }
      // console.log(epubObj.sections)
      const targetSection: Section = epubObj.sections[15];
      console.log(targetSection.htmlString)

      return targetSection.htmlString;
    } 
    throw new Error("No sections found in the EPUB.");
  } catch (error: any) {
    console.error("Error parsing EPUB:", error.message);
    throw error
  }
}}