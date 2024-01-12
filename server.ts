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
import { is_admin } from "./middelware";
import { adminRouter } from "./router/is_adminRouter";
import { authRouter } from "./router/authRouter";
// import { adminRouter } from "./router/is_adminRouter";
// import { isAdmin } from "./middelware";
import expressSession from "express-session";
export const knex = createKnex()
const app = express();
import { router } from "./routes/routes"; 


const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const keyFile = 'c29-bad-grp3.json'; 
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: keyFile
});


//<--------------------------March's need------------------------------------>
app.use(
  expressSession({
    secret: "gyukj%^&*(*UYTGYHUJYT&*YHIUGYGYI",
    resave: true,
    saveUninitialized: true,
  })
);

declare module "express-session"{
  interface SessionData {
      email?: string;
      is_admin?: boolean;
      username?:string;
  }
}
//<-----------APP.USE---------------------------------------------->

app.use(express.static("public/html/"));
app.use(express.static("public"));
app.use(express.static("books"));
app.use(express.static("public/images"));
app.use(express.static("public"));
app.use("/admin", is_admin, express.static("private"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(adminRouter);
app.use(authRouter);

//<-----------TextToSpeech------------------------------------------->

app.get('html/reader.html?book=原子習慣', async (req, res) => {
  const text = '聽君一席話如聽一席話'
//   const text = '逝世後仍繼續席捲全球的傳奇小說家。一九二三年出生於美國維吉尼亞州。美國史上最暢銷的作家之一，擅長以禁斷戀情、血親糾葛等元素創造膾炙人口的小說，征服一代又一代的讀者。雖然中年才邁入寫作生涯，其獨具風格的創作與驚人的銷售成就令同時期作家皆難望其項背，堪稱「歌德羅曼史」、「家族傳奇」類型女王。一九八六年逝世後，由於「V.C.安德魯絲」之名儼然已經成為一個暢銷書品牌，其親族甚至聘請代筆作家，根據她留下的草稿大綱，至今仍繼續發表新作。'
  const request = {
    input: { text },
    voice: { languageCode: 'yue-HK', ssmlGender: 'NEUTRAL', name:"yue-HK-Standard-B" },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    const audioContent = response.audioContent;

    res.set('Content-Type', 'audio/mpeg');
    res.send(audioContent);
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    res.status(500).send('Error synthesizing speech');
  }
});
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.get("/logs", async (req, res, next) => {
  try {
    let requests = await knex("request_log")
      .select("id", "method", "url", "user_agent")
      .orderBy("id", "desc")
      .limit(25);
    res.json({ requests });
  } catch (error) {
    next(error);
  }
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
    
  //   // Loop through each section
  //   for (let i = 0; i < totalLength; i++) {
  //     // console.log(`Processing section ${i}`);
      
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

// const inputFilePath = "./private/book.epub";
// const outputFilePath = "./private/output.txt";

// async function getEpubLength(inputFilePath: string): Promise<number> {
//   const epubObj = await parseEpub(inputFilePath, {
//     type: "path",
//   });

//   if (epubObj?.sections?.length) {
//     // console.log("Number of sections:", epubObj.sections.length);
//     return epubObj.sections.length
//   }
//   return 0
// }

// async function epubToText(
//   inputFilePath: string,
//   targetSectionIndex: number
// ): Promise<string> {
//   try {
//     const epubObj = await parseEpub(inputFilePath, {
//       type: "path",
//     });

//     if (epubObj?.sections?.length) {
//       // console.log("Number of sections:", epubObj.sections.length);
      
//       if (!epubObj.sections[targetSectionIndex]) {
//         throw new Error(`Section at index ${targetSectionIndex} not found.`);
//       }
//       const targetSection: Section = epubObj.sections[targetSectionIndex];
//       return targetSection.htmlString;
//     } 
//     throw new Error("No sections found in the EPUB.");
//   } catch (error: any) {
//     console.error("Error parsing EPUB:", error.message);
//     throw error
//   }
// }

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



