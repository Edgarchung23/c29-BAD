// import express, { ErrorRequestHandler } from 'express'
import { print } from "listening-on";
import { createKnex } from "./db";
import { RequestLog } from "./types";
import { HttpError } from "./http.error";
import { env } from "./env";
import express, {NextFunction} from "express";
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
import { router } from "./routes/routes"; 
import { Knex } from "knex";
// import { userRoutes } from "./routes/user.routes";
import { UserController } from "./controllers/user.controller";
// import { FormidableParser } from "./multipartFormParser";
import { UserServiceImpl } from "./services/user.service.impl";


export const knex = createKnex()
const app = express();


const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const keyFile = 'c29-bad-grp3.json'; 
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: keyFile
});


//<--------------------------March's need------------------------------------>
let userService = new UserServiceImpl(knex)


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
// app.use(is_admin, express.static("private"));
app.use(express.static("voice"));

//<--------------------------------------------------------------->

// Convert tp mp3 , save = http://localhost:8080/
app.get('/textToSpeech', async (req, res) => {
  const text = '開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大，他有一分鐘的時間說不出一句話來，大概他也知道對張總經理這種人，懇求他開恩是做不到的，所以他就一言不發地離開了。他走到門口的時候，忽然回過頭來問，今天星期幾？張總經理說星期五，老陳以很嚴肅的口氣說好吧，以後我每個星期五晚上都會來找你。然後他就開門離開了。我也不懂老陳的話什麼意思，可是我注意到我們的張總經理的臉上露出了一恐懼的表情。《閣樓裡的小花》（Petals on the Wind）。小李是他的司機，替他開了六年半的車，他從來沒有和他談過一句閒話，即使兩小時的車程，他也不會和他談一句話。老張是我認識的人之中最有自信的人，這也難怪他，他從小就不知道什麼叫做失敗，大多數高中生功課好的話，體育就奇差，體育好的傢伙卻大多只是四肢發達、頭腦簡單，只有老張，教室裡的考試他不怕，連操場裡的各種考試也都難不倒他。也就因為如此，對於任何表現不好的人，他會打從心裡起有一種厭惡的心理，而且也常將這位倒楣鬼開除掉。兩個月前，老張和我在他辦公室討論一件事，我的一位同學老陳敲門進來，老陳才能中等，可是做事十分認真';
  const request = {
    input: { text },
    voice: { languageCode: 'yue-HK', ssmlGender: 'NEUTRAL', name: "yue-HK-Standard-B" },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    const audioContent = response.audioContent;

    res.set('Content-Type', 'audio/mpeg');
    res.set('Content-Disposition', 'inline; filename="textToSpeech.mp3"');
    res.send(audioContent);
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    res.status(500).send('Error synthesizing speech');
  }
});

//<--------------------------------------------------------------->


app.use("/admin", is_admin, express.static("private"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(adminRouter);
app.use(authRouter);
app.use(
  new UserController(
    userService
  ).router,
)

//<--------------------------------------------------------------->
app.use(router);





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


// app.use((req, res, next) =>
//   next(
//     new HttpError(
//       404,
//       `route not found, method: ${req.method}, url: ${req.url}`
//     )
//   )
// );

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

//<--------------------------------------------------------------->



// Convert to mp3 , save = Vscode
async function synthesizeSpeech() {
  const request = {
    input: { text: '開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大今天是他工作的最後一天，請他去人事室辦離職手續。老陳是一位非常老實的人，這個被開除的打擊對他當然很大，他有一分鐘的時間說不出一句話來，大概他也知道對張總經理這種人，懇求他開恩是做不到的，所以他就一言不發地離開了。他走到門口的時候，忽然回過頭來問，今天星期幾？張總經理說星期五，老陳以很嚴肅的口氣說好吧，以後我每個星期五晚上都會來找你。然後他就開門離開了。我也不懂老陳的話什麼意思，可是我注意到我們的張總經理的臉上露出了一恐懼的表情。《閣樓裡的小花》（Petals on the Wind）。小李是他的司機，替他開了六年半的車，他從來沒有和他談過一句閒話，即使兩小時的車程，他也不會和他談一句話。老張是我認識的人之中最有自信的人，這也難怪他，他從小就不知道什麼叫做失敗，大多數高中生功課好的話，體育就奇差，體育好的傢伙卻大多只是四肢發達、頭腦簡單，只有老張，教室裡的考試他不怕，連操場裡的各種考試也都難不倒他。也就因為如此，對於任何表現不好的人，他會打從心裡起有一種厭惡的心理，而且也常將這位倒楣鬼開除掉。兩個月前，老張和我在他辦公室討論一件事，我的一位同學老陳敲門進來，老陳才能中等，可是做事十分認真，' },
    voice: { languageCode: 'yue-HK', ssmlGender: 'FEMALE', name:'yue-HK-Standard-a' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);
  const writeFile = fs.createWriteStream('public/voice/output.mp3');
  writeFile.write(response.audioContent, 'binary');
  writeFile.end();
}

synthesizeSpeech();

//<--------------------------------------------------------------->

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



