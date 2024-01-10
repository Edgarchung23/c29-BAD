import { Request, Response } from "express";
import { BookService } from "../services/BookService";
const inputFilePath = "./private/原子習慣.epub";
const outputFilePath = "./private/output.txt";

export class BookController {
  constructor(private bookService: BookService) {}


  getContent = async() => {
  
    try {
    // Get the total length of sections in the EPUB
    const totalLength = await this.bookService.getEpubLength(inputFilePath);
    
    // Loop through each section
    for (let i = 0; i < totalLength; i++) {
      // console.log(`Processing section ${i}`);
      
      // Extract HTML content for the current section
      const sectionHtml = await this.bookService.epubToText(inputFilePath, i);
      
      // Do something with the HTML content (you can modify this part)
      // console.log(`HTML content of section ${i}:`, sectionHtml);
    }
  } catch (error: any) {
    console.error('Error processing EPUB sections:', error.message);
  }
}

}
