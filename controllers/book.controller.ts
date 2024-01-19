import { Request, Response } from "express";
import { BookService } from "../services/book.service";
const inputFilePath = "./private/原子習慣.epub";
const outputFilePath = "./private/output.txt";

export class BookController {
  constructor(private bookService: BookService) {}

  getContent = async (req: Request, res: Response) => {
    try {
      // Get the total length of sections in the EPUB
      const totalLength = await this.bookService.getEpubLength(inputFilePath);

      let HTMLArray: string[] = [];
      // Loop through each section
      for (let i = 0; i < 2; i++) {
        // console.log(`Processing section ${i}`);

        // Extract HTML content for the current section
        const sectionHtml = await this.bookService.epubToText(inputFilePath, i);

        // Do something with the HTML content (you can modify this part)
        // console.log(`HTML content of section ${i}:`, sectionHtml);
        HTMLArray.push(sectionHtml);
      }

      res.status(200).json({
        msg: HTMLArray,
      });
    } catch (error: any) {
      console.error("Error processing EPUB sections:", error.message);
    }
  };

  getAllBook = async (req: Request, res: Response) => {
    try {
      let result = await this.bookService.getAllBook();
      res.json({ msg: "success", data: result });
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };
}
