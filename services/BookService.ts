import { parseEpub, parseHTML } from "@gxl/epub-parser";
import { Section } from "@gxl/epub-parser/lib/parseSection";
import { Knex } from "knex";

const inputFilePath = "./private/原子習慣.epub";
const outputFilePath = "./private/output.txt";

export class BookService {
    constructor(private knex: Knex){}

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