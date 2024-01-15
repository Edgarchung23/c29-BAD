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
app.use(
  new UserController(
    userService
  ).router,
)

app.use(express.static("public/html/"));
app.use(express.static("public"));
app.use(express.static("books"));
app.use(express.static("public/images"));
app.use(express.static("public"));
app.use(express.static("voice"));
app.use("/admin", is_admin, express.static("private"));

//<--------------------------------------------------------------->

// Convert tp mp3 , save = http://localhost:8080/
// app.get('/textToSpeech', async (req, res) => {
//   const text = '作者簡介,專門研究習慣、決策及如何持續進步的作家與講者，文章散見於《紐約時報》《時代雜誌》及《創業家雜誌》，也曾登上ＣＢＳ電視節目《今晨》。每個月有數百萬人造訪他的網站，廣受歡迎的電子報也有數十萬名訂閱者。常受邀到大學及《財富》５００大企業針對行為改變與習慣養成演講，所創造的習慣養成系統，廣受ＮＦＬ、ＮＢＡ及ＭＬＢ的球隊使用。透過他創立的「習慣學院」（The Habits Academy）的線上課程，已教育了超過一萬名領導者、經理、教練及教師。對想要在生活與工作上打造更好習慣的個人或團體來說，「習慣學院」是首屈一指的訓練平台，一本可以實際運用的習慣改變指南艾爾文此刻的你，想想看，是什麼原因讓你發現這本書？是書名吸引了你？還是書封上某個圖案、顏色，或是因為它被擺在架上剛好被你看到？又或者，你是因為一則書評、一位朋友的介紹，直接從網路訂書寄到家裡？無論如何，這些都是某個原因而促發的行動。然而你是否思考過，到底人的行動有多少是呼應外在的需求，又有多少來自內在的習慣？看過這本書你將會發現，人經常看似某個明顯原因而採取的行動，並不全為有意識的決定，而是在決定之前，自身的習慣就已經預設好幾個選項，甚至在你還沒發現前，就已經幫自己決定好要怎麼做。不過我要特別提一下，書中內容不只如此，它還告訴你如何培養好習慣的方法，從心態上醞釀，從生活裡調整，進而做出影響人生的正向改變。隨著市面上探討習慣的書變多，許多人漸漸知道，習慣能夠改變一個人，也知道習慣為什麼會改變一個人。但說到如何運用習慣改變自己，很多人還是找不到方法。過往我就讀過許多跟「習慣」有關的書，只是多數的內容偏重習慣對人造成的影響，談到較多的理論而不是實際的運用。而本書最大的不同，就是除了說明習慣如何影響你，更著墨在如何利用習慣改變自己。本書作者投入習慣的研究已經有好多年，他寫的文章在網路上廣為流傳，我算是很早就追蹤的讀者之一。就我觀察，雖然作者提出的觀點不見得是新的，但因為他經過長期的實踐，提供很多新的方法去建構有幫助的習慣。不論你是醫師或老師，是學生或父母，是上班族或創業的人，書的內容應該都能夠幫助到你。先來說說為什麼了解習慣對人有幫助。你或許曾聽過「人生就是一連串的選擇」，聽起來很有道理，我也不否認。不過你再深入去想，這是否代表人只要專注在做對的選擇，人生就會愈來愈好？可是，你回顧自己走過的路，過去真的足以影響你人生關鍵的「選擇」有多少？其實並不多，有些人或許一生也才碰到一、兩次而已。事實上，影響人生的原因，很大部分是來自我們的習慣。因為習慣雖然是一點一滴地形成，帶來的改變也不是一朝一夕就發生，影響卻可能是一生一世。比如觀察一個人的體態，相較於多數同年齡的人，他若顯得更健康或更強壯，他肯定是長期花時間控制飲食跟運動。一個人的英文流利，也肯定花了很多時間不斷練習口說跟記單字。能夠高效管理時間的人，通常在生活其他層面也是自律的人。人生中有很多的夢想、目標，都是需要長時間累積才能完成，沒有捷徑。大部分時候我們要靠的不是選擇，而是習慣。換句話說，培養習慣不只是一個觀念，更是打造人生的一把武器。如同書中令人印象深刻的英國自行車國家隊故事，只要微調運動員一點點的習慣，累積起來的複利效應就很驚人，讓自行車隊在短短幾年間，就從國際比賽裡一金難求，變成運動賽事的長期霸主。事情的發展很難讓人相信，結果卻又如此具有說服力。如果此刻的你正處於人生的轉折期，希望你也相信，許多的不可能，其實都是不知道而已──不知道方法，不知道轉念，不知道習慣的影響。不過有一點還是要提醒：習慣確實不容易養成，也無法立竿見影。如果你過於期待結果，想要突飛猛進，而一次設定太高的目標，效果通常也不好。';
//   const request = {
//     input: { text },
//     voice: { languageCode: 'yue-HK', ssmlGender: 'NEUTRAL', name: "yue-HK-Standard-B" },
//     audioConfig: { audioEncoding: 'MP3' },
//   };

//   try {
//     const [response] = await client.synthesizeSpeech(request);
//     const audioContent = response.audioContent;

//     res.set('Content-Type', 'audio/mpeg');
//     res.set('Content-Disposition', 'inline; filename="textToSpeech.mp3"');
//     res.send(audioContent);
//   } catch (error) {
//     console.error('Error synthesizing speech:', error);
//     res.status(500).send('Error synthesizing speech');
//   }
// });


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
    input: { text: '原子習慣改變了我的人生高中二年級的最後一天，我被球棒迎面擊中。某個同學全力揮棒之後，球棒從他的手中滑脫，直接朝我飛來，砸在我的兩眼之間。我對撞擊的當下毫無印象。球棒打在臉上的力道太強，我的鼻子扭曲成一個Ｕ字型，大腦的軟組織猛烈撞上顱骨內側，腦袋瞬間充斥一股腫脹感。毫秒之間，我的鼻梁斷裂，顱部多處骨折，兩個眼窩也碎了。睜開眼睛，我看見有人盯著我，有人跑去找救兵。目光往下，我發現衣服上沾著紅色斑點。有個同學脫下襯衫遞給我，我拿來堵住從破裂的鼻子飆出的血流。驚嚇與困惑讓我搞不清楚自己傷得有多重。老師用手臂圈住我的肩膀，我們踏上前往保健室的長遠路途：穿過球場，走下山坡，回到校園。不知道是誰的手觸摸我身體的側邊，將我撐直。我們不疾不徐，慢慢走著，沒有人知道浪費一分一秒都是凶險。到了保健室，護士問我一連串問題。「現在是西元幾年？」我回答：「一九九八。」其實是二○○二。「美國總統是誰？」我說：「比爾．柯林頓。」正確答案是喬治．Ｗ．布希。「你媽媽叫什麼名字？」「嗯……」我遲疑了十秒。　　「派蒂。」我隨口一說，忽略自己花了十秒才想起媽媽名字的事實這是我記得的最後一個問題。身體承受不住腦袋的急速腫脹，在救護車抵達之前，我就失去意識了。幾分鐘後，我被帶離學校，前往本地的醫院。到醫院不久，我的身體開始關機，連進行呼吸或吞嚥這種基本的身體機能都很掙扎。那天的第一次癲癇發作之後，我的呼吸完全停止。醫生趕來為我輸氧的同時，也確定了本地醫院的設備不足以應付我的狀況，便呼叫了一架直升機來將我移送到一間比較大型的醫院。他們把我從急診室推出來，到對街搭直升機。擔架床在凹凸不平的人行道上發出咯咯聲，一名護士在我身畔推擔架，另一名護士用手把氧氣打進我的身體。稍早抵達醫院的母親也跟我一起上了直升機，飛行過程中，她一直握著我的手，我則持續昏迷，無法自行呼吸。母親陪我搭直升機的同時，父親趕回家跟我的弟弟妹妹報訊。他忍著眼淚向妹妹解釋說，他當晚無法出席她的八年級畢業典禮。把弟妹送到親友家之後，他開車到醫院與我們會合。待母親與我降落在醫院屋頂，大概有二十名醫生和護士衝向直升機，然後把我推進創傷中心。到了此時，我腦袋裡的腫脹已經太過嚴重，以致創傷後癲癇不斷發作。我碎裂的骨頭需要修復，但我的狀態不適合進行手術。在當日的第三次癲癇發作之後，醫生讓我進入人工昏迷狀態，並為我裝上呼吸器。這間醫院對我的父母而言並不陌生。十年前，當三歲的妹妹被診斷出血癌時，他們也走進同一棟建築物的一樓。當年我五歲，弟弟才六個月大。而經過兩年半的化療、腰椎穿刺及骨髓切片檢查，妹妹終於抗癌成功，快樂健康地步出醫院。如今，十年的正常生活之後，我的父母為了另一個骨肉，再度置身這間醫院。當我陷入昏迷時，醫院派了牧師與社工來安慰我的父母。十年前發現妹妹罹癌那一晚，來的也是同一位牧師。　夜晚來臨，幾部機器維持著我的生命。我的父母躺在醫院的陪病床上不得安寢──前一刻因為疲勞而昏睡，下一刻又因為憂懼而驚醒。後來我母親告訴我：「那是我經歷過最糟糕的一個夜晚。」從頭部重傷到重回球場好在，到了隔天早上，我的呼吸狀況回復到讓醫生覺得可以解除人工昏迷。待我終於恢復意識，我發現自己失去了嗅覺。為了測試，護士請我擤鼻子，然後嗅聞一罐蘋果汁。我的嗅覺回來了，但沒有人想到，擤鼻子的動作讓空氣通過眼窩的骨折處，將我的左眼擠壓出來。我的眼球掉出眼眶之外，險險地靠著眼皮及連接眼睛與大腦的視神經掛著。眼科醫師說，隨著空氣排出，我的眼球會慢慢滑回原位，但難以判定需要費時多久。預計一週之後進行手術，這也多給了我一些時間復元。我看起來就像拳擊比賽中被痛打的那一方，但已經可以出院。我帶著斷裂的鼻梁、六處臉部骨折與一顆凸出的眼球回家。接下來的幾個月十分艱難，感覺生命中的一切都被按下暫停鍵。一連幾週，我眼睛看到的影像都是重疊的，根本不能好好視物；眼球確實回到原本的位置，但花了一個月；因為癲癇發作與視力問題，八個月後我才能再度開車'},
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



