import { parseEpub, parseHTML } from "@gxl/epub-parser";
import { Section } from "@gxl/epub-parser/lib/parseSection";

const inputFilePath = "./private/book.epub";
const outputFilePath = "./private/output.txt";

export class BookService {
    constructor(){}

    async getEpubLength(inputFilePath: string): Promise<number> {
    const epubObj = await parseEpub(inputFilePath, {
    type: "path",
  });

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
      const targetSection: Section = epubObj.sections[targetSectionIndex];
      return targetSection.htmlString;
    } 
    throw new Error("No sections found in the EPUB.");
  } catch (error: any) {
    console.error("Error parsing EPUB:", error.message);
    throw error
  }
}}