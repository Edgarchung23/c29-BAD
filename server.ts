// import express, { ErrorRequestHandler } from 'express'
import { print } from "listening-on";
import { createKnex } from "./db";
import { RequestLog } from "./types";
import { HttpError } from "./http.error";
import { env } from "./env";
import express from "express";
import axios from "axios";
import cheerio from "cheerio";
// import * as EPub from 'epub';
import { parseEpub, parseHTML } from "@gxl/epub-parser";
import { Section } from "@gxl/epub-parser/lib/parseSection";
import { isAdmin } from "./middelware";
import { adminRouter } from "./router/is_adminRouter";
import { authRouter } from "./router/authRouter";
// import { adminRouter } from "./router/is_adminRouter";
// import { isAdmin } from "./middelware";

export const knex = createKnex()
const app = express();


//<--------------------------March's need------------------------------------>
declare module "express-session"{
  interface SessionData {
      email?: string;
      isAdmin?: boolean;
      name?:string;
  }
}

app.use(express.static("public/html/"));
app.use(express.static("public/images"));
app.use(express.static("public"));
app.use("/admin", isAdmin, express.static("private"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(adminRouter);
app.use(authRouter);
//<--------------------------------------------------------------->





app.use((req, res, next) => {
  console.log(req.method, req.url);
  let row: RequestLog = {
    method: req.method,
    url: req.url,
    user_agent: req.headers["user-agent"] || null,
  };
  knex("request_log")
    .insert(row)
    .catch((err) => {
      console.error("failed to insert request_log:", err);
    });
  next();
});





app.use((req, res, next) =>
  next(
    new HttpError(
      404,
      `route not found, method: ${req.method}, url: ${req.url}`
    )
  )
);

let port = env.PORT;
app.listen(port, async () => {
  print(port);
  // try {
  //   // Get the total length of sections in the EPUB
  //   const totalLength = await getEpubLength(inputFilePath);
    
    // Loop through each section
    // for (let i = 0; i < totalLength; i++) {
      // console.log(`Processing section ${i}`);
      
  //     // Extract HTML content for the current section
  //     const sectionHtml = await epubToText(inputFilePath, i);
      
  //     // Do something with the HTML content (you can modify this part)
  //     // console.log(`HTML content of section ${i}:`, sectionHtml);
  //   }
  // } catch (error: any) {
  //   console.error('Error processing EPUB sections:', error.message);
  // }
})


// Scraping
async function scrapeHaodoo() {
  try {
    // Make a request to the website
    const response = await axios.get("https://www.haodoo.net/");

    // Load the HTML content into Cheerio
    const $ = cheerio.load(response.data);

    // Extract data based on HTML elements and classes
    const bookTitles: string[] = [];
    $(".a03").each((_, element) => {
      const title = $(element).find("a").text().trim();
      bookTitles.push(title);
    });

    // Display the extracted data
    // console.log("Book Titles:");
    // console.log(bookTitles);
  } catch (error) {
    console.error("Error!!!");
  }
}

const inputFilePath = "./private/book.epub";
const outputFilePath = "./private/output.txt";

async function getEpubLength(inputFilePath: string): Promise<number> {
  const epubObj = await parseEpub(inputFilePath, {
    type: "path",
  });

  if (epubObj?.sections?.length) {
    // console.log("Number of sections:", epubObj.sections.length);
    return epubObj.sections.length
  }
  return 0
}

async function epubToText(
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
}

// console.log(epubToText)
// async function epubToText(inputFilePath: string) {
//   const epubObj = await parseEpub(inputFilePath, {
//     type: 'path',
//   })

//   console.log('epub content:', epubObj.sections?.length)

//   if (epubObj.sections![51]) {
//     console.log('epub content:', epubObj.sections![51].toHtmlObjects())

//   }

// }

// import { router } from "./router";
// app.use(router);
