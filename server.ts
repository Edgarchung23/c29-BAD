// import express, { ErrorRequestHandler } from 'express'
import { print } from "listening-on";
import { createKnex } from "./db";
import { RequestLog } from "./types";
import { HttpError } from "./http.error";
import { env } from "./env";
import express, { NextFunction } from "express";
import axios from "axios";
import cheerio from "cheerio";
// import * as EPub from 'epub';
import { is_admin } from "./middelware";
import expressSession from "express-session";
import { UserController } from "./controllers/user.controller";
import { UserServiceImpl } from "./services/user.service.impl";
export const knex = createKnex();
import { router } from "./routes/routes";
import { CollectController } from "./controllers/collect.controller";
import { CollectServiceImpl } from "./services/collect.service.impl";
import cors from "cors";
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const keyFile = "c29-bad-grp3.json";
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: keyFile,
});

//<--------------------------March's need------------------------------------>
let userService = new UserServiceImpl(knex);
let collectService = new CollectServiceImpl(knex);

app.use(
  expressSession({
    secret: "gyukj%^&*(*UYTGYHUJYT&*YHIUGYGYI",
    resave: true,
    saveUninitialized: true,
  })
);

declare module "express-session" {
  interface SessionData {
    email?: string;
    is_admin?: boolean;
    username?: string;
    user_id: number
  }
}
//<-----------APP.USE---------------------------------------------->

app.use(router);
app.use(new UserController(userService).router);
app.use(new CollectController(collectService).router);


app.use(express.static("public/html/"));
app.use(express.static("public"));
app.use(express.static("books"));
app.use(express.static("public/images"));
app.use(express.static("public"));
app.use(express.static("voice"));
app.use("/admin", is_admin, express.static("private"));

//<--------------------------------------------------------------->

// Convert tp mp3 , save = http://localhost:8080/
app.get("/textToSpeech", async (req, res) => {
  const text =
    "作者簡介,專門研究習慣、決策及如何持續進步的作家與講者，文章散見於《紐約時報》《時代雜誌》及《創業家雜誌》，也曾登上ＣＢＳ電視節目《今晨》。每個月有數百萬人造訪他的網站，廣受歡迎的電子報也有數十萬名訂閱者。常受邀到大學及《財富》５００大企業針對行為改變與習慣養成演講，所創造的習慣養成系統，廣受ＮＦＬ、ＮＢＡ及ＭＬＢ的球隊使用。透過他創立的「習慣學院」（The Habits Academy）的線上課程，已教育了超過一萬名領導者、經理、教練及教師。對想要在生活與工作上打造更好習慣的個人或團體來說，「習慣學院」是首屈一指的訓練平台，一本可以實際運用的習慣改變指南艾爾文此刻的你，想想看，是什麼原因讓你發現這本書？是書名吸引了你？還是書封上某個圖案、顏色，或是因為它被擺在架上剛好被你看到？又或者，你是因為一則書評、一位朋友的介紹，直接從網路訂書寄到家裡？無論如何，這些都是某個原因而促發的行動。然而你是否思考過，到底人的行動有多少是呼應外在的需求，又有多少來自內在的習慣？看過這本書你將會發現，人經常看似某個明顯原因而採取的行動，並不全為有意識的決定，而是在決定之前，自身的習慣就已經預設好幾個選項，甚至在你還沒發現前，就已經幫自己決定好要怎麼做。不過我要特別提一下，書中內容不只如此，它還告訴你如何培養好習慣的方法，從心態上醞釀，從生活裡調整，進而做出影響人生的正向改變。隨著市面上探討習慣的書變多，許多人漸漸知道，習慣能夠改變一個人，也知道習慣為什麼會改變一個人。但說到如何運用習慣改變自己，很多人還是找不到方法。過往我就讀過許多跟「習慣」有關的書，只是多數的內容偏重習慣對人造成的影響，談到較多的理論而不是實際的運用。而本書最大的不同，就是除了說明習慣如何影響你，更著墨在如何利用習慣改變自己。本書作者投入習慣的研究已經有好多年，他寫的文章在網路上廣為流傳，我算是很早就追蹤的讀者之一。就我觀察，雖然作者提出的觀點不見得是新的，但因為他經過長期的實踐，提供很多新的方法去建構有幫助的習慣。不論你是醫師或老師，是學生或父母，是上班族或創業的人，書的內容應該都能夠幫助到你。先來說說為什麼了解習慣對人有幫助。你或許曾聽過「人生就是一連串的選擇」，聽起來很有道理，我也不否認。不過你再深入去想，這是否代表人只要專注在做對的選擇，人生就會愈來愈好？可是，你回顧自己走過的路，過去真的足以影響你人生關鍵的「選擇」有多少？其實並不多，有些人或許一生也才碰到一、兩次而已。事實上，影響人生的原因，很大部分是來自我們的習慣。因為習慣雖然是一點一滴地形成，帶來的改變也不是一朝一夕就發生，影響卻可能是一生一世。比如觀察一個人的體態，相較於多數同年齡的人，他若顯得更健康或更強壯，他肯定是長期花時間控制飲食跟運動。一個人的英文流利，也肯定花了很多時間不斷練習口說跟記單字。能夠高效管理時間的人，通常在生活其他層面也是自律的人。人生中有很多的夢想、目標，都是需要長時間累積才能完成，沒有捷徑。大部分時候我們要靠的不是選擇，而是習慣。換句話說，培養習慣不只是一個觀念，更是打造人生的一把武器。如同書中令人印象深刻的英國自行車國家隊故事，只要微調運動員一點點的習慣，累積起來的複利效應就很驚人，讓自行車隊在短短幾年間，就從國際比賽裡一金難求，變成運動賽事的長期霸主。事情的發展很難讓人相信，結果卻又如此具有說服力。如果此刻的你正處於人生的轉折期，希望你也相信，許多的不可能，其實都是不知道而已──不知道方法，不知道轉念，不知道習慣的影響。不過有一點還是要提醒：習慣確實不容易養成，也無法立竿見影。如果你過於期待結果，想要突飛猛進，而一次設定太高的目標，效果通常也不好。";
  const request = {
    input: { text },
    voice: {
      languageCode: "yue-HK",
      ssmlGender: "NEUTRAL",
      name: "yue-HK-Standard-B",
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    const audioContent = response.audioContent;

    res.set("Content-Type", "audio/mpeg");
    res.set("Content-Disposition", 'inline; filename="textToSpeech.mp3"');
    res.send(audioContent);
  } catch (error) {
    console.error("Error synthesizing speech:", error);
    res.status(500).send("Error synthesizing speech");
  }
});

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
});

//<--------------------------------------------------------------->

// Convert to mp3 , save = Vscode
async function synthesizeSpeech() {
  const request = {
    input: {
      text: "但他現在已訓練自己，盡量不去看那幅畫像，每當有怪事發生時，他都會堅定的告訴自己，那只不過是眼睛的錯覺罷了。然後，在三年前，一個跟今夜十分相似的晚上，首相獨自待在辦公室裡時，畫像又再次宣告夫子即將到訪，才一會兒，這位魔法部長就突然從壁爐裡跳出來，他看起來神情慌亂，渾身濕答答的。首相還來不及質問他幹嘛把羊毛地毯滴得到處是水，夫子就 開始大吼大叫，說了一大堆亂七八糟的鬼話，內容提到某個首相從來沒聽說過的監獄，一個叫做﹃顛浪心﹄・布萊克的人、某個發音好像是霍格華茲的東西，和一個名叫哈利波特的男孩，讓首相聽得一頭霧水。我剛從阿茲卡班趕過來，﹄夫子氣喘吁吁的說，順手把他圓頂禮帽帽簷上的一大堆積水倒進口袋。﹃就在北海正中央，你知道吧，路程很不好走的︙︙催狂魔全都在騷動︱︱﹄他打了個寒顫，﹃︱︱牠們以前從來沒讓任何人逃出去過。但不管怎樣， 我必須先趕來見你，首相。布萊克是知名的麻瓜殺人犯，而且他可能打算去跟﹁那個人﹂會合︙︙哎呀，你甚至連﹁那個人﹂是誰都不曉得！﹄他絕望的盯著首相，過了好一會兒才開口說，﹃好吧，坐下，坐下來，我最好先跟你把事情說清楚︙︙喝點兒威士忌吧︙︙首相被人指使在自己的辦公室坐下，還要拿自己的威士忌來招待他，實在氣憤難當，但儘管如此，他還是乖乖的坐了下來。夫子掏出魔杖，平空變出兩個裝滿琥珀色液體的大玻璃杯，把其中一個杯子推到首相手中，然後拉了一把椅子夫子整整說了一個多鐘頭。但死都不肯說出某個特定的名字，只是把它寫在一張羊皮紙上，塞進首相沒握著威士忌酒杯的空手裡。最後夫子終於起身準備離去，首相也同樣站了起來。所以你認為那個︙︙﹄他低頭瞄了一眼左手中的名字，﹃佛地那個不能說出名字的人！﹄夫子厲聲吼道。抱歉︙︙所以你認為﹁那個不能說出名字的人﹂還活著是吧？嗯，鄧不利多是這麼說的，﹄夫子說，把細條紋斗篷繫緊在脖子上，﹃但我們一直都找不到他。照我看來，要是沒人支助他的話，他根本不足為慮，所以我們該擔心的人是布萊克。你會發佈警告是吧？非常好。就這樣，但願我們兩個永遠不用再碰面了，首相！晚安。但事與願違，他們兩個還是又碰面了。不到一年，夫子就愁容滿面的突然出現在內閣會議室裡，通知首相﹃鬼弟七︵至少發音聽起來是這樣︶世界盃大賽﹄出了點兒小狀況，有幾名麻瓜﹃牽涉在內﹄，但首相完全不用擔心，就算有人看到﹃那個人﹄的標 記重新出現，其實也不代表什麼，夫子很確定，這只不過是個個案而已，﹃麻瓜連絡處﹄正在修改他們的所有記憶。喔，我差點兒忘了，﹄夫子又補充說明，﹃為了舉辦三巫鬥法大賽，我們正從國外進口三隻外國龍和一頭人面獅身獸，這只是件例行公事，但﹁奇獸管控部門﹂告訴我，根據規則手冊，我們把高危險生物輸入這個國家前，必須先向你報備。我︱︱什麼︱︱龍？﹄首相語無倫次的問道。沒錯，三隻，﹄夫子說，﹃還有一頭人面獅身獸。就這樣，祝你有美好的一天。首相這時還抱著渺茫的希望，心想總不會有比龍和人面獅身獸更糟糕的消息了吧，但是他錯了。還不到兩年，夫子就又突然從爐火中蹦出來，而他這次帶來的噩耗是，阿茲卡班的囚犯集體脫逃。集體脫逃？﹄首相嘶聲重複。不用擔心，不用擔心！﹄夫子喊道，一腳已經踏入爐火中，﹃我們馬上就會逮住他們︱︱只是想告訴你一聲。首相才剛回過神來，喊道：﹃等等，先別走！﹄夫子就已踏入綠色火花中失去蹤影。不論媒體和反對陣營怎麼誕毀漫罵，首相終究不是個笨蛋。他注意到，雖然夫子在他們初次會面時，再三保證，不太可能會來煩他，但他們現在卻經常見面，而且夫子每次現身時，神情都變得更加狼狽慌張。首相雖不願再想到那個魔法部長︵他總是在心裡稱夫子為﹃另一個部長﹄︶，但還是常常暗自擔心，生怕夫子下次現身時會帶來更糟糕的壞消息。因此，對他來說，當他看到夫子蓬頭垢面、神情焦躁的再次從火中走出來，還大驚小怪的嫌他搞不清狀況時，這還真的是這整個悲慘星期中最倒楣的一件事。我哪會知道你們︱︱呃︱︱魔法界發生了什麼事啊？﹄首相厲聲吼道，﹃我忙著治理國事，而且我已經有夠多事情要擔心的了，用不著",
    },
    voice: {
      languageCode: "yue-HK",
      ssmlGender: "MALE",
      name: "yue-HK-Standard-d",
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  const [response] = await client.synthesizeSpeech(request);
  const writeFile = fs.createWriteStream("public/voice/output.mp3");
  writeFile.write(response.audioContent, "binary");
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
