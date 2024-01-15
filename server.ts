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
import { is_admin } from "./middelware";
import expressSession from "express-session";
import { UserController } from "./controllers/user.controller";
import { UserServiceImpl } from "./services/user.service.impl";
export const knex = createKnex()
import { router } from "./routes/routes"; 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  
app.use(router);
app.use(express.static("public/html/"));
app.use(express.static("public"));
app.use(express.static("books"));
app.use(express.static("public/images"));
app.use(express.static("public"));
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
app.use(
  new UserController(
    userService
  ).router,
)

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
// app.get("/logs", async (req, res, next) => {
//   try {
//     let requests = await knex("request_log")
//       .select("id", "method", "url", "user_agent")
//       .orderBy("id", "desc")
//       .limit(25);
//     res.json({ requests });
//   } catch (error) {
//     next(error);
//   }
// });

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
    input: { text: '作者簡介,專門研究習慣、決策及如何持續進步的作家與講者，文章散見於《紐約時報》《時代雜誌》及《創業家雜誌》，也曾登上ＣＢＳ電視節目《今晨》。每個月有數百萬人造訪他的網站，廣受歡迎的電子報也有數十萬名訂閱者。常受邀到大學及《財富》５００大企業針對行為改變與習慣養成演講，所創造的習慣養成系統，廣受ＮＦＬ、ＮＢＡ及ＭＬＢ的球隊使用。透過他創立的「習慣學院」（The Habits Academy）的線上課程，已教育了超過一萬名領導者、經理、教練及教師。對想要在生活與工作上打造更好習慣的個人或團體來說，「習慣學院」是首屈一指的訓練平台，一本可以實際運用的習慣改變指南艾爾文此刻的你，想想看，是什麼原因讓你發現這本書？是書名吸引了你？還是書封上某個圖案、顏色，或是因為它被擺在架上剛好被你看到？又或者，你是因為一則書評、一位朋友的介紹，直接從網路訂書寄到家裡？無論如何，這些都是某個原因而促發的行動。然而你是否思考過，到底人的行動有多少是呼應外在的需求，又有多少來自內在的習慣？看過這本書你將會發現，人經常看似某個明顯原因而採取的行動，並不全為有意識的決定，而是在決定之前，自身的習慣就已經預設好幾個選項，甚至在你還沒發現前，就已經幫自己決定好要怎麼做。不過我要特別提一下，書中內容不只如此，它還告訴你如何培養好習慣的方法，從心態上醞釀，從生活裡調整，進而做出影響人生的正向改變。隨著市面上探討習慣的書變多，許多人漸漸知道，習慣能夠改變一個人，也知道習慣為什麼會改變一個人。但說到如何運用習慣改變自己，很多人還是找不到方法。過往我就讀過許多跟「習慣」有關的書，只是多數的內容偏重習慣對人造成的影響，談到較多的理論而不是實際的運用。而本書最大的不同，就是除了說明習慣如何影響你，更著墨在如何利用習慣改變自己。本書作者投入習慣的研究已經有好多年，他寫的文章在網路上廣為流傳，我算是很早就追蹤的讀者之一。就我觀察，雖然作者提出的觀點不見得是新的，但因為他經過長期的實'},
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



