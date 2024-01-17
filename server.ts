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
  "哈利波特2消失的密室第一章　最慘的生日水蠟樹街四號在早餐時爆發了一場衝突，這種情形自然不是第一次發生。，威農・德思禮先生在今天一大早，就被他外甥哈利房間的響亮嗚嗚啼聲給吵醒。﹃這是這禮拜第三次了！﹄他對著餐桌對面吼道，﹃要是你沒辦法控制住那隻貓頭鷹，牠就得滾！﹄哈利又一次地張開嘴巴，企圖解釋。﹃她覺得無聊嘛，﹄他說，﹃她習慣在戶外飛來飛去。要是我可以在晚上把她放出去︙︙﹄﹃你以爲我是笨蛋嗎？﹄威農姨丈厲聲喝道，一小塊煎蛋掛在他濃密的鬍鬚上晃來盪去，﹃那隻貓頭鷹放出去以後，會發生什麼樣的事，我心裡可清楚得很。﹄他跟他的妻子佩妮臉色陰沈地互望了一眼。哈利想要反駁，但德思禮夫婦的兒子達力。正好在此時打了一個又響又長的飽嗝，完全掩蓋住哈利的聲音。﹃我還要再吃一點培根。﹄﹃鍋子裡還剩下一些，小甜心，﹄佩妮阿姨說，用迷濛的眼神望著她肥壯的兒子，﹃我們得趁這個機會把你給餵飽︙︙學校裡的食物聽起來好像很不像樣︙︙﹄﹃胡說，佩妮，我在司梅汀唸書的時候，可從來沒餓過肚子，﹄威農姨丈真心地表示，﹃達力吃得夠多了，是不是啊，兒子？﹄胖得屁股肉從椅子兩旁垂下來的達力，咧開嘴笑笑，然後轉向哈利。﹃替我把鍋子拿來。﹄﹃你忘了說那個魔咒。﹄哈利沒好氣地答道。這句簡單的話，對這家人造成了難以置信的驚人效果：達力倒抽了一口氣，砰地一聲從椅子上摔下來，把整個廚房撞得連連搖晃；德思禮太太發出一聲微弱的尖叫，用雙手摀住嘴巴；德思禮先生跳了起來，太陽穴邊的青筋不停地抽動。﹃我指的是﹁請﹂！﹄哈利趕緊解釋，﹃我並不是指︱︱﹄﹃我是不是告訴過你，﹄他的姨丈怒聲咆哮，口水全都噴到了餐桌上，﹃絕對不准在我們家裡提到那個﹁ㄇ﹂開頭的字？﹄﹃可是我︱︱﹄﹃你竟敢恐嚇達力！﹄威農姨丈氣得大吼，往餐桌上重重捶了一拳。﹃我只是︱︱﹄﹃我警告你！我絕對不許你在這個屋簷下做出反常的舉動！﹄哈利的目光從他那氣得臉色發紫的姨丈，轉向面無血色的阿姨，她現在正努力想把達力從地上拉起來。﹃好吧，﹄哈利說，﹃好吧。︙︙﹄威農姨丈重新坐下，大聲用力呼吸，活像一頭氣喘咻咻的大犀牛，他斜歪著頭，用他銳利小眼的眼角餘光仔細打量哈利。自從哈利放暑假回家之後，威農姨丈就一直把他當作一枚隨時可能會爆炸的炸彈，因爲哈利並不是一個平凡的男孩。事實上，他的不平凡已經到了令人難以想像的地步。哈利波特是一個巫師︱︱一個剛在霍格華茲魔法與巫術學院修完一年級課程的巫師。哈利回來過暑假，自然是讓德思禮家覺得很不高興，但哈利的心情絕對比他們難過百倍。他非常想念霍格華茲，想念到就像是患了一種長期難以痊癒的胃痛。他想念那座藏著秘密通道和幽靈的城堡，想念他的魔法課程︵但或許不包括魔藥學老師石內卜︶、由貓頭鷹送達的郵件、在餐廳中盡情享用的宴會大餐、塔樓寢室中讓他一夜好眠的四柱舊式大床，以及到禁忌森林旁小木屋去拜訪獵場看守人海格的悠閒時光。而在這點點滴滴的回憶中，他最懷念的還是";
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
      text: "哈利說。德思禮夫婦瞪了他幾秒鐘之後，佩妮阿姨說：﹃你是個說謊的壞小孩，那些個︱︱﹄她也把聲音壓低，哈利幾乎要用讀唇的方式才知道她在說什麼，﹃︙︙貓頭鷹如果不是在爲你們傳遞消息，那是在做什麼？﹄﹃啊哈！﹄威農姨丈得意的小聲說，﹃沒話說了吧，小子！你以爲我們不知道，你的消息都是那些討厭的臭鳥帶過來的！﹄哈利猶豫一會兒，這次他不得不說出實話，即使阿姨和姨丈無法了解他所承認的事實令他感到很難過。﹃那些貓頭鷹︙︙不會爲我帶消息了。﹄他口氣平淡的說。﹃我不信。﹄佩妮阿姨立刻說。﹃我也不信。﹄威農姨丈強硬的說。﹃我們知道你一定又在玩什麼花樣了。﹄佩妮阿姨說。﹃我們可不笨。﹄威農姨丈說。﹃這，倒是個新聞。﹄哈利的火氣上升，不等德思禮夫婦開口，他立刻轉身踏過草坪，跨過花園的矮牆，大步走到街上。這下眞有麻煩了，他知道，待會兒勢必要面對阿姨和姨丈，爲他的無禮付出代價，但此刻他不在乎，他心裡還有更重要的事。哈利確信那個爆裂聲是某個人使用﹃現影術﹄或﹃消影術﹄引發的，和家庭小精靈多比消失在空氣中的聲音一模一樣，多比有可能現在就在水蠟樹街嗎？會不會這會兒多比就跟在他後面？他這一想，立即轉身看後面的水蠟樹街，街上空空盪盪，哈利也很清楚多比不懂得隱身術。他繼續往前走，並沒看清楚走的是哪條路，最近他經常在這些街道溜達，他兩條腿會自動帶他到最喜歡去的地方。他每隔幾步路便往後看，他敢肯定，躺在佩妮阿姨那些奄奄一息的秋海棠花叢裡時，某個會法術的人就在他附近，他們爲什麼不跟他說話？他們爲什麼不和他接觸？他們爲什麼到現在還要躲著？當他越來越懊喪的時候，他的信心也在逐漸減弱。說不定根本不是施用魔法的聲音，說不定是他太想得到他那個世界的一丁點芝麻大的消息，才會對再平常不過的聲音過度反應。他能肯定那不是某個鄰居家裡打破東西的聲響嗎？哈利覺得胃裡面有沉甸甸的感覺，那整個夏天一直縈繞不去的絕望感不知不覺又再度籠罩全身。明天早上他要撥鬧鐘五點起床，以便付錢給送︽預言家日報︾來的貓頭鷹︱︱還有沒有必要再繼續訂下去？這幾天哈利都只是看一眼頭版就扔了；經營這份報紙的那些白癡一旦確定佛地魔回來了，一定會把它做成頭版新聞，這才是哈利唯一關心的消息。運氣好的話，貓頭鷹也會帶來好朋友榮恩和妙麗的信，不過他早就對他們信上或許會捎來消息的期待死了心。很明顯的，我們不能多談那件事︙︙我們不可以說太重要的事，以免信件遺失︙︙我們很忙，但我不能告訴你這裡的詳細情形︙︙好多事都在進行，見面時再告訴你︙︙但是他們何時才能見面？好像沒有人太在乎確切的見面日期。妙麗在給他的生日卡中草草帶一句期待能早日見面。早日是多早？哈利從信中隱約的暗示得知妙麗和榮恩都在同一個地方，也許是榮恩父母家。一想到他們兩人在洞穴屋玩得高興，而他卻被困在水蠟樹街，他簡直無法忍受。事實上，他很氣他們棄他於不顧，所以他們寄給他當生日禮物的兩盒﹃蜂蜜公爵﹄巧克力，他沒打開來就扔了。後來，那天晚上在佩妮阿姨端上不新鮮的沙拉當作晚餐時，他就後悔了。榮恩和妙麗在忙什麼？他，哈利，爲什麼不忙？難道他的辦事能力不如他們？他們都忘了他的功績嗎？難道不是他進入那座墓園，親眼看見西追遇害，他又被綁在墓碑上，差點也沒命嗎？"
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
